import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use("game", {
  loop() {
    console.log("?");
    requestAnimationFrame(() => {
      this.loop();
    });
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
