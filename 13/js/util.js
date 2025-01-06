const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomUniqueInt = (min, max) => {
  const unAvailableInt = [];
  return () => {
    let currentInt = getRandomInt(min, max);
    if (unAvailableInt.length >= max - min + 1) {
      return null;
    }
    while (unAvailableInt.includes(currentInt)) {
      currentInt = getRandomInt(min, max);
    }
    unAvailableInt.push(currentInt);
    return currentInt;
  };
};

const getRandomArrElement = (array) => array[getRandomInt(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInt, getRandomUniqueInt, getRandomArrElement, isEscapeKey };
