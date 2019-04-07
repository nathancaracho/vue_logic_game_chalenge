<script>
import GlGameTable from "./GlGameTable";
export default {
  name: "GlBackground",
  extends: GlGameTable,
  methods: {
    draw() {
      const image = new Image();
      image.src = require(`../../assets/${this.src}`);
      image.addEventListener("load", () => {
        if (this.tileList) this.backgroundDraw({ image });
      });
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
    }
  }
};
</script>