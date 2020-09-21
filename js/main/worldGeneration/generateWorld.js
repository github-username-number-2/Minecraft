import WorldData from "/js/data/WorldData.js";
import WorldGenerationData from "/js/data/WorldGenerationData.js";

import convertToChunks from "./convertToChunks.js";

const chunkWidth = WorldData.size.chunks.width,
  chunkHeight = WorldData.size.chunks.height,
  chunkDepth = WorldData.size.chunks.depth;

export default async function generateWorld(data, progressUpdate) {
  const {
    type,
    seed,
    size,
    generateStructures,
  } = data;

  switch (type) {
    case "Normal":
      return new Promise(resolve => {
        resolve();
      });
    case "Superflat":
      return new Promise(resolve => {
        const {layers} = data;
        
        const world = [];

        layers.unshift(WorldGenerationData.bottomBoundingBlock);

        const layerCount = layers.length;
        layers.forEach((layer, layerIndex) => {
          let xAxis = [];
          
          xAxis.length = chunkWidth * size.width;
          xAxis = xAxis.fill([]);

          xAxis.forEach((zAxis, index) => {
            zAxis.length = chunkDepth * size.depth;
            xAxis[index] = zAxis.fill(layer);
          });

          world.push(xAxis);

          progressUpdate({
            progressType: "Creating Layers",
            progressPercent: (layerIndex / layerCount).toFixed(2),
          });
        });

        resolve(
          convertToChunks(world, chunkWidth, chunkHeight, chunkDepth, size, progressUpdate)
        );
      });
  }
}