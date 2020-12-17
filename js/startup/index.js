import WorldData from "/js/data/WorldData.js";
import PlayerData from "/js/data/PlayerData.js";
import BlockData from "/js/data/BlockData.js";

import EventManager from "/js/libraries/EventManager.js";

import loadTextures from "/js/startup/loaders/textureLoader.js";
import load2dImages from "/js/startup/loaders/2dImageLoader.js";
import loadWorld from "/js/main/worldLoading/loadWorld.js";
import generateWorld from "/js/main/worldGeneration/generateWorld.js";

import { updateInput } from "/js/main/input/MovementHandeler.js";


const defSpawn = PlayerData.movement.defaultSpawnLocation;
camera.position.x = defSpawn[0] * BlockData.size;
camera.position.y = defSpawn[1] * BlockData.size;
camera.position.z = defSpawn[2] * BlockData.size;


//temp


scene.background = new THREE.Color(0x81ceeb);

!async function () {
  window.BlockTextures = await loadTextures();
  window.Images = await load2dImages();

  let worldType = "Superflat";
  
  //sets up testing environment
  await new Promise(resolve => {
    document.addEventListener("keydown", event => {
      if (event.code === "KeyQ") {
        worldType = "Normal";
        console.log("small_penis.exe is loading");
        resolve();
      }
    });
    //imortant (for some reason)
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  window.world = await generateWorld({
    type: worldType,
    seed: "",
    size: {
      width: WorldData.size.width,
      height: WorldData.size.height,
      depth: WorldData.size.depth,
    },
    generateStructures: true,
    //should be 1 less than world height to account for bedrock
    layers: [
      "stone",
      "stone",
      "stone",
      "stone",
      "stone",
      "stone",
      "stone",
      "stone",
      "dirt",
      "dirt",
      "dirt",
      "grass",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
      "air",
    ],
  }, progress => console.log(progress));

  loadWorld(world);

  import("/js/main/render.js");

  console.log("Started successfully");
}();
//temp

console.log("Done");