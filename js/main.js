import { getData } from './api.js';
import { renderGallery } from './thumbnails.js';
import { setupPictureEventListeners } from './photo-modal.js';
import { setupFormEventListeners } from './form.js';
import { showDataErrorAlert } from './util.js';

getData()
  .then((photoCollection) => {
    renderGallery(photoCollection);
    setupPictureEventListeners(photoCollection);
  })
  .catch(() => {
    showDataErrorAlert();
  });

setupFormEventListeners();
