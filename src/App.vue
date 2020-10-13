<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height align-baseline>

        <v-row class="justify-center mt-3">
          <v-col cols=12 lg=9 md=8 sm=12>
            <Map />
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Map from './components/Map';

export default {
  name: 'App',
  components: {
    Map
  },
  created() {
    this.$store.dispatch('getCovidData');
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  #app {
    font-family: 'Open Sans', sans-serif;
    background-color: #2d3436;
  }
</style>
