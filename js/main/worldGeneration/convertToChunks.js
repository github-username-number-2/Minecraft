export default function convertToChunks(world, chunkWidth, chunkHeight, chunkDepth, worldSize, progressUpdate) {
  const mappedWorld = [], chunkCount = worldSize.width * worldSize.height * worldSize.depth;

  Lodash.times(chunkCount, chunkIndex => {
    let chunk = [];

    chunk.length = chunkHeight;
    chunk = chunk.fill().map(() => []);

    chunk.forEach((yAxis, yIndex) => {
      yAxis.length = chunkWidth;
      chunk[yIndex] = yAxis = yAxis.fill().map(() => []);

      yAxis.forEach((xAxis, xIndex) => {
        xAxis.length = chunkDepth;
        yAxis[xIndex] = xAxis = xAxis.fill();

        xAxis.forEach((zAxis, zIndex) => {
          const chunkX = chunkIndex % worldSize.width;
          const chunkY = Math.floor(chunkIndex / (worldSize.width * worldSize.depth));
          const chunkZ = Math.floor(chunkIndex / worldSize.width) - chunkY * worldSize.depth;

          const worldX = chunkX * chunkWidth + xIndex % chunkWidth;
          const worldY = chunkY * chunkHeight + yIndex % chunkHeight;
          const worldZ = chunkZ * chunkDepth + zIndex % chunkDepth;
        
          xAxis[zIndex] = world[worldY][worldX][worldZ];
        });
      });
    });
    mappedWorld.push(chunk);

    progressUpdate({
      progressType: "Formatting World",
      progressPercent: (chunkIndex / chunkCount).toFixed(2),
    });
  });
  
  return mappedWorld;
}