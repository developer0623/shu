/**
 * Auth object
 */
import Auth from './Auth';

/**
 * @type {{}}
 */
import configApi from '../config/api';

var Vue = {};

/**
 * Login
 */
export default  {

    /**
     * @param vue
     */
    init: function (vue) {
        Vue = vue;

        Auth.init();
    },

    /**
     * Sign in
     * @param login
     * @param pass
     * @param success
     */
    signin: function (login, pass, success) {

        // device key for notify current user
        var notificationUserId = localStorage.getItem('notification_key');

        Vue.http.post(configApi.api_server + configApi.api_url.auth.login,
            {
                email: login,
                password: pass,
                notification_key: notificationUserId
            }
        ).then(function (response) {
            Auth.setAuthenticated();

            var user = response.body.user;
            var token = response.body.token;

            Auth.setAuthData(user, token);

            success({state: true});
        }, function (response) {
            success({state: false});
        });
    },

    /**
     * @param login
     * @param pass
     * @param passConfirm
     * @param name
     * @param phone
     * @param zip
     * @param position
     * @param success
     */
    signup: function (login, pass, passConfirm, name, phone, zip, position, success) {
        Vue.http.post(configApi.api_server + configApi.api_url.auth.register,
            {
                email: login,
                password: pass,
                password_confirmation: passConfirm,
                name: name,
                phone: phone,
                zip: zip,
                position: position

            }
        ).then(function (response) {
            success({state: true});
        }, function (response) {
            success({state: false});
        });
    },

    /**
     * Logout
     */
    logout: function () {
        Auth.setUnAuthenticated();
        Auth.removeAuthData();
    }
}