<template>
  <webview
    :src="getSRC"
    :class="{active: initialItem.isActive, invisible: !initialItem.url}"
    :partition="getPartition"
    :preload="getPreload"
    @new-window="newWindow"
    ></webview>
</template>

<script>
const {shell} = window.require("electron");

export default {
    name: "Tab",
    props: ["initialItem"],
    mounted() {
        this.$root.$on("resize", (id) => {
            if (id === "all") {
                this.resize();
            } else if (id === this.initialItem.id) {
                this.resize();
            }
        });
    },
    computed: {
        getSRC: function() {
            return this.initialItem.url;
        },
        getPartition: function() {
            return "persist:" + this.initialItem.name;
        },
        getPreload: function() {
            return `file:${require("path").resolve(__dirname, "../preload.js")}`;
        },
        isActive: function( ) {
            return this.initialItem.isActive;
        },
    },
    methods: {
        newWindow(ev) {
            // Open URLs in external browser
            shell.openExternal(ev.url);
        },
        resize() {
            if (this.initialItem.url) {
                window.resizeBy(-10, 0);
                window.resizeBy(10, 0);
            }
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
