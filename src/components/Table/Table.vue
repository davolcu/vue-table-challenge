<template>
  <section class="table-section">
    <table>
      <tr>
        <th v-for="column in leaguesByNetwork.column_names" v-bind:key="'league' + column">
          {{column}}
        </th>
      </tr>

      <tr v-for="(row, index) in leaguesByNetwork.rows" v-bind:key="row.league + index">
        <td>{{row.league}}</td>
        <td>{{row.posts}}</td>
        <td>{{row.$networks}}</td>
        <td>{{row.total}}</td>
        <td>{{row.engagement_per_post}}</td>
      </tr>
    </table>

    <table>
      <tr>
        <th v-for="column in teamsByNetwork.column_names" v-bind:key="'team' + column">
          {{column}}
        </th>
      </tr>

      <tr v-for="(row, index) in teamsByNetwork.rows" v-bind:key="row.team + index">
        <td>{{row.team}}</td>
        <td>{{row.posts}}</td>
        <td>{{row.$networks}}</td>
        <td>{{row.total}}</td>
        <td>{{row.engagement_per_post}}</td>
        <td>{{row.roster_engagement}}</td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: 'tableComponent',
  data() {
    return {
      leaguesByNetwork: {},
      teamsByNetwork: {},
    };
  },
  methods: {
    setLeaguesByNetwork(leaguesByNetwork) {
      this.leaguesByNetwork = leaguesByNetwork;
    },
    setTeamsByNetwork(teamsByNetwork) {
      this.teamsByNetwork = teamsByNetwork;
    },
  },
  created() {
    fetch('https://blinkfire-vue-challenge.s3-eu-west-1.amazonaws.com/GlobalRank-League-Premier+League-2019-10-15T14_57_43.json')
      .then(response => response.json())
      .then((myJson) => {
        this.setLeaguesByNetwork(myJson.global_ranking.leagues_by_network);
        this.setTeamsByNetwork(myJson.global_ranking.teams_by_network);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "table";
</style>
