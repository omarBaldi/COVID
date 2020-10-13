import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalMode: true,
    baseURL: 'https://api.covid19api.com',
    covidData: {
      global: null,
      countries: null
    },
    countrySelectedData: null
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
  },
  actions: {
    async getCovidData({ state, commit }) {
      try {
        const response = await axios.get(`${state.baseURL}/summary`);
        commit('setCovidData', response.data);
      } catch(err) {
        console.log(`Error occuring during retrieving covid data: ${err.message}`);
      }
    },
    findCountryData({ state, commit }, country_code) {
      const currentCountryData = state.covidData.countries.find(country => country.CountryCode === country_code);
      commit('setCurrentCountryData', currentCountryData);
      commit('setMode', false);
    },
  },
  modules: {

  }
})
