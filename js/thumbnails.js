import { setupPictureEventListeners } from './photo-modal.js';

const MAX_RANDOM_QTY = 10;

const filterFormElement = document.querySelector('.img-filters__form');
const defaultButtonElement = filterFormElement.querySelector('#filter-default');
const randomButtonElement = filterFormElement.querySelector('#filter-random');
const discussedButtonElement = filterFormElement.querySelector('#filter-discussed');

const renderGallery = (userPictures) => {
  const picturesContainerElement = document.querySelector('.pictures');
  const pictureTemplateElement = document.querySelector('#picture').content.querySelector('a');

  const pictureFragment = document.createDocumentFragment();

  userPictures.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.dataset.pictureId = id; // Устанавливает атрибут data-set-id
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.append(pictureElement);
  });
  picturesContainerElement.append(pictureFragment);
};

function setupFilterListeners (arr) {
  const randomArr = arr.slice();
  const discussedArr = arr.slice().sort((a, b) => b.comments.length - a.comments.length);
  filterFormElement.addEventListener('click', (evt) => {
    if (evt.target.id === 'filter-default') {
      filterToggle(evt);
      resetGallery();
      renderGallery(arr);
      setupPictureEventListeners(arr);
    }
    if (evt.target.id === 'filter-random') {
      filterToggle(evt);
      resetGallery();
      for (let i = randomArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomArr[i], randomArr[j]] = [randomArr[j], randomArr[i]];
      }
      renderGallery(randomArr.slice(0, MAX_RANDOM_QTY));
      setupPictureEventListeners(randomArr.slice(0, MAX_RANDOM_QTY));
    }
    if (evt.target.id === 'filter-discussed') {
      filterToggle(evt);
      resetGallery();
      renderGallery(discussedArr);
      setupPictureEventListeners(discussedArr);
    }
  });
}

function filterToggle(evt) {
  const filterButtons = [defaultButtonElement, randomButtonElement, discussedButtonElement];
  filterButtons.forEach((button) => {
    button.classList.toggle('img-filters__button--active', button === evt.target);
  });
}

function resetGallery () {
  document.querySelectorAll('.picture').forEach((element) => element.remove());
}

export { renderGallery, setupFilterListeners };
