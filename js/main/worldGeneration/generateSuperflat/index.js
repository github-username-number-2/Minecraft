import WorldData from "/js/data/WorldData.js";
import WorldGenerationData from "/js/data/WorldGenerationData.js";

const chunkWidth = WorldData.size.chunks.width,
  chunkHeight = WorldData.size.chunks.height,
  chunkDepth = WorldData.size.chunks.depth;

export default function generateSuperflat(data, progressUpdate) {
  const { layers, size } = data;

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
  window.t=world

  return world;
}