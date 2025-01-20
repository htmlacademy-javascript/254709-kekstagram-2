import { isEscapeKey } from './util.js';
import { initComments } from './comments-loader.js';

const picturesContainerElement = document.querySelector('.pictures');

const containerElement = document.querySelector('.big-picture');
const overlayElement = document.querySelector('.overlay');
const closeButtonElement = containerElement.querySelector('.big-picture__cancel');
const imageElement = containerElement.querySelector('.big-picture__img img');
const socialElement = containerElement.querySelector('.big-picture__social');
const likesElement = socialElement.querySelector('.likes-count');
const descriptionElement = socialElement.querySelector('.social__caption');

const renderBigPicture = ({ url, likes, comments, description }) => {
  imageElement.src = url;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;
  closeButtonElement.addEventListener('click', onClickCloseButton);
  overlayElement.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', onKeydownDocument);
  initComments(comments);
  containerElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function onClickCloseButton () {
  closeBigPicture();
}

function onOverlayClick(evt) {
  if (evt.target === overlayElement) {
    closeBigPicture();
  }
}

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
  document.body.classList.remove('modal-open');
}

const setupPictureEventListeners = (photoCollection) => {
  picturesContainerElement.addEventListener('click', (evt) => {
    const target = evt.target.closest('.picture');
    if (!target) {
      return;
    }
    const id = target.getAttribute('data-picture-id');
    if (id) {
      const foundedPhoto = photoCollection.find((picture) => picture.id === Number(id));
      renderBigPicture(foundedPhoto);
    }

  });
};

export { setupPictureEventListeners };
