import Block from "./Block.js";


class Chunk {
  constructor(map, index, world) {
    this.BlockMap = map;

    this.chunkNumber = index;

    this.renderList = {
      blocks: [],
    };
    this.textureList = {
      blocks: [],
    };

    //surrounding chunks to update
    this.chunkList = [];


    map.forEach((yPlane, y) => {
      yPlane.forEach((xPlane, x) => {
        xPlane.forEach((zPlane, z) => {
          this.BlockMap[y][x][z] = new Block(x, y, z, this, index, zPlane, world);
        });
      });
    });
  }

  update() {
    this.LoadedMesh && scene.remove(this.LoadedMesh);
    
    for (const list in this.renderList) {
      this.renderList[list] = [];
    }
    for (const list in this.textureList) {
      this.textureList[list] = [];
    }

    this.BlockMap.forEach(yPlane => {
      yPlane.forEach(xPlane => {
        xPlane.forEach(zPlane => {
          zPlane.listPlanes();
        });
      });
    });

    const chunkGeometry = new THREE.Geometry();

    this.renderList.blocks.forEach((renderInfo, index) => {
      chunkGeometry.merge(renderInfo[0], renderInfo[1], index);
    });

    const chunkBufferGeometry = new THREE.BufferGeometry().fromGeometry(chunkGeometry);
    
    this.LoadedMesh = new THREE.Mesh(chunkBufferGeometry, this.textureList.blocks);

    this.LoadedMesh.name = "chunk";

    scene.add(this.LoadedMesh);
  }
}

export default Chunk;