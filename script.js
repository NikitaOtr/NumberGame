'use strict';

const isInt = n => Number.isInteger(parseInt(n)) && isFinite(n);

function getUserNumber(massage, addition = '') {
    const userNumber = prompt(addition + massage);
    if (userNumber === null) {return null;}
    if (isInt(userNumber)) {return +userNumber;}
    return getUserNumber(massage, 'Введиет целое число!!!\n');
}

function startBot (bool) {
    if (bool) {numberBot();}
}

function numberBot() {
    const hiddenNumber = Math.round(Math.random() * (100 - 1)  + 1);
    let turn = 10;

    function checkAnswer(message){
        let userNumber = getUserNumber(message);
        if (userNumber === null){
            return startBot(confirm(`Игра окончена. Хотели бы сыграть ещё?`));
        } else if (hiddenNumber === userNumber) {
            return startBot(confirm(`Поздравляю!!! Вы угадали. Загаданное число ${hiddenNumber}. Хотели бы сыграть ещё?`));
        } else if (turn === 1) {
            return startBot(confirm('Попытки закончились. Хотели бы сыграть ещё?'));
        } else if (hiddenNumber < userNumber) {
            turn--;
            return checkAnswer(`Загаданное число меньше чем ${userNumber}. Осталось попыток ${turn}.`);
        } else if (hiddenNumber > +userNumber) {
            turn--;
            return checkAnswer(`Загаданное число больше чем ${userNumber}. Осталось попыток ${turn}.`);
        }
    }
    return checkAnswer(`Попробуй угадать число. Осталось попыток ${turn}.`);
}

startBot(confirm('Попробуйте угадать число от 1 до 100.'));
