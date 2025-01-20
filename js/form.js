import { isEscapeKey, showSendErrorAlert, showSendSuccessAlert } from './util.js';
import { runValidator, stopValidator } from './validator.js';
import { runImageEditor } from './image-editor.js';
import { sendData } from './api.js';

const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const imgUploadElement = formElement.querySelector('.img-upload__input');
const imgEditElement = formElement.querySelector('.img-upload__overlay');
const imgEditCloseButtonElement = formElement.querySelector('.img-upload__cancel');
const newCommentElement = formElement.querySelector('.text__description');
const newHashTagsElement = formElement.querySelector('.text__hashtags');

const setupFormEventListeners = () => {
  imgUploadElement.addEventListener('change', () => {
    stopValidator();
    runValidator();
    runImageEditor();
    imgEditElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    formElement.addEventListener('submit', setUserFormSubmit);
    imgEditCloseButtonElement.addEventListener('click', onClickCloseButton);
    imgEditElement.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onKeydownDocument);
  });
};

function onClickCloseButton() {
  closeImgEdit();
}

function onOverlayClick(evt) {
  if (evt.target === imgEditElement) {
    closeImgEdit();
  }
}

function onKeydownDocument(evt) {
  if (isEscapeKey(evt) && document.activeElement !== newCommentElement && document.activeElement !== newHashTagsElement && !document.querySelector('.error')) {
    evt.preventDefault();
    closeImgEdit();
  }
}

function closeImgEdit() {
  imgEditElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  stopValidator();
  formElement.reset();
}

function setUserFormSubmit(evt) {
  evt.preventDefault();
  submitButtonElement.setAttribute('disabled', '');
  sendData(new FormData(evt.target))
    .then(() => {
      formElement.reset();
      showSendSuccessAlert();
      closeImgEdit();
    }
    )
    .catch(
      () => {
        showSendErrorAlert();
      }
    )
    .finally(
      () => {
        submitButtonElement.removeAttribute('disabled');
      });
}

export { setupFormEventListeners };
