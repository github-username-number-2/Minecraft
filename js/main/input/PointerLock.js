import PointerLockControls from "/js/libraries/PointerLockControls.js";

import PlayerData from "/js/data/PlayerData.js";

import {savedRotation} from "./MovementHandeler.js";

window.controls = new PointerLockControls(camera, body);
controls.lookSpeed = PlayerData.movement.lookSpeed / 100000;

//controls.addEventListener("lock", () => AM.start());
//controls.addEventListener("unlock", () => AM.stop());

scene.add(controls.getObject());

body.addEventListener("click", () => controls.lock());

//stops camera from changing rotation on camera unlock
controls.addEventListener("unlock", () => {
  camera.rotation.x = savedRotation.x;
  camera.rotation.y = savedRotation.y;
  camera.rotation.z = savedRotation.z;
});