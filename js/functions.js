const checkStringLength = (str, length) => str.length <= length;
console.log('Проверка длины строки');
console.log(checkStringLength('проверяемая строка', 20));
console.log(checkStringLength('проверяемая строка', 18));
console.log(checkStringLength('проверяемая строка', 10));
console.log(checkStringLength('проверяемая строка', 5));
console.log(checkStringLength('проверяемая строка', 0));

function checkPalindrome(str) {
  let normalizeStr = str.replaceAll(' ', '').toLowerCase();
  let emptyStr = '';
  for (let i = normalizeStr.length - 1; i >= 0; i--) {
    emptyStr += normalizeStr[i];
  }
  return normalizeStr === emptyStr;
}

console.log('\n--- Тесты для palindromeChecker ---');
console.log(
  `Строка является палиндромом: ${checkPalindrome('топот') === true}`
);
console.log(
  `Строка является палиндромом с разным регистром: ${
    checkPalindrome('ДовОд') === true
  }`
);
console.log(
  `Строка не является палиндромом: ${checkPalindrome('Кекс') === false}`
);
console.log(
  `Строка является палиндромом: ${
    checkPalindrome('Лёша на полке клопа нашёл ') === true
  }`
);

function extractNumber (str) {
  str = String(str);
  let extractedStr = '';
  for (let i = 0; i <= str.length - 1; i++) {
    let symbol = parseInt(str[i]);
    if (!Number.isNaN(symbol)) {
      extractedStr += symbol;
    }
  }
  return Number(extractedStr) || NaN;
}

console.log('\n--- Тесты для extractNumber---');
console.log(
  `Аргумент начинается с числа: ${extractNumber('2023 год') === 2023}`
);
console.log(
  `Аргумент заканчивается на число: ${
    extractNumber('ECMAScript 2022') === 2022
  }`
);
console.log(
  `Аргумент содержит несколько чисел, в том числе и с плавающей точкой: ${
    extractNumber('1 кефир, 0.5 батона') === 105
  }`
);
console.log(
  `Аргумент заканчивается на число с нолями: ${
    extractNumber('агент 007') === 7
  }`
);
console.log(`Аргумент строка без чисел: ${isNaN(extractNumber('а я томат'))}`);
console.log(`Аргумент число: ${extractNumber(2023) === 2023}`);
console.log(`Аргумент отрицательное число: ${extractNumber(-1) === 1}`);
console.log(`Аргумент число с плавающей точкой: ${extractNumber(1.5) === 15}`);
