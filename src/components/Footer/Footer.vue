<template>
  <footer>
    <span> {{author}} </span>
    <span> {{footerMsg}} </span>
    <a target="_blank" :href="githubLink">
      {{github}} <font-awesome-icon :icon="['fab', 'github']"/>
    </a>
  </footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub);

export default {
  name: 'footerComponent',
  data() {
    return {
      author: 'David Olmos Cubells',
      footerMsg: 'Vue - Blinkfire Table Challenge',
      githubLink: 'https://github.com/davolcu',
      github: 'GitHub',
    };
  },
};
</script>

<style scoped lang="scss">
  @import "footer";
</style>
