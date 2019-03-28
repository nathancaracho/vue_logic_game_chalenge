<template>
  <div class="table__game">
    <canvas class="canvas" ref="canvas" width="500" height="500"></canvas>
  </div>
</template>
<script>
export default {
  name: "GlGameTable",
  data() {
    return {
      canvas: null,
      ctx: null,
      tileSize: null,
      image: null
    };
  },
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
    },
    matrixSize: {
      type: Number,
      required: false,
      default: 6
    }
  },
  methods: {
    drawImage({
      src,
      srcPosx,
      srcPosY,
      srcWidth,
      srcHeight,
      x,
      y,
      width,
      height
    }) {
      this.ctx.drawImage(
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
    },
    spriteDraw({ image }) {
      let countFrame = 0;
      let maxFrame = 0;
      let sprite = JSON.parse(JSON.stringify(this.sprite));

      sprite.x = sprite.x * this.tileSize;
      sprite.y = sprite.y * this.tileSize;
      sprite.srcPosx = sprite.initialX;
      sprite.src = image;

      const actions = {
        walk: ({ direction = "left", nextTile, pixelFrame = 10, _sprite }) => {
          if (_sprite.x > nextTile * this.tileSize) {
            switch (direction) {
              case "left":
                return { x: (_sprite.x += -pixelFrame) };
            }
          }
        }
      };
      const anim = () => {
        if (maxFrame < 10000) {
          if (countFrame < this.sprite.spriteCount) countFrame++;
          else {
            countFrame = 0;
            sprite.srcPosx = sprite.initialX;
          }
          maxFrame++;
          if (countFrame > 1) sprite.srcPosx += sprite.srcWidth;
          sprite.srcPosY = sprite.initialY;
          sprite = Object.assign(
            sprite,
            actions.walk({ nextTile: 0, _sprite: sprite })
          );
          sprite.height = this.tileSize;
          sprite.width = this.tileSize;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.drawImage(sprite);
          setTimeout(anim, 1000 / 12);
        }
      };
      anim();
    },
    backgroundDraw({ image }) {
      this.tileList.forEach((colList, col) => {
        colList.forEach((tile, row) => {
          tile.src = image;
          tile.height = this.tileSize;
          tile.width = this.tileSize;
          tile.y = this.tileSize * col;
          tile.x = this.tileSize * row;
          this.drawImage(tile);
        });
      });
    },
    draw() {
      const image = new Image();
      image.src = require(`../assets/${this.src}`);
      image.addEventListener("load", () => {
        if (this.tileList) {
          this.backgroundDraw({ image });
        } else if (this.sprite) {
          this.spriteDraw({ image });
        }
      });
    }
  },
  mounted() {
    this.canvas = this.$refs["canvas"];
    this.ctx = this.canvas.getContext("2d");
    this.tileSize = this.canvas.width / this.matrixSize;

    this.draw();
  }
};
</script>
<style lang="scss" scoped>
.canvas {
  position: absolute;
  left: 0;
}
</style>

