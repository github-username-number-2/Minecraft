import EventManager from "/js/libraries/EventManager.js";

import loadTextures from "/js/startup/loaders/textureLoader.js";
import loadWorld from "/js/main/worldLoading/loadWorld.js";

import {updateWASD} from "/js/main/input/MovementHandeler.js";


//temp
scene.background = new THREE.Color(0x81ceeb);

window.world = [];
world.push([
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","oakWood","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
],[
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
],[
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
],[
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
],[
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
],[
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
],[
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
],[
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
],[
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["dirt","dirt","dirt"],["dirt","dirt","dirt"],["dirt","dirt","dirt"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
  [["air","air","air"],["air","air","air"],["air","air","air"]],
]);


loadTextures().then(loadedTextures => {
  window.BlockTextures = loadedTextures;
  
  loadWorld(world);
  
  renderer.render(scene, camera);

  console.log("Started successfully");
});
//temp



const color = 0xFFFFFF;
const intensity = 0.5;
let light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
light = new THREE.DirectionalLight(color, intensity);
light.position.set(1, -2, 10);
scene.add(light);
//temp

AM.functions.push(async () => renderer.render(scene, camera));
AM.functions.push(updateWASD);
AM.start();

document.addEventListener("visibilitychange", () => {
  document.hidden ? AM.stop() : AM.start();
});

console.log("Done");