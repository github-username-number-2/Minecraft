import Player from "/js/main/Globals/Player.js";

import UIData from "/js/data/UIData.js";

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
    ...UIData.hotbar,
  );
  ctx2D.drawImage(
    Images.hotbarSelected,
    UIData.hotbarSelected[0] + (UIData.hotbarSelected[2] - 4) * Player.hotbarSelectNumber,
    UIData.hotbarSelected[1],
    UIData.hotbarSelected[2],
    UIData.hotbarSelected[3],
  );
}