/**
 * List of callbacks for start when loaded google SDK
 *
 * @type {Array}
 */
var callbacks = [];

/**
 * State created script
 *
 * @type {boolean}
 */
var created = false;

/**
 * State loaded google SDK
 *
 * @type {boolean}
 */
var loaded = false;

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
    function Loader() {
        _classCallCheck(this, Loader);
    }

    _createClass(Loader, null, [{
        key: 'addQueue',


        /**
         * Add callbacks to list for call after loaded google SDK
         *
         * @param callback
         */
        value: function addQueue(callback) {
            Loader.callbacks.push(callback);

            return this;
        }

        /**
         * Load google SDK
         */

    }, {
        key: 'load',
        value: function load() {

            if (Loader.created) {
                return;
            }

            var script = document.createElement("script");

            document.body.appendChild(script);

            Loader.created = true;

            script.onload = function () {
                _.each(Loader.callbacks, function (item, i) {
                    item();
                });
            };

            script.src = Loader.source();
        }

        /**
         * Returns the google API url for a given library.
         *
         * @return {String}
         */

    }, {
        key: 'source',
        value: function source() {
            var config = window.GOOGLE_AUTOCOMPLETE;

            return config.domain + '?key=' + config.key + '&libraries=' + config.library;
        }
    }, {
        key: 'callbacks',
        get: function get() {
            return callbacks;
        },
        set: function set(val) {
            callbacks = val;
        }
    }, {
        key: 'created',
        get: function get() {
            return created;
        },
        set: function set(val) {
            created = val;
        }
    }, {
        key: 'loaded',
        get: function get() {
            return loaded;
        },
        set: function set(val) {
            loaded = val;
        }
    }]);

    return Loader;
}();

export default Loader;