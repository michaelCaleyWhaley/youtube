const canvas = document.getElementById("game");
const GAME_WIDTH = canvas.offsetWidth;
canvas.width = canvas.offsetWidth;

const characterPos = [0, 150, 100, 100];
const pokeballPos = [GAME_WIDTH, 200, 20, 20];
const JUMP_SPEED = 20;

let charmander;
let charmanderActive = false;

let pokeball;
let background;

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
  if (characterPos[0] > GAME_WIDTH - 200) {
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
  if (pokeballPos[0] < -20) {
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
      ctx.drawImage(background, 0, 0, GAME_WIDTH, 300);
    };
  } else {
    ctx.drawImage(background, 0, 0, GAME_WIDTH, 300);
  }
}

function charmanderFall() {
  let delay = 10;
  const fallInterval = setInterval(() => {
    if (characterPos[1] >= 150) {
      characterPos[1] = 150;
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
  const horFrontCollide = pokeballPos[0] < characterPos[0] + 90;
  const horBackCollide = pokeballPos[0] + 18 > characterPos[0];
  const vertCollide = characterPos[1] + 100 > pokeballPos[1] + 20;

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
  ctx.clearRect(0, 0, GAME_WIDTH, 250);
  renderFrame();

  if (!detectCollision()) {
    window.requestAnimationFrame(game);
  } else {
    renderFrame();
  }
}

function init() {
  game();
  window.addEventListener("keydown", charmanderJump);
  document.addEventListener("click", charmanderJump);
}

init();
