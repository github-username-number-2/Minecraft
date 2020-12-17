import Player from "/js/main/Globals/Player.js";

import UIData from "/js/data/UIData.js";

const {
  hotbarScale,
  hotbarItemOpacity,
  hotbar,
  icons,
  iconIndexOffset,
  iconXOffset,
  iconYOffset,
  hotbarSelected,
  selectorIndexOffset,
  selectorXOffset,
  selectorYOffset,
} = UIData;

export default function renderUI(deltaTime) {
  ctx2D.clearRect(0, 0, canvas2D.width, canvas2D.height);
  ctx2D.fillStyle = "#b5b5b5";
  ctx2D.fillRect(
    canvas2D.width / 2 - 0.5,
    canvas2D.height / 2 - 6,
    1,
    12,
  );
  ctx2D.fillRect(
    canvas2D.width / 2 - 5,
    canvas2D.height / 2 - 0.5,
    10,
    1,
  );

  ctx2D.fillStyle = "#000000";
  ctx2D.font = "8px Arial";
  ctx2D.fillText("FPS: " + Math.round(1000 / deltaTime), 8, 15);

  ctx2D.drawImage(
    Images.hotbar,
    hotbar[0] * hotbarScale,
    hotbar[1] * hotbarScale,
    hotbar[2] * hotbarScale,
    hotbar[3] * hotbarScale,
  );
  ctx2D.drawImage(
    Images.hotbarSelected,
    (hotbarSelected[0] + (hotbar[3] + selectorIndexOffset) * Player.hotbarSelectNumber + selectorXOffset) * hotbarScale,
    (hotbarSelected[1] + selectorYOffset) * hotbarScale,
    hotbarSelected[2] * hotbarScale,
    hotbarSelected[3] * hotbarScale,
  );
  ctx2D.globalAlpha = hotbarItemOpacity;
  Player.hotbar.forEach((blockName, index) => {
    blockName && ctx2D.drawImage(
      Images[blockName],
      (hotbar[0] + (hotbar[3] + iconIndexOffset) * index + (hotbar[3] - icons.size) / 2 + iconXOffset) * hotbarScale,
      (hotbar[1] + (hotbar[3] - icons.size) / 2 + iconYOffset) * hotbarScale,
      icons.size * hotbarScale,
      icons.size * hotbarScale,
    );
  });
  ctx2D.globalAlpha = 1;
}