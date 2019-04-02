<template>
  <div class="game" @mousemove="mouseMove">
    <gl-modal :show="isShowModal"></gl-modal>
    <div class="table">
      <h2>Tabuleiro</h2>
      <div class="table__canvas">
        <gl-background :tile-list="tileList" :src="'background.png'"/>
        <gl-itens :sprite="item" :src="'link.png'"/>
        <gl-character
          :target="item"
          :tile-list="tileList"
          :actions="actions"
          :sprite="link"
          :src="'link.png'"
          @onFinish="onFinish"
        />
      </div>
      <button @click="executeActions" class="table__btn btn">Executar</button>
    </div>
    <div class="code">
      <div class="code__list">
        <h2>Lista de ações</h2>
        <div class="list">
          <div class="list__containter">
            <gl-list-item
              v-for="index in 20"
              :key="index"
              action="walk"
              background-color="#7b1fa2"
            >Andar</gl-list-item>
          </div>
          <div class="list__containter">
            <gl-list-item v-for="index in 20" :key="index" action="turnLeft">Virar à esquerda</gl-list-item>
          </div>
          <div class="list__containter">
            <gl-list-item
              v-for="index in 20"
              :key="index"
              action="turnRight"
              background-color="#512da8"
            >Virar à direita</gl-list-item>
          </div>
        </div>
      </div>
      <div class="code__timeline">
        <gl-time-line/>
      </div>
    </div>
  </div>
</template>

<script>
import GlListItem from "../components/GlListItem";
import GlModal from "../components/GlModal";
// import GlGameTable from "../components/GlGameTable";
import GlBackground from "../components/canvas/GlBackground";
import GlCharacter from "../components/canvas/GlCharacter";
import GlItens from "../components/canvas/GlItens";
import GlTimeLine from "../components/GlTimeLine";
import backgroundFactory from "../factories/backgroundFactory.js";
import characterFactory from "../factories/characterFactory.js";
import itemFactory from "../factories/itemFactory.js";
export default {
  name: "home",
  components: {
    GlListItem,
    GlTimeLine,
    GlBackground,
    GlCharacter,
    GlItens,
    GlModal
  },
  data() {
    return {
      tileList: backgroundFactory.easy,
      link: characterFactory.link,
      item: itemFactory.redRupee,
      actions: [],
      isShowModal: false
    };
  },
  methods: {
    mouseMove(event) {
      if (this.$store.state.isElementClicked)
        this.$store.commit("modifyPosition", {
          clientX: event.x,
          clientY: event.pageY
        });
    },
    onFinish() {
      this.isShowModal = true;
    },
    executeActions() {
      const { x, y, height } = this.$store.state.codeWorkPlaceLine;
      this.actions = this.$store.state.draggedElementList
        .filter(element => {
          if (
            element.offsetLeft < x &&
            element.offsetLeft + element.offsetWidth > x &&
            element.offsetTop > y &&
            element.offsetTop + element.offsetHeight < y + height
          )
            return element;
        })
        .sort((current, next) => {
          if (current.offsetTop < next.offsetTop) return -1;
          if (current.offsetTop > next.offsetTop) return 1;
          return 0;
        })
        .map(element => element.action);
    }
  }
};
</script>
<style lang="scss">
.game {
  user-select: none;
  display: flex;
  height: 100vh;
  padding: 0 15px;
  & > * {
    width: 50%;
    margin: 15px;
  }
  & > .table {
    display: flex;
    flex-direction: column;
    height: 600px;
    width: 500px;
    & > .table__canvas {
      position: relative;
    }
    & > .table__btn {
      margin-top: auto;
    }
  }
}
.code {
  display: flex;
  .list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    & > .list__containter {
      min-height: 40px;
      & > * {
        position: absolute;
      }
    }
  }
  & > &__list {
    width: 40%;
  }
}
</style>
