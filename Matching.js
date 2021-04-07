// 카드 짝맞추기 게임

let garo = 4;
let sero = 3;
let colors = [
    '#FDAFAB', '#FDAFAB', '#FFA755', '#FFA755', 
    '#F4D94E', '#F4D94E', '#99D45D', '#99D45D', 
    '#DCCBED', '#DCCBED', '#B8DAE3', '#B8DAE3'];
//let colorHubo = [];
let color = [];
let clickFlag = true;
let clickCard = [];
let matchCard = [];
let startTime;
let comment = document.querySelector('.comment');
let finishTime = document.querySelector('.finishTime');

//카드 섞기
function shuffle() {
    for (let i = 0; 0 < colors.length; i += 1) {
        color = color.concat(colors.splice(Math.floor(Math.random() * colors.length), 1));        
    }
}

//카드 세팅하기
function cardSetting(garo, sero) {
    clickFlag = false;
    let wrap = document.querySelector('#card_wrap');
    for (let i = 0; i < garo * sero; i += 1) {
        let card = document.createElement('div');
        card.className = 'card';
        let cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        let cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        let cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        (function (c) { //클로저 문제 해결
            card.addEventListener('click', function () {
                if (clickFlag && !matchCard.includes(c)) {
                    c.classList.toggle('flipped');
                    clickCard.push(c);
                    if(clickCard.length === 2 ){
                        if (clickCard[0].querySelector('.card-back').style.backgroundColor === clickCard[1].querySelector('.card-back').style.backgroundColor) {
                            matchCard.push(clickCard[0]);
                            matchCard.push(clickCard[1]);
                            clickCard = [];
                            if (matchCard.length === garo * sero) {
                                let endTime = new Date();
                                let result = (endTime - startTime) / 1000
                                comment.textContent = '축하합니다! 성공!';
                                finishTime.textContent =`${result}초 걸렸습니다.`
                                document.querySelector('#card_wrap').innerHTML = '';
                                colors = [
                                    '#FDAFAB', '#FDAFAB', '#FFA755', '#FFA755', 
                                    '#F4D94E', '#F4D94E', '#99D45D', '#99D45D', 
                                    '#DCCBED', '#DCCBED', '#B8DAE3', '#B8DAE3'];
                                color = [];
                                matchCard = [];
                                startTime = null;
                                shuffle();
                                cardSetting(garo, sero);
                            }
                        } else {
                            clickFlag = false;
                            setTimeout(function () {
                                clickCard[0].classList.remove('flipped');
                                clickCard[1].classList.remove('flipped');
                                clickFlag = true;
                                clickCard = [];
                            }, 1000);
                        }
                    }
                }
            });
        })(card);
        wrap.appendChild(card);
    }
    
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function() {
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });

    setTimeout(function() { //카드 감추기
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('flipped');
        });
        clickFlag = true;
        startTime = new Date();
    }, 5000);
}

shuffle();
cardSetting(garo, sero);