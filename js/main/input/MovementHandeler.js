import PlayerData from "/js/data/PlayerData.js";

import ActiveKeys from "./KeyMapper.js";
import Mouse from "./MouseTracker.js";

import "./PointerLock.js";

import Player from "../Globals/Player.js";


const {
  forward,
  backward,
  left,
  right,
  jump,
  crouch,
  hotbar,
} = PlayerData.movement.controls,
  horizantalSpeed = PlayerData.movement.horizontalSpeed / 100000,
  verticalSpeed = PlayerData.movement.verticalSpeed / 100000;

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

function updateInput(deltaTime) {
  const Vec2 = new THREE.Vector2();

  let vertical = 0;

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
  if (checkKeyDown(jump)) {
    vertical += 1;
  }
  if (checkKeyDown(crouch)) {
    vertical -= 1;
  }

  Vec2.normalize();

  Vec2.x *= deltaTime * horizantalSpeed;
  Vec2.y *= deltaTime * horizantalSpeed;

  controls.moveForward(Vec2.y);
  controls.moveRight(-Vec2.x);
  
  camera.position.y += vertical * verticalSpeed * deltaTime;

  hotbar.forEach((keys, index) => {
    keys.forEach(key => {
      if (ActiveKeys[key]) {
        Player.hotbarSelectNumber = index;
      }
    });
  });

  if (ActiveKeys["LeftMouse"]) {
    ActiveKeys["LeftMouse"] = false;

    Player.currentReplaceTarget && Player.currentReplaceTarget.replace("air");
  }
  if (ActiveKeys["RightMouse"]) {
    ActiveKeys["RightMouse"] = false;
    if (Player.hotbar[Player.hotbarSelectNumber])
    Player.currentPlaceTarget && Player.currentPlaceTarget.replace(
      Player.hotbar[Player.hotbarSelectNumber]
    );
  }
}

export {updateInput, savedRotation};