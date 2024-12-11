import { isEscapeKey } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const bodyContainer = document.body;
const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPictureContainer.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureContainer.querySelector('img');
const bigPictureLikes = bigPictureContainer.querySelector('.likes-count');
const bigPictureDescription = bigPictureContainer.querySelector('.social__caption');
const commentsQty = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');

// Загружаем массив фоток, вешаем обработчик событий, находим фото, по которому кликнули
const setupPictureEventListeners = (photoCollection) => {
  picturesContainer.addEventListener('click', (evt) => {
    const currentEventPictureId = evt.target.closest('.picture').dataset.pictureId;
    if (currentEventPictureId) {
      const foundedPhoto = photoCollection.find((picture) => picture.id === Number(currentEventPictureId));
      renderBigPicture(foundedPhoto);
    };
  });
};

// Открываем окно с большой картинкой-сначала прогружаем фото, данные и комментарии, потом показываем пользователю результат
const renderBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  commentsQty.textContent = comments.length;
  bigPictureDescription.textContent = description;

  renderComments(comments);
  attachBigPictureListeners();
  toggleVisibility(true);
};

// Функция подгрузки комментов в окно большой картинки
const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach(({ avatar, message, name }) => {
    const newCommentElement = commentElement.cloneNode(true);
    const socialPicture = newCommentElement.querySelector('.social__picture');
    const socialText = newCommentElement.querySelector('.social__text');
    socialPicture.src = avatar;
    socialPicture.alt = name;
    socialText.textContent = message;
    commentsFragment.append(newCommentElement);
  });
  commentsContainer.textContent = '';
  commentsContainer.append(commentsFragment);
};

// Функция добавления обработчиков события
const attachBigPictureListeners = () => {
  bigPictureCloseElement.addEventListener('click', onClosePictureElement);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция переключения видимости
const toggleVisibility = (isOpen) => {
  bigPictureContainer.classList.toggle('hidden', !isOpen);
  socialCommentCount.classList.toggle('hidden', isOpen);
  commentsLoader.classList.toggle('hidden', isOpen);
  bodyContainer.classList.toggle('modal-open', isOpen);
}

// Функция закрытия большой картинки нажатием на кнопку Escape
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция закрытия большой картинки нажатием на элемент закрытия
const onClosePictureElement = () => {
  closeBigPicture();
};

// Функция непосредственно отвечающая за закрытие большой картинки и удаление обработчиков событий на закрытие
const closeBigPicture = () => {
  bigPictureCloseElement.removeEventListener('click', onClosePictureElement);
  document.removeEventListener('keydown', onDocumentKeydown);
  toggleVisibility(false);
};

export { setupPictureEventListeners };
