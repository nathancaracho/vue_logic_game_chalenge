<script>
import GlGameTable from "./GlGameTable";
export default {
  name: "GlItens",
  extends: GlGameTable,
  props: {
    sprite: {
      type: Object,
      required: true
    }
  },
  methods: {
    draw() {
      const image = new Image();
      image.src = require(`../../assets/${this.src}`);
      image.addEventListener("load", () => {
        if (this.sprite) this.drawSprite({ image });
      });
    },
    drawSprite({ image }) {
      this.sprite.frameCount = 0;
      const anim = () => {
        if (this.sprite.frameCount == this.sprite.maxFrameCount - 1)
          this.sprite.frameCount = 0;
        else this.sprite.frameCount++;
        this.sprite.src = image;
        this.sprite.height = this.tileSize;
        this.sprite.width = this.tileSize;
        this.sprite.srcPosx =
          this.sprite.initialX + this.sprite.srcWidth * this.sprite.frameCount;
        this.sprite.x = this.sprite.x * this.tileSize;
        this.sprite.y = this.sprite.y * this.tileSize;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawImage(this.sprite);
        setTimeout(anim, 1000 / 12);
      };
      anim();
    }
  }
};
</script>