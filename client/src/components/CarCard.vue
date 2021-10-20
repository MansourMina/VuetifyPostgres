<template>
  <div>
    <v-card class="my-12 mx-3 " max-width="340" height="530 ">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="c.image"></v-img>

      <v-card-title
        >{{ c.title }}
        <span v-if="c.status == 'reserved'"> *RESERVED*</span></v-card-title
      >

      <v-card-text>
        <v-row align="center" class="mx-0 text-subtitle-1">
          Owner: {{ c.first_name }} {{ c.last_name }}
        </v-row>

        <p class="mx-0 mt-3 text-subtitle-">Year: {{ c.year_of_make }}</p>
        <p class="mt-0  text-subtitle-">Miles: {{ c.miles }}</p>
        <p class="mx-0 mt-3 text-subtitle-" v-if="c.status == 'available'">
          Price: {{ c.price }}
        </p>
        <p class="mx-0 mt-3 text-subtitle-" v-else>Price: N/A</p>

        <v-divider class=""></v-divider>
      </v-card-text>

      <v-card-actions>
        <div v-if="c.status == 'available'">
          <div class=" mr-auto">
            <v-btn
              color="white"
              class="blue darken-2"
              text
              :to="`/details/${c.id}`"
            >
              DETAILS
            </v-btn>
          </div>
        </div>

        <div class=" ml-auto">
          <v-btn color="white" class="red darken-2" text @click="deleteCar()">
            DELETE
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    c: {
      type: Object,
    },
  },
  name: 'CarCard',
  methods: {
    deleteCar() {
      this.$emit('deleteCar', this.c.id);
    },
  },
};
</script>
<style></style>
