const TextureLoader = new THREE.TextureLoader();

export default function loadImages(image) {
  return new Promise(resolve => {
    TextureLoader.load(image, resolve);
  });
}