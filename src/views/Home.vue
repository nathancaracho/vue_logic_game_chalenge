<template>
  <div class="game" @mousemove="mouseMove">
    <gl-modal :show="isShowModal"></gl-modal>
    <div class="table">
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
          @onAbleExecute="onAbleExecute"
        />
      </div>
      <button @click="executeActions" class="table__btn btn" :disabled="isAbleExecute">{{tableText}}</button>
    </div>
    <div class="action">
      <div class="action__list">
        <h3>Ações</h3>
        <div class="action__list__item">
          <gl-list-item v-for="index in 20" :key="index" action="walk" background-color="#e91e63">
            Andar
            <v-icon name="shoe-prints"/>
          </gl-list-item>
        </div>
        <div class="action__list__item">
          <gl-list-item
            v-for="index in 20"
            :key="index"
            action="turnLeft"
            background-color="#9c27b0"
          >
            Virar à esquerda
            <v-icon name="history"/>
          </gl-list-item>
        </div>
        <div class="action__list__item">
          <gl-list-item
            v-for="index in 20"
            :key="index"
            action="turnRight"
            background-color="#3f51b5"
          >
            Virar à direita
            <v-icon name="history" flip="horizontal"/>
          </gl-list-item>
        </div>
      </div>
      <div class="action__workplace">
        <div class="action__workplace__tip">
          <h3>Dicas</h3>
          <p>{{tip}}</p>
        </div>
        <div class="action__workplace__timeline"></div>
        <gl-time-line/>
      </div>
    </div>
  </div>
</template>

<script>
import GlListItem from "../components/GlListItem";
import GlModal from "../components/GlModal";
import GlBackground from "../components/canvas/GlBackground";
import GlCharacter from "../components/canvas/GlCharacter";
import GlItens from "../components/canvas/GlItens";
import GlTimeLine from "../components/GlTimeLine";
import backgroundFactory from "../factories/backgroundFactory.js";
import characterFactory from "../factories/characterFactory.js";
import itemFactory from "../factories/itemFactory.js";

import "vue-awesome/icons/shoe-prints";
import "vue-awesome/icons/history";

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
      tip: "A riqueza não é o caminho, mas é o atalho.",
      actions: [],
      isShowModal: false,
      isAbleExecute: true,
      tableText: "Executar"
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
    onAbleExecute() {
      this.isAbleExecute = !this.isAbleExecute;
      this.tableText = this.isAbleExecute ? "Executando" : "Executar";
    },
    executeActions() {
      this.onAbleExecute();
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
<style lang="scss" scoped>
@import "../assets/style/mixins/square.scss";
@import "../assets/style/utils/display.scss";
@import "../assets/style/utils/position.scss";
@import "../assets/style/components/button.scss";

$content__size: 90vw;
$container___width: $content__size/2;
$container__action__width: $container___width * 0.4;
$table__height: 570px;
$table__width: 500px;
$container__action__workplace__width: $container___width * 0.6;
$container__action__height: $table__height * 0.3;
$container__action__tip__height: $table__height * 0.2;
.game {
  user-select: none;
  display: flex;
  height: 100%;
  padding: 15px 15px 0px 15px;
  width: $content__size;
  margin: 0 auto;
  & h3 {
    margin-bottom: 5px;
    padding: 0;
    color: #33485c;
  }
  & > * {
    margin: 15px 15px 0px 15px;
  }
  & > .table {
    @extend .flex--column;
    height: $table__height;
    width: $table__width;
    & > .table__canvas {
      position: relative;
      background-color: #fff;
    }
    & > .table__btn {
      @extend .button;
    }
  }
  .action {
    display: flex;
    height: $table__height;
    width: $container___width;

    & > .action__list {
      @extend .flex--column;
      flex-wrap: wrap;
      margin: 0 10px 10px 0;
      width: $container__action__width;
      height: $container__action__height;
      $square: (
        color: #4fc3f7,
        width: $container__action__width,
        height: $container__action__height
      );
      @include square($square...);
      .action__list__item {
        min-height: 40px;
        margin-left: 15px;
        & > * {
          position: absolute;
        }
      }
    }
    & > .action__workplace {
      @extend .flex--column;
      & > .action__workplace__tip {
        @extend .flex--column;
        position: relative;
        width: $container__action__workplace__width;
        height: $container__action__tip__height;
        margin-bottom: 15px;
        & > p {
          z-index: 9;
        }
        $square: (
          color: #aed581,
          width: $container__action__workplace__width,
          transform: translate(3%, -5%)
        );
        @include square($square...);
      }
    }
  }
}
</style>
