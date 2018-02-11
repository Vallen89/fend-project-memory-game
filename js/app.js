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
 */

 function löschen() {
 let allCards = document.querySelectorAll(".card");
       for (y = 0; y < allCards.length; y++) {
         let everyCard = allCards[y];
          let changeCards = cardlist[y];
          everyCard.className = "card";
 everyCard.firstElementChild.remove();
  if (changeCards === "diamondOne" || changeCards === "diamondTwo") {
    everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-diamond"></i>');
  }
  else if (changeCards === "planeOne" || changeCards === "planeTwo") {
    everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-paper-plane-o"></i>');
  }
  else if (changeCards === "anchorOne" || changeCards === "anchorTwo"){
    everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-anchor"></i>');
  }
  else if (changeCards === "boltOne" || changeCards === "boltTwo"){
    everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-bolt"></i>');
  }
  else if (changeCards === "cubeOne" || changeCards === "cubeTwo"){
    everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-cube"></i>');
  }
  else if (changeCards === "leafOne" || changeCards === "leafTwo"){
    everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-leaf"></i>');
  }
  else if (changeCards === "bycicleOne" || changeCards === "bycicleTwo"){
    everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-bicycle"></i>');
  }
  else if (changeCards === "bombOne" || changeCards === "bombTwo") {
    everyCard.insertAdjacentHTML('afterBegin', '<i class="fa fa-bomb"></i>');
  }
  else {};
 }
 }
 löschen();




// Shuffle function from http://stackoverflow.com/a/2450976
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

var openCardsList = [];
var matchedCards = [];
var flippedCards = [];


var deckEvent = document.querySelector('.deck');
deckEvent.addEventListener("click", showCard, false);

function showCard(evt) {
  if (evt.target && evt.target.nodeName === "LI" && evt.target.className !== "card match")
  {evt.target.className = "card open show";
  evt.target.style.cssText = "transform: rotateY(180deg); transition: 0.4s;";
}
  openCards(evt);
}

function openCards(evt) {
  if (openCardsList.length === 2 && openCardsList[0] === openCardsList[1]) {
matchedCards.push("match");
openCardsList.splice(0,2);
  }
  else if (openCardsList.length === 2 && openCardsList[0] !== openCardsList[1]) {
setTimeout(flipback,500);
openCardsList.splice(0,2);
    };
}

function flipback() {
    flippedCards[0].className = "card";
    flippedCards[1].className = "card";
    flippedCards.splice(0,2);
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
