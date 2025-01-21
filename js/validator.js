import '../vendor/pristine/pristine.min.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_QTY = 5;
const MAX_HASHTAG_LENGTH = 20;


const formElement = document.querySelector('.img-upload__form');
const newCommentElement = formElement.querySelector('.text__description');
const newHashTagsElement = formElement.querySelector('.text__hashtags');
const submitButtonElement = formElement.querySelector('.img-upload__submit');


const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateComment = (value) => {
  const isValid = value.length <= MAX_COMMENT_LENGTH;
  if (!isValid) {
    submitButtonElement.setAttribute('disabled', '');
    return false;
  }
  submitButtonElement.removeAttribute('disabled');
  return true;
};

const validateHashTags = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((item) => item !== '');
  if (hashtags.length > MAX_HASHTAGS_QTY) {
    validateHashTags.errorMessage = `Превышено количество хэштегов. Максимум ${MAX_HASHTAGS_QTY} хэштегов`;
    return false;
  }
  if (new Set(hashtags).size !== hashtags.length) {
    validateHashTags.errorMessage = 'Хэштеги не должны дублироваться';
    return false;
  }
  const hashtagRegex = new RegExp(`^#[a-zа-яё0-9]{1,${MAX_HASHTAG_LENGTH - 1}}$`, 'i');
  const isValid = hashtags.every((hashtag) => hashtagRegex.test(hashtag));
  if (!isValid) {
    validateHashTags.errorMessage = `Хэштег должен начинаться с # и содержать буквы и цифры до ${MAX_HASHTAG_LENGTH} символов`;
    submitButtonElement.setAttribute('disabled', '');
    return false;
  }
  submitButtonElement.removeAttribute('disabled');
  return true;
};

const runValidator = () => {
  pristine.addValidator(newCommentElement, validateComment, `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`);
  pristine.addValidator(newHashTagsElement, validateHashTags, () => validateHashTags.errorMessage);
};
const stopValidator = () => pristine.reset();

export { runValidator, stopValidator };
