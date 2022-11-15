(()=>{"use strict";const e=()=>{const e=document.createElement("div");return e.classList.add("heart"),e},t=(e,t)=>{let o,r=Math.floor(60*Math.random()+20);return"asteroid"==e?o=((e,t,o)=>{const r=document.createElement("div");return r.classList.add("asteroid"),r.style.left=e+"%",r.style.bottom="100%",r.style.animationDuration=o+"s",r})(r,0,t):"powerUp"==e&&(o=((e,t)=>{const o=document.createElement("div");o.classList.add("powerUp"),o.style.left=Math.floor(60*Math.random()+20),o.style.bottom=100,o.style.animationDuration="100s",o.style.backgroundImage=`./img/${e}PowerUp.png`})(r)),i.appendElement(o),{getLocation:e=>"x"==e?o.left:o.bottom,getUI:()=>o}},o=(()=>{let e=0,t=0;const o=[],r=[],a={x:50,y:45,shield:!1};return{getRocket:e=>a[e],setRocket:(e,t)=>a[e]=t,hasShield:()=>a.shield,addShield:e=>{a.shield=!0,i.addShield(e)},removeShield:()=>a.shield=!1,removeAsteroid:e=>{setTimeout((()=>{i.removeElement(o.shift().getUI())}),e)},addAsteroid:e=>o.push(e),getAsteroids:()=>o,removePowerUp:(e,t)=>{setTimeout((()=>{i.removeElement(r[e].getUI()),r.splice(e,1)}),t)},addPowerUp:e=>r.push(e),getPowerUps:()=>r,getTime:()=>t,addTime:()=>t++,time:t,getLives:()=>e,updateLives:t=>e+=t,gameOn:()=>!0,gameStatus:!0}})(),r=(()=>{let e,r,a;const s=()=>{o.time=0,clearInterval(e),o.setRocket("x",50),o.setRocket("y",45),clearInterval(r),clearTimeout(a),i.stop(),o.gameStatus=!1},d=e=>{o.updateLives(e),i.updateHearts()},c=()=>{if(o.hasShield())return;let e=i.getActualRocket(),t=e.left,r=e.top;o.getAsteroids().forEach((i=>{let a=i.getUI().getBoundingClientRect(),c=a.left,l=a.top;if(!(r+e.height<l||r>l+a.height||t+e.width<c||t>c+a.width)){if(d(-1),0==o.getLives())return void s();o.addShield(4)}}))},l=e=>{let r=3-Math.log10(Math.abs(.75*o.getTime()-6));"asteroid"==e?(o.addAsteroid(t(e,r)),o.removeAsteroid(1e3*r)):"powerUp"==e&&(o.addPowerUp(t(e,r)),o.removePowerUp(1e3*r))},n=()=>{i.appendElement(((e,t)=>{const o=document.createElement("div");return o.classList.add("rocket"),o.style.left="50%",o.style.bottom="calc(45% - 69px)",o})())};return{checkMove:e=>{if(o.gameOn()){if("ArrowLeft"==e||"a"==e){if(o.getRocket("x")<=15)return;o.setRocket("x",o.getRocket("x")-7)}else if("ArrowRight"==e||"d"==e){if(o.getRocket("x")>=85)return;o.setRocket("x",o.getRocket("x")+7)}else if("ArrowUp"==e||"w"==e){if(o.getRocket("y")>=80)return;o.setRocket("y",o.getRocket("y")+7)}else if("ArrowDown"==e||"s"==e){if(o.getRocket("y")<=20)return;o.setRocket("y",o.getRocket("y")-7)}i.moveRocket()}},checkCrash:c,createObject:l,createRocket:n,changeLives:d,startGame:()=>{e=setInterval((()=>{o.addTime(),i.updateScore()}),1e3),d(3),n(),i.startRocket(),i.start();let t=()=>{0!=o.gameOn()&&(l("asteroid"),a=setTimeout(t,2e3-Math.min(50*o.getTime(),1550)))};t(),r=setInterval((()=>{c()}),70)},stopGame:s}})(),i=(()=>{const t=document.querySelector("#container"),i=document.querySelector(".score"),a=document.querySelector("#score"),s=document.querySelector(".hearts");let d;return{moveRocket:()=>{d.style.left=o.getRocket("x")+"%",d.style.bottom="calc("+o.getRocket("y")+"% - 69px)"},getActualRocket:()=>d.getBoundingClientRect(),appendElement:e=>{t.appendChild(e)},removeElement:e=>{t.removeChild(e)},updateScore:()=>{a.textContent=10*o.getTime()},updateHearts:()=>{let t=o.getLives(),r=s.childElementCount,i=t-r;if(i<0){if(0==r)return;for(;0!=i;)s.removeChild(s.lastChild),i++}else for(;0!=i;)s.appendChild(e()),i--},startRocket:()=>{d=document.querySelector(".rocket")},addShield:e=>{d.classList.add("shield"),d.style.animationDuration=e+"s",setTimeout((()=>{d.classList.remove("shield"),o.removeShield()}),1e3*e)},start:()=>{t.style.animation="moveSky 14s linear infinite",t.removeChild(document.querySelector(".start")),window.addEventListener("keyup",(e=>{r.checkMove(e.key)})),i.style.opacity=1,null==document.querySelector(".audio")?t.appendChild((()=>{const e=document.createElement("audio");return e.classList.add("audio"),e.innerHTML='<audio autoplay loop><source src="./music.mp3" type="audio/mpeg"></audio>',e})()):document.querySelector(".audio").play()},stop:()=>{window.removeEventListener("keyup",(e=>{r.checkMove(e.key)})),t.removeChild(d),i.style.opacity=0,t.style.animation="",t.removeChild(document.querySelector(".audio"))}}})();(()=>{let e=document.querySelector("button#start");const t=()=>{r.startGame(),e.removeEventListener("click",t)};e.addEventListener("click",t)})(),setTimeout((()=>{Math.random()}),6400),setTimeout((()=>{Math.random()}),14500)})();