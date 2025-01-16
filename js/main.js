import { getData } from './api.js';
import { renderGallery } from './thumbnails.js';
import { setupPictureEventListeners } from './photo-modal.js';
import { setupFormEventListeners } from './form.js';
import { showGetErrorAlert } from './util.js';

getData()
  .then((photoCollection) => {
    renderGallery(photoCollection);
    setupPictureEventListeners(photoCollection);
  })
  .catch(() => {
    showGetErrorAlert();
  });

setupFormEventListeners();
