import { isEscapeKey } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const bodyContainer = document.body;
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureContainer.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureContainer.querySelector('img');
const bigPictureLikes = bigPictureContainer.querySelector('.likes-count');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');
const commentsQty = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');

const COMMENTS_STEP = 5; // Количество комментариев, которые показываются за один раз

// Рендер большой картинки
const renderBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  commentsQty.textContent = comments.length;
  bigPictureDescription.textContent = description;
  attachBigPictureListeners(); // Вешаем обработчик событий
  initComments(comments); // Инициализируем комментарии
  toggleVisibility(true); // Переключатель видимости
};

// добавление обработчиков события на кнопку закрытия и эскейп
const attachBigPictureListeners = () => {
  bigPictureCloseElement.addEventListener('click', onClosePictureElement);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Переменные для хранения текущих комментариев
let currentComments = [];
let displayedCommentsCount = 0;

// Функция инициализации загрузки комментариев
const initComments = (comments) => {
  currentComments = comments; // Сохраняем все комментарии
  displayedCommentsCount = 0; // Сбрасываем счетчик показанных комментариев
  commentsContainer.innerHTML = ''; // Очищаем контейнер комментариев
  commentsLoader.addEventListener('click', renderComments); // Добавляем обработчик кнопки "Загрузить еще"
  renderComments(); // Первичная загрузка комментариев
};

// Функция рендера комментариев порциями
const renderComments = () => {
  const remainingComments = currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP); // Выделяем из массива комментариев группу из COMMENTS_STEP комментов для подгрузки
  const commentsFragment = document.createDocumentFragment(); // Создаем фрагмент для подгрузки
  remainingComments.forEach(comment => { // Добавляем новую порцию комментариев
    commentsFragment.append(createCommentElement(comment)); // Прогоняем каждый элемент через функцию создания комментария и добавляем во фрагмент
  });
  commentsContainer.append(commentsFragment);  // Добавляем фрагмент в конец контейнера
  displayedCommentsCount += remainingComments.length;  // Обновляем счетчик показанных комментариев
  updateCommentsLoaderVisibility();  // Обновляем видимость кнопки "Загрузить еще"
  updateCommentCounter();  // Обновляем счетчик комментариев
};

// Функция создания элемента комментария
const createCommentElement = ({ avatar, message, name }) => {
  const newCommentElement = commentElement.cloneNode(true);
  const socialPicture = newCommentElement.querySelector('.social__picture');
  const socialText = newCommentElement.querySelector('.social__text');
  socialPicture.src = avatar;
  socialPicture.alt = name;
  socialText.textContent = message;
  return newCommentElement;
};

// Функция обновления счетчика комментариев
const updateCommentCounter = () => {
  socialCommentCount.textContent = `${displayedCommentsCount} из ${currentComments.length} комментариев`;
};

// Функция обновления видимости кнопки "Загрузить еще"
const updateCommentsLoaderVisibility = () => {
  commentsLoader.classList.toggle('hidden', displayedCommentsCount >= currentComments.length);
};

// Функция добавления обработчика событий на контейнер с картинками и вычисление ID картинки, по которой был клик
const setupPictureEventListeners = (photoCollection) => {
  picturesContainer.addEventListener('click', (evt) => {
    const currentEventPictureId = evt.target.closest('.picture').dataset.pictureId;
    if (currentEventPictureId) {
      const foundedPhoto = photoCollection.find((picture) => picture.id === Number(currentEventPictureId));
      renderBigPicture(foundedPhoto);
    }
  });
};

// Функция переключения видимости контейнера с картинкой и прокрутки
const toggleVisibility = (isOpen) => {
  bigPictureContainer.classList.toggle('hidden', !isOpen);
  bodyContainer.classList.toggle('modal-open', isOpen);
};

// Вызов закрытия картинки нажатием на эскейп
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Вызов закрытия картинки нажатием на закрывающий элемент
const onClosePictureElement = () => {
  closeBigPicture();
};


// Функция закрытия большой картинки, переключение видимостей, снятие обработчиков событий
const closeBigPicture = () => {
  commentsLoader.removeEventListener('click', renderComments);
  bigPictureCloseElement.removeEventListener('click', onClosePictureElement);
  document.removeEventListener('keydown', onDocumentKeydown);
  toggleVisibility(false);
};

export { setupPictureEventListeners };
