<template>
  <div
    @mousedown="changeElementClicked"
    @mouseup="changeElementClicked"
    :class="`list__item ${draggable?'list__item--draggable':''}`"
    :style="`background-color:${backgroundColor}`"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GlListItem",

  computed: mapState(["position"]),
  props: {
    draggable: { type: Boolean, default: true, required: false },
    backgroundColor: { type: String, required: false },
    action: { type: String, required: false }
  },
  watch: {
    position: function(newValue) {
      if (this.$store.state.modifiedElement == this.$el) {
        const style = this.$el.style;
        style.position = "absolute";
        style.left = `${newValue.clientX - this.$el.offsetWidth / 2}px`;
        style.top = `${newValue.clientY - this.$el.offsetHeight / 2}px`;
        this.$el.action = this.action;
        this.$store.commit("addDraggedElement", this.$el);
      }
    }
  },
  methods: {
    changeElementClicked() {
      if (this.draggable) {
        this.$store.commit("changeElementClicked", this.$el);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list__item {
  align-self: flex-start;
  padding: 6px;
  border-radius: 5px;
  background-color: #009688;
  color: #ffffff;
  font-weight: bold;
  font-size: 12px;
  transition: box-shadow transform 0.2s ease-in-out;
  z-index: 99;
  cursor: no-drop;
  &--draggable {
    cursor: grab;
    &:active {
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
      transform: rotate(15deg);
    }
  }
}
</style>

