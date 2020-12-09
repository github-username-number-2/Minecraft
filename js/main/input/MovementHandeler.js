import PlayerData from "/js/data/PlayerData.js";

import ActiveKeys from "./KeyMapper.js";
import Mouse from "./MouseTracker.js";

import "./PointerLock.js";

import Player from "../Globals/Player.js";


const {forward, backward, left, right, jump} = PlayerData.movement.controls,
  speed = PlayerData.movement.speed / 100000;

function checkKeyDown(keys) {
  for (const key of keys) {
    if (ActiveKeys[key]) {
      return true;
    }
  }
}

//stops camera from changing rotation on camera unlock
const savedRotation = {
  x: 0,
  y: 0,
  z: 0,
};
setInterval(() => {
  savedRotation.x = camera.rotation.x;
  savedRotation.y = camera.rotation.y;
  savedRotation.z = camera.rotation.z;
}, 30);

function updateWASD(elapsedTime) {
  const Vec2 = new THREE.Vector2();

  let temp = 0;

  if (checkKeyDown(forward)) {
    Vec2.y += 1;
  }
  if (checkKeyDown(backward)) {
    Vec2.y -= 1;
  }
  if (checkKeyDown(left)) {
    Vec2.x += 1;
  }
  if (checkKeyDown(right)) {
    Vec2.x -= 1;
  }
  //temp
  if (ActiveKeys["KeyQ"]) {
    temp += 1;
  }
  if (ActiveKeys["KeyE"]) {
    temp -= 1;
  }
  //temp

  Vec2.normalize();

  Vec2.x *= elapsedTime;
  Vec2.y *= elapsedTime;

  controls.moveForward(Vec2.y * speed);
  controls.moveRight(-Vec2.x * speed);
  //temp
  camera.position.y += temp * speed * elapsedTime;

  if (ActiveKeys["LeftMouse"]) {
    ActiveKeys["LeftMouse"] = false;

    Player.currentReplaceTarget && Player.currentReplaceTarget.replace("air");
  }
  if (ActiveKeys["RightMouse"]) {
    ActiveKeys["RightMouse"] = false;

    Player.currentPlaceTarget && Player.currentPlaceTarget.replace("dirt");
  }
  //temp
}

export {updateWASD, savedRotation};