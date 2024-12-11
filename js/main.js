import { generateArrObj } from './data.js';
import { renderGallery } from './thumbnails.js';
import { setupPictureEventListeners } from './photo-modal.js';

const photoCollection = generateArrObj();
renderGallery(photoCollection);
setupPictureEventListeners (photoCollection);


