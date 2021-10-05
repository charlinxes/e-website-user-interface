<template>
  <div id="app">
    <Loading :active.sync="isLoading" loader="bars" :lock-scroll="true" background-color="#ced4da"></Loading>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState([
      'isLoading',
    ]),
  },
};
</script>

<style lang="scss">
  @import "./assets/scss/all";
</style>
