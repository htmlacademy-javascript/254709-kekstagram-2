import { isEscapeKey } from './util.js';
import { initComments } from './comments-loader.js';
import { setCommentsEventListener  } from './comments-loader.js';

// Общий контейнер
const bodyContainerElement = document.body;

// Контейнер с картинками
const picturesContainerElement = document.querySelector('.pictures');

// Элементы большой картинки
const bigPictureContainerElement = document.querySelector('.big-picture');
const bigPictureCloseButtonElement = bigPictureContainerElement.querySelector('.big-picture__cancel');
const bigPictureImageElement = bigPictureContainerElement.querySelector('.big-picture__img img');
const bigPictureSocialElement = bigPictureContainerElement.querySelector('.big-picture__social');
const bigPictureLikesElement = bigPictureSocialElement.querySelector('.likes-count');
const bigPictureDescriptionElement = bigPictureSocialElement.querySelector('.social__caption');

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
  bigPictureDescriptionElement.textContent = description;
  setBigPictureListeners(); // Вешаем обработчик событий
  initComments(comments); // Инициализируем комментарии
  toggleVisibility(true); // Переключатель видимости
};

// добавление обработчиков события на кнопку закрытия и эскейп
const setBigPictureListeners = () => {
  bigPictureCloseButtonElement.addEventListener('click', onClickCloseButton);
  document.addEventListener('keydown', onKeydownDocument);
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
  bigPictureCloseButtonElement.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onKeydownDocument);
  toggleVisibility(false);
  setCommentsEventListener(false);
};

export { setupPictureEventListeners };
