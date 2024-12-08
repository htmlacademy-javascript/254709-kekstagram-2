// Количество генерируемых объектов
const OBJECT_QTY = 25;

// диапазон ID фото
const IdPhotoRange = {
  MIN: 1,
  MAX: 25
};

// диапазон ID комментария
const IdMessageRange = {
  MIN: 1,
  MAX: 1111
};

// диапазон URL фотографий
const UrlRange = {
  MIN: 1,
  MAX: 25
};

// диапазон количества лайков
const LikesRange = {
  MIN: 15,
  MAX: 200
};

// диапазон количества комментариев
const CommentsRange = {
 MIN: 0,
 MAX: 30
};

// диапазон количества сообщений
const MessageRange = {
  MIN: 1,
  MAX: 2
 };

// Диапазон номера картинки для аватара
const AvatarRange = {
  MIN: 1,
  MAX: 6
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

// Функция получения случайного положительного числа
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Функция получения уникального случайного положительного числа
const getRandomUniqueInt = (min, max) => {
  const unAvailableInt = [];
  return () => {
    let currentInt = getRandomInt(min, max);
    if (unAvailableInt.length >= (max - min + 1)) {
      return null
    }
    while (unAvailableInt.includes(currentInt)) {
      currentInt = getRandomInt(min, max)
    };
    unAvailableInt.push(currentInt);
    return currentInt
  }
};

// Функция выбора случайного элемента массива
const getRandomArrElement = (array) => array[getRandomInt(0, array.length - 1)];

// Функция получения ID фото
const getPhotoId = getRandomUniqueInt(IdPhotoRange.MIN, IdPhotoRange.MAX);

// Функция получения Url фото
const getRandomUrl = getRandomUniqueInt(UrlRange.MIN, UrlRange.MAX);

// Функция получения ID комментария
const getMessageId = getRandomUniqueInt(IdMessageRange.MIN, IdMessageRange.MAX);

// Функция создания комментария
const createComment = () => {
  const messagesQty = [];
  while (messagesQty.length < getRandomInt(MessageRange.MIN, MessageRange.MAX)) {
    messagesQty.push(getRandomArrElement(MESSAGE));
  }
  return {
    id: getMessageId(),
    avatar: `img/avatar-${getRandomInt(AvatarRange.MIN, AvatarRange.MAX)}.svg`,
    message: messagesQty.join(' '),
    name: getRandomArrElement(AUTHOR_NAME)
  };
};

// Функция генерирования объекта
const generateObj = () => {
    const comments = Array.from({length: getRandomInt(CommentsRange.MIN, CommentsRange.MAX)}, createComment);
    return {
      id: getPhotoId(),
      url: `photos/${getRandomUrl()}.jpg`,
      description: getRandomArrElement(DESCRIPTION),
      likes: getRandomInt(LikesRange.MIN, LikesRange.MAX),
      comments
    }
  };

  // Готовый массив сгенерированных объектов
  const completeArr = Array.from({length: OBJECT_QTY}, generateObj);

  // Проверка с выводов в таблицу (удалить перед сдачей)
  console.table(completeArr);
