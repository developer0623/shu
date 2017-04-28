/**
 * Import Vue
 */
import Vue from 'vue'
window.Vue = Vue;

/**
 * Import F7
 */
import Framework7 from 'framework7'

/**
 * Import F7 Vue Plugin
 */
import Framework7Vue from 'framework7-vue'

/**
 * Import F7 iOS Theme Styles
 */
//import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
//import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'

import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

/**
 * Import App Custom Styles
 */
import AppStyles from './assets/static/sass/main.scss'

/**
 * Import Routes
 */
import Routes from './routes.js'

/**
 * Import Vue Resource
 */
import Resource from 'vue-resource'
Vue.use(Resource);

/**
 * Import Vue Validations
 */
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

/**
 * Import Vue Validations
 */
import Lodash from 'lodash';
Vue.use(Lodash);

/**
 * Import OneSignal
 */
import OneSignal from './modules/oneSignal/OneSignal';

import notification from './notification';
notification.initialize(OneSignal);

/**
 * Import App Component
 */
// import App from './views/auth/login.vue'
import App from './main.vue'

/**
 * Init F7 Vue Plugin
 */
Vue.use(Framework7Vue);

import Login from './auth/Login';
Login.init(Vue);

/**
 * Interceptors
 */
import Interceptor from './http/Interceptor/Interceptor';
Interceptor.init();

/**
 * Init App
 */
window.Application = new Vue({
    el: '#app',
    template: '<app/>',

    /**
     * Init Framework7 by passing parameters here
     */
    framework7: {
        root: '#app',
        /* Uncomment to enable Material theme: */
        material: true,
        routes: Routes,
    },

    /**
     * Register App Component
     */
    components: {
        app: App
    }
});

/**
 * Addresses autocomplete setting
 */
window.GOOGLE_AUTOCOMPLETE = {
    'domain': 'https://maps.googleapis.com/maps/api/js',
    'key': 'AIzaSyC-bv3xMmiHHI-14-zTek-Qu51raKe0d6Y',
    'library' : 'places',

    // google inputs retrieved.
    'inputs': {
        administrative_area_level_1: 'long_name',
        street_number: 'short_name',
        postal_code: 'short_name',
        locality: 'long_name',
        country: 'long_name',
        route: 'long_name'
    }
}

/*------------------------------------------------
 * Page callbacks example https://framework7.io/docs/page-callbacks.html
 * Page events https://framework7.io/docs/pages.html#page-events
 */
// Application.$f7.onPageInit('*', function (page) {
//     console.log(page, ' initialized');
// });
