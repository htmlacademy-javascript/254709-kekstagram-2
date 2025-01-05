import { isEscapeKey } from './util.js';
import { initComments } from './comments-loader.js';

// Общий контейнер
const body = document.body;

// Контейнер с картинками
const picturesContainerElement = document.querySelector('.pictures');

// Элементы большой картинки
const ContainerElement = document.querySelector('.big-picture');
const OverlayElement = document.querySelector('.overlay');
const CloseButtonElement = ContainerElement.querySelector('.big-picture__cancel');
const ImageElement = ContainerElement.querySelector('.big-picture__img img');
const SocialElement = ContainerElement.querySelector('.big-picture__social');
const LikesElement = SocialElement.querySelector('.likes-count');
const DescriptionElement = SocialElement.querySelector('.social__caption');

// Рендер большой картинки
const render = ({ url, likes, comments, description }) => {
  ImageElement.src = url;
  LikesElement.textContent = likes;
  DescriptionElement.textContent = description;
  CloseButtonElement.addEventListener('click', onClickCloseButton);
  OverlayElement.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onKeydownDocument);
  initComments(comments); // Инициализируем комментарии
  ContainerElement.classList.remove('hidden'); // включаем видимость контейнера большой картинки
  body.classList.add('modal-open'); // блокируем прокрутку body
};

// Вызов закрытия картинки нажатием на закрывающий элемент
function onClickCloseButton () {
  close();
}

// Вызов закрытия картинки нажатием мимо модального окна
function onOverlayClick(evt) {
  if (evt.target === OverlayElement) {
    close();
  }
}

// Вызов закрытия картинки нажатием на escape
function onKeydownDocument (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    close();
  }
}

function close () {
  CloseButtonElement.removeEventListener('click', onClickCloseButton);
  ContainerElement.removeEventListener('click', onOverlayClick);
  document.removeEventListener('keydown', onKeydownDocument);
  ContainerElement.classList.add('hidden');
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
      render(foundedPhoto);
    }
  });
};

export { setupPictureEventListeners };
