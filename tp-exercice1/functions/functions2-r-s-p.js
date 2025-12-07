let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();



document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

  document.addEventListener('keydown',(event) => {
  if (event.key === 'r' || event.key === 'R') {
    playGame('rock');
  } else if (event.key === 'p' || event.key === 'P') {
    playGame('paper');
  } else if (event.key === 's' || event.key === 'S') {
    playGame('scissors');
  }});



function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  // calculate result

  if (playerMove === computerMove){
    result = 'Tie';
    score.ties++;
  }
  else if (
  (playerMove === 'rock' && computerMove === 'scissors')||
  (playerMove === 'paper' && computerMove === 'rock')||
  (playerMove === 'scissors' && computerMove === 'paper')
  ){
    result = 'you win';
    score.wins++;
  } else {
    result = 'you lose';
    score.losses++;

  }

  // update the score and store it using localStorage.setItem
  localStorage.setItem('score',JSON.stringify(score));
  // show the new score 
  updateScoreElement()
  // and the updated images using "document.querySelector"

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
  `;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}
 let isAutoPlaying = false;
let intervalId; 

function toggleAutoPlay() {
  const button = document.querySelector('.js-auto');

  if (!isAutoPlaying) {
    button.innerText = 'Stop Auto Play';
    isAutoPlaying = true;

    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

  } else {
    button.innerText = 'Auto Play';
    isAutoPlaying = false;
    clearInterval(intervalId);
  }
}