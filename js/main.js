import { getData } from './api.js';
import { renderGallery, setupFilterListeners } from './thumbnails.js';
import { setupPictureEventListeners } from './photo-modal.js';
import { setupFormEventListeners } from './form.js';
import { showGetErrorAlert } from './util.js';

async function initializeGallery() {
  try {
    const photoCollection = await getData();
    renderGallery(photoCollection);
    setupPictureEventListeners(photoCollection);
    setupFilterListeners(photoCollection);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  } catch (error) {
    showGetErrorAlert();
  }
}

initializeGallery();
setupFormEventListeners();
