<template>
  <webview
    :src="getSRC"
    :class="{active: initialItem.isActive, invisible: !initialItem.url}"
    :partition="getPartition"
    @new-window="newWindow"
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
