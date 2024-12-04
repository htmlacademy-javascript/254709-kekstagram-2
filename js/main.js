// Количество генерируемых объектов
const OBJECT_QUANTITY = 25;

// диапазон ID
const ID_RANGE = {
  MIN: 1,
  MAX: 25
};

// диапазон URL фотографий
const URL_RANGE = {
  MIN: 1,
  MAX: 25
};

// Набор описаний фотографий
const DESCRIPTION = [
  "Закат на берегу моря",
  "Старинная улочка европейского города",
  "Котенок спит на кровати",
  "Заснеженные склоны Хибин",
  "Букет цветов на столе",
  "Велосипед пристегнутый на велопарковке",
  "Чашка горячего кофе",
  "Осенний парк с опавшей листвой",
  "Маяк на скалистом берегу",
  "Шмель на цветке",
  "Деревенский домик в глухом лесу",
  "Отражение звезд на поверхности Ладоги",
  "Птенцы в гнезде",
  "Радуга над зеленым полем после дождя",
  "Следы на песчаном пляже"
];

// диапазон количества лайков
const LIKES_RANGE = {
  MIN: 15,
  MAX: 200
};

// Набор сообщений в комментариях
const MESSAGE = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

// Имена авторов комментариев
const AUTHOR_NAME = [
  "Довакин",
  "Алдуин",
  "Шеппард",
  "Геральт",
  "Супер Марио",
  "Соник",
  "Кратос",
  "Солид Снейк",
  "Клод Страйф",
  "Лара Крофт",
  "Наруто",
  "Элли",
  "Джоель",
  "Сэм Фишер"
];

// Диапазон номера картинки для аватара
const AVATAR_RANGE = {
  MIN: 1,
  MAX: 6
};

const COMMENTS_RANGE = {
 MIN: 0,
 MAX: 30
};

// Функция получения ID
const getRandomId = (() => {
  const availableId = []; // Массив доступных элементов
  for (let i = ID_RANGE.MIN; i <= ID_RANGE.MAX; i++) {
    availableId.push(i);
  }

  return () => {
    const randomIndex = Math.floor(Math.random() * availableId.length);
    return availableId.splice(randomIndex, 1)[0];
  };
})();

// Функция получения URL
const getRandomURL = (() => {
  const availableURL = []; // Массив доступных элементов
  for (let i = URL_RANGE.MIN; i <= URL_RANGE.MAX; i++) {
    availableURL.push(i);
  }

  return () => {
    const randomIndex = Math.floor(Math.random() * availableURL.length);
    return `photos/${availableURL.splice(randomIndex, 1)[0]}.jpg`;
  };
})();

// Функция выбора описания фотографии
const getRandomDescription = () => {
  return DESCRIPTION[Math.floor(Math.random() * DESCRIPTION.length)];
};

// Функция получения числа лайков
const getRandomLikes = () => {
  return Math.floor(Math.random() * (LIKES_RANGE.MAX - LIKES_RANGE.MIN + 1)) + LIKES_RANGE.MIN;
};




// Функция получения ID сообщения
const getCommentId = (() => {
  const notAvailableId = [];
  console.log(notAvailableId);
  return () => {
    const randomIndex = Math.floor(Math.random() * 65535);
    if (notAvailableId.includes(randomIndex)) {
      getCommentId();
    };
    notAvailableId.push(randomIndex);
    return randomIndex;
  };
})();

// Функция получения аватара
const getRandomAvatar = () => {
  return `img/avatar-${Math.floor(Math.random() * (AVATAR_RANGE.MAX - AVATAR_RANGE.MIN + 1)) + AVATAR_RANGE.MIN}.svg`;
};

// Функция выбора сообщения
const getRandomMessage = () => {
    return MESSAGE[Math.floor(Math.random() * MESSAGE.length)];
};

// Функция выбора автора
const getRandomAuthor = () => {
  return AUTHOR_NAME[Math.floor(Math.random() * AUTHOR_NAME.length)];
};


// Функция получения комментария
function getRandomComments () {
  this.id = getCommentId();
  this.avatar = getRandomAvatar();
  this.message = getRandomMessage();
  this.name = getRandomAuthor();
};

// Функция получения сгенерированного объекта
function generateObject () {
  this.id = getRandomId();
  this.url = getRandomURL();
  this.description = getRandomDescription();
  this.likes = getRandomLikes();
  // Рандом на количество комментов
  const commentsQuantity = Math.floor(Math.random() * (COMMENTS_RANGE.MAX - COMMENTS_RANGE.MIN)) + COMMENTS_RANGE.MIN;

  // Создание заданного числа комментариев
  let commentsArray = [];
  for (let i = 0; i <= commentsQuantity; i++) {
    commentsArray.push(new getRandomComments());
  };
  this.comments = commentsArray;
};


const finalResult = () => {
  let finalArray = [];
  for (let i = 0; i < OBJECT_QUANTITY; i++) {
    const newObject = new generateObject();
    finalArray.push(newObject);
  }
  return finalArray;
};

console.table(finalResult());
