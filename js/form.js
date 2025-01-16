import { isEscapeKey } from './util.js';
import { runValidator, stopValidator } from './validator.js';
import { runImageEditor } from './image-editor.js';

const imgUploadElement = document.querySelector('.img-upload__input');
const imgEditElement = document.querySelector('.img-upload__overlay');
const imgEditCloseButtonElement = document.querySelector('.img-upload__cancel');
const body = document.body;
const newCommentElement = document.querySelector('.text__description');
const newHashTagsElement = document.querySelector('.text__hashtags');

const setupFormEventListeners = () => {
  imgUploadElement.addEventListener('change', () => {
    runValidator();
    runImageEditor();
    imgEditElement.classList.remove('hidden');
    body.classList.add('modal-open');
    imgEditCloseButtonElement.addEventListener('click', onClickCloseButton);
    imgEditElement.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onKeydownDocument);
  });
};

// Вызов закрытия редактирования нажатием на закрывающий элемент
function onClickCloseButton() {
  closeImgEdit();
}

// Вызов закрытия редактирования нажатием на оверлей
function onOverlayClick(evt) {
  if (evt.target === imgEditElement) {
    closeImgEdit();
  }
}

// Вызов закрытия редактирования нажатием на escape
function onKeydownDocument(evt) {
  if (isEscapeKey(evt) && document.activeElement !== newCommentElement && document.activeElement !== newHashTagsElement) {
    evt.preventDefault();
    closeImgEdit();
  }
}

// Закрытие редактирования изображения
function closeImgEdit() {
  imgEditElement.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadElement.value = '';
  stopValidator();
}

export { setupFormEventListeners };
