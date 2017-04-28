import interceptors from './interceptors';

export default {

    /**
     * Init list of interceptors
     */
    init: function () {
        var self = this;

        _.forEach(interceptors, function (value, key) {
            self.add(value);
        })
    },

    /**
     * @param interceptor
     */
    add: function (interceptor) {
        Vue.http.interceptors.push(function (request, next) {
            interceptor.request(request);

            next(interceptor.response);
        });
    }
}