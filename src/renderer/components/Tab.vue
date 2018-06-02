<template>
  <webview
    :src="getSRC"
    :class="{active: initialItem.isActive}"
    :partition="getPartition"
    @new-window="newWindow"
    @dom-ready="domReady"
    ></webview>
</template>

<script>
const {shell} = window.require("electron");

export default {
    name: "Tab",
    props: ["initialItem"],
    computed: {
        getSRC: function() {
            return this.initialItem.url;
        },
        getPartition: function() {
            return "persist:" + this.initialItem.name;
        },
    },
    methods: {
        newWindow(ev) {
            // Open URLs in external browser
            shell.openExternal(ev.url);
        },
        domReady(ev) {
            // inject styles
            // ev.target.openDevTools();
        },
    },
};
</script>

<style scoped>
webview {
  display: none;
}
webview.active {
  display: flex;
  height: 100%;
}
</style>
