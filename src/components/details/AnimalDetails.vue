<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card"></v-skeleton-loader>
    <v-card v-else outlined>
        <v-container>
            <v-row>
                <v-col xs="12" sm="12" md="5" lg="4" xl="3">
                    <v-row>
                        <v-col>
                            <animal-simple-card :id="id"
                                                 :no-initial-load="true"
                                                 :with-render="true">
                            </animal-simple-card>
                        </v-col>
                    </v-row>

                    <v-row v-if="object.habitat">
                        <v-col>
                            <habitat-simple-card :linked-object="object.habitat"
                                                  :no-actions="true"
                                                  :no-initial-load="true">
                            </habitat-simple-card>
                        </v-col>
                    </v-row>

                    <v-row v-if="object.habitat && object.habitat.location">
                        <v-col>
                            <location-simple-card :linked-object="object.habitat.location"
                                                  :no-actions="true"
                                                  :no-initial-load="true">
                            </location-simple-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import SingleComponent from "../SingleComponent"
    import ModelFactory from "../../store/models/ModelFactory"
    import HabitatSimpleCard from "../cards/simple/HabitatSimpleCard"
    import AnimalSimpleCard from "../cards/simple/AnimalSimpleCard"
    import LocationSimpleCard from "../cards/simple/LocationSimpleCard"
    import AnimalModel from "@/store/models/Core/AnimalModel";

    export default {
        extends: SingleComponent,

        components: {
            AnimalSimpleCard, HabitatSimpleCard, LocationSimpleCard
        },

        data () {
            return {
                model: AnimalModel,
                renderLoading: false,
                recursionDepth: 5
            }
        },

        computed: {
            object () {
                return this.model.query().withAllRecursive().find(this.id)
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.object.id, this.model.getRelationNames())
            },
            render () {
                this.$refs.habitatRender.render(this)
            }
        }
    }
</script>
