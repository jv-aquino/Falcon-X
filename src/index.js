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
  let lives = 0;

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

  const getLives = () => lives;
  const updateLives = (n) => lives = lives + n;

  return {
    getRocket, setRocket, 
    removeAsteroid, addAsteroid, getAsteroids,
    getTime, addTime, 
    getLives, updateLives,
    gameOn
  };
})();

const Controller = (() => {
  const startTimer = () => {
    setInterval(() => {
      Info.addTime();
      Dom.updateScore();
    }, 1000);
  }

  const startGame = () => {
    startTimer();
    changeLives(3);
    createRocket();
    Dom.startRocket();
    Dom.start();
  }

  const changeLives = (n) => {
    Info.updateLives(n);
    Dom.updateHearts();
  }

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
      if (Info.getRocket("y") == 75) {return}
      Info.setRocket("y", Info.getRocket("y") + 5);
    }
    else if (key == "ArrowDown" || key == "s") {
      if (Info.getRocket("y") == 25) {return}
      Info.setRocket("y", Info.getRocket("y") - 5);
    }
    Dom.moveRocket();
  };
  
  const checkCrash = () => {
    Info.getAsteroids().forEach(asteroid => {
      
    });
  }

  const createAsteroid = () => {
    let lifespan = 3 - Math.log10(Info.getTime()) * 1.2;
    let index = Info.getAsteroids().length;
    Info.addAsteroid(Asteroid(lifespan));
    Info.removeAsteroid(index, lifespan * 1000)
  }

  const createRocket = () => {
    Dom.appendElement(Asset.createRocket(50, 50));
  }

  return {checkMove, checkCrash, 
    createAsteroid, createRocket,
    changeLives,
    startGame};
})()

const Dom = (() => {
  const main = document.querySelector("#container");
  const score = document.querySelector("#score");
  const hearts = document.querySelector(".hearts");
  let rocket;

  const startRocket = () => {
    rocket = document.querySelector(".rocket");
  }

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
  
  const start = () => {
    main.removeChild(document.querySelector(".start"));
    window.addEventListener("keyup", (e) => {Controller.checkMove(e.key)});
    main.style.animation = "moveSky 15s linear infinite";
  }

  const stop = () => {
    window.removeEventListener("keyup", (e) => {Controller.checkMove(e.key)});
    main.style.animation = "";
  }

  return {moveRocket, 
    appendElement, removeElement, 
    updateScore, updateHearts,
    startRocket,
    start, stop};
})();

const Menu = (() => {
  let startButton =  document.querySelector("button#start");

  const start = () => {
    Controller.startGame();
    startButton.removeEventListener("click", start);
  }

  startButton.addEventListener("click", start)
})();