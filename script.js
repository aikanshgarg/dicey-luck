/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying; // global scope variables

initGame();


// *********** ROLL DICE FUNCTION **************************************************************
document.querySelector('.btn-roll').addEventListener('click', function() { // anonymous function
	if(gamePlaying) {
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;

		 // 2. Display result on dice image
		 var diceDOM = document.querySelector('.dice');
		 diceDOM.style.display = 'block';
		 diceDOM.src = 'dice-' + dice + '.png';

		 // 3. Update round score if the rolled number was not 1
		 if(dice !== 1) {
		 	// add score
		 	roundScore += dice;
		 	document.querySelector('#current-' + activePlayer).textContent = roundScore;
		 } else {
		 	// Next Player
			nextPlayer();
		 }
	}

});



// *********** HOLD DICE FUNCTION **************************************************************
document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
		// add Current score to Global score
		scores[activePlayer] += roundScore; 

		// update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// check if player won the game
		if(scores[activePlayer] >= 10) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none'; // hide dice again
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

	 	document.querySelector('.dice').style.display = 'none'; // hide dice again
};



// *********** NEW GAME FUNCTION **************************************************************
document.querySelector('.btn-new').addEventListener('click', initGame); // when someone clicks this button, please call initGame fn for me 

function initGame() {
	scores = [0,0]; // array for GLOBAL SCORE of both players
	roundScore = 0; // round score 
	activePlayer = 0; // player-1 begins the game

	gamePlaying = true; // state variable

	document.querySelector('.dice').style.display = 'none'; // hide the dice, initially

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


