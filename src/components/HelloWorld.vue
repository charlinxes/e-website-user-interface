<template>
  <div class="helloworld">
    <h1>Hello World!</h1>
    <button @click.prevent="logout">登出</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        this.$router.push({ path: '/login' });
      });
    },
  },
};
</script>

<style scoped>

</style>
