import { getData } from './api.js';
import { renderGallery, setupFilterListeners } from './thumbnails.js';
import { setupPictureEventListeners } from './photo-modal.js';
import { setupFormEventListeners } from './form.js';
import { showGetErrorAlert } from './util.js';

getData()
  .then((photoCollection) => {
    renderGallery(photoCollection);
    setupPictureEventListeners(photoCollection);
    setupFilterListeners(photoCollection);
  })
  .then(() => document.querySelector('.img-filters').classList.remove('img-filters--inactive'))
  .catch(() => {
    showGetErrorAlert();
  });

setupFormEventListeners();
