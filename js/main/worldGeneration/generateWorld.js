import WorldData from "/js/data/WorldData.js";
import WorldGenerationData from "/js/data/WorldGenerationData.js";

import generateStandardWorld from "./generateStandardWorld/index.js";
import generateSuperflat from "./generateSuperflat/index.js";

import convertToChunks from "./convertToChunks.js";

const chunkWidth = WorldData.size.chunks.width,
  chunkHeight = WorldData.size.chunks.height,
  chunkDepth = WorldData.size.chunks.depth;

export default async function generateWorld(data, progressUpdate) {
  switch (data.type) {
    case "Normal":
      return convertToChunks(
        generateStandardWorld(data, progressUpdate),
        chunkWidth,
        chunkHeight,
        chunkDepth,
        data.size,
        progressUpdate,
      );
    case "Superflat":
      return convertToChunks(
        generateSuperflat(data, progressUpdate),
        chunkWidth,
        chunkHeight,
        chunkDepth,
        data.size,
        progressUpdate,
      );
  };
}