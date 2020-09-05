import PlayerData from "/js/data/PlayerData.js";

import "./KeyMapper.js";


const {forward, backward, left, right, jump} = PlayerData.movement.controls,
  speed = PlayerData.movement.speed / 10000;

function checkKeyDown(keys) {
  for (const key of keys) {
    if (ActiveKeys[key]) {
      return true;
    }
  }
}

export default function updateWASD() {
  const Vec3 = new THREE.Vector3();

  let temp = 0;

  if (checkKeyDown(forward)) {
    Vec3.z += 1;
  }
  if (checkKeyDown(backward)) {
    Vec3.z -= 1;
  }
  if (checkKeyDown(left)) {
    Vec3.x += 1;
  }
  if (checkKeyDown(right)) {
    Vec3.x -= 1;
  }
  //temp
  if (ActiveKeys["KeyQ"]) {
    temp += 1;
  }
  if (ActiveKeys["KeyE"]) {
    temp -= 1;
  }
  //temp

  Vec3.normalize();

  controls.moveForward(Vec3.z * speed);
  controls.moveRight(-Vec3.x * speed);
  //temp
  camera.position.y += temp * speed;
  //temp
}