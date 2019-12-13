<template>
  <main>
    <section id="mode-section">
      <div> Show engagement data from: </div>
      <button type="button" v-bind:class="{active: mode === 'league'}"
              v-on:click="setMode('league')"> Leagues </button>
      <button type="button" v-bind:class="{active: mode === 'team'}"
              v-on:click="setMode('team')"> Teams </button>
    </section>

    <!-- Conditional rendering for the tables that are being fetched -->
    <Table v-if="mode === 'league'" :mode="mode" :content="leaguesByNetwork"/>
    <Table v-else-if="mode === 'team'" :mode="mode" :content="teamsByNetwork"/>
    <section id="loading-section" v-else>
      <h3> Cargando...</h3>
    </section>
  </main>
</template>

<script>
import Table from '../Table/Table.vue';

export default {
  name: 'mainComponent',
  components: {
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
      content.rows.sort((a, b) => (a.ranking_position > b.ranking_position ? 1 : -1));
      this.leaguesByNetwork = content;
    },
    setTeamsByNetwork(content) {
      content.rows.sort((a, b) => (a.engagement_per_post < b.engagement_per_post ? 1 : -1));
      this.teamsByNetwork = content;
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
