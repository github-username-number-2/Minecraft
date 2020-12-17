export default {
  boundingCollisionType: "solid",
  boundingPlaneBlockingType: "allow",

  //blockMaterialType: THREE.MeshLambertMaterial,
  blockMaterialType: THREE.MeshBasicMaterial,

  size: {
    //measured in chunks
    //should multiply to get total chunks
    width: 4,
    height: 4,
    depth: 4,
    
    chunks: {
      //measured in blocks
      width: 8,
      height: 8,
      depth: 8,
    },
  }
};