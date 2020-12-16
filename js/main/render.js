import {updateInput} from "/js/main/input/MovementHandeler.js";
import renderUI from "./renderUI.js";

let lastTime = 0, deltaTime;
function update(timestamp) {
  deltaTime = timestamp - lastTime;

  updateInput(deltaTime);
  renderUI(deltaTime);
  renderer.render(scene, camera);

  lastTime = timestamp;

  requestAnimationFrame(update);
}
requestAnimationFrame(update);