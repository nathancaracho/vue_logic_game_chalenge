<template>
  <div class="game" @mousemove="mouseMove">
    <div class="table">
      <h2>Tabuleiro</h2>
      <gl-game-table :tile-list="tileList" :src="'background.png'"></gl-game-table>
      <gl-game-table :sprite="link" :src="'link.png'"></gl-game-table>
      <button @click="executeAction" class="btn">Executar</button>
    </div>
    <div class="code">
      <div class="code__list">
        <h2>Lista de ações</h2>
        <div class="list">
          <gl-list-item id="1" action="walk">Andar</gl-list-item>
          <gl-list-item
            id="2"
            action="desabilitado"
            :draggable="false"
            background-color="#7986cb"
          >desabilitado</gl-list-item>
          <gl-list-item id="3" action="turnLeft">Virar à esquerda</gl-list-item>
        </div>
      </div>
      <div class="code__workPlace">
        <h2>Linha do tempo</h2>
        <gl-list-item id="2" :draggable="false" background-color="#7986cb">Personagem</gl-list-item>
        <div ref="code__workPlace__line" class="code__workPlace__line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GlListItem from "../components/GlListItem";
import GlGameTable from "../components/GlGameTable";
import backgroundFactory from "../factories/backgroundFactory.js";
import characterFactory from "../factories/characterFactory.js";
export default {
  name: "home",
  components: { GlListItem, GlGameTable },
  data() {
    return {
      tileList: backgroundFactory.easy(),
      link: characterFactory.linkLeft
    };
  },
  mounted() {
    const { offsetLeft, offsetTop, offsetHeight } = this.$refs[
      "code__workPlace__line"
    ];
    this.$store.commit("setCodeWorkPlaceLine", {
      x: offsetLeft,
      y: offsetTop,
      height: offsetHeight
    });
  },
  methods: {
    mouseMove(event) {
      if (this.$store.state.isElementClicked)
        this.$store.commit("modifyPosition", {
          clientX: event.x,
          clientY: event.pageY
        });
    },
    executeAction() {
      // const { x, y, height } = this.$store.state.codeWorkPlaceLine;
      // this.table = this.$store.state.draggedElementList
      //   .filter(element => {
      //     if (
      //       element.offsetLeft < x &&
      //       element.offsetLeft + element.offsetWidth > x &&
      //       element.offsetTop > y &&
      //       element.offsetTop + element.offsetHeight < y + height
      //     )
      //       return element;
      //   })
      //   .sort((current, next) => {
      //     if (current.offsetTop < next.offsetTop) return -1;
      //     if (current.offsetTop > next.offsetTop) return 1;
      //     return 0;
      //   })
      //   .map(element => element.action);
      // console.log(this.table[0]);
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
    position: relative;
    display: flex;
    flex-direction: column;
    & > .table--game {
      position: relative;
      min-width: 500px;
      min-height: 500px;
    }
    & > .btn {
      width: 20%;
    }
  }
}
.code {
  display: flex;
  .list {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  & > &__list {
    width: 40%;
  }
  & > .code__workPlace {
    width: 60%;
    display: flex;
    flex-direction: column;
    & > * {
      align-self: center;
    }
    & > .code__workPlace__line {
      position: relative;
      width: 5px;
      height: 90%;
      background-color: #6ea7c6;
      animation: blink 0.8s infinite;
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
        animation: blink 0.8s infinite;
      }
    }
  }
}

@keyframes blink {
  0% {
    box-shadow: 0px 0px 6px #6ea7c6;
  }

  100% {
    box-shadow: 0px 0px 20px #6ea7c6;
  }
}
</style>
