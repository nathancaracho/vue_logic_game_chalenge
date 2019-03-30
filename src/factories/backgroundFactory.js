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
      [grass, water, grassRock, water, grass, grass],
      [water, water, water, grass, grass, grass],
      [water, grass, water, water, grass, grass],
      [water, grass, water, grass, grassWood, grass],
      [water, grass, grass, water, grass, grass],
      [water, grass, grass, grass, grass, grass]
    ]
  };
})();
