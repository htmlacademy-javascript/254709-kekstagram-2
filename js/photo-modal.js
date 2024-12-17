import { isEscapeKey } from './util.js';
import { initComments } from './comments-loader.js';

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


// Рендер большой картинки
const renderBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImageElement.src = url;
  bigPictureLikesElement.textContent = likes;
  bigPictureDescriptionElement.textContent = description;
  bigPictureCloseButtonElement.addEventListener('click', onClickCloseButton);
  document.addEventListener('keydown', onKeydownDocument);
  initComments(comments); // Инициализируем комментарии
  bigPictureContainerElement.classList.remove('hidden'); // включаем видимость контейнера большой картинки
  bodyContainerElement.classList.add('modal-open'); // блокируем прокрутку body
};

// Вызов закрытия картинки нажатием на escape
function onKeydownDocument (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Вызов закрытия картинки нажатием на закрывающий элемент
function onClickCloseButton () {
  closeBigPicture();
}

// Функция закрытия большой картинки, снятие обработчиков событий
function closeBigPicture () {
  bigPictureCloseButtonElement.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onKeydownDocument);
  bigPictureContainerElement.classList.add('hidden');
  bodyContainerElement.classList.remove('modal-open');
}

// Функция добавления обработчика событий на контейнер с картинками и вычисление ID картинки, по которой был клик
const setupPictureEventListeners = (photoCollection) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    const id = evt.target.closest('.picture').dataset.pictureId; // поиск по установленному атрибуту data-set-id
    if (id) {
      const foundedPhoto = photoCollection.find((picture) => picture.id === Number(id));
      renderBigPicture(foundedPhoto);
    }
  });
};

export { setupPictureEventListeners };
