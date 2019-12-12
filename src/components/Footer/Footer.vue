<template>
  <footer>
    <span> David Olmos Cubells </span>
    <span> Vue - Blinkfire Table Challenge </span>
    <a target="_blank" href="https://github.com/davolcu">
      GitHub <font-awesome-icon :icon="['fab', 'github']"/>
    </a>
  </footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub);

export default {
  name: 'footerComponent',
};
</script>

<style scoped lang="scss">
  @import "footer";
</style>
