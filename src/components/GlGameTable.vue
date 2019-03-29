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
      image: null,
      actionList: null
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
    },
    actions: {
      type: Array,
      required: false
    }
  },
  watch: {
    actions() {
      this.draw();
    }
  },
  methods: {
    clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
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
      new Promise(resolve => {
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
        resolve();
      });
    },
    spriteDraw({ image }) {
      const directionList = ["left", "top", "right", "bottom"];
      let countFrame = 0;
      let maxFrame = 0;
      let direction = directionList[0];
      let position = { x: 0, y: 0 };

      this.actionList = this.actions;

      const getDirection = list =>
        (direction = list[list.indexOf(direction) + 1] || list[0]);
      const actions = {
        walk(position) {
          const pixelFrame = 83;
          const walkByDirection = {
            left: { x: position.x - pixelFrame },
            top: { y: position.y - pixelFrame },
            right: { x: position.x + pixelFrame },
            bottom: { y: position.y + pixelFrame }
          };
          return Object.assign(position, walkByDirection[direction]);
        },
        turnLeft() {
          getDirection(directionList.reverse());
        },
        turnRight() {
          getDirection(directionList);
        }
      };
      const anim = async () => {
        let sprite = {};

        if (maxFrame < 30) {
          if (countFrame < this.sprite.spriteCount) countFrame++;
          else countFrame = 0;

          if (countFrame > 1) sprite.srcPosx += sprite.srcWidth;
          maxFrame++;

          position = actions[this.actionList[0]](position) || position;

          sprite = Object.assign(this.clone(this.sprite[direction]), position);
          console.log(position, direction);
          sprite.src = image;
          sprite.srcPosx = sprite.initialX;
          sprite.srcPosY = sprite.initialY;

          sprite = Object.assign(sprite, position);

          this.actionList = this.actionList.slice(1);

          sprite.height = this.tileSize;
          sprite.width = this.tileSize;

          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          await this.drawImage(sprite);
          if (this.actionList.length) setTimeout(anim, 1000 / 12);
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
  left: 50%;
  transform: translateX(-50%);
}
</style>

