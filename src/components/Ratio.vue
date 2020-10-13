<template>
    <v-card
        elevation="0"
        width="100%"
        color="transparent"
        id="ratio"
    >
    </v-card>
</template>

<script>
import Highcharts from 'highcharts'

export default {
    name: 'Ratio',
    computed: {
        currentDataSelected() {
            return this.$store.getters.returnCurrentDataSelected
        },
    },
    watch: {
        currentDataSelected(value) {
            this.createChart(value);
        }
    },
    methods: {
        createChart(value) {
            Highcharts.chart('ratio', {
                chart: {
                    backgroundColor: '#2d3436',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    height: 300,
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        borderColor: 'white',
                        borderWidth: 0,
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: 'white',
                                fontSize:'15px',
                                fontFamily: 'monospace'
                            }
                        },
                        showInLegend: false
                    }
                },
                series: [{
                    colorByPoint: true,
                    data: [
                        {
                        color: 'orange',
                        name: 'Confirmed',
                        y: 
                        (value.TotalConfirmed * 100) /
                        (value.TotalConfirmed + 
                        value.TotalDeaths + 
                        value.TotalRecovered),
                        sliced: true,
                        }, 
                        {
                        color: 'red',
                        name: 'Deaths',
                        sliced: true,
                        y:  
                        (value.TotalDeaths * 100) /
                        (value.TotalConfirmed + 
                        value.TotalDeaths + 
                        value.TotalRecovered),
                        }, 
                        {
                        color: 'green',
                        name: 'Recovered',
                        sliced: true,
                        y: 
                        (value.TotalRecovered * 100) /
                        (value.TotalConfirmed + 
                        value.TotalDeaths + 
                        value.TotalRecovered),
                        }
                        ]
                }]
            });
        }
    }
}
</script>