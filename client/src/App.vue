<template>
  <v-app>
    <LogoBar />
    <v-main>
      <router-view :car="car" />
    </v-main>
  </v-app>
</template>

<script>
import LogoBar from './components/LogoBar.vue';

export default {
  name: 'App',
  props: {
    car: {
      type: Object,
    },
  },
  components: {
    LogoBar,
  },
};
</script>
