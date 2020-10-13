<template>
    <v-row v-if="!$store.state.globalMode" class="ml-2 mb-4 d-flex flex-row justify-sm-space-between">
        <div>
            <v-img
                max-height="40"
                max-width="40"
                :src="`https://www.countryflags.io/${$store.state.countrySelectedData.CountryCode}/flat/64.png`"
            ></v-img>
            <span class="white--text text-uppercase">{{$store.state.countrySelectedData.Country}}</span>
        </div>

        <div>
            <v-tooltip left color="blue">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        dark
                        @click="$store.dispatch('changeTimelineData', true)"
                        v-bind="attrs"
                        v-on="on"
                        class="mt-2"
                        >
                            <v-icon size="40">mdi-earth</v-icon>
                        </v-btn>
                </template>
                <span>Activate global mode</span>
            </v-tooltip>
        </div>
    </v-row>
</template>

<script>
export default {
    name: 'GlobalSwitch'
}
</script>