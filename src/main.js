import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import {VueMasonryPlugin} from 'vue-masonry'
import Masonry from "./components/misc/Masonry"
import MasonryTile from "./components/misc/MasonryTile"
import axios from "axios"
import '@mdi/font/css/materialdesignicons.css'
import 'typeface-roboto/index.css'

Vue.use(VueMasonryPlugin)

Vue.component('v-masonry', Masonry)
Vue.component('v-masonry-tile', MasonryTile)

Vue.config.productionTip = false

window.vueApp = new Vue({
    router,
    store,
    vuetify,
    iconfont: 'mdi',
    render: h => h(App)
}).$mount('#app')

axios.defaults.withCredentials = true
axios.defaults.headers.common = {
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest"
}

String.prototype.sprintf = function (...args) {
    let i = 0;
    return this.replace(/%s/g, () => args[i++])
}

Number.prototype.pad = function (decimals) {
    decimals += 1
    let s = this.toString()
    if (s.indexOf('.') === -1) s += '.'
    while (s.length < s.indexOf('.') + decimals) s += '0'

    return s
}

Number.prototype.round = function (decimals) {
    let m = decimals * 10
    return Math.round(this * m) / m
}

Number.prototype.formatSeconds = function (decimals) {
    let n = this, u = 'seconds ago'

    if (n < 60) {
        return 'just now'
    }
    if (n >= 120) {
        u = 'minutes ago'
        n /= 60

        if (n >= 120) {
            u = 'hours ago'
            n /= 60

            if (n >= 48) {
                u = 'days ago'
                n /= 24

                if (n >= 28) {
                    u = 'weeks ago'
                    n /= 7
                }
            }
        }
    }

    let d = 1;
    for (let i = 0; i < decimals; i++) {
        d *= 10
    }
    n = Math.round((n + Number.EPSILON) * d) / d

    return '' + n + ' ' + u
}