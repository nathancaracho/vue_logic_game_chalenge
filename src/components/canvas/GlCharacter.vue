<script>
import GlGameTable from "./GlGameTable";

export default {
  name: "GlCharacter",
  extends: GlGameTable,
  props: {
    sprite: {
      type: Object,
      required: true
    },
    actions: {
      type: Array,
      required: true
    },
    target: {
      type: Object,
      required: false
    }
  },
  watch: {
    actions() {
      this.draw();
    }
  },
  methods: {
    draw() {
      const image = new Image();
      image.src = require(`../../assets/${this.src}`);
      image.addEventListener("load", () => {
        if (this.sprite) this.spriteDraw({ image });
      });
    },
    spriteDraw({ image }) {
      const clone = obj => JSON.parse(JSON.stringify(obj));

      const directionList = ["left", "top", "right", "bottom"];
      let countFrame = 0;
      let maxFrame = 0;
      let actions = clone(this.actions);
      let sprite = null;
      let animationSprite = null;

      const getDirection = ({ list, direction }) => {
        return list[list.indexOf(direction) + 1] || list[0];
      };

      const applyRules = sprite => {
        const maxSize = this.tileSize * (this.matrixSize - 1);
        let cloneSprite = clone(sprite);

        const outOfBound = sprite => {
          if (sprite.x < 0) {
            sprite.x = 0;
            sprite.callNextAction = true;
          } else if (sprite.x > maxSize) {
            sprite.x = maxSize;
            sprite.callNextAction = true;
          } else if (sprite.y < 0) {
            sprite.y = 0;
            sprite.callNextAction = true;
          } else if (sprite.y > maxSize) {
            sprite.y = maxSize;
            sprite.callNextAction = true;
          }
          return sprite;
        };

        const walkableTile = sprite => {
          const x = Math.round(sprite.x / this.tileSize);
          const y = Math.round(sprite.y / this.tileSize);
          if (!this.tileList[y][x].isWalkable) {
            animationSprite = clone(
              this.sprite.animation[this.tileList[y][x].animation][
                sprite.direction
              ]
            );
            if (animationSprite) {
              actions = ["animation"];
              countFrame = 0;
            }

            animationSprite.x = ((animationSprite.x || 0) + x) * this.tileSize;
            animationSprite.y = ((animationSprite.y || 0) + y) * this.tileSize;
            sprite.callNextAction = false;
          }
          return sprite;
        };
        const isTarget = (sprite, target = this.target) => {
          const getTile = value => Math.round(value / this.tileSize);
          return (
            getTile(sprite.x) == getTile(target.x) &&
            getTile(sprite.y) == getTile(target.y)
          );
        };

        cloneSprite = outOfBound(cloneSprite);
        cloneSprite = walkableTile(cloneSprite);
        if (isTarget(sprite)) {
          cloneSprite.callNextAction = true;
          this.$emit("onFinish");
        }
        return cloneSprite;
      };

      const walk = (sprite, pixelFrame = this.tileSize / 5) => {
        const walkByDirection = {
          left: { x: sprite.x - pixelFrame },
          top: { y: sprite.y - pixelFrame },
          right: { x: sprite.x + pixelFrame },
          bottom: { y: sprite.y + pixelFrame }
        };
        const position = walkByDirection[sprite.direction];

        sprite.callNextAction = !Number(
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
              newSprite.callNextAction = true;
              return Object.assign(clone(sprite), clone(newSprite));
            };
            switch (actions[0]) {
              case "turnLeft":
                sprite = getSprite(
                  this.sprite[
                    getDirection({
                      list: clone(directionList).reverse(),
                      direction: sprite.direction
                    })
                  ]
                );
                break;
              case "turnRight":
                sprite = getSprite(
                  this.sprite[
                    getDirection({
                      list: directionList,
                      direction: sprite.direction
                    })
                  ]
                );

                break;
              case "walk":
                sprite = walk(sprite);
                break;
              case "animation":
                sprite = clone(animationSprite);
                if (countFrame == sprite.spriteCount)
                  sprite.callNextAction = true;
                break;
            }

            if (sprite.callNextAction && !animationSprite)
              sprite.srcPosx = sprite.initialX;
            else
              sprite.srcPosx = sprite.initialX + sprite.srcWidth * countFrame;
            sprite.srcPosY = sprite.initialY;
            if (sprite.callNextAction) actions = actions.slice(1);
          }

          sprite.src = image;
          sprite.height = this.tileSize;
          sprite.width = this.tileSize;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          await this.drawImage(sprite);
          if (actions.length) setTimeout(anim, 1000 / 12);
          else this.$emit("onAbleExecute");
        }
      };
      anim();
    }
  }
};
</script>