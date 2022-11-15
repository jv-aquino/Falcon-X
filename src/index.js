import * as Asset from "./assets.js";

const Object = (type, lifespan) => {
  let x = Math.floor((Math.random() * 60) + 20);
  let y = 100;
  let ui;

  if (type == "asteroid") {
    ui = Asset.createAsteroid(x, y, lifespan);
  }
  else if (type == "powerUp") {
    ui = Asset.createPowerUp(x, y, lifespan);
  }

  const getLocation = (axis) => {
    return (axis == 'x') ? ui.left : ui.bottom;
  };

  const getUI = () => ui;

  const createUI = () => {
    Dom.appendElement(ui);
  };
  createUI();

  return {getLocation, getUI};
}

const Info = (() =>  {
  let gameStatus = true;
  let lives = 0;

  let time = 0;

  const asteroids = [];
  const powerUps = [];
  const Rocket = {
    x: 50,
    y: 45,
    shield: false
  };
  
  const getRocket = (axis) => Rocket[axis];
  const setRocket = (axis, value) => Rocket[axis] = value;

  const hasShield = () => Rocket.shield;
  const removeShield = () => Rocket.shield = false;
  const addShield = (time) => {
    Rocket.shield = true;
    Dom.addShield(time);
  }

  const getAsteroids = () => asteroids;

  const addAsteroid = (asteroid) => asteroids.push(asteroid);
  const removeAsteroid = (delay) => {
    setTimeout(() => {
      Dom.removeElement(asteroids.shift().getUI());
    }, delay);
  };

  const getPowerUps = () => powerUps;

  const addPowerUp = (powerUp) => powerUps.push(powerUp);
  const removePowerUp = (index, delay) => {
    setTimeout(() => {
      Dom.removeElement(powerUps[index].getUI());
      powerUps.splice(index, 1);
    }, delay);
  }

  const gameOn = () => gameStatus;

  const getTime = () => time;
  const addTime = () => time++;

  const getLives = () => lives;
  const updateLives = (n) => lives = lives + n;

  return {
    getRocket, setRocket, 
    hasShield, addShield, removeShield,
    removeAsteroid, addAsteroid, getAsteroids,
    removePowerUp, addPowerUp, getPowerUps,
    getTime, addTime, time,
    getLives, updateLives,
    gameOn, gameStatus
  };
})();

const Controller = (() => {
  let timerInterval;
  let crashInterval;
  let asteroidInterval;
  
  const startTimer = () => {
    timerInterval = setInterval(() => {
      Info.addTime();
      Dom.updateScore();
    }, 1000);
  }

  const stopGame = () => {
    Info.time = 0;
    clearInterval(timerInterval);

    Info.setRocket("x", 50);
    Info.setRocket("y", 45);

    clearInterval(crashInterval);
    clearTimeout(asteroidInterval);

    Dom.stop();
    Info.gameStatus = false;
  }

  const startGame = () => {
    startTimer();
    changeLives(3);
    createRocket();
    Dom.startRocket();
    Dom.start();
    
    let asteroids = () => {
      if (Info.gameOn() == false) {return}

      createObject("asteroid");
      asteroidInterval = setTimeout(asteroids, 2000 - Math.min(Info.getTime() * 50, 1550))
    }
    asteroids();

    crashInterval = setInterval(() => {
      checkCrash();
    }, 70);
  }


  const changeLives = (n) => {
    Info.updateLives(n);
    Dom.updateHearts();
  }

  const checkMove = (key) => {
    if (!Info.gameOn()) {return}
    if (key == "ArrowLeft" || key == "a") {
      if (Info.getRocket("x") <= 15) {return}
      Info.setRocket("x", Info.getRocket("x") - 7);
    }
    else if (key == "ArrowRight" || key == "d") {
      if (Info.getRocket("x") >= 85) {return}
      Info.setRocket("x", Info.getRocket("x") + 7);
    }

    else if (key == "ArrowUp" || key == "w") {
      if (Info.getRocket("y") >= 80) {return}
      Info.setRocket("y", Info.getRocket("y") + 7);
    }
    else if (key == "ArrowDown" || key == "s") {
      if (Info.getRocket("y") <= 20) {return}
      Info.setRocket("y", Info.getRocket("y") - 7);
    }
    Dom.moveRocket();
  };
  
  const checkCrash = () => {
    if (Info.hasShield()) {return}
    let a = Dom.getActualRocket();
    let ax = a.left;
    let ay = a.top;

    Info.getAsteroids().forEach(asteroid => {
      let b = asteroid.getUI().getBoundingClientRect()
      let bx = b.left;
      let by = b.top;

      if (!(((ay + a.height) < (by)) ||
        (ay > (by + b.height)) ||
        ((ax + a.width) < bx) ||
        (ax > (bx + b.width)))) {
          changeLives(-1);
          if (Info.getLives() == 0) {
            stopGame();
            return
          }
          Info.addShield(4);
      }
    });
  }

  const createObject = (type) => {
    let lifespan = 3 - Math.log10(Math.abs(Info.getTime() * 0.75 - 6));
    if (type == "asteroid") {
      Info.addAsteroid(Object(type, lifespan));
      Info.removeAsteroid(lifespan * 1000);
    }
    else if (type == 'powerUp') {
      Info.addPowerUp(Object(type, lifespan));
      Info.removePowerUp(lifespan * 1000);
    }
  }

  const createRocket = () => {
    Dom.appendElement(Asset.createRocket(50, 45));
  }

  return {checkMove, checkCrash, 
    createObject, createRocket,
    changeLives,
    startGame, stopGame};
})()

const Dom = (() => {
  const main = document.querySelector("#container");
  const scoreDiv = document.querySelector(".score");
  const score = document.querySelector("#score");
  const hearts = document.querySelector(".hearts");
  let rocket;

  const startRocket = () => {
    rocket = document.querySelector(".rocket");
  }

  const getActualRocket = () => rocket.getBoundingClientRect();

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
    rocket.style.bottom = "calc(" + Info.getRocket("y") + "% - 69px)";
  }

  const updateHearts = () => {
    let newHearts = Info.getLives();
    let actualHearts = hearts.childElementCount;
    let difference = newHearts - actualHearts;

    if (difference < 0) {
      if (actualHearts == 0) {return}

      while (difference != 0) {
        hearts.removeChild(hearts.lastChild);
        difference++;
      }
    }
    else {
      while (difference != 0) {
        hearts.appendChild(Asset.createHeart());
        difference--;
      }
    }
  }

  const addShield = (time) => {
    rocket.classList.add("shield");
    rocket.style.animationDuration = time + "s";

    setTimeout(() => {
      rocket.classList.remove("shield");
      Info.removeShield();
    }, time * 1000)
  }
  
  const start = () => {
    main.style.animation = "moveSky 14s linear infinite";
    main.removeChild(document.querySelector(".start"));
    window.addEventListener("keyup", (e) => {Controller.checkMove(e.key)});
    scoreDiv.style.opacity = 1;

    if (document.querySelector(".audio") == null) {
      main.appendChild(Asset.createAudio());
    }
    else {
      document.querySelector(".audio").play();
    }
  }

  const stop = () => {
    window.removeEventListener("keyup", (e) => {Controller.checkMove(e.key)});
    main.removeChild(rocket);
    scoreDiv.style.opacity = 0;
    main.style.animation = "";
    main.removeChild(document.querySelector(".audio"));
  }

  return {moveRocket, getActualRocket,
    appendElement, removeElement, 
    updateScore, updateHearts,
    startRocket, addShield,
    start, stop};
})();

const Menu = (() => {
  let startButton =  document.querySelector("button#start");

  const start = () => {
    Controller.startGame();
    startButton.removeEventListener("click", start);
  }

  startButton.addEventListener("click", start);
})();

const Settings = (() => {
  setTimeout(() => {
    if (Math.random() < 0.75) {

    }
  }, 6400);
  setTimeout(() => {
    if (Math.random() < 0.8) {
      
    }
  }, 14500);
})();