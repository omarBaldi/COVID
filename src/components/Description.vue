<template>
    <p class="headline font-weight-light white--text">
        <span class="blue--text headline font-weight-bold" v-html="$store.state.globalMode ? 'Globally' : `In ${currentDataSelected.Country}`"></span>
        there have been <span class="orange--text headline font-weight-bold">{{formatNumberConfirmed}}</span> confirmed cases of COVID-19, 
        including <span class="red--text headline font-weight-bold">{{formatNumberDeaths}}</span>  deaths and 
        <span class="green--text headline font-weight-bold">{{formatNumberRecovered}}</span> people recovered reported to WHO.
    </p>
</template>

<script>
export default {
    name: 'Description',
    data() {
        return {
            formatNumberConfirmed: null,
            formatNumberDeaths: null,
            formatNumberRecovered: null
        }
    },
    computed: {
        currentDataSelected() {
            return this.$store.getters.returnCurrentDataSelected
        },
    },
    watch: {
        currentDataSelected(value) {

            this.formatNumberConfirmed = value.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.formatNumberDeaths = value.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.formatNumberRecovered = value.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}
</script>