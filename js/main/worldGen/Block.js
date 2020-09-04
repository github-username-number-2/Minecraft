import BlockData from "/js/data/BlockData.js";
import WorldData from "/js/data/WorldData.js";


const blockSize = BlockData.size,
  blocks = BlockData.blocks;

const chunkWidth = WorldData.size.chunks.width,
  chunkHeight = WorldData.size.chunks.height,
  chunkDepth = WorldData.size.chunks.depth;

const worldSize = WorldData.size;

const airName = WorldData.air,
  airCollisionType = WorldData.airCollisionType;

const PlaneGeometry = new THREE.PlaneGeometry(
  blockSize,
  blockSize,
  blockSize
);

export default class Block {
  constructor(x, y, z, chunk, name, world) {
    const blockInfo = blocks[name];
    const texture = BlockTextures[blockInfo.location];
    const map = blockInfo.dimensions;


    //chunk location
    //important
    this.chunkX = chunk % worldSize.width;
    this.chunkY = chunk % (worldSize.width * worldSize.depth);
    this.chunkZ = Math.floor(chunk / worldSize.width);

    //original chunk number
    this.chunk = chunk;;

    //world location
    this.worldX = x + chunkWidth * this.chunkX;
    this.worldY = y + chunkHeight * this.chunkY;
    this.worldZ = z + chunkDepth * this.chunkZ;

    //location within chunk
    this.localX = x;
    this.localY = y;
    this.localZ = z;


    this.mechanics = blockInfo.mechanics;

    this.name = name;

    this.block = name;

    this.planes = [];


    for (let i = 0; i < 3; i++) {
      map[i].forEach((side, index) => {
        const textureData = side.split(":");

        const material = texture
          ? texture[side]
          : BlockTextures[textureData[0]][textureData[1]];


        const plane = new THREE.Mesh(PlaneGeometry, material);

        this.planes.push(plane);

        const half = blockSize / 2;

        let offsetX, offsetY, offsetZ;
        offsetX = offsetY = offsetZ = 0;
        switch (i) {
          case 0:
            plane.rotation.x = Math.PI * index - Math.PI / 2;
            offsetY -= half;
            break;
          case 1:
            plane.rotation.y = Math.PI * index + Math.PI / 2;
            offsetX -= half;
            break;
          case 2:
            plane.rotation.y = Math.PI * index;
            offsetZ -= half;
            break;
        }

        if (!index) {
          index = -1;
        }
        plane.position.set(
          index * offsetX + x * blockSize + this.chunkX * chunkWidth * blockSize,
          index * offsetY + y * blockSize + this.chunkX * chunkHeight * blockSize,
          index * offsetZ + z * blockSize + this.chunkZ * chunkDepth * blockSize
        );

        plane.name = `block:${x},${y},${z}`;

        scene.add(plane);
      });
    }
  }

  update() {
    //
  }

  remove() {
    while (this.planes.length) {
      scene.remove(this.planes[0]);
      this.planes.pop();
    }

    LoadedWorld[this.chunk][this.localY][this.chunkX][this.localZ] = airName;
    LoadedBlockTypes[this.chunk][this.localY][this.localX][this.localZ] = airType;
  }

  getSurroundingBlocks(world) {
    return {
      top: 0,
      bottom: 0,
      front: 0,
      back: 0,
      left: 0,
      right: 0,
    };
  }
}

export function getBlockType(name) {
  return name === airName
    ? airCollisionType
    : blocks[name].mechanics.collisionType;
}