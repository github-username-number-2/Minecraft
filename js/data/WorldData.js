export default {
  boundingCollisionType: "solid",
  boundingPlaneBlockingType: "allow",

  //blockMaterialType: THREE.MeshLambertMaterial,
  blockMaterialType: THREE.MeshBasicMaterial,

  size: {
    //measured in chunks
    //should multiply to get total chunks
    width: 2,
    height: 2,
    depth: 2,

    chunks: {
      //measured in blocks
      width: 8,
      height: 8,
      depth: 8,
    },
  }
};