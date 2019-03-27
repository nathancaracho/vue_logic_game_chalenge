<template>
  <div class="table__game">
    <canvas ref="canvas" width="500" height="500"></canvas>
  </div>
</template>
<script>
export default {
  name: "GlGameTable",
  props: {
    src: {
      type: String,
      required: true
    },
    tileList: {
      type: Array,
      required: false
    },
    sprite: {
      type: Object,
      required: false
    }
  },
  mounted() {
    const canvas = this.$refs["canvas"];
    const ctx = canvas.getContext("2d");
    const matrixSize = 6;
    const tileSize = canvas.width / matrixSize;
    const drawImage = ({
      src,
      srcPosx,
      srcPosY,
      srcWidth,
      srcHeight,
      x,
      y,
      width,
      height
    }) => {
      ctx.drawImage(
        src,
        srcPosx,
        srcPosY,
        srcWidth,
        srcHeight,
        x,
        y,
        width,
        height
      );
    };

    const image = new Image();
    image.src = require(`../assets/${this.src}`);
    image.addEventListener("load", () => {
      if (this.tileList) {
        this.tileList.forEach((colList, col) => {
          colList.forEach((tile, row) => {
            tile.src = image;
            tile.height = tileSize;
            tile.width = tileSize;
            tile.y = tileSize * col;
            tile.x = tileSize * row;
            drawImage(tile);
          });
        });
      } else if (this.sprite) {
        let countFrame = 0;
        let maxFrame = 0;
        const anim = () => {
          if (maxFrame < 120) {
            if (countFrame < this.sprite.spriteCount) countFrame++;
            else countFrame = 0;
            maxFrame++;
            ctx.clearRect(canvas.width, canvas.height, 0, 0);
            const sprite = JSON.parse(JSON.stringify(this.sprite));
            sprite.srcPosx = sprite.initialX + tileSize * countFrame;
            sprite.srcPosY = sprite.initialY;
            sprite.x = sprite.x * tileSize;
            sprite.y = sprite.y * tileSize;
            sprite.height = tileSize;
            sprite.width = tileSize;
            sprite.src = image;

            drawImage(sprite);
            this.sprite.initialX = sprite.srcPosx;
            setTimeout(anim(), 1000 / 12);
          }
        };
        anim();
      }
    });
  }
};
</script>
<style lang="scss" scoped>
canvas {
  position: absolute;
  left: 0;
}
</style>

