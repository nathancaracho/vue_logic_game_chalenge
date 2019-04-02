<template>
  <div class="modal" :class="show?'modal--active':''">
    <div class="modal__header">
      <h3>parabéns você conseguiu.</h3>
    </div>
    <div class="modal__body">
      <h3>Muito Obrigado por Jogar</h3>
      <img class="modal__body_rupee" src="../assets/rupee.gif" alt="rupee">
      <button class="modal__body_button" @click="reload">Jogar novamente</button>
    </div>
  </div>
</template>
<script>
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
.body__child {
  align-self: center;
}
.modal {
  position: absolute;
  display: flex;
  flex-direction: column;
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
  & > .modal__body {
    display: flex;
    flex-direction: column;
    & > .modal__body_rupee {
      @extend .body__child;
      width: 50px;
    }
    & > .modal__body_button {
      @extend .body__child;
      width: 100px;
    }
  }
  &.modal--active {
    transform: translate(-50%, -100%);
    opacity: 1;
  }
}
</style>

