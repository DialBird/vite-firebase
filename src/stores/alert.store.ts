import { defineStore } from "pinia";

type AlertType = "success" | "alert" | "info";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    alertMsg: "",
    alertType: "" as AlertType,
  }),
  actions: {
    setAlert(msg: string, type: AlertType) {
      this.alertMsg = msg;
      this.alertType = type;
      setTimeout(() => this.$reset(), 1000)
    },
  },
});
