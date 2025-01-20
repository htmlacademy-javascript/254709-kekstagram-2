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

const createNotification = ({ templateId, className, buttonClass }) => {
  const template = document.querySelector(templateId);
  const element = template.content.cloneNode(true);
  document.body.append(element);

  const notification = document.querySelector(className);
  const button = notification.querySelector(buttonClass);

  const close = () => {
    notification.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOverlayClick);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      close();
      evt.stopPropagation();
    }
  }

  function onOverlayClick(evt) {
    if (evt.target === notification) {
      evt.stopPropagation();
      close();
    }
  }
  button.addEventListener('click', close);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOverlayClick);
};

const showSendErrorAlert = () => createNotification({
  templateId: '#error',
  className: '.error',
  buttonClass: '.error__button'
});

const showSendSuccessAlert = () => createNotification({
  templateId: '#success',
  className: '.success',
  buttonClass: '.success__button'
});

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showGetErrorAlert, showSendErrorAlert, showSendSuccessAlert, debounce };
