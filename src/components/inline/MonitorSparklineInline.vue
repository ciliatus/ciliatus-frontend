<template>
    <span>
        <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
                <v-btn outlined text small class="mr-1 mt-1" style="text-align: left" v-bind="attrs" v-on="on">
                    <v-icon left>{{ monitor.type.icon }}</v-icon>

                    <v-sparkline :style="'width: ' + width + 'px; height: 16px;'" class="pr-2"
                                 :smooth="8"
                                 :gradient="['#' + monitor.type.reading_type_color]"
                                 :line-width="1"
                                 :value="history"
                                 auto-draw
                                 padding="0"
                                 height="16"
                                 :width="width"
                                 stroke-linecap="round">
                    </v-sparkline>

                    <span :style="'padding-left:' + (60-width) + 'px'">
                        {{ monitor.value.round(1).pad(1) }}{{ monitor.type.reading_type_symbol }}
                    </span>
                </v-btn>
            </template>
            <template v-slot:default="dialog">
                <monitor-sparkline-card :monitor="monitor"></monitor-sparkline-card>
            </template>
        </v-dialog>
    </span>
</template>

<script>
    import MonitorSparklineCard from "@/components/cards/MonitorSparklineCard";
    export default {
        components: {MonitorSparklineCard},
        props: {
            monitor: Object
        },

        computed: {
            history () {
                let history;
                if (this.monitor.history.length > 12) {
                    history = this.monitor.history.slice(this.monitor.history.length - 13, this.monitor.history.length - 1)
                } else {
                    history = this.monitor.history;
                }

                return history.filter((h) => h != null)
            },
            width () {
                // Reduce width when missing values due to late data delivery to ensure we only display current data
                return 60 - (60/12)*(12-this.history.length)
            }
        }

    }
</script>
