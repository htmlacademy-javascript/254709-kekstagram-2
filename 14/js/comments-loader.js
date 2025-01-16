import { createCommentTemplateElement } from './comment-creator.js';
const COMMENTS_LOAD_STEP = 5; // Количество комментариев, которые показываются за один раз

const bigPictureSocialElement = document.querySelector('.big-picture__social');

const socialCommentCountElement = bigPictureSocialElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCountElement = bigPictureSocialElement.querySelector('.social__comment-total-count');
const commentsContainerElement = bigPictureSocialElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureSocialElement.querySelector('.comments-loader');


// Переменные для хранения текущих комментариев
let currentComments = [];
let displayedCommentsCount = 0;

// Функция рендера комментариев порциями
const renderComments = () => {
  const remainingComments = currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_LOAD_STEP); // Выделяем из массива комментариев группу из COMMENTS_LOAD_STEP комментов для подгрузки
  const commentsFragment = document.createDocumentFragment(); // Создаем фрагмент для подгрузки
  remainingComments.forEach((comment) => { // Добавляем новую порцию комментариев
    commentsFragment.append(createCommentTemplateElement(comment)); // Прогоняем каждый элемент через функцию создания комментария и добавляем во фрагмент
  });
  commentsContainerElement.append(commentsFragment); // Добавляем фрагмент в конец контейнера
  displayedCommentsCount += remainingComments.length; // Обновляем счетчик показанных комментариев
  commentsLoaderElement.classList.toggle('hidden', displayedCommentsCount >= currentComments.length);
  socialCommentCountElement.textContent = displayedCommentsCount;
  socialCommentTotalCountElement.textContent = currentComments.length;
};

// Функция инициализации загрузки комментариев
const initComments = (comments) => {
  currentComments = comments; // Сохраняем все комментарии
  displayedCommentsCount = 0; // Сбрасываем счетчик показанных комментариев
  commentsContainerElement.innerHTML = ''; // Очищаем контейнер комментариев
  renderComments(); // Первичная загрузка комментариев
  commentsLoaderElement.addEventListener('click', renderComments);
};

export { initComments };
