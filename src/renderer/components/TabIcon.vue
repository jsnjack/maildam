<template>
    <div class="tab-icon" :class="{active: initialItem.isActive}" @click="activateTab">
        {{ getName }}
    </div>
</template>

<script>
export default {
    name: "TabIcon",
    props: ["initialItem"],
    computed: {
        getName: function() {
            return this.initialItem.name[0];
        },
    },
    methods: {
        activateTab() {
            this.$emit("activate", this.initialItem.id);
        },
    },
};
</script>

<style scoped>
.tab-icon {
    background: rgb(145, 145, 145);
    color: #24292e;
    text-transform: capitalize;
    font-size: 1.5rem;
    text-align: center;
    line-height: 2em;
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    margin: 0.5rem;
    cursor: pointer;
    border: solid 3px;
}
.active {
    /* border: #599af0 solid 5px; */
    border: white solid 3px;
    color: white;
}
</style>
