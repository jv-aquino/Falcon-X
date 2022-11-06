const createAsteroid = (x, y, lifespan) => {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");

  asteroid.style.left = x;
  asteroid.style.bottom = y;
  asteroid.style.animationDuration = lifespan + "s";

  return asteroid;
}

export {createAsteroid};