<template>
  <main>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </main>
</template>

<script>
import HelloWorld from '../HelloWorld/HelloWorld.vue';

export default {
  name: 'main-component',
  components: {
    HelloWorld,
  },
};
</script>

<style scoped lang="scss">
  @import "main";
</style>
