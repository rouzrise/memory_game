let IconsArray = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
let totalMoves = 0;
const moves = document.querySelector('.moves');
let allMatch = document.getElementsByClassName('match');
let minutes = 0;
let seconds = 0;
let openCards = [];
const timer = document.querySelector('.timer');
const modal = document.querySelector('.modal');
const restartButton = document.querySelector('.restart-button');
let startTime;

//shuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(IconsArray);

//create grid with elements
function createNewGrid() {
    const testDeck = document.createElement('ul');
    const container = document.querySelector('.container');
    const deck = document.querySelector('.deck');

    testDeck.classList.add('deck');

    for (let i = 0; i < 16; i++) {
        const elem = document.createElement('li');
        elem.classList.add('card');
        const iElem = document.createElement('i');
        iElem.classList.add('fa');
        iElem.classList.add(IconsArray[i]);
        elem.appendChild(iElem);
        testDeck.appendChild(elem);
    }
    
    container.appendChild(testDeck);
    testDeck.addEventListener('click', respondToTheClick);
}

createNewGrid();

//creates functionality after click on the card
function respondToTheClick(e) {
    e.preventDefault();

    let card = e.target;

    // if none cards were open or one card was open before
    if (card.nodeName === 'LI' && card.classList.contains('open') === false && openCards.length < 2) {
        totalMoves += 1;
        card.classList.add('show', 'open');
        moves.innerText = `${totalMoves}`;
        openCards.push(card);
    
        //start timer
        if (totalMoves === 1) {
            stopWatch (); 
        }

    }

    //evoke rating count 
    ratingDisplay ();

    //if cards match
    if (openCards.length > 1 && openCards[0].lastChild.className === openCards[1].lastChild.className) {
        match();
    }
    //if cards don't match
    else if (openCards.length > 1 && openCards[0].lastChild.className != openCards[1].lastChild.className) {
        setTimeout(makeRed, 200);
        setTimeout(removeRed, 700);  
    }
 
    function match () {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards.length = 0;
    }

    function makeRed () {
        openCards[0].classList.add('makeRed');
        openCards[1].classList.add('makeRed');
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
    }

    function removeRed () {
        openCards[0].classList.remove('makeRed');
        openCards[1].classList.remove('makeRed');
        openCards.length = 0;
    }

    //display rating - makes 2 golden stars left if total clicks are equal or more then 30 /
    //and 1 golden star left if total clicks are equal or more then 50 (makes other stars white)
    function ratingDisplay () { 
        const starsContainer = document.querySelector('.stars');
        if (totalMoves === 30) {
            starsContainer.children[2].lastChild.className = 'whiteColor fa fa-star white';
        }
        else if (totalMoves === 50) {
            starsContainer.children[1].lastChild.className = 'whiteColor fa fa-star white';
        }
    }

    //after all cards are matched
    if (allMatch.length === 16) {
        //evokes modal window
        modalOpen();
    }

    //describes modal window functionality
    function modalOpen () {
        clearInterval(startTime);

        const rating = document.querySelector('.finalRating');
        const timeSpent = document.querySelector('.timeSpent');

        modal.classList.toggle('closed');

        //checks golden stars left to show their quantity on screen
        let starsQuantity = document.querySelectorAll('.whiteColor');
        rating.innerHTML = '';
        for (let i = 0; i < (3 - starsQuantity.length); i++) {
            rating.innerHTML += '<li><i class="fa fa-star"></i></li>';
        }

        timeSpent.innerText = `${minutes} : ${seconds-1}`;

        //functionality after 'Once more?' button clicked
        restartButton.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.toggle('closed');
            document.querySelector('.deck').remove();
            shuffle(IconsArray);
            createNewGrid();
            totalMoves = 0;
            clearInterval(startTime);
            minutes = 0;
            seconds = 0;
            moves.innerText = '0';
            document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
            timer.innerText = '0 : 0';
        });
    
    }
}

//stopwatch functionality
function stopWatch () {
    startTime = setInterval(function start() {
        timer.innerText = minutes + ' : ' + seconds;  
        seconds++; 
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

const restart = document.querySelector('.restart');

//functionality after 'Restart' button clicked
restart.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.deck').remove();
    shuffle(IconsArray);
    createNewGrid();
    totalMoves = 0;
    clearInterval(startTime);
    moves.innerText = '0';
    document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    timer.innerText = '0 : 0';
    minutes = 0;
    seconds = 0;
});
 

 
     