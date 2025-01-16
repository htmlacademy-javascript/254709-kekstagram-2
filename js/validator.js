import '../vendor/pristine/pristine.min.js';

const MAX_LENGTH = 140;
const MAX_QTY = 5;


const imgEditForm = document.querySelector('.img-upload__form');
const newCommentElement = imgEditForm.querySelector('.text__description');
const newHashTagsElement = imgEditForm.querySelector('.text__hashtags');
const submitButtonElement = imgEditForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imgEditForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// Проверка комментариев
const validateComment = (value) => value.length <= MAX_LENGTH;

// Проверка хэштегов
const validateHashTags = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((item) => item !== '');
  // Проверка на количество
  if (hashtags.length > MAX_QTY) {
    validateHashTags.errorMessage = 'Превышено количество хэштегов. Максимум 5 хэштегов';
    return false;
  }
  // Проверка на дубликаты
  if (new Set(hashtags).size !== hashtags.length) {
    validateHashTags.errorMessage = 'Хэштеги не должны дублироваться';
    return false;
  }
  // Проверка каждого хэштега на валидность
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const isValid = hashtags.every((hashtag) => hashtagRegex.test(hashtag));
  if (!isValid) {
    validateHashTags.errorMessage = 'Хэштег должен начинаться с # и содержать буквы и цифры до 20 символов';
    submitButtonElement.disabled = true;
    return false;
  }
  submitButtonElement.disabled = false;
  return true;
};

const runValidator = () => {
  pristine.addValidator(newCommentElement, validateComment, 'Длина комментария не может составлять больше 140 символов');
  pristine.addValidator(newHashTagsElement, validateHashTags, () => validateHashTags.errorMessage);
};
const stopValidator = () => pristine.reset();

export { runValidator, stopValidator };
