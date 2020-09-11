export default {
  airName: "air",

  boundingCollisionType: "solid",
  boundingPlaneBlockingType: "allow",

  size: {
    //measured in chunks
    //should multiply to get total chunks
    width: 3,
    height: 1,
    depth: 3,

    chunks: {
      //measured in blocks
      width: 3,
      height: 8,
      depth: 3,
    },
  }
};