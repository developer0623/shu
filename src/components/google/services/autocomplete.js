import Loader from './loader';

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Autocomplete = function () {
    function Autocomplete(ref) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Autocomplete);

        /**
         * The retrieved place.
         *
         * @type {Object}
         */
        this.place = {};

        /**
         * The google autocomplete payload.
         *
         * @type {Object}
         */
        this.response = {};

        /**
         * The autocomplete instance.
         *
         * @type {Object}
         */
        this.autocomplete = null;

        /**
         * The bounded input.
         *
         * @type {String}
         */
        this.ref = document.getElementById(ref);

        /**
         * The autocomplete config
         *
         * @type {Object}
         */
        this.config = config;

        //Boots the autocomplete.
        this.boot();
    }

    /**
     * Create a new google map instance.
     *
     * @return Autocomplete
     */


    _createClass(Autocomplete, [{
        key: 'boot',


        /**
         * Load the google places API.
         *
         * @return {Void}
         */
        value: function boot() {
            var _this = this;

            if (Loader.loaded) {
                this.bind(this);
            } else {

                Loader.addQueue(function () {
                    return _this.bind(_this);
                }).load();
            }
        }

        /**
         * Binds the autocomplete to the given reference.
         *
         * @param {Self}
         */

    }, {
        key: 'bind',
        value: function bind(obj) {
            obj.autocomplete = new google.maps.places.Autocomplete(obj.ref, this.config);

            obj.autocomplete.addListener('place_changed', function () {
                obj.pipe();
            });
        }

        /**
         * Pipes out the retrieved place information.
         *
         * @return {Void}
         */

    }, {
        key: 'pipe',
        value: function pipe() {
            var data = {};
            var googleInputs = window.GOOGLE_AUTOCOMPLETE.inputs;
            var place = this.response = this.autocomplete.getPlace();

            if (place.address_components !== undefined) {

                for (var i = 0; i < place.address_components.length; i++) {

                    var input = place.address_components[i].types[0];

                    if (googleInputs[input]) {
                        data[input] = place.address_components[i][googleInputs[input]];
                    }
                }

                this.place = JSON.parse(JSON.stringify(data));
            }
        }

        /**
         * Bind the browser location to the given input.
         *
         * @return {Void}
         */

    }, {
        key: 'geolocate',
        value: function geolocate() {
            var _this2 = this;

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function (position) {

                    var geolocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var circle = new google.maps.Circle({
                        center: geolocation,
                        radius: position.coords.accuracy
                    });

                    _this2.autocomplete.setBounds(circle.getBounds());
                });
            }
        }

        /**
         * Returns the retrieved address.
         *
         * @return {Object}
         */

    }, {
        key: 'getPlace',
        value: function getPlace() {
            return this.place;
        }

        /**
         * Returns the retrieved response.
         *
         * @return {Object}
         */

    }, {
        key: 'getResponse',
        value: function getResponse() {
            return this.response;
        }

        /**
         * Returns the google autocomplete object.
         *
         * @return {Object}
         */

    }, {
        key: 'getInstance',
        value: function getInstance() {
            return this.autocomplete;
        }
    }], [{
        key: 'make',
        value: function make(ref) {
            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return new Autocomplete(ref, config);
        }
    }]);

    return Autocomplete;
}();

export default Autocomplete;
