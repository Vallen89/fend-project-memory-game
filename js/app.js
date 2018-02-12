/* a list that holds all cards */
var cardlist = ["diamondOne", "diamondTwo", "planeOne", "planeTwo", "anchorOne", "anchorTwo", "boltOne", "boltTwo", "cubeOne", "cubeTwo", "leafOne", "leafTwo", "bycicleOne", "bycicleTwo", "bombOne", "bombTwo"];
cardlist = shuffle(cardlist);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/* Function to reset the game and start the game with clean slate. "löschen" is german for delete.
for loop to loop through all the cards and randomly assign them.
Adds EventListener to measure the time at every Start of the Game.Clears the setInterval.
sets moves to 0.
sets the star Count back by changing the inner HTML of every li Element.
 */

function löschen() {
    let deckEvent = document.querySelector('.deck');
    deckEvent.addEventListener("click", time);
    let move = document.querySelector('.moves');
    move.innerText = "0";
    document.getElementById("time").innerHTML = "0s";
    clearTimeout(myVar);
    let stars = document.querySelector('.stars');
    stars.children[0].innerHTML = '<i class="fa fa-star"></i>';
    stars.children[1].innerHTML = '<i class="fa fa-star"></i>';
    let allCards = document.querySelectorAll(".card");
    for (y = 0; y < allCards.length; y++) {
        let everyCard = allCards[y];
        let changeCards = cardlist[y];
        everyCard.className = "card";
        everyCard.firstElementChild.remove();
        if (changeCards === "diamondOne" || changeCards === "diamondTwo") {
            everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-diamond"></i>');
        } else if (changeCards === "planeOne" || changeCards === "planeTwo") {
            everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-paper-plane-o"></i>');
        } else if (changeCards === "anchorOne" || changeCards === "anchorTwo") {
            everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-anchor"></i>');
        } else if (changeCards === "boltOne" || changeCards === "boltTwo") {
            everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-bolt"></i>');
        } else if (changeCards === "cubeOne" || changeCards === "cubeTwo") {
            everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-cube"></i>');
        } else if (changeCards === "leafOne" || changeCards === "leafTwo") {
            everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-leaf"></i>');
        } else if (changeCards === "bycicleOne" || changeCards === "bycicleTwo") {
            everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-bicycle"></i>');
        } else if (changeCards === "bombOne" || changeCards === "bombTwo") {
            everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-bomb"></i>');
        } else {};
    }
}
löschen();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var openCardsList = [];
var matchedCards = [];
var flippedCards = [];
var movesUsed = "0";

/*Add EventListener for a Click and starts the showCard Function to open Cards*/
var deckEvent = document.querySelector('.deck');
deckEvent.addEventListener("click", showCard, false);

/*If a card is clicked and not already open, the Card will be flipped. The <i> Element is then pushed into the Arrays openCardsList to check wheter or not it is the same.
The <li> is pushed into the Array flippedCards to flip both cards back or let both cards stay open, if matched or missmatched.
Invokes two next Funtions openCards to check for matches and Starcount.
*/
function showCard(evt) {
    if (evt.target.nodeName === "LI" && evt.target.className !== "card match") {
        evt.target.className = "card open show";
        openCardsList.push(evt.target.firstElementChild.className);
        flippedCards.push(evt.target);
        evt.target.style.cssText = "transform: rotateY(180deg); transition: 0.4s;";
    }
    openCards(evt);
    Starcount();
}

/*Checks if there are 2 cards flipped and if they match. For a match Function cardmatch is triggered.
If there is a missmatch flipback will be triggered with a slight delay.
If a card matches the value match is send to an array to keep count on the overall matches.
The values in the Array openCardsList are deleted after the comparison.
The moves Function counts the moves used to complete the Game
*/

function openCards(evt) {
    if (openCardsList.length === 2 && openCardsList[0] === openCardsList[1]) {
        matchedCards.push("match");
        cardmatch();
        openCardsList.splice(0, 2);
        moves();
    } else if (openCardsList.length === 2 && openCardsList[0] !== openCardsList[1]) {
        setTimeout(flipback, 500);
        openCardsList.splice(0, 2);
        moves();
    };
}

/*flips both missmatched cards back by assigning the class "card" and delets the value in the Array*/

function flipback() {
    flippedCards[0].className = "card";
    flippedCards[1].className = "card";
    flippedCards.splice(0, 2);
}

/*Changes the class of the matched cards and deletes the values in the Array. Triggers the finish game Function with a delay to see if the game is finished.*/

function cardmatch() {
    flippedCards[0].className = "card match";
    flippedCards[1].className = "card match";
    flippedCards.splice(0, 2);
    setTimeout(finishGame, 300);
}

/*Funtion to finish the Game. Checks if there are 8 matched Cards in the Array. Deletes all the Values in the Array at the End. Clears the Time function for a new Start.
Alert to show moves, time and Message. Button to restart the game*/

function finishGame() {
    if (matchedCards.length === 8) {
        swal({
                title: "Congratulations You Won! ",
                text: "With " + movesUsed + " moves and " + Sterne + " Stars! You needed " + timeUsed[0] + " seconds",
                icon: "success",
                button: {
                    text: "restart",
                    value: "start",
                },
            })
            .then(value => {
                if (value) throw löschen();
            })
        clearTimeout(myVar);
        matchedCards.splice(0, 8);
    };
};

/*If the repeat Symbol is clicked the löschen funtion will be triggered*/

var repeat = document.querySelector('.fa-repeat');
repeat.addEventListener("click", löschen);

/*Count the moves. Increases the moves when there is a match or missmatch.*/

function moves() {
    var movecount = document.querySelector('.moves');
    movecount.innerText++;
    movesUsed = movecount.innerText;
}

/*Star Rating Definition. Changes the Class of the ".Stars" after a certain length of the Array "movesUsed" is reached*/

var stars = document.querySelector('.stars');
var Sterne = "3";

function Starcount() {
    if (movesUsed == 13) {
        stars.children[0].innerHTML = '<i class="fa fa-star-o"></i>';
        Sterne = "2";
    } else if (movesUsed == 17) {
        stars.children[1].innerHTML = '<i class="fa fa-star-o"></i>';
        Sterne = "1";
    }
}

/*Timer Funtion Definition. Counts Seconds after the first Click. Deletes the EventListener at the End so the time is not sped up with multiple Time funtions stacking. */

var myVar;
var timeUsed = [];

function time() {
    let seconds = "0";
    myVar = setInterval(function() {
        seconds++;
        document.getElementById("time").innerHTML = seconds + "s";
        timeUsed.splice(0, 1, seconds);
    }, 1000);
    this.removeEventListener("click", time);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
