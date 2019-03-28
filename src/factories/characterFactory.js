export default (() => {
  const tileSize = 32;
  const linkLeft = {
    initialX: 344,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    x: 5,
    y: 0,
    spriteCount: 9
  };
  const linkRight = {
    initialX: 474,
    initialY: 109,
    srcWidth: tileSize,
    srcHeight: tileSize,
    x: 0,
    y: 0,
    spriteCount: 9
  };
  return {
    linkLeft,
    linkRight
  };
})();
