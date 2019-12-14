<template>
  <main>
    <!-- Component that changes the current mode and scale it to the parent component -->
    <ModeSelector :mode="mode" @modeChanged="setMode"/>

    <!-- Conditional rendering for the tables that are being fetched -->
    <Table v-if="mode === 'league'" :mode="mode" :content="leaguesByNetwork"
           @sortChanged="sortContent"/>
    <Table v-else-if="mode === 'team'" :mode="mode" :content="teamsByNetwork"
           @sortChanged="sortContent"/>
    <section id="loading-section" v-else>
      <h3> Loading...</h3>
    </section>
  </main>
</template>

<script>
import Table from '../Table/Table.vue';
import ModeSelector from '../ModeSelector/ModeSelector.vue';

export default {
  name: 'mainComponent',
  components: {
    ModeSelector,
    Table,
  },
  data() {
    return {
      mode: null,
      leaguesByNetwork: {},
      teamsByNetwork: {},
    };
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
    },
    setLeaguesByNetwork(content) {
      // Default sort by ranking position
      content.rows.sort((a, b) => (a.ranking_position > b.ranking_position ? 1 : -1));
      this.leaguesByNetwork = content;
    },
    setTeamsByNetwork(content) {
      // Default sort by engagement per post
      content.rows.sort((a, b) => (a.engagement_per_post < b.engagement_per_post ? 1 : -1));
      this.teamsByNetwork = content;
    },
    sortContent({ property, mode }) {
      // Given the mode and the clicked property, does the sorting
      const currentState = mode === 'league' ? this.leaguesByNetwork : this.teamsByNetwork;
      const prevState = currentState.rows.slice();

      currentState.rows.sort((a, b) => (a[property] < b[property] ? 1 : -1));

      if (JSON.stringify(currentState.rows) === JSON.stringify(prevState)) {
        currentState.rows.reverse();
      }
    },
  },
  created() {
    fetch('https://blinkfire-vue-challenge.s3-eu-west-1.amazonaws.com/GlobalRank-League-Premier+League-2019-10-15T14_57_43.json')
      .then(response => response.json())
      .then((myJson) => {
        // By default show the league table
        this.mode = 'league';
        // Default sorted by ranking position
        this.setLeaguesByNetwork(myJson.global_ranking.leagues_by_network);
        // Default sorted by engagement per post
        this.setTeamsByNetwork(myJson.global_ranking.teams_by_network);
      });
  },
};
</script>

<style scoped lang="scss">
  @import "main";
</style>
