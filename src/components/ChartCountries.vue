<template>
    <v-col>
        <v-card
            elevation="0"
            width="100%"
            color="transparent"
            id="countriesStats"
        >
        </v-card>
    </v-col>
</template>

<script>
/* eslint-disable */
import Highcharts from 'highcharts'

export default {
    name: 'ChartCountries',
    props: {
        message: {
            type: String        
        }
    },
    computed: {
        first10CountriesData() {
            return this.$store.getters.returnFirst10Countries
        }
    },
    watch: {
        first10CountriesData(value) {
              this.createChart(value);
        }
    },
    methods: {
        createChart(value) {
            let $vm = this;

            const chart = new Highcharts.chart({
                colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    height: 500,
                    type: 'column',
                    backgroundColor: '#2d3436',
                    renderTo: 'countriesStats',
                    options3d: {
                        enabled: true,
                        alpha: 7,
                        beta: 20,
                        depth: 100,
                        viewDistance: 50
                    }
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    enabled: false
                },
                xAxis: {
                    gridLineColor: '',
                    labels: {
                        useHTML: true,
                        animate: true,
                        formatter: function() {

                            const i = this.value
                            const imageFlag = `https://www.countryflags.io/${value[i].countryCode}/flat/64.png`;
                            const countryName = value[i].name;
                            
                            return '<div style="text-align:center;"><img src="' + imageFlag + '" height="30" width="30" style="background-repeat: no-repeat; background-position: center; margin-top: 10px;" /><br><span style="color: white;"> ' + countryName + '</span></div>' 
                            
                        }
                    }
                },
                yAxis: {
                    gridLineColor: '#535c68',
                    title: ''
                },
                series: [
                    {
                    colorByPoint: true,
                    dataSorting: {
                        enabled: true,
                        matchByName: true
                    },
                    dataLabels: [{
                        enabled: true,
                        inside: false,
                        style: {
                            color: 'white',
                            fontSize:'15px',
                            fontFamily: 'monospace'
                        }
                    }],
                    data: value.map(x => x.number)
                    }
                ],
                exporting: {
                    allowHTML: true
                }
            });
        }
    }
}
</script>