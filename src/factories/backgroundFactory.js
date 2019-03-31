export default (() => {
  const tileSize = 32;
  const grass = {
    srcPosx: 107,
    srcPosY: 132,
    srcWidth: tileSize,
    srcHeight: tileSize,
    isWalkable: true
  };
  const grassRock = {
    srcPosx: 140,
    srcPosY: 165,
    srcWidth: tileSize,
    srcHeight: tileSize
  };
  const water = {
    srcPosx: 371,
    srcPosY: 231,
    srcWidth: tileSize,
    srcHeight: tileSize
  };
  const grassWood = {
    srcPosx: 140,
    srcPosY: 231,
    srcWidth: tileSize,
    srcHeight: tileSize
  };

  return {
    easy: [
      [grass, grass, grassWood, grass, grassRock, grassWood],
      [water, grass, grass, grass, grass, water],
      [water, water, water, grass, water, water],
      [water, water, water, grass, water, water],
      [water, grassWood, grassRock, grass, water, grassWood],
      [water, water, grass, grass, grass, grass]
    ]
  };
})();
