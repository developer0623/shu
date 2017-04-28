export default {

    /**
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    load: function(key, defaultValue) {
        try {
            return require('../.env').default[key];
        }
        catch (e) {
            return defaultValue;
        }
    }
}