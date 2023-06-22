let level = 0;
const buttonColours = ['red', 'green', 'blue', 'yellow'];
const gamePattern = [];
const userClickedPattern = [];

$('.btn').on('click', (e) => {
  const { id } = e.target;
  simulateClick(id);
  userClickedPattern.push(id);
  if (gamePattern.length < userClickedPattern.length) {
    return gameOver();
  }
  computeUserClick();
});

const playMusic = (key) => {
  switch (key) {
    case 'green':
      const green = new Audio('./sounds/green.mp3');
      green.play();
      break;
    case 'red':
      const red = new Audio('./sounds/red.mp3');
      red.play();
      break;
    case 'yellow':
      const yellow = new Audio('./sounds/yellow.mp3');
      yellow.play();
      break;
    case 'blue':
      const blue = new Audio('./sounds/blue.mp3');
      blue.play();
      break;
    default:
      const wrong = new Audio('./sounds/wrong.mp3');
      wrong.play();
      break;
  }
};

const nextSequence = () => {
  level++;
  $('#level-title').html(`Level ${level}`);
  const random = Math.random() * 4;
  const randomChosenColour = buttonColours[Math.floor(random)];
  gamePattern.push(randomChosenColour);
  simulateClick(randomChosenColour);
};

$(document).on('keydown', (e) => {
  if (gamePattern.length === 0 && userClickedPattern.length === 0) {
    restart();
  }
});

const simulateClick = (id) => {
  $(`#${id}`).toggleClass('pressed');
  playMusic(id);
  setTimeout(() => {
    $(`#${id}`).toggleClass('pressed');
  }, 100);
};

const computeUserClick = () => {
  const checkedIdx = userClickedPattern.length - 1;
  if (userClickedPattern[checkedIdx] !== gamePattern[checkedIdx]) {
    return gameOver();
  }
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => {
      userClickedPattern.length = 0;
      nextSequence();
    }, 500);
  }
};

const gameOver = () => {
  $('body').addClass('game-over');
  setTimeout(() => {
    $('body').removeClass('game-over');
  }, 200);
  $('#level-title').html(`Game Over, Press Any Key to Restart`);
  playMusic('');
  gamePattern.length = 0;
  userClickedPattern.length = 0;
};

const restart = () => {
  level = 0;
  nextSequence();
};
