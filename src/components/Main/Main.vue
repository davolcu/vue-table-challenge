<template>
  <main>
    <Table/>
  </main>
</template>

<script>
import Table from '../Table/Table.vue';

export default {
  name: 'mainComponent',
  components: {
    Table,
  },
};
</script>

<style scoped lang="scss">
  @import "main";
</style>
