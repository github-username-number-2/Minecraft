export default {
  airName: "air",

  boundingCollisionType: "solid",
  boundingPlaneBlockingType: "block",

  size: {
    //measured in chunks
    //should multiply to get total chunks
    width: 2,
    height: 1,
    depth: 3,

    chunks: {
      //measured in blocks
      width: 6,
      height: 6,
      depth: 6,
    },
  }
};