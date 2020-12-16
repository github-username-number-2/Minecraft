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
      const image = images[imageNames[index]] = new Image(500, 500);
      image.onload = () => {
        load2dImage(index + 1);
      };
      image.src = "/images/" + imageList[imageNames[index]];
    }
    load2dImage(0);
  });
}