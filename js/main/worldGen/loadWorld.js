import Block, {getBlockType} from "./Block.js";
import WorldData from "/js/data/WorldData.js";


const airName = WorldData.air;

export default async function loadWorld(world) {
  world = world.reverse();
  
  window.LoadedWorld = Lodash.cloneDeep(world);
  window.LoadedBlockTypes = Lodash.cloneDeep(world);


  world.forEach((chunk, chunkIndex) => {
    chunk.forEach((a1, i1) => {
      a1.forEach((a2, i2) => {
        a2.forEach((a3, i3) => {
          if (a3 !== airName) {
            LoadedBlockTypes[chunkIndex][i1][i2][i3] = getBlockType(a3);
          }
        });
      });
    });
  });

  world.forEach((chunk, chunkIndex) => {
    chunk.forEach((a1, i1) => {
      a1.forEach((a2, i2) => {
        a2.forEach((a3, i3) => {
          if (a3 !== airName) {
            LoadedWorld[chunkIndex][i1][i2][i3] = new Block(i2, i1, i3, chunkIndex, a3, world);
          }
        });
      });
    });
  });

  console.log("World Loaded");
}