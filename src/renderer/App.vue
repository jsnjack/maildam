<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script>
import Main from "@/components/Main";

export default {
    name: "maildam",
    components: {
        Main,
    },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #24292e;
  color: white;
  font-size: 16px;
  height: 100%;
  font: caption;
}
#app {
  height: 100%;
}
</style>
