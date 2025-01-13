import { isEscapeKey } from './util.js';
import { initComments } from './comments-loader.js';

// Общий контейнер
const body = document.body;

// Контейнер с картинками
const picturesContainerElement = document.querySelector('.pictures');

// Элементы большой картинки
const containerElement = document.querySelector('.big-picture');
const overlayElement = document.querySelector('.overlay');
const closeButtonElement = containerElement.querySelector('.big-picture__cancel');
const imageElement = containerElement.querySelector('.big-picture__img img');
const socialElement = containerElement.querySelector('.big-picture__social');
const likesElement = socialElement.querySelector('.likes-count');
const descriptionElement = socialElement.querySelector('.social__caption');

// Рендер большой картинки
const renderBigPicture = ({ url, likes, comments, description }) => {
  imageElement.src = url;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;
  closeButtonElement.addEventListener('click', onClickCloseButton);
  overlayElement.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onKeydownDocument);
  initComments(comments); // Инициализируем комментарии
  containerElement.classList.remove('hidden'); // включаем видимость контейнера большой картинки
  body.classList.add('modal-open'); // блокируем прокрутку body
};

// Вызов закрытия картинки нажатием на закрывающий элемент
function onClickCloseButton () {
  closeBigPicture();
}

// Вызов закрытия картинки нажатием мимо модального окна
function onOverlayClick(evt) {
  if (evt.target === overlayElement) {
    closeBigPicture();
  }
}

// Вызов закрытия картинки нажатием на escape
function onKeydownDocument (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture () {
  closeButtonElement.removeEventListener('click', onClickCloseButton);
  containerElement.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onKeydownDocument);
  containerElement.classList.add('hidden');
  body.classList.remove('modal-open');
}

// Функция добавления обработчика событий на контейнер с картинками и вычисление ID картинки, по которой был клик
const setupPictureEventListeners = (photoCollection) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    if (!target) {
      return;
    }
    const id = target.dataset.pictureId; // поиск по установленному атрибуту data-set-id
    if (id) {
      const foundedPhoto = photoCollection.find((picture) => picture.id === Number(id));
      renderBigPicture(foundedPhoto);
    }
  });
};

export { setupPictureEventListeners };
