export default (() => {
  const tileSize = 32;
  const linkLeft = {
    initialX: 344,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    x: 4,
    y: 3,
    spriteCount: 9
  };
  const linkRight = {
    initialX: 474,
    initialY: 109,
    srcWidth: tileSize,
    srcHeight: tileSize,
    x: 4,
    y: 3,
    spriteCount: 9
  };
  const linkTop = {
    initialX: 674,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    x: 4,
    y: 3,
    spriteCount: 9
  };
  const linkBottom = {
    initialX: 10,
    initialY: 44,
    srcWidth: tileSize,
    srcHeight: tileSize,
    x: 4,
    y: 3,
    spriteCount: 9
  };
  return {
    link: {
      left: linkLeft,
      right: linkRight,
      top: linkTop,
      bottom: linkBottom
    }
  };
})();
