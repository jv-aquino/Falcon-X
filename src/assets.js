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

const createPowerUp = (type, lifespan) => {
  const powerUp = document.createElement("div");
  powerUp.classList.add("powerUp");

  powerUp.style.left = Math.floor((Math.random() * 60) + 20);
  powerUp.style.bottom = 100;
  powerUp.style.animationDuration = lifespan + "s";

  powerUp.style.backgroundImage = `./img/${type}PowerUp.png`;
}

const createAudio = () => {
  const audio = document.createElement("audio");
  audio.classList.add("audio");
  audio.innerHTML = '<audio autoplay loop><source src="./music.mp3" type="audio/mpeg"></audio>';

  return audio;
}

export {createAsteroid, createRocket, createHeart, createPowerUp, createAudio};