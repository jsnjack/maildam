<template>
  <div class="main-wrapper">
    <div class="tabs">
      <TabIcon v-for="item in tabs"
        :key="item.url"
        :initialItem="item"
        @activate="activate">
      </TabIcon>
    </div>
    <div class="container" :class="{sidebyside: sideBySide}">
      <Tab v-for="item in tabs"
        :key="item.url"
        :initialItem="item">
      </Tab>
    </div>
  </div>
</template>

<script>
import Tab from "./Tab";
import TabIcon from "./TabIcon";
import getConfig from "../store";
import watchNewEmail from "../notifications";

export default {
    name: "Main",
    components: {Tab, TabIcon},
    mounted: function() {
        this.tabs = getConfig();
        watchNewEmail();
    },
    methods: {
        activate(id) {
            this.sideBySide = id === this.tabs.length - 1;
            this.tabs[id].isActive = true;
            for (let i = 0; i < this.tabs.length; i++) {
                if (this.sideBySide) {
                    this.tabs[i].isActive = true;
                } else if (this.tabs[i].id !== id) {
                    this.tabs[i].isActive = false;
                }
            }
        },
    },
    data() {
        return {
            tabs: [],
            sideBySide: false,
        };
    },
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  height: 100%;
}
.tabs {
  width: 5rem;
  width: min-content;
  background: #24292e;
}
.container {
  background: #24292e;
  width: 100%;
  height: 100%;
}
.container.sidebyside {
    display: flex;
}
</style>
