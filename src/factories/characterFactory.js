export default (() => {
  const tileSize = 32;
  const spriteCount = 9;
  const shadow = true;
  const linkLeft = {
    initialX: 344,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    direction: "left",
    spriteCount,
    shadow
  };
  const linkRight = {
    initialX: 474,
    initialY: 109,
    srcWidth: tileSize,
    srcHeight: tileSize,
    direction: "right",
    spriteCount,
    shadow
  };
  const linkTop = {
    initialX: 674,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    direction: "top",
    spriteCount,
    shadow
  };
  const linkBottom = {
    initialX: 10,
    initialY: 75,
    srcWidth: tileSize,
    srcHeight: tileSize,
    direction: "bottom",
    spriteCount,
    shadow
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
    y: -1,
    spriteCount: 7
  };
  const swimmingRight = {
    initialX: 286,
    initialY: 2974,
    srcWidth: tileSize,
    srcHeight: tileSize,
    spriteCount: 7
  };
  const rollLeft = {
    initialX: 284,
    initialY: 1104,
    srcWidth: tileSize,
    srcHeight: tileSize,
    x: 1,
    spriteCount: 6,
    shadow
  };
  const rollTop = {
    initialX: 530,
    initialY: 1096,
    srcWidth: tileSize,
    srcHeight: tileSize,
    y: 1,
    spriteCount: 6,
    shadow
  };
  const rollRight = {
    initialX: 460,
    initialY: 1134,
    srcWidth: tileSize,
    srcHeight: tileSize,
    spriteCount: 6,
    shadow
  };
  const rollBottom = {
    initialX: 14,
    initialY: 1100,
    srcWidth: tileSize,
    srcHeight: tileSize,
    spriteCount: 6,
    shadow
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
        },
        roll: {
          left: rollLeft,
          top: rollTop,
          right: rollRight,
          bottom: rollBottom
        }
      },
      startOn: "left",
      x: 5,
      y: 5
    }
  };
})();
