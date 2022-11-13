const createAsteroid = (x, y, lifespan) => {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");

  asteroid.style.left = x;
  asteroid.style.bottom = y;
  asteroid.style.animationDuration = lifespan + "s";

  return asteroid;
}

const createRocket = () => {
  const rocket = document.createElement("div");
  rocket.classList.add("rocket");

  asteroid.style.left = 50;
  asteroid.style.bottom = 50;

  return rocket;
}

const createHeart = () => {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  return heart;
}

export {createAsteroid, createRocket, createHeart};