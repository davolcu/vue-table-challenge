<template>
    <section id="mode-section">
        <div> Show engagement data from:</div>
        <button type="button" v-bind:class="{active: mode === 'league'}"
                v-on:click="changeMode('league')"> Leagues
        </button>
        <button type="button" v-bind:class="{active: mode === 'team'}"
                v-on:click="changeMode('team')"> Teams
        </button>
    </section>
</template>

<script>
export default {
  name: 'modeSelector',
  props: {
    mode: String,
  },
  methods: {
    changeMode(mode) {
      this.$emit('modeChanged', mode);
    },
  },
};
</script>

<style scoped lang="scss">
    @import "mode-selector";
</style>
