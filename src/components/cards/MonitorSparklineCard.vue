<template>
    <v-skeleton-loader v-if="!monitor" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else>
        <card-title>
            <template v-slot:icon>{{ monitor.type.icon }}</template>
            <template v-slot:title>Monitor: {{ monitor.type.name }}</template>
            <template v-slot:subtitle>{{ monitor.value }} {{ monitor.type.reading_type_symbol }}</template>
            <template v-slot:error><error-icon error="Data is outdated" x-small v-if="monitor.last_refresh_diff_minutes > 60"> </error-icon></template>
        </card-title>

        <v-card-text>
            <v-sparkline
                :style="'width:' + width + '%;'"
                :smooth="8"
                :gradient="['#' + monitor.type.reading_type_color]"
                :line-width="1"
                :value="history"
                auto-draw
                padding="16"
                stroke-linecap="round">
            </v-sparkline>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
            <v-icon class="mr-2" small>mdi-clock</v-icon>
            <span class="caption grey--text font-weight-light">last update {{ (monitor.last_refresh_diff_minutes * 60).formatSeconds(0) }}</span>
        </v-card-text>
    </v-card>
</template>

<script>

    import ErrorIcon from "../misc/ErrorIcon"
    import CardTitle from "./CardTitle"

    export default {

        components: {
            ErrorIcon, CardTitle
        },

        props: {
            monitor: Object
        },

        computed: {
            history () {
                let history;
                if (this.monitor.history.length > 32) {
                    history = this.monitor.history.slice(this.monitor.history.length - 33, this.monitor.history.length - 1)
                } else {
                    history = this.monitor.history;
                }

                return history.filter((h) => h != null)
            },
            width () {
                // Reduce width when missing values due to late data delivery to ensure we only display current data
                return 100 - (100/80)*(32-this.history.length)
            }
        }

    }
</script>
