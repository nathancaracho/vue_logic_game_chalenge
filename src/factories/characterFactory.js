export default (() => {
  const tileSize = 32;
  const spriteCount = 9;
  const linkLeft = {
    initialX: 344,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    direction: "left",
    spriteCount
  };
  const linkRight = {
    initialX: 474,
    initialY: 109,
    srcWidth: tileSize,
    srcHeight: tileSize,
    direction: "right",
    spriteCount
  };
  const linkTop = {
    initialX: 674,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    direction: "top",
    spriteCount
  };
  const linkBottom = {
    initialX: 10,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    direction: "bottom",
    spriteCount
  };
  return {
    link: {
      left: linkLeft,
      right: linkRight,
      top: linkTop,
      bottom: linkBottom,
      startOn: "left",
      x: 5,
      y: 5
    }
  };
})();
