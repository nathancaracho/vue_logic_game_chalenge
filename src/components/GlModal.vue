<template>
  <div class="modal" :class="show?'modal--active':''">
    <div class="modal__header">
      <h3>
        <v-icon class="header__brand__logo__icon_cube" name="grin-squint"/>&nbsp;parabéns você conseguiu.
        <v-icon class="header__brand__logo__icon_cube" name="grin-squint"/>
      </h3>
    </div>
    <div class="modal__body">
      <h3>Muito Obrigado por Jogar</h3>
      <img class="modal__body_rupee" src="../assets/rupee.gif" alt="rupee">
      <button class="modal__body_button" @click="reload">Jogar novamente</button>
    </div>
  </div>
</template>
<script>
import "vue-awesome/icons/grin-squint";

export default {
  name: "GlModal",
  props: {
    show: {
      required: true,
      default: false
    }
  },
  methods: {
    reload() {
      location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/components/button.scss";
@import "../assets/style/utils/display.scss";

.body__child {
  align-self: center;
}
.modal {
  position: absolute;
  @extend .flex--column;
  width: 400px;
  height: 300px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -400%);
  opacity: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 999;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  & > * {
    padding: 15px;
  }
  & > .modal__header {
    display: flex;
    border-bottom: 1px dashed #000;
    & > h3 {
      margin: 0 auto;
    }
  }
  & > .modal__body {
    @extend .flex--column;
    height: 70%;
    & > .modal__body_rupee {
      @extend .body__child;
      width: 50px;
      margin: 0 auto;
    }
    & > .modal__body_button {
      @extend .body__child;
      @extend .button;
      margin-top: auto;
    }
  }
  &.modal--active {
    transform: translate(-50%, -100%);
    opacity: 1;
  }

}
</style>

