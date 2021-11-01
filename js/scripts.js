const dino = document.querySelector('.dino');
const background = document.querySelector('.game-background');
let isJumping = false;
let dinoJumpPosition = 0;

const dinoJump = () => {
  if (isJumping) return;

  isJumping = true;

  let upInterval = setInterval(() => {
    if (dinoJumpPosition >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (dinoJumpPosition <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          dinoJumpPosition -= 20;
          dino.style.bottom = dinoJumpPosition + 'px';
        }
      }, 20)
    } else {
      dinoJumpPosition += 20;
      dino.style.bottom = dinoJumpPosition + 'px';
    }
  }, 20);
}

const createCactus = () => {
  const cactus = document.createElement("article");
  let cactusPosition = 950;
  let randomTime = Math.random() * 6000; 

  cactus.classList.add('cactus');
  cactus.style.left = 950 + 'px';
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && dinoJumpPosition < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = `
        <h1 class="game-over">Fim de jogo</h1>
        <button class="play-again" onClick="playAgain()">Jogar novamente</button>
      `
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }

  }, 20);

  setTimeout(createCactus, randomTime);
}

const playAgain = () => {
  location.reload();
}

createCactus();
document.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode
  const mustJump = keyCode === 38 || keyCode === 87 || keyCode === 32

  if (mustJump) {
    dinoJump()
  }
}); 