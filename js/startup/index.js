import EventManager from "/js/libraries/EventManager.js";

import loadTextures from "/js/startup/loaders/textureLoader.js";
import loadWorld from "/js/main/worldLoading/loadWorld.js";
import generateWorld from "/js/main/worldGeneration/generateWorld.js";

import {updateWASD} from "/js/main/input/MovementHandeler.js";


//temp
scene.background = new THREE.Color(0x81ceeb);

loadTextures().then(loadedTextures => {
  window.BlockTextures = loadedTextures;
  
  generateWorld({
    type: "Superflat",
    seed: "",
    size: {
      width: 2,
      height: 2,
      depth: 2,
    },
    generateStructures: true,
    //should be 1 less than world height to account for bedrock
    layers: [
      "stone",
      "stone",
      "stone",
      "stone",
      "stone",
      "dirt",
      "stone",
      "stone",
      "stone",
      "dirt",
      "dirt",
      "air",
      "air",
      "oakWood",
      "air",
    ]
  }, e => console.log(e)).then(world => {
    window.world = world
    loadWorld(world);
  
    renderer.render(scene, camera);
    
    console.log("Started successfully");
  });
});
//temp

AM.functions.push(() => renderer.render(scene, camera));
AM.functions.push(updateWASD);
AM.start();

document.addEventListener("visibilitychange", () => {
  document.hidden ? AM.stop() : AM.start();
});

console.log("Done");