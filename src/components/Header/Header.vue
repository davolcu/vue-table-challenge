<template>
    <header>
        <section>
            <img alt="Vue logo" src="../../assets/logo.png"/>
            <span> {{headerMsg}} </span>
        </section>
    </header>
</template>


<script>
export default {
  name: 'headerComponent',
  data() {
    return {
      headerMsg: 'Vue - Blinkfire Table Challenge',
    };
  },
};
</script>

<style scoped lang="scss">
    @import "header";
</style>
