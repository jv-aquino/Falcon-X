const Asteroid = () => {
  let y = 100;
  let x = Math.floor((Math.random() * 60) + 20);

  const getLocation = () => {
    
  };

  const createUI = () => {
    
  };

  return {getLocation};
}

const Info = (() =>  {
  const asteroids = [];
  const Rocket = {
    x: 50,
    y: 50
  };
  
  const getRocket = (axis) => Rocket[axis];
  const setRocket = (axis, value) => Rocket[axis] = value;

  const getAsteroids = () => asteroids;

  return {getRocket, setRocket, getAsteroids};
})();

const Controller = (() => {
  const checkMove = (key) => {
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

  return {checkMove, checkCrash};
})()

const Dom = (() => {
  const rocket = document.querySelector(".rocket");

  const moveRocket = () => {
    rocket.style.left = Info.getRocket("x") + "%";
    rocket.style.bottom = Info.getRocket("y") + "%";
  }
  
  window.addEventListener("keyup", (e) => {Controller.checkMove(e.key)});

  return {moveRocket};
})();

const Start = (() => {
  setInterval(Dom.checkCrash(), 20);
})();