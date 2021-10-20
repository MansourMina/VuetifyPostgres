<template>
  <v-container class="d-flex flex-wrap " fluid justify-center>
    <CarCard :c="c" v-for="c of cars" :key="c.id" @deleteCar="deleteCar" />
  </v-container>
</template>

<script>
import CarCard from '@/components/CarCard.vue';

export default {
  name: 'CarCards',
  props: {
    cars: {
      type: Array,
    },
    refresh: {
      type: Function,
    },
  },
  components: {
    CarCard,
  },
  methods: {
    deleteCar(id) {
      this.$emit('deleteCar', id);
    },
  },
};
</script>
<style></style>
