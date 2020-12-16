import BlockData from "/js/data/BlockData.js";
import WorldData from "/js/data/WorldData.js";
import World from "/js/main/Globals/World.js";


const blockSize = BlockData.size;

const chunkWidth = WorldData.size.chunks.width,
  chunkHeight = WorldData.size.chunks.height,
  chunkDepth = WorldData.size.chunks.depth;

const worldSize = WorldData.size;

//////////////////////////////////////////////////////////////////////temp
//const scale = 10;
//////////////////////////////////////////////////////////////////////temp

const PlaneGeometry = new THREE.PlaneGeometry(
  blockSize/* / scale*/,
  blockSize/* / scale*/,
  blockSize/* / scale*/,
);

const boundingPlaneBlockingType = WorldData.boundingPlaneBlockingType;

class Block {
  constructor(x, y, z, chunk, chunkNumber, name) {
    const blockInfo = World.getBlockInfo(name);
    const texture = BlockTextures[blockInfo.location];
    const map = blockInfo.dimensions;

    this.blockInfo = blockInfo;

    //will not be used if renderBlock is set to false
    this.renderInfo = {
      texture,
      map,
    };

    //chunk location
    this.chunkX = chunkNumber % worldSize.width;
    this.chunkY = Math.floor(chunkNumber / (worldSize.width * worldSize.depth));
    this.chunkZ = Math.floor(chunkNumber / worldSize.width) - this.chunkY * worldSize.depth;

    //original chunk number
    this.chunkNumber = chunkNumber;

    this.parentChunk = chunk;

    //world location
    this.worldX = x + chunkWidth * this.chunkX;
    this.worldY = y + chunkHeight * this.chunkY;
    this.worldZ = z + chunkDepth * this.chunkZ;

    //location within chunk
    this.localX = x;
    this.localY = y;
    this.localZ = z;


    this.mechanics = blockInfo.mechanics;

    this.blockName = name;
  }

  replace(newBlockName) {
    World.setBlock(this.worldX, this.worldY, this.worldZ, newBlockName);

    this.parentChunk.update();

    const savedChunkNumbers = [this.parentChunk.chunkNumber];
    this.getSurroundingChunks().forEach(chunk => {
      if (chunk && !savedChunkNumbers.includes(chunk.chunkNumber)) {
        chunk.update();
        savedChunkNumbers.push(chunk.chunkNumber);
      }
    });
  }

  getSurroundingBlocks() {
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

  getSurroundingChunks() {
    return [
      World.getChunkByWorldCoords(this.worldX, this.worldY + 1, this.worldZ),
      World.getChunkByWorldCoords(this.worldX, this.worldY - 1, this.worldZ),

      World.getChunkByWorldCoords(this.worldX + 1, this.worldY, this.worldZ),
      World.getChunkByWorldCoords(this.worldX - 1, this.worldY, this.worldZ),

      World.getChunkByWorldCoords(this.worldX, this.worldY, this.worldZ + 1),
      World.getChunkByWorldCoords(this.worldX, this.worldY, this.worldZ - 1),
    ];
  }

  listPlanes() {
    if (!this.blockInfo.renderBlock) {
      return;
    }

    const surroundingBlocks = this.getSurroundingBlocks();


    for (let i = 0; i < 3; i++) {
      this.renderInfo.map[i].forEach((side, index) => {

        //checks if block is of plane blocking type
        if (!surroundingBlocks[i][index]) {
          if (boundingPlaneBlockingType === "block") {
            return;
          }
        } else if (
          World.getPlaneBlockingType(surroundingBlocks[i][index].blockName) === "block"
        ) {
          return;
        }

        const textureData = side.split(":");

        const material = this.renderInfo.texture
          ? this.renderInfo.texture[side]
          : BlockTextures[textureData[0]][textureData[1]];


        const plane = new THREE.Mesh(PlaneGeometry);

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
          (index * offsetX + this.localX * blockSize + this.chunkX * chunkWidth * blockSize + half)/* / scale*/,
          (index * offsetY + this.localY * blockSize + this.chunkY * chunkHeight * blockSize + half)/* / scale*/,
          (index * offsetZ + this.localZ * blockSize + this.chunkZ * chunkDepth * blockSize + half)/* / scale*/,
        );

        plane.updateMatrix();

        this.parentChunk.renderList.blocks.push([plane.geometry, plane.matrix]);
        plane.geometry.dispose();
        plane.material.dispose();

        this.parentChunk.textureList.blocks.push(material);
      });
    }
  }
}

export default Block;