export default {
  size: 1.1,

  blocks: {
    /*
      {
        blocksPerPlane: number of blocks per side,

        location: default texture location,
        [top, bottom],
        [xAxisLeft, xAxisRight],
        [zAxisLeft, zAxisRight],
      }

      {
        blocksPerPlane: number of blocks per side,

        location: null,
        dimensions: [
          ["blockname:top", "blockname:bottom"],
          ["blockname:side", "blockname:side"],
          ["blockname:side", "blockname:side"],
        ],

        mechanics: {
          type: solid, liquid or transparent,

          planeLoadType: blocked if unnecessary planes should not be loaded else set to full,
          planeBlockType: block if this will block other block's planes from loading else set to allow,
        },
      }
    */

    air: {
      renderBlock: false,

      mechanics: {
        collisionType: "transparent",

        planeBlockType: "allow",
      },
    },

    dirt: {
      renderBlock: true,

      location: "dirt",
      dimensions: [
        ["top", "bottom"],
        ["side", "side"],
        ["side", "side"],
      ],

      mechanics: {
        collisionType: "solid",

        planeLoadType: "blocked",
        planeBlockType: "block",
      },
    },
    stone: {
      renderBlock: true,

      location: "stone",
      dimensions: [
        ["side", "side"],
        ["side", "side"],
        ["side", "side"],
      ],

      mechanics: {
        collisionType: "solid",

        planeLoadType: "blocked",
        planeBlockType: "block",
      },
    },
  },
};