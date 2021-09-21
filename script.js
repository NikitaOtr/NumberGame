'use strict';

function isInt(n) {
    return Number.isInteger(parseFloat(n)) && Number.isFinite(+n);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)  + min);
}

function getUserNumber(massage) {
    let userNumber = prompt(massage);
    while (!isInt(userNumber)) {
        console.log(userNumber);
        if (userNumber === null) { return null; }
        userNumber = prompt(massage + '\nВведите целое число.');
    }
    return +userNumber;
}

function startBot(message) {
    const agreeToPlay = confirm(message);
    if (agreeToPlay) {
        const min = getUserNumber('Введите минимальное значение.');
        if (min === null) { return startBot('Игра окончена.\nХотели бы сыграть ещё?'); }

        let max = getUserNumber(`Минимальное значение: ${min}.\nВведите максимальное значение.`);
        while (max === null || max <= min) {
            if (max === null) { return startBot('Игра окончена.\nХотели бы сыграть ещё?'); }
            max = getUserNumber(`Минимальное значение: ${min}.\nВведите максимальное значение.\n` +
                                `Максимальное значение должно быть больше чем ${min}.`);
        }
        numberBot(min, max);
    }
}

function numberBot(min = 1, max = 100, attemps = 10) {
    const hiddenNumber = getRandomInt(min, max);
    let nowAttemp = 0;

    function checkAnswer() {
        let userNumber = getUserNumber(`Вам нужно угадать число на интервале [${min}; ${max}].\n`);
        nowAttemp++;
        while (userNumber !== hiddenNumber  && userNumber !== null && attemps !== nowAttemp) {
            if (hiddenNumber < userNumber) {
                if (userNumber < max) { max = userNumber - 1; }
                userNumber = getUserNumber(`Вам нужно угадать число на интервале [${min}; ${max}].\n` +
                                           `Осталось попыток ${attemps - nowAttemp}.`);
            } else if (hiddenNumber > userNumber) {
                if (userNumber > min) { min = userNumber + 1; }
                userNumber = getUserNumber(`Вам нужно угадать число на интервале [${min}; ${max}].\n` +
                                           `Осталось попыток ${attemps - nowAttemp}.`);
            }
            nowAttemp++;
        }
        if (userNumber === null) {
            startBot('Игра окончена.\nХотели бы сыграть ещё?');
        } else if (userNumber === hiddenNumber) {
            startBot(`Поздравляю!!!\nВы угадали. Загаданное число ${hiddenNumber}.\nХотели бы сыграть ещё?`);
        } else {
            startBot(`Попытки закончились. Было загадано ${hiddenNumber}.\nХотели бы сыграть ещё?`);
        }
    }
    return checkAnswer();
}

document.getElementById('start').addEventListener('click', () => startBot('Попробуйте угадать число.'));
