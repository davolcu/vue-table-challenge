<template>
    <section id="columns-section">
        <span> Enable or Disable some columns:</span>

        <div>
            <button type="button" v-for="name in columnNames" v-on:click="toggleColumn(name)"
                    v-bind:key="'button' + name"
                    v-show="name !== '$networks' && name !== 'roster_engagement'"
                    v-bind:class="{active: !disabledColumns.includes(name)}">
                {{viewMsg[name]}}
            </button>
        </div>
    </section>
</template>

<script>
export default {
  name: 'columnToggler',
  props: {
    disabledColumns: Array,
    columnNames: Array,
  },
  data() {
    return {
      // Mocked messages. It should be read from a YAML or Properties file
      viewMsg: {
        league: 'Leagues',
        team: 'Teams',
        posts: 'Posts',
        total: 'Total',
        engagement_per_post: 'Engagement Per Post',
      },
    };
  },
  methods: {
    toggleColumn(name) {
      this.$emit('columnToggled', name);
    },
  },
};
</script>

<style scoped lang="scss">
    @import "column-togler";
</style>
