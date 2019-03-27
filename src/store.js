import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    position: {},
    isElementClicked: false,
    modifiedElement: {},
    draggedElementList: [],
    codeWorkPlaceLine: {}
  },

  mutations: {
    modifyPosition(state, position) {
      state.position = Object.assign(position, {});
    },
    changeElementClicked(state, el) {
      state.modifiedElement = Object.assign(el, {});
      state.isElementClicked = !state.isElementClicked;
    },
    addDraggedElement(state, el) {
      const draggedElement = state.draggedElementList.find(
        draggedEl => draggedEl == el
      );
      if (!draggedElement) state.draggedElementList.push(el);
    },
    setCodeWorkPlaceLine(state, codeWorkPlaceLine) {
      state.codeWorkPlaceLine = codeWorkPlaceLine;
    }
  },
  actions: {}
});
