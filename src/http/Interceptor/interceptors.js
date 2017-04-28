import Auth from './../../auth/Auth';
import Login from './../../auth/Login';
import Router from '../../router';

export default {

    /**
     * Check user auth
     *
     * @param request
     * @param next
     */
    auth: {
        request: function (request) {
            var authHeader = Auth.getAuthHeader();

            request.headers.set(authHeader.name, authHeader.value);
        },
        response: function (response) {
            if (response.status === 401) {
                Login.logout();
            } else if (response.status === 403) {
                alert('Access forbidden message');
            }
        }
    }
};