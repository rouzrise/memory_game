const gameConst = { 
    initialArray: ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'],
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    modal: document.querySelector('.modal'),
    restartButton: document.querySelector('.restart-button')
};

let gameLet = {
    iconsArray: gameConst.initialArray.concat(gameConst.initialArray),
    allMatch: document.getElementsByClassName('match'),
    totalMoves: 0,
    minutes: 0,
    seconds: 0,
    openCards: [],
    firstClick: 0
};

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

shuffle(gameLet.iconsArray);

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
        iElem.classList.add('fa', gameLet.iconsArray[i]);
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
    if (card.nodeName === 'LI' && card.classList.contains('open') === false && card.classList.contains('match') === false && gameLet.openCards.length < 2) {
        gameLet.firstClick += 1;
        card.classList.add('show', 'open');
        gameLet.openCards.push(card);
        
        //start timer
        if (gameLet.firstClick === 1) {
            stopWatch (); 
        }

        //evoke rating count 
        ratingDisplay ();

        //if cards match
        if (gameLet.openCards.length > 1 && gameLet.openCards[0].lastChild.className === gameLet.openCards[1].lastChild.className) {
            match();
            gameLet.totalMoves += 1;
            gameConst.moves.innerText = `${gameLet.totalMoves}`;
            
        }
        //if cards don't match
        else if (gameLet.openCards.length > 1 && gameLet.openCards[0].lastChild.className != gameLet.openCards[1].lastChild.className) {
            setTimeout(makeRed, 200);
            setTimeout(removeRed, 700);  
            gameLet.totalMoves += 1;
            gameConst.moves.innerText = `${gameLet.totalMoves}`;
        }
    }
 
    function match () {
        gameLet.openCards[0].classList.add('match');
        gameLet.openCards[1].classList.add('match');
        gameLet.openCards[0].classList.remove('open', 'show');
        gameLet.openCards[1].classList.remove('open', 'show');
        gameLet.openCards.length = 0;
    }

    function makeRed () {
        gameLet.openCards[0].classList.add('makeRed');
        gameLet.openCards[1].classList.add('makeRed');
        gameLet.openCards[0].classList.remove('open', 'show');
        gameLet.openCards[1].classList.remove('open', 'show');
    }

    function removeRed () {
        gameLet.openCards[0].classList.remove('makeRed');
        gameLet.openCards[1].classList.remove('makeRed');
        gameLet.openCards.length = 0;
    }

    //display rating - makes 2 golden stars left if total clicks are equal or more then 30 /
    //and 1 golden star left if total clicks are equal or more then 50 (makes other stars white)
    function ratingDisplay () { 
        const starsContainer = document.querySelector('.stars');
        if (gameLet.totalMoves === 30) {
            starsContainer.children[2].lastChild.className = 'whiteColor fa fa-star white';
        }
        else if (gameLet.totalMoves === 40) {
            starsContainer.children[1].lastChild.className = 'whiteColor fa fa-star white';
        }
    }

    //after all cards are matched
    if (gameLet.allMatch.length === 16) {
        //evokes modal window
        modalOpen();
    }

    //describes modal window functionality
    function modalOpen () {
        clearInterval(startTime);

        const rating = document.querySelector('.finalRating');
        const timeSpent = document.querySelector('.timeSpent');

        gameConst.modal.classList.toggle('closed');

        //checks golden stars left to show their quantity on screen
        let starsQuantity = document.querySelectorAll('.whiteColor');
        rating.innerHTML = '';
        for (let i = 0; i < (3 - starsQuantity.length); i++) {
            rating.innerHTML += '<li><i class="fa fa-star"></i></li>';
        }

        timeSpent.innerText = `${gameLet.minutes} : ${gameLet.seconds-1}`;

        //functionality after 'Once more?' button clicked
        gameConst.restartButton.addEventListener('click', function(e) {
            e.preventDefault();
            gameConst.modal.classList.toggle('closed');
            document.querySelector('.deck').remove();
            shuffle(gameLet.iconsArray);
            createNewGrid();
            gameLet.totalMoves = 0;
            gameLet.firstClick = 0;
            clearInterval(startTime);
            gameLet.minutes = 0;
            gameLet.seconds = 0;
            gameConst.moves.innerText = '0';
            document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
            gameConst.timer.innerText = '0 : 0';
        });
    }
}

//stopwatch functionality
function stopWatch () {
    startTime = setInterval(function start() {
        gameConst.timer.innerText = gameLet.minutes + ' : ' + gameLet.seconds;  
        gameLet.seconds++; 
        if (gameLet.seconds === 60) {
            gameLet.minutes++;
            gameLet.seconds = 0;
        }
    }, 1000);
}

const restart = document.querySelector('.restart');

//functionality after 'Restart' button clicked
restart.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.deck').remove();
    shuffle(gameLet.iconsArray);
    createNewGrid();
    gameLet.totalMoves = 0;
    gameLet.firstClick = 0;
    clearInterval(startTime);
    gameConst.moves.innerText = '0';
    document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    gameConst.timer.innerText = '0 : 0';
    gameLet.minutes = 0;
    gameLet.seconds = 0;
});
 

 
     