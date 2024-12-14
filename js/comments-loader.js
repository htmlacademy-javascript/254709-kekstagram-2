const COMMENTS_LOAD_STEP = 5; // Количество комментариев, которые показываются за один раз

const bigPictureSocialElement = document.querySelector('.big-picture__social');

const socialCommentCountElement = bigPictureSocialElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCountElement = bigPictureSocialElement.querySelector('.social__comment-total-count');
const commentsContainerElement = bigPictureSocialElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureSocialElement.querySelector('.comments-loader');
const commentTemplateElement = document.querySelector('.social__comment');

// Переменные для хранения текущих комментариев
let currentComments = [];
let displayedCommentsCount = 0;

// Функция рендера комментариев порциями
const renderComments = () => {
  const remainingComments = currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_LOAD_STEP); // Выделяем из массива комментариев группу из COMMENTS_LOAD_STEP комментов для подгрузки
  const commentsFragment = document.createDocumentFragment(); // Создаем фрагмент для подгрузки
  remainingComments.forEach(comment => { // Добавляем новую порцию комментариев
    commentsFragment.append(createCommentTemplateElement(comment)); // Прогоняем каждый элемент через функцию создания комментария и добавляем во фрагмент
  });
  commentsContainerElement.append(commentsFragment);  // Добавляем фрагмент в конец контейнера
  displayedCommentsCount += remainingComments.length;  // Обновляем счетчик показанных комментариев
  updateCommentsLoaderElementVisibility();  // Обновляем видимость кнопки "Загрузить еще"
  updateCommentCounter();  // Обновляем счетчик комментариев
};

// Функция создания элемента комментария
const createCommentTemplateElement = ({ avatar, message, name }) => {
  const newCommentTemplateElement = commentTemplateElement.cloneNode(true);
  const socialPictureElement = newCommentTemplateElement.querySelector('.social__picture');
  const socialTextElement = newCommentTemplateElement.querySelector('.social__text');
  socialPictureElement.src = avatar;
  socialPictureElement.alt = name;
  socialTextElement.textContent = message;
  return newCommentTemplateElement;
};

// Функция обновления счетчика комментариев
const updateCommentCounter = () => {
  socialCommentCountElement.textContent = displayedCommentsCount;
  socialCommentTotalCountElement.textContent = currentComments.length;
};

// Функция обновления видимости кнопки "Загрузить еще"
const updateCommentsLoaderElementVisibility = () => {
  commentsLoaderElement.classList.toggle('hidden', displayedCommentsCount >= currentComments.length);
};

// Функция инициализации загрузки комментариев
const initComments = (comments) => {
  currentComments = comments; // Сохраняем все комментарии
  displayedCommentsCount = 0; // Сбрасываем счетчик показанных комментариев
  commentsContainerElement.innerHTML = ''; // Очищаем контейнер комментариев
  renderComments(); // Первичная загрузка комментариев
  setCommentsEventListener(true);
};

// Функция установки состояния обработчика событий кнопки "Загрузить еще"
const setCommentsEventListener = (isEnable) => {
  if (isEnable) {
    commentsLoaderElement.addEventListener('click', renderComments);
    return
  }
  commentsLoaderElement.removeEventListener('click', renderComments);
};

export { initComments };
export { setCommentsEventListener };
