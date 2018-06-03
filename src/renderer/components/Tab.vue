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
        isActive: function( ) {
            return this.initialItem.isActive;
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
        resize() {
            if (this.initialItem.url) {
                window.resizeBy(-1, 0);
                window.resizeBy(1, 0);
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
