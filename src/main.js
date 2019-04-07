import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);

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
