/************************************ 

# changing DOM content
document.querySelector('#current-' + activePlayer).textContent = dice; // textContent doesn't interpret HTML code
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';

# callback function:
function btn() {}
document.querySelector('.btn-roll').addEventListener('click', btn); // btn is a callback fn here as it is passed an an argument in another fn and called by it 



***********************************/