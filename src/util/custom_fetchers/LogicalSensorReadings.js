import config from "@/config";
import DateTime from "@/util/DateTime";
import axios from "axios";
import JSONBigInt from "json-bigint";

export default class LogicalSensorReadings {

    static fetch(logical_sensor_id, callback, range_from, range_to = null) {
        if (!range_from instanceof DateTime || !range_from) {
            window.console.error('SensorReading.fetch expects range_from to be instance of DateTime')
            return []
        }

        if (!range_to instanceof DateTime || !range_to) {
            range_to = DateTime.now()
        }

        window.console.log(range_from, range_to)

        let url = config.api.basePath + config.api.prefix +
            'monitoring/logical_sensors/' + logical_sensor_id +
            '/readings/' + range_from.format() + '/' + range_to.format()

        axios.get(url, {
            transformResponse: [data => data]
        }).then((response) => {
            callback(JSONBigInt.parse(response.data))
        }, (error) => {
            window.console.error(error)
        })
    }

}