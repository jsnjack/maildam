import Vue from "vue";
import axios from "axios";

import {remote} from "electron";
import App from "./App";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: {App},
    template: "<App/>",
}).$mount("#app");


remote.globalShortcut.register("CommandOrControl+Shift+I", () => {
    remote.BrowserWindow.getFocusedWindow().webContents.openDevTools();
});

window.addEventListener("beforeunload", () => {
    remote.globalShortcut.unregisterAll();
});
