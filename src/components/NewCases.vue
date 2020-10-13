<template>
    <v-card
        class="mt-12"
        elevation="0"
        color="transparent"
        id="newCases"
        >
    </v-card>
</template>

<script>
import Highcharts from 'highcharts'

export default {
    name: 'NewCases',
    data() {
        return {
            newCases: null
        }
    },
    computed: {
        currentDataSelected() {
            return this.$store.getters.returnCurrentDataSelected
        },
    },
    watch: {
        currentDataSelected(value) {
            this.newCases = [value.NewConfirmed, value.NewDeaths, value.NewRecovered]
            this.createChart();
        }
    },
    methods: {
        createChart() {

            Highcharts.chart('newCases', {
                colors: ['orange', 'red', 'green'],
                chart: {
                    type: 'bar',
                    backgroundColor: '#2d3436'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Confirmed', 'Deaths', 'Recovered'],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    gridLineColor: '#535c68',
                    title: '',
                    min: 0,
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        colorByPoint: true,
                        pointPadding: 0
                    },
                    bar: {
                        minPointLength: 50,
                        borderRadius: 3,
                        dataLabels: {
                            enabled: true,
                            color: 'white',
                            style: {
                                fontSize: '15px',
                            },
                        }
                    },
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [
                    {
                        borderColor: '',
                        data: this.newCases
                    }
                ]
            });
        }
    }
}
</script>