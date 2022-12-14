const createAsteroid = (x, y, lifespan) => {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");

  asteroid.style.left = x + "%";
  asteroid.style.bottom = y + "%";
  asteroid.style.animationDuration = lifespan + "s";

  return asteroid;
}

const createRocket = (x, y) => {
  const rocket = document.createElement("div");
  rocket.classList.add("rocket");

  rocket.style.left = x + "%";
  rocket.style.bottom = "calc(" + y + "% - 69px)";

  return rocket;
}

const createHeart = () => {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  return heart;
}

const createPowerUp = (type, lifespan, x, y) => {
  const powerUp = document.createElement("div");
  powerUp.classList.add("powerUp", type + "PU");

  powerUp.style.left = x + "%";
  powerUp.style.bottom = y + "%";
  powerUp.style.animationDuration = lifespan + "s";

  powerUp.style.backgroundImage = "url(./img/"+ type + "PowerUp.png)";

  return powerUp;
}

const createAudio = () => {
  const audio = document.createElement("audio");
  audio.classList.add("audio");
  audio.innerHTML = '<audio autoplay loop><source src="./music.mp3" type="audio/mpeg"></audio>';

  return audio;
}

const createGameOver = () => {
  const div = document.createElement("div");
  div.classList.add("gameOver");
  div.innerHTML = '<div><img src="./img/gameOver.png" class="text"></div>';
  div.innerHTML += '<div class="buttonDiv"><button id="start"></button></div>';

  return div;
}

export {createAsteroid, createRocket, createHeart, createPowerUp, createAudio, createGameOver};