import Player from "./Player.js";

import Block from "/js/main/worldLoading/Block.js";

import WorldData from "/js/data/WorldData.js";
import BlockData from "/js/data/BlockData.js";

const blocks = BlockData.blocks;

const blockSize = BlockData.size;

const boundingCollisionType = WorldData.boundingCollisionType;
const boundingPlaneBlockingType = WorldData.boundingPlaneBlockingType;

const chunkWidth = WorldData.size.chunks.width,
  chunkHeight = WorldData.size.chunks.height,
  chunkDepth = WorldData.size.chunks.depth;

const worldWidth = WorldData.size.width,
  worldHeight = WorldData.size.height,
  worldDepth = WorldData.size.depth;

const World = {
  getBlockByWorldCoords(x, y, z) {
    const localX = x % chunkWidth;
    const localY = y % chunkHeight;
    const localZ = z % chunkDepth;

    const chunkX = Math.floor(x / chunkWidth);
    const chunkY = Math.floor(y / chunkHeight);
    const chunkZ = Math.floor(z / chunkDepth);

    let returnNull;
    [chunkX, chunkY, chunkZ].forEach((coordinate, index) => {
      if (coordinate >= [worldWidth, worldHeight, worldDepth][index]) {
        returnNull = true;
      }
    });
    if (returnNull) {
      return null;
    }

    const chunk = chunkX + worldWidth * chunkZ + worldWidth * worldDepth * chunkY;
    
    if (!LoadedWorld[chunk]) {
      return null;
    }
    if (!LoadedWorld[chunk].BlockMap[localY]) {
      return null;
    }
    if (!LoadedWorld[chunk].BlockMap[localY][localX]) {
      return null;
    }
    if (!LoadedWorld[chunk].BlockMap[localY][localX][localZ]) {
      return null;
    }
    return LoadedWorld[chunk].BlockMap[localY][localX][localZ];
  },
  
  getChunkByWorldCoords(x, y, z) {
    const chunkX = Math.floor(x / chunkWidth);
    const chunkY = Math.floor(y / chunkHeight);
    const chunkZ = Math.floor(z / chunkDepth);

    const chunk = chunkX + worldWidth * chunkZ + worldWidth * worldDepth * chunkY;
    
    if (!LoadedWorld[chunk]) {
      return null;
    }
    return LoadedWorld[chunk];
  },

  getBlockCollisionType(name) {
    return name
      ? blocks[name].mechanics.collisionType
      : boundingCollisionType;
  },

  getPlaneBlockingType(name) {
    return name
      ? blocks[name].mechanics.planeBlockType
      : boundingPlaneBlockingType;
  },

  getBlockInfo(name) {
    return blocks[name];
  },

  setBlock(x, y, z, name) {
    const localX = x % chunkWidth;
    const localY = y % chunkHeight;
    const localZ = z % chunkDepth;

    const chunkX = Math.floor(x / chunkWidth);
    const chunkY = Math.floor(y / chunkHeight);
    const chunkZ = Math.floor(z / chunkDepth);

    const chunk = chunkX + worldWidth * chunkZ + worldWidth * worldDepth * chunkY;

    LoadedWorld[chunk].BlockMap[localY][localX][localZ] = new Block(
      localX, localY, localZ, LoadedWorld[chunk], chunk, name
    );
  },
};

export default World;

window.world = World;