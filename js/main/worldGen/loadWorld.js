import Block from "./Block.js";
import World from "/js/main/Globals/World.js";
import WorldData from "/js/data/WorldData.js";


const airName = WorldData.airName;

export default async function loadWorld(world) {
  world = world.reverse();
  
  window.LoadedWorld = Lodash.cloneDeep(world);
  window.LoadedBlockTypes = Lodash.cloneDeep(world);


  world.forEach((chunk, chunkIndex) => {
    chunk.forEach((a1, i1) => {
      a1.forEach((a2, i2) => {
        a2.forEach((a3, i3) => {
          if (World.getBlockInfo(a3).renderBlock) {
            LoadedBlockTypes[chunkIndex][i1][i2][i3] = World.getBlockCollisionType(a3);
          }
        });
      });
    });
  });

  world.forEach((chunk, chunkIndex) => {
    chunk.forEach((a1, i1) => {
      a1.forEach((a2, i2) => {
        a2.forEach((a3, i3) => {
          if (World.getBlockInfo(a3).renderBlock) {
            LoadedWorld[chunkIndex][i1][i2][i3] = new Block(i2, i1, i3, chunkIndex, a3, world);
          } else {
            LoadedWorld[chunkIndex][i1][i2][i3] = {name: airName};
          }
        });
      });
    });
  });

  LoadedWorld.forEach((chunk, chunkIndex) => {
    chunk.forEach(a1 => {
      a1.forEach(a2 => {
        a2.forEach(a3 => {
          if (a3.updatePlanes) {
            a3.updatePlanes();
          }
        });
      });
    });
  });

  console.log("World loaded");
}