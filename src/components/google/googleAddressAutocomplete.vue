<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <input
            @focus="autocomplete.geolocate()"
            v-bind:placeholder="placeholder"
            v-bind:id="input_id"
            v-model="address"
            type="text"
    >
</template>

<script>

    /**
     * The google autocomplete component.
     *
     * @author Gustavo Ocanto <gustavoocanto@gmail.com>
     * @license https://github.com/gocanto/google-autocomplete/blob/master/LICENSE.md
     */

    import Autocomplete from './services/autocomplete';

    export default {

        props: {
            placeholder: String, //the input placeholder
            input_id: String, // the input id
            "class": String, // the input class
            config: {
                type: Object,
                "default": function() {
                    return {
                        types: ['geocode']
                    }
                }
            } // the Google Autocomplete config to pass-in
        },

        data: function () {
            return {
                /**
                 * The Autocomplete object.
                 *
                 * @type {Autocomplete}
                 */
                'autocomplete': null,

                /**
                 * The typed address.
                 *
                 * @type {String}
                 */
                'address': ''
            }
        },

        computed: {
            /**
             * The place variable returns the requested place from the autocomplete object.
             *
             * @return {Object}
             */
            place: function()
            {
                if (this.hasAutocompleteInstance() && this.autocomplete.getPlace() !== null) {
                    return this.autocomplete.getPlace();
                }

                return {};
            },

            /**
             * The response variable returns the whole google autocomplete payload.
             *
             * @return {Object}
             */
            response: function()
            {
                if (this.hasAutocompleteInstance() && this.autocomplete.getPlace() !== null) {
                    return this.autocomplete.getResponse();
                }

                return {};
            }
        },

        mounted: function()
        {
            //Creates a new Autocomplete object and bind it to the given key.
            this.autocomplete = Autocomplete.make(this.input_id, this.config);
        },

        watch: {
            place: function()
            {
                this.$emit('setAddress', {
                    response: this.response,
                    place: this.place,
                    address: this.autocomplete.ref.value
                });
            }
        },

        methods: {
            /**
             * Checks whether the Autocomplete was loaded.
             *
             * @return {Bool}
             */
            hasAutocompleteInstance: function()
            {
                return this.autocomplete != null && this.autocomplete.getInstance() != null;
            }
        }
    };
</script>
