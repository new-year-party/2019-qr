function getAnswer(data, error) {
    return {
        success: !!data,
        result: data,
        error: error || '',
    }
}

function ApiAnswer() {
    const ERROR_CODES = {
        100: 'Эта подсказка не для вас!',
        200: 'Вы нашли эту подсказку слишком рано! Сберегите её и ищите другие',
        300: 'Хм.. подсказка для вас куда-то затерялась или вас не существует, пока сложно сказать',
        9999: 'Какая-то... Неизвестная ошибка...',
    };

    this.answer = data => getAnswer(data);

    this.error = error =>
        ERROR_CODES[error] ?
            getAnswer(null, ERROR_CODES[error]) :
            getAnswer(null, ERROR_CODES[9999])
}

module.exports = ApiAnswer;
