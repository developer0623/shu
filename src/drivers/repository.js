/**
 * @type {{}}
 */
import configApi from '../config/api';

/**
 * Carriage repository
 */
export default  {
    /**
     * @param success
     */
    getDrivers: function (success) {
        Vue.http.get(configApi.api_server + configApi.api_url.user.drivers, {}
        ).then(function (response) {
            success({state: true, data: response.body.data, meta: response.body.meta});
            console.log(response)
        }, function (response) {
            success({state: false});
        });
    },
}