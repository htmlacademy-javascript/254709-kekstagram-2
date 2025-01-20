import { createCommentTemplateElement } from './comment-creator.js';
const COMMENTS_LOAD_STEP = 5;

const bigPictureSocialElement = document.querySelector('.big-picture__social');
const socialCommentCountElement = bigPictureSocialElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCountElement = bigPictureSocialElement.querySelector('.social__comment-total-count');
const commentsContainerElement = bigPictureSocialElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureSocialElement.querySelector('.comments-loader');

let currentComments = [];
let displayedCommentsCount = 0;

const renderComments = () => {
  const remainingComments = currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_LOAD_STEP);
  const commentsFragment = document.createDocumentFragment();
  remainingComments.forEach((comment) => {
    commentsFragment.append(createCommentTemplateElement(comment));
  });
  commentsContainerElement.append(commentsFragment);
  displayedCommentsCount += remainingComments.length;
  commentsLoaderElement.classList.toggle('hidden', displayedCommentsCount >= currentComments.length);
  socialCommentCountElement.textContent = displayedCommentsCount;
  socialCommentTotalCountElement.textContent = currentComments.length;
};


const initComments = (comments) => {
  currentComments = comments;
  displayedCommentsCount = 0;
  commentsContainerElement.innerHTML = '';
  renderComments();
  commentsLoaderElement.addEventListener('click', renderComments);
};

export { initComments };
