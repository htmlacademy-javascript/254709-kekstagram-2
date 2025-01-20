import '../vendor/nouislider/nouislider.js';

const buttonDecrementElement = document.querySelector('.scale__control--smaller');
const buttonIncrementElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');

const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const effectLevelElement = sliderContainerElement.querySelector('.effect-level__value');
const imageElement = document.querySelector('.img-upload__preview img');
const effectListElement = document.querySelector('.effects__list');
const originalElement = effectListElement.querySelector('#effect-none');

const SCALE = {
  MIN: 0.25,
  MAX: 1,
  STEP: 0.25,
  DEFAULT: 1,
};

const EFFECTS = {
  chrome: {
    MIN: 0,
    MAX: 1,
    START: 1,
    STEP: 0.1,
    STYLE: 'grayscale',
    UNIT: '',
  },
  sepia: {
    MIN: 0,
    MAX: 1,
    START: 1,
    STEP: 0.1,
    STYLE: 'sepia',
    UNIT: '',
  },
  marvin: {
    MIN: 0,
    MAX: 100,
    START: 100,
    STEP: 1,
    STYLE: 'invert',
    UNIT: '%',
  },
  phobos: {
    MIN: 0,
    MAX: 3,
    START: 3,
    STEP: 0.1,
    STYLE: 'blur',
    UNIT: 'px',
  },
  heat: {
    MIN: 0,
    MAX: 3,
    START: 3,
    STEP: 0.1,
    STYLE: 'brightness',
    UNIT: '',
  },
};

let scaleValue = SCALE.DEFAULT;

const formatScale = (value) => `${value * 100}%`;

const changeScale = (value) => {
  scaleValue = value;
  imageElement.setAttribute('style', `transform: scale(${scaleValue})`);
  scaleValueElement.value = formatScale(scaleValue);
};

const decrementScale = () => {
  if (scaleValue > SCALE.MIN) {
    changeScale(scaleValue - SCALE.STEP);
  }
};

const incrementScale = () => {
  if (scaleValue < SCALE.MAX) {
    changeScale(scaleValue + SCALE.STEP);
  }
};

const getCurrentScale = () => `scale(${scaleValue})`;

const createSlider = ({ MIN, MAX, START, STEP, STYLE, UNIT }) => {
  noUiSlider.create(sliderElement, {
    range: { min: MIN, max: MAX },
    start: START,
    step: STEP,
    connect: 'lower',
    format: {
      to: (value) => {
        const formatted = Number(value).toFixed(1);
        return formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted;
      },
      from: (value) => parseFloat(value)
    }
  });

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    effectLevelElement.value = value;
    imageElement.setAttribute('style', `transform: ${getCurrentScale()}; filter: ${STYLE}(${value}${UNIT})`);
  });
};

const addEffect = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  if (originalElement.checked) {
    imageElement.setAttribute('style', `transform: ${getCurrentScale()}; filter: none`);
    sliderContainerElement.classList.add('hidden');
    return;
  }
  sliderContainerElement.classList.remove('hidden');

  const checkedEffect = effectListElement.querySelector('input:checked').value;
  createSlider(EFFECTS[checkedEffect]);
};

const runImageEditor = () => {
  imageElement.setAttribute('style', `transform: ${getCurrentScale()}; filter: none`);
  sliderContainerElement.classList.add('hidden');
  effectListElement.addEventListener('change', addEffect);
  scaleValue = SCALE.DEFAULT;
  imageElement.setAttribute('style', `transform: scale(${SCALE.DEFAULT})`);
  scaleValueElement.value = formatScale(scaleValue);
  buttonDecrementElement.addEventListener('click', decrementScale);
  buttonIncrementElement.addEventListener('click', incrementScale);
};

export { runImageEditor };
