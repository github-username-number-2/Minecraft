import World from "./World.js";

import Mouse from "/js/main/input/MouseTracker.js";
import ActiveKeys from "/js/main/input/KeyMapper.js";

import BlockData from "/js/data/BlockData.js";

const blockSize = BlockData.size;

const raycaster = new THREE.Raycaster();

function getBlockFromPoint(point, type) {
  //rounds to first decimal place and finds absolute value
  Object.keys(point).forEach(
    axis => point[axis] = Math.round(Lodash.round(point[axis], 4) * 10000)
  );

  const face = getPointFace(point);

  const offsets = {
    x: 0,
    y: 0,
    z: 0,
  };
  offsets[face] = 1;

  Object.keys(point).forEach(
    axis => point[axis] = Math.floor(Lodash.round(point[axis], 4) / Lodash.round(blockSize * 10000, 4))
  );

  for (let i = 0, blocks = [
    World.getBlockByWorldCoords(
      point.x,
      point.y,
      point.z,
    ),
    World.getBlockByWorldCoords(
      point.x - offsets.x,
      point.y - offsets.y,
      point.z - offsets.z,
    ),
  ], l = blocks.length; i < l; i++) {
    const block = blocks[i];
    if (block && block.blockInfo.mechanics.playerCrosshairBlocking) {
      switch (type) {
        case "replace":
          return block;
        case "place":
          if (i) {
            return World.getBlockByWorldCoords(
              block.worldX + offsets.x,
              block.worldY + offsets.y,
              block.worldZ + offsets.z,
            );
          } else {
            return World.getBlockByWorldCoords(
              block.worldX - offsets.x,
              block.worldY - offsets.y,
              block.worldZ - offsets.z,
            );
          }
      }
    }
  }
  return null;
}

function getPointFace(point) {
  for (const axis in point) {
    if (typeof point[axis] !== "number") {
      return null;
    }
    if (
      !(Lodash.round(point[axis], 4) % Lodash.round(blockSize * 10000, 4))
    ) {
      return axis;
    }
  }
}

function getTarget(type) {
  raycaster.setFromCamera({x: 0, y: 0}, camera);

  const targets = raycaster.intersectObjects(scene.children);

  //removes non-chunk targets
  targets.filter(target => target.object.name === "chunk");

  for (const target of targets) {console.log(target.point)
    const targetBlock = getBlockFromPoint(target.point, type);
    if (targetBlock) {
      return targetBlock;
    }
  }
  return null;
}

const Player = {
  get currentReplaceTarget() {
    return getTarget("replace");
  },

  get currentPlaceTarget() {
    return getTarget("place");
  },
};

body.onclick = function() {
  if (ActiveKeys["KeyR"]) {
    Player.currentReplaceTarget && Player.currentReplaceTarget.replace("air");
  } else {
    Player.currentPlaceTarget && Player.currentPlaceTarget.replace("stone");
  }
};

export default Player;