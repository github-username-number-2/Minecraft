import loadImage from "/js/main/loaders/imageLoader.js";
import textures from "/js/data/ImageData/BlockTextures.js";


//returns new object with loaded images
const Textures = textures;
export default async function loadTextures() {
  for (const block in textures) {
    for (const side in textures[block]) {
      const image = await loadImage(textures[block][side]);
      const texture = new THREE.CanvasTexture(image);
      
      Textures[block][side] = new THREE.MeshBasicMaterial({
        map: image
      });
    }
  }

  return Textures;
}