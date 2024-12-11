import { generateArrObj } from './data.js';
import { renderGallery } from './thumbnails.js';
import { renderBigPicture } from './photo-modal.js';

const photoArray = generateArrObj();
renderGallery(photoArray);
renderBigPicture(photoArray);


