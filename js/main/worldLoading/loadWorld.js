import Chunk from "./Chunk.js";
import World from "/js/main/Globals/World.js";

window.World = World;

async function loadWorld(world) {
  window.LoadedWorld = Lodash.cloneDeep(world);


  world.forEach((chunk, chunkIndex) => {
    LoadedWorld[chunkIndex] = new Chunk(chunk, chunkIndex);
  });

  LoadedWorld.forEach(chunk => chunk.update());

  console.log("World loaded");
}

export default loadWorld;