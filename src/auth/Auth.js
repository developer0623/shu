/**
 * States
 * @type {{authenticated: boolean}}
 */
var states = {authenticated: false};

/**
 * Auth
 */
export default {

    init: function() {
        this.checkAuth();
    },

    /**
     * setAuthenticated
     */
    setAuthenticated: function() {
        states.authenticated = true;
    },

    /**
     * setUnAuthenticated
     */
    setUnAuthenticated: function() {
        states.authenticated = false;
    },

    /**
     * Is authenticated
     * @returns {boolean}
     */
    isAuthenticated: function() {
        return states.authenticated;
    },

    /**
     * Set token
     * @param token
     */
    setToken: function(token) {
        localStorage.setItem('token', token);
    },

    /**
     * Get token
     */
    getToken: function() {
        return localStorage.getItem('token');
    },

    /**
     * Remove token
     */
    removeToken: function() {
        localStorage.removeItem('token');
    },

    /**
     * Set user
     * @param user
     */
    setUser: function(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    /**
     * Get user
     */
    getUser: function() {
        return JSON.parse(localStorage.getItem('user'));
    },

    getUserID: function() {
        return JSON.parse(localStorage.getItem('user')).id;
    },

    /**
     * Remove user
     */
    removeUser: function() {
        localStorage.removeItem('user');
    },

    /**
     * @param user
     * @param token
     */
    setAuthData: function(user, token) {
        this.setUser(user);
        this.setToken(token);
    },

    /**
     * Remove all auth, user data from storage
     */
    removeAuthData: function() {
        this.removeToken();
        this.removeUser();
    },

    /**
     * Get states
     * @returns {{authenticated: boolean}}
     */
    getStates: function() {
        return states;
    },

    /**
     * Check auth state
     */
    checkAuth: function() {
        if (this.getToken() && this.getUser()) {
            this.setAuthenticated();
        }
        else {
            this.setUnAuthenticated();
        }
    },

    /**
     * @returns {{name: string, value: string}}
     */
    getAuthHeader: function() {
        return {
            name: 'Authorization',
            value: 'Bearer ' + this.getToken()
        }
    }
}