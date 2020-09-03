import Block from "./Block.js";


export default async function loadWorld(world) {
  window.LoadedWorld = world;

  world = world.reverse();

  world.forEach((chunk, chunkIndex) => {
    chunk.forEach((a1, i1) => {
      a1.forEach((a2, i2) => {
        a2.forEach((a3, i3) => {
          if (a3) {
            LoadedWorld[chunkIndex][i1][i2][i3] = new Block(i2, i1, i3, chunkIndex, a3, world);
          }
        });
      });
    });
  });

  console.log("World Loaded");
}