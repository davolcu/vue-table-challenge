<template>
  <section class="table-section">
    <h1> {{viewMsg['heading_' + mode]}} </h1>

    <form id="filter-form">
      <label> Type to filter by name </label>
      <input type="text" v-model="filter">
    </form>

    <table>
      <tr>
        <th v-for="column in content.column_names" v-bind:key="mode + column">
          {{viewMsg[column]}}
        </th>
        <th v-if="mode === 'league'"> {{viewMsg['ranking_position']}} </th>
      </tr>

      <tr v-for="(row, index) in content.rows" v-bind:key="row[mode] + index">
        <td>{{row[mode]}}</td>
        <td>{{row.posts}}</td>
        <td>{{row.$networks}}</td>
        <td>{{row.total}}</td>
        <td>{{row.engagement_per_post}}</td>
        <td v-if="mode === 'league'"> {{row.ranking_position}} </td>
        <td v-else> {{row.roster_engagement}} </td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: 'tableComponent',
  props: {
    mode: String,
    content: Object,
  },
  data() {
    return {
      filter: '',
      orderedContent: {},
      viewMsg: {
        heading_league: 'Leagues Engagement Data By Network',
        heading_team: 'Teams Engagement Data By Network',
        league: 'Leagues',
        team: 'Teams',
        posts: 'Posts',
        total: 'Total',
        $networks: 'Networks',
        engagement_per_post: 'Engagement Per Post',
        ranking_position: 'Ranking Position',
        roster_engagement: 'Roster Engagement',
      },
    };
  },
  methods: {
    setOrderedContent(content, ordenation = 'posts') {
      content.rows.sort((a, b) => (a[ordenation] > b[ordenation] ? 1 : -1));
      this.orderedContent = content;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "table";
</style>
