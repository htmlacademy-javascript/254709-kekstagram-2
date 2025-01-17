const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showGetErrorAlert = () => {
  const dataErrorTemplate = document.querySelector('#data-error');
  const dataErrorElement = dataErrorTemplate.content.cloneNode(true);
  document.body.append(dataErrorElement);
  setTimeout(() => {
    const errorElement = document.querySelector('.data-error');
    if (errorElement) {
      errorElement.remove();
    }
  }, ALERT_SHOW_TIME);
};

const showSendErrorAlert = () => {
  const sendErrorTemplate = document.querySelector('#error');
  const sendErrorElement = sendErrorTemplate.content.cloneNode(true);
  document.body.append(sendErrorElement);

  const errorElement = document.querySelector('.error');
  const errorButton = errorElement.querySelector('.error__button');

  const closeError = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOverlayClick);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeError();
    }
  }

  function onOverlayClick(evt) {
    if (evt.target === errorElement) {
      evt.stopPropagation();
      closeError();
    }
  }
  errorButton.addEventListener('click', closeError);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOverlayClick);
};

const showSendSuccessAlert = () => {
  const sendSuccessTemplate = document.querySelector('#success');
  const sendSuccessElement = sendSuccessTemplate.content.cloneNode(true);
  document.body.append(sendSuccessElement);

  const successElement = document.querySelector('.success');
  const successButton = successElement.querySelector('.success__button');

  const closeSuccess = () => {
    successElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOverlayClick);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccess();
    }
  }

  function onOverlayClick(evt) {
    if (evt.target === successElement) {
      evt.stopPropagation();
      closeSuccess();
    }
  }
  successButton.addEventListener('click', closeSuccess);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOverlayClick);
};


export { isEscapeKey, showGetErrorAlert, showSendErrorAlert, showSendSuccessAlert };
