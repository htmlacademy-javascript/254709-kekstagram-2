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

export { renderGallery };
