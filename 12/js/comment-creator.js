const commentTemplateElement = document.querySelector('.social__comment');

const createCommentTemplateElement = ({ avatar, message, name }) => {
  const newCommentTemplateElement = commentTemplateElement.cloneNode(true);
  const socialPictureElement = newCommentTemplateElement.querySelector('.social__picture');
  const socialTextElement = newCommentTemplateElement.querySelector('.social__text');
  socialPictureElement.src = avatar;
  socialPictureElement.alt = name;
  socialTextElement.textContent = message;
  return newCommentTemplateElement;
};

export { createCommentTemplateElement };
