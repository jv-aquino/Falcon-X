const Asteroid = (x, y) => {
  const getLocation = (axis) => this[axis];
  const setLocation = (axis, value) => this[axis] = value;

  return {getLocation, setLocation};
}

const Info = (() =>  {
  const asteroids = [];
  const Rocket = {
    x: 50,
    y: 50
  };
  
  const getRocket = (axis) => Rocket[axis];
  const setRocket = (axis, value) => Rocket[axis] = value;

  const getAsteroid = (index) => asteroids[index];

  return {getRocket, setRocket, getAsteroid};
})();

const Controller = (() => {
  const checkKey = (key) => {
    if (key == "ArrowLeft" || key == "a") {
      if (Info.getRocket("x") == 20) {return}
      Info.setRocket("x", Info.getRocket("x") - 5);
    }
    else if (key == "ArrowRight" || key == "d") {
      if (Info.getRocket("x") == 80) {return}
      Info.setRocket("x", Info.getRocket("x") + 5);
    }
    else if (key == "ArrowUp" || key == "w") {
      if (Info.getRocket("y") == 20) {return}
      Info.setRocket("y", Info.getRocket("y") - 5);
    }
    else if (key == "ArrowDown" || key == "s") {
      if (Info.getRocket("y") == 80) {return}
      Info.setRocket("y", Info.getRocket("y") + 5);
    }
    Dom.moveRocket();
  };

  return {checkKey};
})()

const Dom = (() => {
  const rocket = document.querySelector(".rocket");

  const moveRocket = () => {
    rocket.style.left = Info.getRocket("x") + "%";
    rocket.style.top = Info.getRocket("y") + "%";
  }
  
  window.addEventListener("keyup", (e) => {Controller.checkKey(e.key)});

  return {moveRocket};
})();

const Start = (() => {

})();