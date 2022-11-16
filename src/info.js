let gameStatus = true;
let lives = 0;

let time = 0;

const asteroids = [];
const powerUps = [];
const Rocket = {
  x: 50,
  y: 45,
  shield: false,
};

const getRocket = (axis) => Rocket[axis];
const setRocket = (axis, value) => (Rocket[axis] = value);

const hasShield = () => Rocket.shield;
const removeShield = () => (Rocket.shield = false);
const addShield = (time) => {
  Rocket.shield = true;
  Dom.addShield(time);
};

const getAsteroids = () => asteroids;

const addAsteroid = (asteroid) => asteroids.push(asteroid);
const removeAsteroid = (delay) => {
  setTimeout(() => {
    Dom.removeElement(asteroids.shift().getUI());
  }, delay);
};

const getPowerUps = () => powerUps;

const addPowerUp = (powerUp) => powerUps.push(powerUp);
const removePowerUp = (delay) => {
  setTimeout(() => {
    Dom.removeElement(powerUps.shift().getUI());
  }, delay);
};

const gameOn = () => gameStatus;

const getTime = () => time;
const addTime = () => time++;

const getLives = () => lives;
const updateLives = (n) => (lives = lives + n);

let record = 0;
try {
  if (localStorage.getItem('record')) {
    record = localStorage.getItem('record');
  }
} catch (e) {}

const getRecord = () => record;
const verifyAndSetRecord = (value) => {
  record = (value > record) ? value : record;
  try {
    localStorage.setItem('record', value);
  } catch (e) {}
}

return {
  getRocket, setRocket,
  hasShield, addShield, removeShield,
  removeAsteroid, addAsteroid, getAsteroids,
  removePowerUp, addPowerUp, getPowerUps,
  getTime, addTime, time,
  getLives, updateLives,
  gameOn, gameStatus,
  getRecord, verifyAndSetRecord,
};
