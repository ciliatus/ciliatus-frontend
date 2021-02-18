<template>
    <v-skeleton-loader v-if="!logicalSensor || !type" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else>
        <card-title>
            <template v-slot:icon>{{ type.icon }}</template>
            <template v-slot:title>Sensor: {{ logicalSensor.name }}</template>
            <template v-if="chartdata" v-slot:subtitle>
                {{ type.name }}
                <info-icon icon="mdi-arrow-down" tooltip="Min" :classes="['ml-2']" color="red"></info-icon> {{ chartdata.datasets[0].data.map((c) => c.y).min().round(1) }} {{ type.reading_type_symbol }}
                <info-icon icon="mdi-arrow-up" tooltip="Max" :classes="['ml-2']" color="green"></info-icon> {{ chartdata.datasets[0].data.map((c) => c.y).max().round(1) }} {{ type.reading_type_symbol }}
            </template>
        </card-title>

        <template v-if="chartdata">
            <v-card-text>
                <line-chart :data="chartdata" :options="chartoptions" generate-labels-from-x ref="chart"></line-chart>
            </v-card-text>
        </template>

        <v-card-actions>
            <v-row>
                <v-col class="xs-12 md-5 lg-4 xl-3">
                    <v-dialog ref="dialog-from" v-model="stateModal.from" :return-value.sync="filter.from" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="filter.from"
                                label="From"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="filter.from" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="stateModal.from = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs['dialog-from'].save(filter.from)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-col>
                <v-col class="xs-12 md-5 lg-4 xl-3">
                    <v-dialog ref="dialog-to" v-model="stateModal.to" :return-value.sync="filter.to" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="filter.to"
                                label="To"
                                prepend-icon="mdi-calendar"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="filter.to" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="stateModal.from = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs['dialog-to'].save(filter.to)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-col>
                <v-col class="xs-12 md-2 lg-2 xl-1 pt-5">
                    <v-btn color="primary" @click="load">Load</v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script>

    import ErrorIcon from "../misc/ErrorIcon"
    import CardTitle from "./CardTitle"
    import InfoIcon from "@/components/misc/InfoIcon";
    import DateTime from "@/util/DateTime";
    import LineChart from "@/components/misc/chart/LineChart";
    import LogicalSensorReadings from "@/util/custom_fetchers/LogicalSensorReadings";

    export default {

        components: {
            LineChart,
            InfoIcon,
            ErrorIcon, CardTitle
        },

        props: {
            type: Object,
            logicalSensor: Object
        },

        data () {
            return {
                readings: null,
                chartdata: null,
                chartoptions: {
                    legend: false,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: this.type.name + ' ' + this.type.reading_type_symbol
                            }
                        }]
                    }
                },
                stateModal: {
                    from: false,
                    to: false
                },
                filter: {
                    from: DateTime.now().subDays(2).format('YYYY-MM-DD'),
                    to: DateTime.now().format('YYYY-MM-DD')
                }
            }
        },

        methods: {
            fetched (data) {
                this.readings = data.data;
                if (!this.readings) return

                this.chartdata = {
                    datasets: [
                        {
                            label: this.type.name,
                            borderColor: '#' + this.type.reading_type_color,
                            pointRadius: 0,
                            pointHitRadius: 10,
                            fill: false,
                            data: this.readings.map((r) => {
                                return {
                                    x: r.time,
                                    y: Number(r.value).round(1)
                                }
                            })
                        }
                    ]
                }

                this.$nextTick(() => this.$refs.chart.render())
            },
            load () {
                LogicalSensorReadings.fetch(this.logicalSensor.id, this.fetched, DateTime.parse(this.filter.from), DateTime.parse(this.filter.to))
            }
        }

    }
</script>
