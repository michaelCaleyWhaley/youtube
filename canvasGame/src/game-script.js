const canvas = document.getElementById("game");

const GAME_WIDTH = canvas.offsetWidth;
const POKE_BALL_SIZE = 40;
const CHARMANDER_HEIGHT = 150;
const CHARMANDER_WIDTH = 125;
const JUMP_SPEED = 20;

const characterPos = [0, 200, 125, CHARMANDER_HEIGHT];
const pokeballPos = [GAME_WIDTH, 250, POKE_BALL_SIZE, POKE_BALL_SIZE];

let charmander;
let pokeball;
let background;
let charmanderActive = false;
let score = 0;

function drawCharacter() {
  const ctx = canvas.getContext("2d");
  if (!charmander) {
    charmander = new Image();
    charmander.src = "/assets/charmander.png";
    charmander.onload = () => {
      ctx.drawImage(charmander, ...characterPos);
    };
  } else {
    ctx.drawImage(charmander, ...characterPos);
  }
  if (characterPos[0] + 80 > GAME_WIDTH) {
    characterPos[0] = -80;
  } else {
    characterPos[0] += 3;
  }
}

function drawPokeball() {
  const ctx = canvas.getContext("2d");
  if (!pokeball) {
    pokeball = new Image();
    pokeball.src = "/assets/pokeball.png";
    pokeball.onload = () => {
      ctx.drawImage(pokeball, ...pokeballPos);
    };
  } else {
    ctx.drawImage(pokeball, ...pokeballPos);
  }
  if (pokeballPos[0] < -POKE_BALL_SIZE) {
    pokeballPos[0] = GAME_WIDTH;
  } else {
    pokeballPos[0] -= 3;
  }
}

function drawBackground() {
  const ctx = canvas.getContext("2d");
  if (!background) {
    background = new Image();
    background.src = "/assets/background.jpg";
    background.onload = () => {
      ctx.drawImage(background, 0, 0, GAME_WIDTH, 350);
    };
  } else {
    ctx.drawImage(background, 0, 0, GAME_WIDTH, 350);
  }
}

function charmanderFall() {
  let delay = 10;
  const fallInterval = setInterval(() => {
    if (characterPos[1] >= 200) {
      characterPos[1] = 200;
      delay = 5;
      clearInterval(fallInterval);
      charmanderActive = false;
    } else if (delay === 0) {
      characterPos[1] += 10;
    } else {
      delay -= 1;
    }
  }, JUMP_SPEED);
}

function charmanderJump(e) {
  if (e.code?.toLowerCase() !== "space" && e.type !== "click") return;
  e.preventDefault();
  if (charmanderActive) return;
  charmanderActive = true;
  const jumpInterval = setInterval(() => {
    if (characterPos[1] <= 50) {
      clearInterval(jumpInterval);
      charmanderFall();
    } else {
      characterPos[1] -= 10;
    }
  }, JUMP_SPEED);
}

function detectCollision() {
  const horFrontCollide = pokeballPos[0] < characterPos[0] + CHARMANDER_WIDTH;
  const horBackCollide =
    pokeballPos[0] + (POKE_BALL_SIZE - 2) > characterPos[0];
  const vertCollide =
    characterPos[1] + CHARMANDER_HEIGHT > pokeballPos[1] + POKE_BALL_SIZE;

  if (horFrontCollide && horBackCollide) {
    score += 1;
  }

  return horFrontCollide && horBackCollide && vertCollide;
}

function drawScore() {
  const ctx = canvas.getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText(score, 10, 50);
}

function renderFrame() {
  drawBackground();
  drawCharacter();
  drawPokeball();
  drawScore();
}

function game() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, GAME_WIDTH, 350);
  renderFrame();

  if (!detectCollision()) {
    window.requestAnimationFrame(game);
  } else {
    renderFrame();
  }
}

function init() {
  canvas.width = canvas.offsetWidth;
  game();
  window.addEventListener("keydown", charmanderJump);
  document.addEventListener("click", charmanderJump);
}

init();
