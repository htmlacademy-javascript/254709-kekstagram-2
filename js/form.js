import { isEscapeKey, showSendErrorAlert, showSendSuccessAlert } from './util.js';
import { runValidator, stopValidator } from './validator.js';
import { runImageEditor } from './image-editor.js';
import { sendData } from './api.js';

const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const imgUploadElement = formElement.querySelector('.img-upload__input');
const imgEditElement = formElement.querySelector('.img-upload__overlay');
const imgEditCloseButtonElement = formElement.querySelector('.img-upload__cancel');
const body = document.body;
const newCommentElement = formElement.querySelector('.text__description');
const newHashTagsElement = formElement.querySelector('.text__hashtags');

const setupFormEventListeners = () => {
  imgUploadElement.addEventListener('change', () => {
    runValidator();
    runImageEditor();
    imgEditElement.classList.remove('hidden');
    body.classList.add('modal-open');
    formElement.addEventListener('submit', setUserFormSubmit);
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
  resetSettings();
}

function resetSettings() {
  imgUploadElement.value = '';
  newCommentElement.value = '';
  newHashTagsElement.value = '';
}

function blockSubmitButton() {
  submitButtonElement.disabled = true;
}

function unblockSubmitButton () {
  submitButtonElement.disabled = false;
}

// Обработчик событий на кнопку отправить
function setUserFormSubmit(evt) {
  evt.preventDefault();
  blockSubmitButton();
  sendData(new FormData(evt.target))
    .then(() => {
      closeImgEdit();
      resetSettings();
      showSendSuccessAlert();
    }
    )
    .catch(
      () => {
        showSendErrorAlert();
      }
    )
    .finally(unblockSubmitButton);
}

export { setupFormEventListeners };
