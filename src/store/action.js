export default {
  namespaced: true,
  state: {
    notification: {
      isAlertUpdate: false,
      isConfirmUpdate: false,
    },
    registration: null,
  },
  getters: {
    notification: (state) => state.notification,
    registration: (state) => state.registration,
  },
};
