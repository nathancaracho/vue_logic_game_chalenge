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
      this.sprite.src = image;
      this.sprite.height = this.tileSize;
      this.sprite.width = this.tileSize;
      this.sprite.x = this.sprite.x * this.tileSize;
      this.sprite.y = this.sprite.y * this.tileSize;
      this.drawImage(this.sprite);
    }
  }
};
</script>