import imageList from "/js/data/ImageList.js";

export default function load2dImages() {
  return new Promise(resolve => {
    const imageNames = Object.keys(imageList),
      images = {};
    
    function load2dImage(index) {
      if (!imageNames[index]) {
        resolve(images);
        return;
      }
      const loadTimeout = setTimeout(() => {
        throw new TypeError("Image to be loaded with path /image/" + imageList[imageNames[index]] + " was not found");
      }, 1000),
        image = images[imageNames[index]] = new Image(500, 500);
      
      image.onload = () => {
        clearTimeout(loadTimeout);
        load2dImage(index + 1);
      };
      image.src = "/images/" + imageList[imageNames[index]];
    }
    load2dImage(0);
  });
}