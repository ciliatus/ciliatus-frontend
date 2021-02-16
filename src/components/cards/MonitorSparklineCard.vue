<template>
    <v-skeleton-loader v-if="!monitor" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else max-width="600">
        <card-title>
            <template v-slot:icon>{{ monitor.type.icon }}</template>
            <template v-slot:title>Monitor: {{ monitor.type.name }}</template>
            <template v-slot:subtitle>
                {{ monitor.value }} {{ monitor.type.reading_type_symbol }}
                <info-icon icon="mdi-arrow-down" tooltip="Min" :classes="['ml-2']" color="red"></info-icon> {{ history.min() }} {{ monitor.type.reading_type_symbol }}
                <info-icon icon="mdi-arrow-up" tooltip="Max" :classes="['ml-2']" color="green"></info-icon> {{ history.max() }} {{ monitor.type.reading_type_symbol }}
            </template>
            <template v-slot:error><error-icon error="Data is outdated" x-small v-if="monitor.last_refresh_diff_minutes > 60"> </error-icon></template>
        </card-title>

        <v-card-text>
            <v-sparkline :style="'width:' + width + '%;'"
                         :smooth="8"
                         :gradient="['#' + monitor.type.reading_type_color]"
                         :line-width="1"
                         :value="history"
                         auto-draw
                         padding="4"
                         stroke-linecap="round">
            </v-sparkline>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
            <div class="pt-2">
                <v-icon class="mr-2" small>mdi-clock</v-icon>
                <span class="caption grey--text font-weight-light">
                    Last update {{ (monitor.last_refresh_diff_minutes * 60).formatSeconds(0, 'ago') }}.
                    Showing data from the last {{ historyDiff.formatSeconds(0, '') }}.
                </span>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>

    import ErrorIcon from "../misc/ErrorIcon"
    import CardTitle from "./CardTitle"
    import InfoIcon from "@/components/misc/InfoIcon";
    import DateTime from "@/util/DateTime";

    export default {

        components: {
            InfoIcon,
            ErrorIcon, CardTitle
        },

        props: {
            monitor: Object
        },

        computed: {
            history () {
                let hist, values = this.monitor.history.values

                if (values.length > 64) {
                    hist = values.slice(values.length - 65, values.length - 1)
                } else {
                    hist = values
                }

                return hist.filter((h) => h != null)
            },
            width () {
                // Reduce width when missing values due to late data delivery to ensure we only display current data
                return 100 - (100/64)*(64-this.history.length)
            },
            historyDiff () {
                let start = DateTime.parse(this.monitor.history.start),
                    end   = DateTime.parse(this.monitor.history.end)

                return end.diff(start)
            }
        }

    }
</script>
