<template>
    <v-col cols="3">
        <span class="display-1 font-weight-light white--text">Top 10 Countries by</span>

        <v-select
        :items="countriesSelectData"
        :label="countriesSelectData[0]"
        @change="updateMode"
        solo
        class="mt-4"
        >
        </v-select>
    </v-col>
</template>

<script>
export default {
    name: 'ButtonCountries',
    data() {
        return {
            countriesSelectData: ['Confirmed', 'Deaths', 'Recovered'],
        }
    },
    methods: {
        updateMode(e) {
            this.$store.commit('changeCountriesChartMode', e);
        }
    }
}
</script>