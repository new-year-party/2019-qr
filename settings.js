module.exports = {
    PORT: 8080,
    dbName: 'dbStorage.db',

    ERROR_CODES: {
        100: 'Эта подсказка не для вас!',
        200: 'Вы нашли эту подсказку слишком рано! Сберегите её и ищите другие',
        250: 'Вы уже читали эту подсказку, вспоминайте',
        300: 'Хм.. подсказка для вас куда-то затерялась или вас не существует, пока сложно сказать',
        9999: 'Какая-то... Неизвестная ошибка...',
    },
};