import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    today: new Date().toISOString().split('T')[0] + "T00:00:00Z",
    daysAgo: null,
    globalMode: true,
    baseURL: 'https://api.covid19api.com',
    covidData: {
      global: null,
      countries: null
    },
    countrySelectedData: null,
    covidDataTimeline: null,
    countriesChartMode: 'Confirmed'
  },
  getters: {
    returnCountriesData(state) {
      return state.covidData.countries
    },
    returnCurrentDataSelected(state) {
      if (state.globalMode) {
        return state.covidData.global
      } else {
        return state.countrySelectedData
      }
    },
    dataTimeline(state) {
      return state.covidDataTimeline  
    },
    returnFirst10Countries(state) {

      if (state.covidData.countries) {
        switch (state.countriesChartMode) {
          case 'Deaths':
            return state.covidData.countries
              .sort((a, b) => b.TotalDeaths - a.TotalDeaths)
              .map(({ CountryCode, Country, TotalDeaths }) => ({ countryCode: CountryCode, name: Country, number: TotalDeaths }))
              .slice(0, 10);

          case 'Recovered':
            return state.covidData.countries
              .sort((a, b) => b.TotalRecovered - a.TotalRecovered)
              .map(({ CountryCode, Country, TotalRecovered }) => ({ countryCode: CountryCode, name: Country, number: TotalRecovered }))
              .slice(0, 10);

          case 'Confirmed':
          return state.covidData.countries
            .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
            .map(({ CountryCode, Country, TotalConfirmed }) => ({ countryCode: CountryCode, name: Country, number: TotalConfirmed }))
            .slice(0, 10)
        }
      }
    }
  },
  mutations: {
    setCovidData(state, payload) {
      const { Global, Countries } = payload;
      state.covidData.global = Global;
      state.covidData.countries = Countries;
    },
    setCurrentCountryData(state, payload) {
      state.countrySelectedData = payload;
    },
    setMode(state, payload) {
      state.globalMode = payload;
    },
    setDaysAgo(state, payload) {
      state.daysAgo = payload;
    },
    setCovidDataTimeline(state, payload) {
      state.covidDataTimeline = payload;
    },
    changeCountriesChartMode(state, payload) {
      state.countriesChartMode = payload;
    },
  },
  actions: {
    calculateDaysAgo({ dispatch, commit }, daysToSubtract) {
      let lastDate = new Date().setDate(new Date().getDate() - daysToSubtract);
      lastDate = new Date(lastDate).toISOString().split('T')[0] + "T00:00:00Z";
      commit('setDaysAgo', lastDate);
      dispatch('getCovidDataTimeline');
    },
    async getCovidData({ state, commit }) {
      try {
        const response = await axios.get(`${state.baseURL}/summary`);
        commit('setCovidData', response.data);
      } catch(err) {
        console.log(`Error occuring during retrieving covid data: ${err.message}`);
      }
    },
    async getCovidDataTimeline({ state, commit }) {

      let response;

      try {
        if (state.globalMode) {
          response = await axios.get(`${state.baseURL}/world?from=${state.daysAgo}&to=${state.today}`);
          response.data.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed);
        } else {
          response = await axios.get(`${state.baseURL}/country/${state.countrySelectedData.Slug}?from=${state.daysAgo}&to=${state.today}`);
        }

        commit('setCovidDataTimeline', response.data);
      } catch(err) {
        console.log(`Error occuring during retrieving covid data timeline: ${err.message}`)
      }
    },
    findCountryData({ state, commit, dispatch }, country_code) {
      const currentCountryData = state.covidData.countries.find(country => country.CountryCode === country_code);
      commit('setCurrentCountryData', currentCountryData);
      commit('setMode', false);
      dispatch('getCovidDataTimeline');
    }
  },
  modules: {

  }
})
