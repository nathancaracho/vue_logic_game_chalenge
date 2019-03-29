<template>
  <div class="timeLine">
    <h2>Linha do tempo</h2>
    <gl-list-item class="blink" :draggable="false" background-color="#6ea7c6">Personagem</gl-list-item>
    <div ref="timeLine__bar" class="timeLine__bar"></div>
  </div>
</template>
<script>
import GlListItem from "../components/GlListItem";

export default {
  name: "GlTimeLine",
  components: { GlListItem },
  mounted() {
    const { offsetLeft, offsetTop, offsetHeight } = this.$refs["timeLine__bar"];
    this.$store.commit("setCodeWorkPlaceLine", {
      x: offsetLeft,
      y: offsetTop,
      height: offsetHeight
    });
  }
};
</script>
<style lang="scss" scoped>
.blink {
  animation: blink 0.8s infinite;
}
@keyframes blink {
  0% {
    box-shadow: 0px 0px 6px #6ea7c6;
  }

  100% {
    box-shadow: 0px 0px 20px #6ea7c6;
  }
}
.timeLine {
  display: flex;
  flex: 2;
  height: 95%;
  flex-direction: column;
  & > * {
    align-self: center;
  }

  & > .timeLine__bar {
    position: relative;
    width: 5px;
    height: 100%;
    background-color: #6ea7c6;
    @extend .blink;
    z-index: 0;
    &:after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: #6ea7c6;
      border-radius: 100%;
      @extend .blink;
    }
  }
}
</style>
