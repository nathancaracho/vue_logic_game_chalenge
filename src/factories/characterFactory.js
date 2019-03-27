export default (() => {
  const tileSize = 32;

  const linkLeft = {
    initialX: 345,
    initialY: 77,
    srcWidth: tileSize,
    srcHeight: tileSize,
    x: 1,
    y: 3,
    spriteCount: 5
  };
  return {
    linkLeft: () => {
      return linkLeft;
    }
  };
})();
