<template>
  <div id="app">
    <div class="header">
      <!-- <img class="header__logo" src="./assets/logo.png"> -->
      <!-- <div class="header__autor">
        <p>Autor:</p>
        <p>Nathan Branco Caracho</p>
      </div>-->
      <div class="header__brand">
        <h3 class="header__brand__name">BLG</h3>
        <div class="header__brand__logo">
          <div class="header__brand__logo__icon">
            <v-icon class="header__brand__logo__icon_cube" name="cube" width="40" height="40"/>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import "vue-awesome/icons/cube";
export default {};
</script>
<style lang="scss">
@import "./assets/style/utils/position.scss";
@import "./assets/style/utils/display.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background-color: #ddd;
}
.header {
  position: relative;
  border-bottom: 1px dashed #000;
  padding: 5px;
  @extend .flex--column;
  &::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: #40b280;
    border: 5px solid #fff;
    z-index: -1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  .header__brand {
    position: relative;
    align-self: center;
    width: 50px;
    .header__brand__name {
      position: absolute;
      bottom: 0;
      width: 50px;
      text-align: center;
      text-shadow: 2px 2px 0 #fff;
    }
    .header__brand__logo {
      @extend .flex--column;
      margin: 0 auto;
      padding: 15px 0;
      & > .header__brand__logo__icon {
        position: relative;
        color: #33485c;
        & > .header__logo__icon_cube {
          z-index: 99;
        }
      }
    }

    & > * {
      align-self: center;
    }
  }
  .header__autor {
    text-align: center;
    font-weight: bold;
    padding: 0 15px;
    background-color: #42b983;
    color: #fff;
    opacity: 0.8;
    text-align: left;
    font-size: 14px;
  }
}
* {
  font-family: Verdana;
}
body {
  margin: 0;
  background-color: #ddded4;
}
h3 {
  margin: 0;
  z-index: 9;
}
</style>
