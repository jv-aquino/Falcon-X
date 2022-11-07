import * as Asset from "./assets.js";

const Asteroid = (lifespan, index) => {
  let x = Math.floor((Math.random() * 60) + 20);
  let y = 100;

  let ui = Asset.createAsteroid(x, y, lifespan);

  const getLocation = (axis) => {
    return (axis == 'x') ? ui.left : ui.bottom;
  };

  const getIndex = () => index;
  const getUI = () => ui;

  const createUI = () => {
    Dom.appendElement(ui);
  };
  createUI();

  return {getLocation, getIndex, getUI};
}

const Info = (() =>  {
  let gameStatus = true;

  let time = 0;

  const asteroids = [];
  const Rocket = {
    x: 50,
    y: 50
  };
  
  const getRocket = (axis) => Rocket[axis];
  const setRocket = (axis, value) => Rocket[axis] = value;

  const getAsteroids = () => asteroids;

  const addAsteroid = (asteroid) => asteroids.push(asteroid);
  const removeAsteroid = (index, delay) => {
    setTimeout(() => {
      Dom.removeElement(asteroids[index].getUI());
      asteroids.splice(index, 1);
    }, delay - 50);
  };

  const gameOn = () => gameStatus;

  const getTime = () => time;
  const addTime = () => time++;

  return {
    getRocket, setRocket, 
    removeAsteroid, addAsteroid, getAsteroids,
    getTime, addTime, 
    gameOn
  };
})();

const Controller = (() => {
  const checkMove = (key) => {
    if (!Info.gameOn()) {return}
    if (key == "ArrowLeft" || key == "a") {
      if (Info.getRocket("x") == 20) {return}
      Info.setRocket("x", Info.getRocket("x") - 5);
    }
    else if (key == "ArrowRight" || key == "d") {
      if (Info.getRocket("x") == 80) {return}
      Info.setRocket("x", Info.getRocket("x") + 5);
    }

    else if (key == "ArrowUp" || key == "w") {
      if (Info.getRocket("y") == 70) {return}
      Info.setRocket("y", Info.getRocket("y") + 5);
    }
    else if (key == "ArrowDown" || key == "s") {
      if (Info.getRocket("y") == 20) {return}
      Info.setRocket("y", Info.getRocket("y") - 5);
    }
    Dom.moveRocket();
  };
  
  const checkCrash = () => {
    Info.getAsteroids().forEach(asteroid => {
      
    });
  }

  const startTimer = () => {
    setInterval(() => {
      Info.addTime();
      Dom.updateScore();
    }, 1000);
  }

  const createAsteroid = () => {
    let lifespan = 2;
    let index = Info.getAsteroids().length;
    Info.addAsteroid(Asteroid(lifespan));
    Info.removeAsteroid(index, lifespan * 1000)
  }

  return {checkMove, checkCrash, createAsteroid, startTimer};
})()

const Dom = (() => {
  const main = document.querySelector("#container");
  const score = document.querySelector("#score");
  const rocket = document.querySelector(".rocket");

  const appendElement = (element) => {
    main.appendChild(element);
  };

  const removeElement = (element) => {
    main.removeChild(element);
  }

  const updateScore = () => {
    score.textContent = Info.getTime() * 10;
  }

  const moveRocket = () => {
    rocket.style.left = Info.getRocket("x") + "%";
    rocket.style.bottom = Info.getRocket("y") + "%";
  }
  
  window.addEventListener("keyup", (e) => {Controller.checkMove(e.key)});

  return {moveRocket, appendElement, removeElement, updateScore};
})();

const Settings = (() => {
  Controller.startTimer();
})();