/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player loses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice; // global scope variables

initGame();


// *********** ROLL DICE FUNCTION **************************************************************
document.querySelector('.btn-roll').addEventListener('click', function() { // anonymous function
	if(gamePlaying) {
		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		 // 2. Display result on both dice images
		 document.getElementById('dice-1').style.display = 'block';
		 document.getElementById('dice-2').style.display = 'block';
		 document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		 document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'
		 
		 // 3. Update round score if the rolled number was not 1
		 if(dice1 !== 1 && dice2 !== 1) {
		 	// add score
		 	roundScore += dice1 + dice2;
		 	document.querySelector('#current-' + activePlayer).textContent = roundScore;
		 } else {
		 	// Next Player
			nextPlayer();
		 }

		 /*
		 // 3. Update round score if the rolled number was not 1
		 if(dice === 6 && lastDice === 6) {
		 	scores[activePlayer] = 0; // player loses ENTIRE SCORE

			document.querySelector('#score-' + activePlayer).textContent = '0'; // update the UI
			nextPlayer();

		 }
		 else if(dice !== 1) {
		 	// add score
		 	roundScore += dice;
		 	document.querySelector('#current-' + activePlayer).textContent = roundScore;
		 } else {
		 	// Next Player
			nextPlayer();
		 }

		 lastDice = dice;
		 */
	}

});


// *********** HOLD DICE FUNCTION **************************************************************
document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
		// add Current score to Global score
		scores[activePlayer] += roundScore; 

		// update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.getElementById('final-score').value;
		var winningScore;

		// Undefined, 0, null or "" are coerced to false
		// Anything else is coerced to true
		if (input) {
			winningScore = input;
		} else {
			winningScore = 10;
		}

		// check if player won the game
		if(scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			
			document.getElementById('dice-1').style.display = 'none'; // hide dice again
			document.getElementById('dice-2').style.display = 'none'; // hide dice again

			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});	 


// Next Player's Turn 
function nextPlayer() {
	 	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // change active player	 	
	 	
	 	roundScore = 0; // reset round score

	 	document.getElementById('current-0').textContent = '0'; // reset round score UI
	 	document.getElementById('current-1').textContent = '0'; // reset round score UI

	 	document.querySelector('.player-0-panel').classList.toggle('active'); // toggle class for UI
	 	document.querySelector('.player-1-panel').classList.toggle('active'); // toggle class for UI

	 	document.getElementById('dice-1').style.display = 'none'; // hide dice
	 	document.getElementById('dice-2').style.display = 'none'; // hide dice
};



// *********** NEW GAME FUNCTION **************************************************************
document.querySelector('.btn-new').addEventListener('click', initGame); // when someone clicks this button, please call initGame fn for me 

function initGame() {
	scores = [0,0]; // array for GLOBAL SCORE of both players
	roundScore = 0; // round score 
	activePlayer = 0; // player-1 begins the game

	gamePlaying = true; // state variable

	 // hide the dice, initially
	 document.getElementById('dice-1').style.display = 'none';
	 document.getElementById('dice-2').style.display = 'none';

	// initialise all score to 0 and show on UI
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// change back WINNER text to player name
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';

	// remove active & winner classes
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	
	// add active to player 1 after starting new game
	document.querySelector('.player-0-panel').classList.add('active');
};


