<template>
  <webview
    :src="getSRC"
    :class="{active: initialItem.isActive, invisible: !initialItem.url}"
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
            // Add context menu
            window.require("electron-context-menu")({window: ev.target});
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
  flex-grow: 1;
}
webview.active.invisible {
    display: none;
}
</style>
