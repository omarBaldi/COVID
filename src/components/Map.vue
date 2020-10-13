<template>
    <v-card 
        elevation="0" 
        width="100%" 
        color="transparent" 
        id="globalMap"
    >
    </v-card>
</template>

<script>
import Highcharts from 'highcharts'
import Global from '@highcharts/map-collection/custom/world-highres3.geo.json'
 
export default {
    name: 'Map',
    data() {
        return {
            arrayCountriesCodes: new Array()
        }
    },
    computed: {
        CountriesCovidData() {
            return this.$store.getters.returnCountriesData
        }
    },
    watch: {
        CountriesCovidData(value) {
            this.createArraysCountriesCode(value);
            this.createMap();
        }
    },
    methods: {
        createMap() {
            new Highcharts.mapChart('globalMap', {
                chart: {
                    map: Global,
                    backgroundColor: '#2d3436',
                    height: 600,
                },
                title: {
                    text: this.CountriesCovidData[0].Country
                },
                credits: {
                    enabled: false
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        alignTo: 'spacingBox'
                    }
                },
                colorAxis: {
                    min: 0,
                    stops: [
                        [0, '#EFEFFF'],
                        [0.5, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                    ]
                },
                tooltip: {
                    enabled: false
                },
                yAxis: {
                    minRange: 800
                },
                legend: {
                    enabled: false
                },
                series: [
                    {
                        states: {
                            hover: {
                                color: Highcharts.getOptions().colors[2]
                            }
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        allAreas: false,
                        data: this.arrayCountriesCodes,
                        animation: {
                            duration: 1500,
                        },
                        showInLegend: false,
                        color: '#8395a7',
                        cursor: 'pointer',
                    }
                ],
                plotOptions:{
                    series: {
                        point:{
                            events:{
                                click: (e) => {
                                    const country_code = e.point['hc-key'].toUpperCase();
                                    this.$store.dispatch('findCountryData', country_code);
                                }
                            }
                        }
                    },
                },
            })
        },
        createArraysCountriesCode(countries) {
            countries.forEach(country => {
                this.arrayCountriesCodes.push(
                    new Array(country.CountryCode.toLowerCase(), country.TotalConfirmed)
                )
            });
        }
    }
}
</script>