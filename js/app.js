/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('.deck i');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

const newArray = [];
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    

    for (let i = 0; i <=15; i++) {
        newArray.push(array[i]);
    }
    

    while (currentIndex !== 0) {
        // debugger;
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;

    }

    return newArray;
}

shuffle(cards); 

document.querySelector('.deck').remove();

let testDeck = document.createElement('div');
testDeck.classList.add('deck');
function createNewGrid() {
    
    for (let i = 0; i < 16; i++) {
        const elem = document.createElement('li');
        elem.classList.add('card');
        elem.appendChild(newArray[i]);
        testDeck.appendChild(elem);

    }
    const container = document.querySelector('.container');
    container.appendChild(testDeck);
}

createNewGrid();

const openCards = [];
const deck = document.querySelector('.deck');
const matches = document.getElementsByClassName('open');
const totalOpen = document.getElementsByClassName('match');

deck.addEventListener('click', function (e) {
   
    let card = e.target;
    card.classList.add('show', 'open');

    // const openCards = [];
    openCards.push(card);

    if (openCards.length > 1 && openCards[0].lastChild.className === openCards[1].lastChild.className) {
        
    for(var i=0; i < matches.length; i++) {
        // debugger;
        // matches[i].classList.remove('show', 'open').add('match');
        matches[i].classList.add('match');
    }
    openCards.length=0;
    

        }
    else if (openCards.length > 1 && openCards[0].lastChild.className !== openCards[1].lastChild.className) {
            card.classList.remove('show', 'open');
            openCards.pop();
        }

   
});





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you
 *  call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality 
 * in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call 
 * from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that 
 * you call from this one)
 */


