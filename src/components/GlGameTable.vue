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
      let actions = this.actions;
      let sprite = null;

      const getDirection = ({ list, direction }) => {
        return list[list.indexOf(direction) + 1] || list[0];
      };
      const clone = obj => JSON.parse(JSON.stringify(obj));
      const walk = (sprite, pixelFrame = 83) => {
        const walkByDirection = {
          left: { x: sprite.x - pixelFrame },
          top: { y: sprite.y - pixelFrame },
          right: { x: sprite.x + pixelFrame },
          bottom: { y: sprite.y + pixelFrame }
        };
        return Object.assign(clone(sprite), walkByDirection[sprite.direction]);
      };

      const anim = async () => {
        if (maxFrame < 1000) {
          if (countFrame < this.sprite.spriteCount) countFrame++;
          else countFrame = 0;

          if (countFrame > 1) sprite.srcPosx += sprite.srcWidth;
          maxFrame++;
          if (!sprite) {
            sprite = this.sprite[this.sprite.startOn];
            sprite.x = this.sprite.x * this.tileSize;
            sprite.y = this.sprite.y * this.tileSize;
            sprite.srcPosx = sprite.initialX;
            sprite.srcPosY = sprite.initialY;
          } else {
            const getSprite = newSprite => {
              delete newSprite.x;
              delete newSprite.y;
              return Object.assign(clone(sprite), clone(newSprite));
            };
            switch (actions[0]) {
              case "turnLeft":
                sprite = getSprite(
                  this.sprite[
                    getDirection({
                      list: directionList,
                      direction: sprite.direction
                    })
                  ]
                );
                break;
              case "turnRight":
                sprite = getSprite(
                  this.sprite[
                    getDirection({
                      list: clone(directionList).reverse(),
                      direction: sprite.direction
                    })
                  ]
                );

                break;
              case "walk":
                sprite = walk(sprite);
                break;
            }
            sprite.srcPosx = sprite.initialX;
            sprite.srcPosY = sprite.initialY;

            actions = actions.slice(1);
          }
          sprite.src = image;
          sprite.height = this.tileSize;
          sprite.width = this.tileSize;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          await this.drawImage(sprite);
          if (actions.length) setTimeout(anim, 1000 / 12);
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
        if (this.sprite) this.spriteDraw({ image });
        else if (this.tileList) this.backgroundDraw({ image });
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

