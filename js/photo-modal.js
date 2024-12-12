import { isEscapeKey } from './util.js';

const picturesContainerElement = document.querySelector('.pictures');
const socialCommentCountElement = document.querySelector('.social__comment-shown-count');
const socialCommentTotalCountElement = document.querySelector('.social__comment-total-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const bodyContainerElement = document.body;
const bigPictureContainerElement = document.querySelector('.big-picture');
const bigPictureCloseButtonElement = bigPictureContainerElement.querySelector('.big-picture__cancel');
const bigPictureImageElement = bigPictureContainerElement.querySelector('img');
const bigPictureLikesElement = bigPictureContainerElement.querySelector('.likes-count');
const bigPictureDescriptionElement = bigPictureContainerElement.querySelector('.social__caption');
const commentsQuantityElement = bigPictureContainerElement.querySelector('.social__comment-total-count');
const commentsContainerElement = bigPictureContainerElement.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('.social__comment');

const COMMENTS_STEP = 5; // Количество комментариев, которые показываются за один раз

// Функция добавления обработчика событий на контейнер с картинками и вычисление ID картинки, по которой был клик
const setupPictureEventListeners = (photoCollection) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    const currentEventPictureId = evt.target.closest('.picture').dataset.pictureId;
    if (currentEventPictureId) {
      const foundedPhoto = photoCollection.find((picture) => picture.id === Number(currentEventPictureId));
      renderBigPicture(foundedPhoto);
    }
  });
};

// Рендер большой картинки
const renderBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImageElement.src = url;
  bigPictureLikesElement.textContent = likes;
  commentsQuantityElement.textContent = comments.length;
  bigPictureDescriptionElement.textContent = description;
  attachBigPictureListeners(); // Вешаем обработчик событий
  initComments(comments); // Инициализируем комментарии
  toggleVisibility(true); // Переключатель видимости
};

// добавление обработчиков события на кнопку закрытия и эскейп
const attachBigPictureListeners = () => {
  bigPictureCloseButtonElement.addEventListener('click', onClickCloseButton);
  document.addEventListener('keydown', onKeydownDocument);
};

// Переменные для хранения текущих комментариев
let currentComments = [];
let displayedCommentsCount = 0;

// Функция инициализации загрузки комментариев
const initComments = (comments) => {
  currentComments = comments; // Сохраняем все комментарии
  displayedCommentsCount = 0; // Сбрасываем счетчик показанных комментариев
  commentsContainerElement.innerHTML = ''; // Очищаем контейнер комментариев
  commentsLoaderElement.addEventListener('click', renderComments); // Добавляем обработчик кнопки "Загрузить еще"
  renderComments(); // Первичная загрузка комментариев
};

// Функция рендера комментариев порциями
const renderComments = () => {
  const remainingComments = currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP); // Выделяем из массива комментариев группу из COMMENTS_STEP комментов для подгрузки
  const commentsFragment = document.createDocumentFragment(); // Создаем фрагмент для подгрузки
  remainingComments.forEach(comment => { // Добавляем новую порцию комментариев
    commentsFragment.append(createCommentTemplateElement(comment)); // Прогоняем каждый элемент через функцию создания комментария и добавляем во фрагмент
  });
  commentsContainerElement.append(commentsFragment);  // Добавляем фрагмент в конец контейнера
  displayedCommentsCount += remainingComments.length;  // Обновляем счетчик показанных комментариев
  updateCommentsLoaderElementVisibility();  // Обновляем видимость кнопки "Загрузить еще"
  updateCommentCounter();  // Обновляем счетчик комментариев
};

// Функция создания элемента комментария
const createCommentTemplateElement = ({ avatar, message, name }) => {
  const newCommentTemplateElement = commentTemplateElement.cloneNode(true);
  const socialPictureElement = newCommentTemplateElement.querySelector('.social__picture');
  const socialTextElement = newCommentTemplateElement.querySelector('.social__text');
  socialPictureElement.src = avatar;
  socialPictureElement.alt = name;
  socialTextElement.textContent = message;
  return newCommentTemplateElement;
};

// Функция обновления счетчика комментариев
const updateCommentCounter = () => {
  socialCommentCountElement.textContent = displayedCommentsCount;
  socialCommentTotalCountElement.textContent = currentComments.length;
};

// Функция обновления видимости кнопки "Загрузить еще"
const updateCommentsLoaderElementVisibility = () => {
  commentsLoaderElement.classList.toggle('hidden', displayedCommentsCount >= currentComments.length);
};

// Функция переключения видимости контейнера с картинкой и прокрутки
const toggleVisibility = (isOpen) => {
  bigPictureContainerElement.classList.toggle('hidden', !isOpen);
  bodyContainerElement.classList.toggle('modal-open', isOpen);
};

// Вызов закрытия картинки нажатием на эскейп
const onKeydownDocument = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Вызов закрытия картинки нажатием на закрывающий элемент
const onClickCloseButton = () => {
  closeBigPicture();
};

// Функция закрытия большой картинки, переключение видимостей, снятие обработчиков событий
const closeBigPicture = () => {
  commentsLoaderElement.removeEventListener('click', renderComments);
  bigPictureCloseButtonElement.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onKeydownDocument);
  toggleVisibility(false);
};

export { setupPictureEventListeners };
