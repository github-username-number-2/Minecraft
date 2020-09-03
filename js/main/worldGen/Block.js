import BlockData from "/js/data/BlockData.js";
import WorldData from "/js/data/WorldData.js";


const blockSize = BlockData.size, blocks = BlockData.blocks;

const chunkWidth = WorldData.size.chunks.width, chunkDepth = WorldData.size.chunks.depth;

const worldSize = WorldData.size;

const PlaneGeometry = new THREE.PlaneGeometry(
  blockSize,
  blockSize,
  blockSize
);

export default class Block {
  constructor(x, y, z, chunk, name, world) {
    this.getSurroundingBlocks(chunk, x, y, z, world)


    const blockInfo = blocks[name];
    const texture = BlockTextures[blockInfo.location];
    const map = blockInfo.dimensions;

    this.worldX = x;
    this.worldY = y;
    this.worldZ = z;

    //this.chunkX = ;
    //this.chunkY = ;
    //this.chunkZ = ;

    this.chunkLocX = chunk % worldSize.width * chunkWidth * blockSize;
    this.chunkLocZ = Math.floor(chunk / worldSize.depth) * chunkWidth * blockSize;

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
          index * offsetX + x * blockSize + this.chunkLocX,
          index * offsetY + y * blockSize,
          index * offsetZ + z * blockSize + this.chunkLocZ
        );

        plane.name = `block:${x},${y},${z}`;

        scene.add(plane);
      });
    }
  }

  update() {
    //
  }

  getSurroundingBlocks(world) {
    //console.log(this.chunk, this.x, this.y, this.z, world)
  }
}