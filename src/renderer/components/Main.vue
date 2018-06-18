<template>
  <div class="main-wrapper">
    <div class="tabs" v-show="tabs.length > 2">
      <TabIcon v-for="item in tabs"
        :key="item.id"
        :initialItem="item"
        @activate="activate">
      </TabIcon>
    </div>
    <div class="container" :class="{sidebyside: sideBySide}">
      <Tab v-for="item in tabs"
        :key="item.id"
        :initialItem="item">
      </Tab>
    </div>
  </div>
</template>

<script>
import Tab from "./Tab";
import TabIcon from "./TabIcon";
import getConfig from "../store";
import {watchScaledrone, watchPusher} from "../notifications";

const colorPalette = [
    "#fce94f",
    "#fcaf3e",
    "#73d216",
    "#3465a4",
    "#ad7fa8",
    "#cc0000",
];

export default {
    name: "Main",
    components: {Tab, TabIcon},
    mounted: function() {
        let config = getConfig();
        let tabs = config.tabs;
        for (let i=0; i<tabs.length; i++) {
            tabs[i].id = i;
            tabs[i].color = colorPalette[i];
        }
        tabs.push({
            name: "All",
            id: tabs.length,
            isActive: false,
            color: "white",
        });
        this.tabs = tabs;

        if (config.scaledrone_channel_id) {
            watchScaledrone(config.scaledrone_channel_id);
        }

        if (config.pusher_api_key) {
            watchPusher(config.pusher_api_key);
        }
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
