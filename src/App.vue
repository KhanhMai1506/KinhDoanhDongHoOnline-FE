<<<<<<< HEAD
<template>
  <component :is="layout">
      <router-view></router-view>
  </component>
</template>

<script>
const default_layout = "default";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>
<style>
=======
<template>
  <component :is="layout">
      <router-view></router-view>
  </component>
</template>

<script>
const default_layout = "default";
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>
<style>
>>>>>>> bb7e0d4cd30f01c2216798ba2807069a72459bac
</style>