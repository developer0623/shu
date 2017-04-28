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
    showActive: function (success) {
        Vue.http.get(configApi.api_server + configApi.api_url.carriage.show.active, {}
        ).then(function (response) {
            success({state: true, data: response.body.data, meta: response.body.meta});
        }, function (response) {
            success({state: false});
        });
    },

    /**
     * @param success
     */
    showDetail: function (id, success) {
        Vue.http.get(configApi.api_server + configApi.api_url.carriage.show.detail + '/' + id, {}
        ).then(function (response) {
            success({state: true, data: response.body.data});
        }, function (response) {
            success({state: false});
        });
    },

    /**
     * @param success
     */
    addCarriage: function (body, success) {
        Vue.http.post(configApi.api_server + configApi.api_url.carriage.add, body, {}
        ).then(function (response) {
            success({state: true, data: response.body.data});
        }, function (response) {
            success({state: false});
        });
    }
}