export default {
  movement: {
    controls: {
      forward: ["KeyW", "ArrowUp"],
      backward: ["KeyS", "ArrowDown"],
      left: ["KeyA", "ArrowLeft"],
      right: ["KeyD", "ArrowRight"],

      jump: ["Space"],
      crouch: ["ShiftLeft"],

      //hotbar 1-9
      hotbar: [
        ["Digit1"],
        ["Digit2"],
        ["Digit3"],
        ["Digit4"],
        ["Digit5"],
        ["Digit6"],
        ["Digit7"],
        ["Digit8"],
        ["Digit9"],
      ],
    },

    horizontalSpeed: 800,
    verticalSpeed: 600,
    lookSpeed: 800,

    defaultSpawnLocation: [6, 16, 6],
  },

  blockInteraction: {
    placementDistance: 3,
    breakDistance: 3,
  },

  defaultHotbar: [
    "grass",
    "dirt",
    "stone",
    "cobblestone",
    "stoneBricks",
    "oakPlanks",
    "oakWood",
    "bedrock",
    "notblockedgames",
  ],
};