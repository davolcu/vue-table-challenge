<template>
  <section class="table-section">
    <h1> {{viewMsg['heading_' + mode]}} </h1>

    <!-- Component that toggles the Columns that are being displayed -->
    <ColumnToggler @columnToggled="setDisabledColumns" :disabledColumns="disabledColumns"
                   :columnNames="content.column_names"/>

    <!-- Simple mock form to filter the rows by name -->
    <form id="filter-form">
      <label> Type to filter by name </label>
      <input type="text" v-model="filter" placeholder="Search by name...">
    </form>

    <table>
      <tr>
        <template v-for="column in allowedColumns">
          <!-- Event listener to trigger the sorting of the table -->
          <th v-bind:key="mode + column" v-on:click="sortColumns(column, mode)">
            {{viewMsg[column]}}
          </th>
        </template>
      </tr>

      <!-- The generation of these tr/td should be automatic,
      even though is not possible given the circumstances -->
      <template v-for="(row, index) in content.rows">
        <tr v-bind:key="row[mode] + index" v-if="row[mode].includes(filter)"
            v-bind:class="{active: activeIndex === index}"
            v-on:click="setActiveIndex(index)">
          <td v-if="!disabledColumns.includes(mode)" class="title-td">
            <font-awesome-icon icon="chevron-down"/>
            {{row[mode]}}
          </td>
          <td v-if="!disabledColumns.includes('posts')">{{row.posts}}</td>
          <td v-if="!disabledColumns.includes('total')">{{row.total}}</td>
          <td v-if="!disabledColumns.includes('engagement_per_post')">
            {{row.engagement_per_post}}
          </td>
        </tr>
        <tr v-bind:key="row[mode] + index + 'extended'" v-if="row[mode].includes(filter)"
          v-show="activeIndex === index">
          <td colspan="4">
            <p class="networks-heading">{{viewMsg.$networks}}</p>
            <template v-for="network in row.$networks">
              <p v-bind:key="network.name + index + 'extended'">
                {{network.name | capitalize}}: {{network.posts}}
              </p>
            </template>
            <template v-if="mode === 'team'">
              <p class="roster-heading">{{viewMsg.roster_engagement}}: {{row.roster_engagement}}</p>
            </template>
          </td>
        </tr>
      </template>
    </table>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ColumnToggler from '../ColumnToggler/ColumnToggler.vue';

library.add(faChevronDown);

export default {
  name: 'tableComponent',
  components: {
    ColumnToggler,
  },
  props: {
    mode: String,
    content: Object,
  },
  data() {
    return {
      filter: '',
      orderedContent: {},
      disabledColumns: [],
      activeIndex: null,
      // Mocked messages. It should be read from a YAML or Properties file
      viewMsg: {
        heading_league: 'Leagues Engagement Data By Network',
        heading_team: 'Teams Engagement Data By Network',
        league: 'Leagues',
        team: 'Teams',
        posts: 'Posts',
        total: 'Total',
        $networks: 'Networks:',
        engagement_per_post_mobile: 'E.P.P.',
        engagement_per_post: 'Engagement Per Post',
        ranking_position: 'Position',
        roster_engagement: 'Roster Engagement',
      },
    };
  },
  computed: {
    allowedColumns() {
      return this.content.column_names.filter(key => key !== '$networks'
                && key !== 'roster_engagement' && !this.disabledColumns.includes(key));
    },
  },
  methods: {
    sortColumns(property, mode) {
      this.$emit('sortChanged', { property, mode });
    },
    setDisabledColumns(name) {
      if (this.disabledColumns.includes(name)) {
        this.disabledColumns.splice(this.disabledColumns.indexOf(name), 1);
      } else {
        this.disabledColumns.push(name);
      }
    },
    setActiveIndex(index) {
      this.activeIndex = this.activeIndex === parseInt(index, 0) ? null : parseInt(index, 0);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "table";
</style>
