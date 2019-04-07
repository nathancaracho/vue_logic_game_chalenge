<template>
  <div class="timeLine">
    <div class="timeLine__background"></div>
    <h3 class="timeLine__title">Linha do tempo</h3>
    <div class="timeLine__content--center">
      <gl-list-item :draggable="false" background-color="#6ea7c6">Personagem</gl-list-item>
      <div ref="timeLine__bar" class="timeLine__bar"></div>
    </div>
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
.timeLine {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #80cbc455;
  border: 1px dashed #aaa;
  border-radius: 5px;
  .timeLine__content--center {
    display: flex;
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
      z-index: 9;
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
        z-index: 9;
      }
    }
  }
}
</style>
