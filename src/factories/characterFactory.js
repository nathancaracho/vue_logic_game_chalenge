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

  const swimmingLeft = {
    initialX: 342,
    initialY: 2935,
    srcWidth: tileSize,
    srcHeight: tileSize,
    spriteCount: 7
  };
  const swimmingTop = {
    initialX: 10,
    initialY: 2974,
    srcWidth: tileSize,
    srcHeight: tileSize,
    spriteCount: 7
  };

  const swimmingBottom = {
    initialX: 566,
    initialY: 2974,
    srcWidth: tileSize,
    srcHeight: tileSize,
    spriteCount: 7
  };
  const swimmingRight = {
    initialX: 286,
    initialY: 2974,
    srcWidth: tileSize,
    srcHeight: tileSize,
    spriteCount: 7
  };
  return {
    link: {
      left: linkLeft,
      right: linkRight,
      top: linkTop,
      bottom: linkBottom,
      animation: {
        swimming: {
          left: swimmingLeft,
          top: swimmingTop,
          right: swimmingRight,
          bottom: swimmingBottom
        }
      },
      startOn: "left",
      x: 5,
      y: 5
    }
  };
})();
