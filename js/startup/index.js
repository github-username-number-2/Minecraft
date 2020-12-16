import WorldData from "/js/data/WorldData.js";

import EventManager from "/js/libraries/EventManager.js";

import loadTextures from "/js/startup/loaders/textureLoader.js";
import load2dImages from "/js/startup/loaders/2dImageLoader.js";
import loadWorld from "/js/main/worldLoading/loadWorld.js";
import generateWorld from "/js/main/worldGeneration/generateWorld.js";

import { updateInput } from "/js/main/input/MovementHandeler.js";


//temp

camera.position.x = -2;
camera.position.y = 2;
camera.rotation.y = -1.5;

scene.background = new THREE.Color(0x81ceeb);

!async function () {
  window.BlockTextures = await loadTextures();
  window.Images = await load2dImages();

  window.world = await generateWorld({
    type: "Superflat",
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
    ],
  }, progress => console.log(progress));

  loadWorld(world);

  renderer.render(scene, camera);

  import("/js/main/render.js");

  console.log("Started successfully");
}();
//temp

console.log("Done");