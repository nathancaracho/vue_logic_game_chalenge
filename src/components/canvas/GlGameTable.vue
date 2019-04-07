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
      height,
      shadow
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
        if (shadow) {
          this.ctx.beginPath();
          this.ctx.ellipse(
            x + this.tileSize * 0.55,
            y + this.tileSize * 0.75,
            10,
            15,
            55,
            Math.PI * 2,
            1,
            Math.PI * 2
          );
          this.ctx.fillStyle = "#00000055";
          this.ctx.fill();
          this.ctx.closePath();
        }
        resolve();
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

