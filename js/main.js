import { getData } from './api.js';
import { renderGallery, setupFilterListeners } from './thumbnails.js';
import { setupPictureEventListeners } from './image-modal.js';
import { setupUploadEventListener } from './image-upload.js';
import { setupFormEventListeners } from './form.js';
import { showGetErrorAlert } from './util.js';
import { debounce } from './util.js';

const TIMEOUT = 500;

const initializeGallery = async () => {
  try {
    const photoCollection = await getData();
    renderGallery(photoCollection);
    setupPictureEventListeners(photoCollection);
    setupFilterListeners(photoCollection);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  } catch (error) {
    showGetErrorAlert();
  }
};

const runProject = debounce(initializeGallery, TIMEOUT);
runProject();
setupUploadEventListener();
setupFormEventListeners();
