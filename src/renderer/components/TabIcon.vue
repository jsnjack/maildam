<template>
    <div class="tab-icon" @click="activateTab">
        {{ getName }}
    </div>
</template>

<script>
export default {
    name: "TabIcon",
    props: ["initialItem"],
    mounted() {
        this.toggleStyle(this.initialItem.isActive);
    },
    computed: {
        getName: function() {
            return this.initialItem.name[0];
        },
        isActive: function() {
            return this.initialItem.isActive;
        },
    },
    methods: {
        activateTab() {
            if (!this.initialItem.url) {
                this.$root.$emit("resize", "all");
            } else {
                this.$root.$emit("resize", this.initialItem.id);
            }
            this.$emit("activate", this.initialItem.id);
        },
        toggleStyle(val) {
            if (val) {
                this.$el.style.border = `${this.initialItem.color} solid 3px`;
            } else {
                this.$el.style.border = null;
            }
        },
    },
    watch: {
        isActive: function(val) {
            this.toggleStyle(val);
        },
    },
};
</script>

<style scoped>
.tab-icon {
    background: #41464b;
    color: white;
    text-transform: capitalize;
    font-size: 1.5rem;
    text-align: center;
    line-height: 2em;
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    margin: 0.5rem;
    cursor: pointer;
    border: #41464b solid 3px;
    font-family: Arial, Helvetica, sans-serif;
}
</style>
