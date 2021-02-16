<template>
  <v-container>
    <v-row align="start">
      <v-col sm="12">
        <habitats-data-table :on-initial-load-done="onInitialDone"></habitats-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import IndexView from "./IndexView"
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import ModelSpeedDial from "../../components/misc/ModelSpeedDial";
    import HabitatsDataTable from "@/components/tables/HabitatsDataTable";

    export default {
        extends: IndexView,

        data () {
            return {
                model: HabitatModel
            }
        },

        components: {
           ModelSpeedDial, HabitatsDataTable
        }
    }
</script>
