export default {
  airName: "air",

  boundingCollisionType: "solid",
  boundingPlaneBlockingType: "allow",

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