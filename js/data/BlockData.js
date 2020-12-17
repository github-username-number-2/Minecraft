const solidMechanics = {
  mechanics: {
    collisionType: "solid",

    planeLoadType: "blocked",
    planeBlockType: "block",

    playerCrosshairBlocking: true,
  },
};

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

        location: default image location or set to null to specify,
        blockType = block, cross, or custom,
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

    grass: {
      renderBlock: true,

      location: "grass",
      blockType: "block",
      dimensions: [
        ["top", "bottom"],
        ["side", "side"],
        ["side", "side"],
      ],

      ...solidMechanics,
    },

    dirt: {
      renderBlock: true,

      location: "grass",
      blockType: "block",
      dimensions: [
        ["bottom", "bottom"],
        ["bottom", "bottom"],
        ["bottom", "bottom"],
      ],

      ...solidMechanics,
    },

    stone: {
      renderBlock: true,

      location: "stone",
      blockType: "block",
      dimensions: [
        ["side", "side"],
        ["side", "side"],
        ["side", "side"],
      ],

      ...solidMechanics,
    },

    cobblestone: {
      renderBlock: true,

      location: "cobblestone",
      blockType: "block",
      dimensions: [
        ["side", "side"],
        ["side", "side"],
        ["side", "side"],
      ],

      ...solidMechanics,
    },

    stoneBricks: {
      renderBlock: true,

      location: "stoneBricks",
      blockType: "block",
      dimensions: [
        ["side", "side"],
        ["side", "side"],
        ["side", "side"],
      ],

      ...solidMechanics,
    },

    oakWood: {
      renderBlock: true,

      location: "oakWood",
      blockType: "block",
      dimensions: [
        ["top", "top"],
        ["side", "side"],
        ["side", "side"],
      ],

      ...solidMechanics,
    },

    oakPlanks: {
      renderBlock: true,

      location: "oakPlanks",
      blockType: "block",
      dimensions: [
        ["side", "side"],
        ["side", "side"],
        ["side", "side"],
      ],

      ...solidMechanics,
    },

    bedrock: {
      renderBlock: true,

      location: "bedrock",
      blockType: "block",
      dimensions: [
        ["side", "side"],
        ["side", "side"],
        ["side", "side"],
      ],

      ...solidMechanics,
    },

    redstoneTorch: {
      renderBlock: true,

      location: "redstoneTorch",
      blockType: "cross",
      dimensions: [
        "side",
        "side",
      ],

      ...solidMechanics,
    },

    notblockedgames: {
      renderBlock: true,

      location: "notblockedgames",
      blockType: "block",
      dimensions: [
        ["top", "top"],
        ["side", "side"],
        ["side", "side"],
      ],

      ...solidMechanics,
    },
  },
};