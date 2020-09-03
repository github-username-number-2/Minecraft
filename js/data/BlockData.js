export default {
  size: 1.1,

  blocks: {
    /*
      {
        blocksPerPlane: number of blocks per side

        location: default texture location
        [top, bottom],
        [xAxisLeft, xAxisRight],
        [zAxisLeft, zAxisRight],
      }

      {
        blocksPerPlane: number of blocks per side

        location: null,
        dimensions: [
          ["blockname:top", "blockname:bottom"],
          ["blockname:side", "blockname:side"],
          ["blockname:side", "blockname:side"],
        ],
      }
    */

    dirt: {
      blocksPerPlane: 1,

      location: "dirt",
      dimensions: [
        ["top", "bottom"],
        ["side", "side"],
        ["side", "side"],
      ],
    },
    stone: {
      blocksPerPlane: 1,

      location: "stone",
      dimensions: [
        ["side", "side"],
        ["side", "side"],
        ["side", "side"],
      ],
    },
  },
};