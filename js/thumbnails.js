const renderGallery = (userPictures) => {
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('a');

const pictureFragment = document.createDocumentFragment();

userPictures.forEach(({id, url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.dataset.pictureId = id;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureFragment.append(pictureElement);
});

picturesContainer.append(pictureFragment);
};

export { renderGallery };
