const { ERROR_CODES } = require('../../settings');

function getAnswer(data, error, errorCode) {
    return {
        success: !!data,
        result: data,
        error: error || '',
        errorCode
    }
}

function ApiAnswer() {
    this.answer = data => getAnswer(data);

    this.error = error =>
        ERROR_CODES[error] ?
            getAnswer(null, ERROR_CODES[error], error) :
            getAnswer(null, ERROR_CODES[9999], 9999);
}

module.exports = ApiAnswer;
