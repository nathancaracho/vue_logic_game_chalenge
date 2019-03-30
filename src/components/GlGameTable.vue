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
      let callNextAction = false;

      const getDirection = ({ list, direction }) => {
        return list[list.indexOf(direction) + 1] || list[0];
      };
      const clone = obj => JSON.parse(JSON.stringify(obj));

      const applyRules = (sprite, oldSprite) => {
        const maxSize = this.tileSize * (this.matrixSize - 1);
        let cloneSprite = clone(sprite);

        const outOfBound = sprite => {
          if (sprite.x < 0) sprite.x = 0;
          else if (sprite.x > maxSize) sprite.x = maxSize;
          else if (sprite.y < 0) sprite.y = 0;
          else if (sprite.y > maxSize) {
            sprite.y = maxSize;
          }
          return sprite;
        };

        const walkableTile = (sprite, oldSprite) => {
          const x = Math.floor(sprite.x / this.tileSize);
          const y = Math.floor(sprite.y / this.tileSize);
          if (!this.tileList[y][x].isWalkable) {
            sprite.x = oldSprite.x;
            sprite.y = oldSprite.y;
          }
          return sprite;
        };
        cloneSprite = outOfBound(cloneSprite);
        cloneSprite = walkableTile(cloneSprite, oldSprite);
        return cloneSprite;
      };

      const walk = (sprite, pixelFrame = this.tileSize / 8) => {
        const walkByDirection = {
          left: { x: sprite.x - pixelFrame },
          top: { y: sprite.y - pixelFrame },
          right: { x: sprite.x + pixelFrame },
          bottom: { y: sprite.y + pixelFrame }
        };
        const position = walkByDirection[sprite.direction];

        callNextAction = !Number(
          (position[Object.getOwnPropertyNames(position)[0]] / this.tileSize)
            .toFixed(2)
            .split(".")[1]
        );
        return applyRules(Object.assign(clone(sprite), position), sprite);
      };

      const anim = async () => {
        if (maxFrame < 1000) {
          if (sprite && countFrame < sprite.spriteCount) countFrame++;
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
                callNextAction = true;
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
                callNextAction = true;
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
            if (callNextAction || !sprite.srcPosx)
              sprite.srcPosx = sprite.initialX;
            else
              sprite.srcPosx = sprite.initialX + sprite.srcWidth * countFrame;
            sprite.srcPosY = sprite.initialY;
            if (callNextAction) actions = actions.slice(1);
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

