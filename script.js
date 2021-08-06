'use strict';

const isNumber = n => !isNaN(parseInt(n)) && isFinite(n);

function startGame (bool) {
    if (bool) {play();}
}

function play() {
    const hiddenNumber = Math.round(Math.random() * (100 - 1)  + 1);
    let turn = 10;

    function checkAnswer(message, addition = ''){
        let userNumber = prompt(addition + message);
        if (userNumber === null){
            startGame(confirm(`Игра окончена. Хотели бы сыграть ещё?`));
        } else if (!isNumber(userNumber)) {
            checkAnswer(message, 'Введите число!!!\n');
        } else if (hiddenNumber === +userNumber) {
            startGame(confirm(`Поздравляю!!! Вы угадали. Загаданное число ${hiddenNumber}. Хотели бы сыграть ещё?`));
        } else if (turn === 1) {
            startGame(confirm('Попытки закончились. Хотели бы сыграть ещё?'));
        } else if (hiddenNumber < +userNumber) {
            turn--;
            checkAnswer(`Загаданное число меньше чем ${userNumber}. Осталось попыток ${turn}.`);
        } else if (hiddenNumber > +userNumber) {
            turn--;
            checkAnswer(`Загаданное число больше чем ${userNumber}. Осталось попыток ${turn}.`);
        }
    }
    checkAnswer(`Попробуй угадать число. Осталось попыток ${turn}.`);
}

startGame(confirm('Попробуйте угадать число от 1 до 100.'));
