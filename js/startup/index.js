import PointerLockControls from "/js/libraries/PointerLockControls.js";

import AnimationManager from "/js/libraries/AnimationManager.js";
import EventManager from "/js/libraries/EventManager.js";

import CameraData from "/js/data/CameraData.js";
import PlayerData from "/js/data/PlayerData.js";

import loadTextures from "/js/startup/loaders/textureLoader.js";
import loadWorld from "/js/main/worldGen/loadWorld.js";

import updateWASD from "/js/main/input/MovementHandeler.js";


Object.defineProperty(window, "PlayerData", {
  value: PlayerData,
  writable: false
});


const {fov, aspect, near, far} = CameraData;




window.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
window.scene = new THREE.Scene();
scene.background = new THREE.Color(0x81ceeb);

window.renderer = new THREE.WebGLRenderer({canvas});

window.controls = new PointerLockControls(camera, body);
controls.lookSpeed = PlayerData.movement.lookSpeed / 100000;

//temp
window.world = [];
JS.loop(() => {
  world.push([
    [["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"]],
    [["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
    [["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
    [["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
    [["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
    [["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt"], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
  ]);
}, 9);


loadTextures().then(loadedTextures => {
  window.BlockTextures = loadedTextures;
  loadWorld(world);

  renderer.render(scene, camera);
});
//temp


body.addEventListener("click", () => controls.lock());

controls.addEventListener("lock", () => AM.start());
controls.addEventListener("unlock", () => AM.stop());

scene.add(controls.getObject());

camera.position.y = 2

const color = 0xFFFFFF;
const intensity = 5;
let light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
light = new THREE.DirectionalLight(color, intensity);
light.position.set(1, -2, 10);
scene.add(light);
//temp

const AM = new AnimationManager();
AM.functions.push(async () => renderer.render(scene, camera));
AM.functions.push(updateWASD);

document.addEventListener("visibilitychange", () => {
  document.hidden ? AM.stop() : AM.start();
});