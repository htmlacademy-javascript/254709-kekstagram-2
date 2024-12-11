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
const renderBigPicture = (picturesArr) => {
  picturesContainer.addEventListener('click', (evt) => {
    const currentEventPictureId = evt.target.closest('.picture').dataset.pictureId;
    if (currentEventPictureId) {
      const foundedPhoto = picturesArr.find((picture) => picture.id === Number(currentEventPictureId));
      openBigPicture(foundedPhoto);
    };
  });
};

// Открываем окно с большой картинкой-сначала прогружаем фото, данные и комментарии, потом показываем пользователю результат
const openBigPicture = (picture) => {
  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  commentsQty.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;
  renderComments(picture.comments);

  bigPictureCloseElement.addEventListener('click', onClosePictureElement);
  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureContainer.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bodyContainer.classList.add('modal-open');
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
  bigPictureContainer.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bodyContainer.classList.remove('modal-open');

  bigPictureCloseElement.removeEventListener('click', onClosePictureElement);
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { renderBigPicture };
