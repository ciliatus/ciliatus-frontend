<template>
    <v-container>
        <animal-details :on-initial-load-done="onInitialDone" :id="id"> </animal-details>

        <model-speed-dial :model="model" :object="object" create edit del> </model-speed-dial>
    </v-container>
</template>

<script>
    import ShowView from "./ShowView"
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import HabitatDetails from "../../components/details/HabitatDetails"
    import ModelSpeedDial from "../../components/misc/ModelSpeedDial";
    import AnimalModel from "@/store/models/Core/AnimalModel";
    import AnimalDetails from "@/components/details/AnimalDetails";

    export default {
        extends: ShowView,

        data () {
            return {
                model: AnimalModel
            }
        },

        components: {
            AnimalDetails, ModelSpeedDial
        },

        computed: {
            object () {
                return AnimalModel.query().with('habitat').find(this.id)
            }
        },

        mounted () {
            this.$root.$emit('ResetLoading', 1)
        }
    }
</script>
