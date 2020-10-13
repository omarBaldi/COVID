<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height align-baseline>

        <v-row class="justify-center">
          <v-col cols=12 lg=9 md=8 sm=12>
            <GlobalModeButton />
            <Map />
          </v-col>
        </v-row>

        <v-row class="text-center justify-center">
          <v-col cols=10>
            <Description />
          </v-col>
        </v-row>

        <v-row class="justify-center mt-16 mb-16">
          <v-col cols=6 lg=6 md=8 sm=12>
            <Ratio />
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GlobalModeButton from './components/GlobalModeButton';
import Map from './components/Map';
import Description from './components/Description';
import Ratio from './components/Ratio';

export default {
  name: 'App',
  components: {
    GlobalModeButton,
    Map,
    Description,
    Ratio
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
