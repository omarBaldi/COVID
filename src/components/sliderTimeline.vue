<template>
    <v-slider
        dark
        v-model="rangeBarOptions.daysAgo"
        :max="rangeBarOptions.maxDaysAgo"
        :min="rangeBarOptions.minDaysAgo"
        color="blue"
        label="Days ago"
        thumb-color="blue"
        thumb-label="always"
        @change="dateChanged"
    >
    </v-slider>

</template>

<script>
export default {
    name: 'sliderTimeline',
    data() {
        return {
            rangeBarOptions: {
                daysAgo: 30,
                maxDaysAgo: 90,
                minDaysAgo: 7
            }
        }
    },
    created() {
        this.dateChanged(this.rangeBarOptions.daysAgo);
    },
    methods: {
        dateChanged(daysToSubtract) {
            this.$emit('currentDays', daysToSubtract);
            this.$store.dispatch('calculateDaysAgo', daysToSubtract);
        },
    }
}
</script>