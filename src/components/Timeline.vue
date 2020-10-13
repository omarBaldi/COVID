<template>
    <v-container class="mt-16">

        <sliderTimeline 
            @currentDays="(data) => { daysAgoTimeline = data }"
        />

        data: {{daysAgoTimeline}}

         <v-card
            elevation="0"
            width="100%"
            color="transparent"
            id="timeline"
        >
        </v-card>

    </v-container>
</template>

<script>
import Highcharts from 'highcharts'
import sliderTimeline from './sliderTimeline'

export default {
    name: 'Timeline',
    components: {
        sliderTimeline
    },
    data() {
        return {
            daysAgoTimeline: null,
            chartDefinitive: [
                {
                    name: "Confirmed",
                    data: null,
                    type: "spline",
                    color: "orange"
                }, 
                {
                    name: "Deaths",
                    data: null,
                    type: "spline",
                    color: "red"
                }, 
                {
                    name: "Recovered",
                    data: null,
                    type: "spline",
                    color: "green"
                }
            ]
        }
    },
    computed: {
        timelineData() {
            return this.$store.getters.dataTimeline
        },
    },
    watch: {
        timelineData(value) {

            const globalModeON = this.$store.state.globalMode;
            let confirmedData;
            let deathsData;
            let recoveredData;

            if (globalModeON) {
                confirmedData = value.map(x => x.TotalConfirmed);
                deathsData = value.map(x => x.TotalDeaths);
                recoveredData = value.map(x => x.TotalRecovered);
            } else {
                confirmedData = Object.values(value.reduce((a, { Confirmed, Date }) => {
                    a[Date] = (a[Date] || { Date, Confirmed: 0 });
                    a[Date].Confirmed +=  Number(Confirmed);
                    return a;
                }, {})).map(x => x.Confirmed);

                deathsData = Object.values(value.reduce((a, { Deaths, Date }) => {
                    a[Date] = (a[Date] || { Date, Deaths: 0 });
                    a[Date].Deaths += Number(Deaths);
                    return a;
                }, {})).map(x => x.Deaths);

                recoveredData = Object.values(value.reduce((a, { Recovered, Date }) => {
                    a[Date] = (a[Date] || { Date, Recovered: 0 });
                    a[Date].Recovered += Number(Recovered);
                    return a;
                }, {})).map(x => x.Recovered);
            }

            this.chartDefinitive[0].data = confirmedData;
            this.chartDefinitive[1].data = deathsData;
            this.chartDefinitive[2].data = recoveredData;

            this.destroyChart();
            this.createChart();
        }
    },
    methods: {
        destroyChart() {
            const parent = document.getElementById('timeline');
            while (parent.firstChild) {
                parent.removeChild(parent.lastChild)
            }
        },
        chartSettings() {

            ['mousemove', 'touchmove', 'touchstart'].forEach((eventType) => {
                document.getElementById('timeline').addEventListener(
                    eventType,
                    function (e) {
                        let chart,
                            point,
                            i,
                            event;

                        for (i = 0; i < Highcharts.charts.length; i++) {

                            chart = Highcharts.charts[i];

                            if (chart) {

                                // Find coordinates within the chart
                                event = chart.pointer.normalize(e);
                                
                                // Get the hovered point
                                point = chart.series[0].searchPoint(event, true);

                                if (point) {
                                    point.highlight(e);
                                }
                            }
                        }
                    }
                );
            });

            Highcharts.Pointer.prototype.reset = () => { return undefined; }

            Highcharts.Point.prototype.highlight = function(event) {
                event = this.series.chart.pointer.normalize(event);
                this.onMouseOver(); // Show the hover marker
                this.series.chart.tooltip.refresh(this); // Show the tooltip
                this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
            };
        },
        createChart() {

            this.chartSettings();

            const arraysDaysLabels = Array.from({ length: this.daysAgoTimeline }, (_, i) => i + 1).reverse();

            this.chartDefinitive.forEach(dataset => {

                const chartDiv = document.createElement('div');
                chartDiv.className = 'chart';
                document.getElementById('timeline').appendChild(chartDiv);
                
                Highcharts.chart(chartDiv, {
                    chart: {
                        marginLeft: 50,
                        marginRight: 50,
                        spacingTop: 30,
                        renderTo: 'timeline',
                        height: 180,
                        backgroundColor: '#2d3436'
                    },
                    title: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        categories: arraysDaysLabels,
                        tickLength: 0
                    },
                    yAxis: {
                        visible: false
                    },
                    tooltip: {
                        formatter: function() {
                            return `${this.y} people ${this.series.name} - ${this.x} days ago`
                        },
                        borderWidth: 0,
                        backgroundColor: 'white',
                        headerFormat: '',
                        shadow: false,
                        style: {
                            fontFamily: 'monospace',
                            fontSize: '15px',
                            color: "black"
                        },
                        padding: 10
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    series: [{
                        data: dataset.data,
                        name: dataset.name,
                        type: dataset.type,
                        color: dataset.color
                    }],
                });
            })
        }
    }
}
</script>