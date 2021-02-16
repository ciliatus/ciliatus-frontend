import moment from 'moment';

// This class is used as an adapter to an actual date time library.
// Right now we're using moment.js but might switch to JS Temporal when it's ready.
export default class DateTime {

    constructor (dt) {
        this.dt = dt
    }

    static parse(dt) {
        return new DateTime(moment.parseZone(dt))
    }

    diff (dt) {
        return Math.round(this.dt.diff(dt.dt) / 1000)
    }

}