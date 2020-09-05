import WorldData from "/js/data/WorldData.js";
import BlockData from "/js/data/BlockData.js";

const blocks = BlockData.blocks;

const airName = WorldData.airName;

const boundingCollisionType = WorldData.boundingCollisionType;
const boundingPlaneBlockingType = WorldData.boundingPlaneBlockingType;

const chunkWidth = WorldData.size.chunks.width,
  chunkHeight = WorldData.size.chunks.height,
  chunkDepth = WorldData.size.chunks.depth;

const worldWidth = WorldData.size.width,
  worldHeight = WorldData.size.height,
  worldDepth = WorldData.size.depth;

export default {
  getBlockByWorldCoords: function(x, y, z) {
    const localX = x % chunkWidth;
    const localY = y % chunkHeight;
    const localZ = z % chunkDepth;

    const chunkX = Math.floor(x / chunkWidth);
    const chunkY = Math.floor(y / chunkHeight);
    const chunkZ = Math.floor(z / chunkDepth);

    const chunk = chunkX + worldWidth * chunkZ + chunkX * chunkZ * chunkY;
    
    if (!LoadedWorld[chunk]) {
      return null;
    }
    if (!LoadedWorld[chunk][localY]) {
      return null;
    }
    if (!LoadedWorld[chunk][localY][localX]) {
      return null;
    }
    if (!LoadedWorld[chunk][localY][localX][localZ]) {
      return null;
    }
    return LoadedWorld[chunk][localY][localX][localZ];
  },

  getBlockCollisionType: function(name) {
    return name
      ? blocks[name].mechanics.collisionType
      : boundingCollisionType;
  },

  getPlaneBlockingType: function(name) {
    return name
      ? blocks[name].mechanics.planeBlockType
      : boundingPlaneBlockingType;
  },

  getBlockInfo: function(name) {
    return blocks[name];
  },
};