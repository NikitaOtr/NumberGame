'use strict';

const isNumber = n => !isNaN(parseInt(n)) && isFinite(n);

function play() {
    const hiddenNumber = Math.round(Math.random() * (100 - 1)  + 1);
    console.log(hiddenNumber);

    function checkAnswer(message, addition = ''){
        let userNumber = prompt(addition + message);
        if (userNumber === null){
            alert('Игра окончена');
        } else if (!isNumber(userNumber)) {
            checkAnswer(message, 'Введите число!!! \n');
        } else if (hiddenNumber < +userNumber) {
            checkAnswer(`Загаданное число меньше чем ${userNumber}.`);
        } else if (hiddenNumber > +userNumber) {
            checkAnswer(`Загаданное число больше чем ${userNumber}.`);
        } else {
            alert('Поздравляю!!! Вы угадали.');
        }
    }
    checkAnswer(`Попробуй угадать с первого раза.`);
}

let begin = confirm('Угадайте число от 1 до 100');
if (begin) {
    play();
}
