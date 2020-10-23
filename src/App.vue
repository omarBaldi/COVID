<template>
  <v-app id="app">
    <v-main>

      <v-container fluid fill-height align-baseline>
        <v-row class="justify-center">
          <v-col cols=12 lg=9 md=8 sm=12>
            <GlobalModeButton />
            <Map />
          </v-col>
        </v-row>

        <v-row class="text-center justify-center">
          <v-col cols=12 lg=9 md=8 sm=12>
            <Description />
          </v-col>
        </v-row>

        <v-row class="justify-center mt-16 mb-16">
          <v-col cols=12 lg=9 md=8 sm=12>
            <Ratio />
          </v-col>
        </v-row>

        <v-row class="justify-center text-center mb-16 mt-16">
          <v-col cols=12 lg=9 md=8 sm=12>
            <h1 class="headline font-weight-light white--text ml-6">
              New daily cases
              <v-icon color="white" class="ml-2">mdi-plus</v-icon>
            </h1>
            <NewCases/>
          </v-col>
        </v-row>

        <v-row class="justify-center text-center mb-16 mt-16 white--text">
          <v-col cols=12 lg=9 md=8 sm=12>
            <h1 class="headline font-weight-light">
              Trend - past 2 months
              <v-icon color="white" class="ml-2" medium>mdi-trending-up</v-icon>
            </h1>
            <h4 class="font-weight-light mt-3">
              This graph below show the trend of the people infected, recovered and death  
              <br>
              during a specific temporal arc by drag it either to right or left.
            </h4>
            <Timeline />
          </v-col>
        </v-row>

        <v-container>
          <v-row class="justify-start"><ButtonCountries /></v-row>
          <v-row class="justify-center"><ChartCountries /></v-row>
        </v-container>


      </v-container>

      <div class="warning__viewport" v-if="pageWidth < 500">
        <div class="content">
          <h3>Rotate your phone for a better experience</h3>
          <v-icon dark large class="mt-3">mdi-rotate-3d-variant</v-icon>
        </div>
      </div>

    </v-main>
  </v-app>
</template>

<script>
import GlobalModeButton from './components/GlobalModeButton';
import Map from './components/Map';
import Description from './components/Description';
import Ratio from './components/Ratio';
import NewCases from './components/NewCases';
import Timeline from './components/Timeline';
import ButtonCountries from './components/ButtonCountries';
import ChartCountries from './components/ChartCountries';

export default {
  name: 'App',
  components: {
    GlobalModeButton,
    Map,
    Description,
    Ratio,
    NewCases,
    Timeline,
    ButtonCountries,
    ChartCountries
  },
  data() {
    return {
      pageWidth: null
    }
  },
  created() {
    this.$store.dispatch('getCovidData');
  },
  mounted() {
    ['resize', 'load'].forEach(event => {
      window.addEventListener(event, () => this.pageWidth = window.innerWidth)
    });
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  #app {
    font-family: 'Open Sans', sans-serif;
    background-color: #2d3436;
  }
  .warning__viewport {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #222;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    .content {
      position: fixed;
      top: 50%;
      padding: 10px;
    }
  }
</style>
