import BlockData from "/js/data/BlockData.js";
import WorldData from "/js/data/WorldData.js";
import World from "/js/main/Globals/World.js";

window.World = World;

const blockSize = BlockData.size;

const chunkWidth = WorldData.size.chunks.width,
  chunkHeight = WorldData.size.chunks.height,
  chunkDepth = WorldData.size.chunks.depth;

const worldSize = WorldData.size;

const airName = WorldData.airName;
const airCollisionType = World.getBlockCollisionType(airName);

const PlaneGeometry = new THREE.PlaneBufferGeometry(
  blockSize,
  blockSize,
  blockSize
);

export default class Block {
  constructor(x, y, z, chunk, name, world) {
    const blockInfo = World.getBlockInfo(name);
    const texture = BlockTextures[blockInfo.location];
    const map = blockInfo.dimensions;

    this.blockInfo = blockInfo;

    this.renderInfo = {
      texture,
      map,
    };

    //chunk location
    //important
    this.chunkX = chunk % worldSize.width;
    this.chunkY = Math.floor(chunk / (worldSize.width * worldSize.depth));
    this.chunkZ = Math.floor(chunk / worldSize.width) - this.chunkY * worldSize.depth;

    //original chunk number
    this.chunk = chunk;

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
  }

  remove() {
    while (this.planes.length) {
      scene.remove(this.planes[0]);
      this.planes.shift();
    }

    LoadedWorld[this.chunk][this.localY][this.localX][this.localZ] = airName;
    LoadedBlockTypes[this.chunk][this.localY][this.localX][this.localZ] = airCollisionType;
  }

  getSurroundingBlocks(world) {
    return [
      [
        World.getBlockByWorldCoords(this.worldX, this.worldY + 1, this.worldZ),
        World.getBlockByWorldCoords(this.worldX, this.worldY - 1, this.worldZ),
      ],
      [
        World.getBlockByWorldCoords(this.worldX + 1, this.worldY, this.worldZ),
        World.getBlockByWorldCoords(this.worldX - 1, this.worldY, this.worldZ),
      ],
      [
        World.getBlockByWorldCoords(this.worldX, this.worldY, this.worldZ + 1),
        World.getBlockByWorldCoords(this.worldX, this.worldY, this.worldZ - 1),
      ],
    ];
  }

  updatePlanes() {
    while (this.planes.length) {
      scene.remove(this.planes[0]);
      this.planes.shift();
    }

    const surroundingBlocks = this.getSurroundingBlocks();


    for (let i = 0; i < 3; i++) {
      this.renderInfo.map[i].forEach((side, index) => {
        if (
          surroundingBlocks[i][index]
          && World.getPlaneBlockingType(
            surroundingBlocks[i][index].name
          ) === "block"
          && this.blockInfo.mechanics.planeLoadType === "blocked"
        ) {
          return;
        }

        const textureData = side.split(":");

        const material = this.renderInfo.texture
          ? this.renderInfo.texture[side]
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
          index * offsetX + this.localX * blockSize + this.chunkX * chunkWidth * blockSize,
          index * offsetY + this.localY * blockSize + this.chunkY * chunkHeight * blockSize,
          index * offsetZ + this.localZ * blockSize + this.chunkZ * chunkDepth * blockSize
        );

        plane.name = `block:${this.localX},${this.localY},${this.localZ}`;

        scene.add(plane);
      });
    }
  }
}