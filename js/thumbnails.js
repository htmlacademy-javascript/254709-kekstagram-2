import { setupPictureEventListeners } from './image-modal.js';
import { debounce } from './util.js';

const MAX_RANDOM_QTY = 10;
const TIMEOUT = 500;

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
    pictureElement.dataset.pictureId = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.append(pictureElement);
  });
  picturesContainerElement.append(pictureFragment);
};

const shuffleArray = (array) => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const sortByComments = (array) =>
  array.slice().sort((a, b) => b.comments.length - a.comments.length);

function setupFilterListeners(arr) {
  const filters = {
    'filter-default': () => arr.slice(),
    'filter-random': () => shuffleArray(arr).slice(0, MAX_RANDOM_QTY),
    'filter-discussed': () => sortByComments(arr)
  };

  const updateGallery = debounce((filteredArray) => {
    resetGallery();
    renderGallery(filteredArray);
    setupPictureEventListeners(filteredArray);
  }, TIMEOUT);

  filterFormElement.addEventListener('click', (evt) => {
    filterToggle(evt);
    const filteredArray = filters[evt.target.id]();
    updateGallery(filteredArray);
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
