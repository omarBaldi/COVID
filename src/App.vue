<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height align-baseline>

        <v-row class="justify-center mt-3">
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

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import GlobalModeButton from './components/GlobalModeButton';
import Map from './components/Map';
import Description from './components/Description';

export default {
  name: 'App',
  components: {
    GlobalModeButton,
    Map,
    Description
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
