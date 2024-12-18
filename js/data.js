import { getRandomInt, getRandomUniqueInt, getRandomArrElement } from './util.js';

const OBJECT_QTY = 25;

const IdPhotoRange = {
  MIN: 1,
  MAX: 25,
};

const IdMessageRange = {
  MIN: 1,
  MAX: 1111,
};

const UrlRange = {
  MIN: 1,
  MAX: 25,
};

const LikesRange = {
  MIN: 15,
  MAX: 200,
};

const CommentsRange = {
  MIN: 0,
  MAX: 30,
};

const MessageRange = {
  MIN: 1,
  MAX: 2,
};

const AvatarRange = {
  MIN: 1,
  MAX: 6,
};

const DESCRIPTION = [
  'Закат на берегу моря',
  'Старинная улочка европейского города',
  'Котенок спит на кровати',
  'Заснеженные склоны Хибин',
  'Букет цветов на столе',
  'Велосипед пристегнутый на велопарковке',
  'Чашка горячего кофе',
  'Осенний парк с опавшей листвой',
  'Маяк на скалистом берегу',
  'Шмель на цветке',
  'Деревенский домик в глухом лесу',
  'Отражение звезд на поверхности Ладоги',
  'Птенцы в гнезде',
  'Радуга над зеленым полем после дождя',
  'Следы на песчаном пляже',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHOR_NAME = [
  'Довакин',
  'Алдуин',
  'Шеппард',
  'Геральт',
  'Супер Марио',
  'Соник',
  'Кратос',
  'Солид Снейк',
  'Клод Страйф',
  'Лара Крофт',
  'Наруто',
  'Элли',
  'Джоель',
  'Сэм Фишер',
];

const getPhotoId = getRandomUniqueInt(IdPhotoRange.MIN, IdPhotoRange.MAX);

const getRandomUrl = getRandomUniqueInt(UrlRange.MIN, UrlRange.MAX);

const getMessageId = getRandomUniqueInt(IdMessageRange.MIN, IdMessageRange.MAX);

const createComment = () => {
  const messagesQty = [];
  while (
    messagesQty.length < getRandomInt(MessageRange.MIN, MessageRange.MAX)
  ) {
    messagesQty.push(getRandomArrElement(MESSAGE));
  }
  return {
    id: getMessageId(),
    avatar: `img/avatar-${getRandomInt(AvatarRange.MIN, AvatarRange.MAX)}.svg`,
    message: messagesQty.join(' '),
    name: getRandomArrElement(AUTHOR_NAME),
  };
};

const generateObj = () => {
  const comments = Array.from({ length: getRandomInt(CommentsRange.MIN, CommentsRange.MAX) }, createComment);
  return {
    id: getPhotoId(),
    url: `photos/${getRandomUrl()}.jpg`,
    description: getRandomArrElement(DESCRIPTION),
    likes: getRandomInt(LikesRange.MIN, LikesRange.MAX),
    comments,
  };
};

const generateArrObj = () => Array.from({ length: OBJECT_QTY }, generateObj);

export { generateArrObj };
