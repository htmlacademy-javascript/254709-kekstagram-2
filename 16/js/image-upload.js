const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const setupUploadEventListener = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
      preview.setAttribute('style', 'transform: scale(1)');
      effectsPreview.forEach((effectPreview) => {
        effectPreview.setAttribute('style', `background-image: url('${preview.src}')`);
      });
    }
  });
};
export { setupUploadEventListener };
