let cards = document.querySelectorAll('.deck i');
let newArray = [];
let openCards = [];
let minutes = 0;
let seconds = 0;

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    for (let i = 0; i <=15; i++) {
        newArray.push(array[i]);
    }

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }

    return newArray;
}

shuffle(cards); 

function createNewGrid() {
    let testDeck = document.createElement('div');
    let container = document.querySelector('.container');

    document.querySelector('.deck').remove();
    testDeck.classList.add('deck');
    
    for (let i = 0; i < 16; i++) {
        const elem = document.createElement('li');
        elem.classList.add('card');
        elem.appendChild(newArray[i]);
        testDeck.appendChild(elem);
    }

    container.appendChild(testDeck);
}

createNewGrid();

const deck = document.querySelector('.deck');
const matches = document.getElementsByClassName('open');
const totalOpen = document.getElementsByClassName('match');
let totalMoves = 0;
const moves = document.querySelector('.moves');

deck.addEventListener('click', function (e) {
   e.preventDefault();
    let card = e.target;

    if (card.nodeName === 'LI' && card.classList.contains('open') === false) {
    card.classList.add('show', 'open');
    totalMoves += 1;
    moves.innerText = `${totalMoves}`;
    openCards.push(card);
    }

    if (totalMoves === 1) {
        
        stopWatch (); 
    }
    
    function openingCards() {
        if (openCards.length > 1 && openCards[0].lastChild.className === openCards[1].lastChild.className) {
    
            for(let i=0; i < matches.length; i++) {
                if (matches[i] === openCards[0] || matches[i] === openCards[1]) {
                matches[i].classList.add('match');
                }
            }
    
            openCards.length=0;

        }
    
        else if (openCards.length > 1 && openCards[0].lastChild.className !== openCards[1].lastChild.className) {
   
        function removing () {
        card.classList.remove('show', 'open');
        }

        setTimeout(removing, 500);
        openCards.pop();
        }
    }

    openingCards();

    function modalWindow() {
    const rating = document.querySelector('.finalRating');
    const timeSpent = document.querySelector('.timeSpent');
    

    if (totalOpen.length === 16) {
        clearInterval(startTime);

        const modal = document.querySelector('#modal');
        const restartButton = document.querySelector('#restart-button');

        modal.classList.toggle('closed');
        rating.innerHTML = document.querySelector('.stars').innerHTML;
        timeSpent.innerText = `${minutes} : ${seconds-1}`;

        restartButton.addEventListener('click', function(e) {
            e.preventDefault();
            newArray = [];
            shuffle(cards);
            createNewGrid();
            clearInterval(startTime);
            totalMoves = 0;
            moves.innerText = '0';
            modal.classList.toggle('closed');
            document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
            time.innerText = '0 : 0';
            // restart();
            });
        }
    }

    modalWindow()   

///Rating 

    function ratingDisplay () { 
        const starsContainer = document.querySelector('.stars');
        const stars = document.querySelector('.stars li');

        if (totalMoves === 30) {
            starsContainer.removeChild(stars);
        }

        else if (totalMoves === 50) {
            starsContainer.removeChild(stars);
        }
    }

    ratingDisplay ()

///StopWatch functionality
    

    function stopWatch () {
        startTime = setInterval(function start() {
            time.innerText = minutes + ' : ' + seconds;
            seconds++;
            if (seconds == 60) {
                minutes++;
                seconds = 0;
            }
        }, 1000);
    }
});

const restart = document.querySelector('.restart');
restart.addEventListener('click', function (e) {
    e.preventDefault();
    cards = document.querySelectorAll('.deck i');
    newArray = [];
    openCards = [];
    shuffle(cards);
    createNewGrid();
    totalMoves = 0;
    clearInterval(startTime);
    moves.innerText = '0';
    document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    time.innerText = '0 : 0';
    
});