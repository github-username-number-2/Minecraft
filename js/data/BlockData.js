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

          playerCrosshairBlocking: true if this block will block the player's aim else set to false
        },
      }
    */

    air: {
      renderBlock: false,

      location: null,
      dimensions: null,

      mechanics: {
        collisionType: "transparent",

        planeBlockType: "allow",
        planeLoadType: null,

        playerCrosshairBlocking: false,
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

        playerCrosshairBlocking: true,
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

        playerCrosshairBlocking: true,
      },
    },

    oakWood: {
      renderBlock: true,

      location: "oakWood",
      dimensions: [
        ["top", "top"],
        ["side", "side"],
        ["side", "side"],
      ],

      mechanics: {
        collisionType: "solid",

        planeLoadType: "blocked",
        planeBlockType: "block",

        playerCrosshairBlocking: true,
      },
    },
  },
};