const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataErrorAlert = () => {
  const dataErrorTemplate = document.querySelector('#data-error');
  const dataErrorElement = dataErrorTemplate.content.cloneNode(true);
  document.body.append(dataErrorElement);
  setTimeout(() => {
    const errorElement = document.querySelector('.data-error');
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

export { isEscapeKey, showDataErrorAlert };
