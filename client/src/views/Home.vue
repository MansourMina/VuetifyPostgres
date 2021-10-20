<template>
  <v-container>
    <CarCards :cars="cars" :refresh="getCars" @deleteCar="deleteCar" />
  </v-container>
</template>

<script>
import CarCards from '../components/CarCards.vue';
import axios from 'axios';

export default {
  name: 'Home',

  components: {
    CarCards,
  },

  data: () => ({
    cars: [],
  }),

  created() {
    this.getCars();
  },
  methods: {
    async getCars() {
      const { data } = await axios({
        url: 'http://localhost:3000/cars',
        method: 'GET',
      });
      this.cars = data;
      console.log(data);
    },
    async deleteCar(id) {
      await axios({
        url: 'http://localhost:3000/cars/' + id,
        method: 'DELETE',
      });
      this.getCars();
    },
  },
};
</script>
