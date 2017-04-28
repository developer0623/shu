<template>

    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="zurück"></f7-nav-left>
            <f7-nav-center>Fahrt hinzufügen</f7-nav-center>
            <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-list form>
            <f7-list-item>
                <f7-label>Abholzeit</f7-label>
                <f7-input v-model="carriage.time" name="time" placeholder=""
                          type="datetime-local"/>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Fahrgäste</f7-label>
                <f7-input type="text" v-model="carriage.amount_of_people" placeholder="Anzahl eingeben"/>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Start</f7-label>
                <!--<f7-input type="text" v-model="carriage.pick_up_address" placeholder="Adresse eingeben"/>-->

                <google-autocomplete
                        class="input"
                        input_id="pick_up_address"
                        @setAddress="pickUpAddressChanged"
                        :config="{type: ['geocode'], componentRestrictions: {country: 'de'}}"
                        placeholder="Adresse eingeben"
                >
                </google-autocomplete>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Ziel</f7-label>
                <!--<f7-input type="text" v-model="carriage.drop_of_address" placeholder="Adresse eingeben"/>-->

                <google-autocomplete
                        class="input"
                        input_id="drop_of_address"
                        @setAddress="dropOfAddressChanged"
                        :config="{type: ['geocode'], componentRestrictions: {country: 'de'}}"
                        placeholder="Adresse eingeben"
                >
                </google-autocomplete>
            </f7-list-item>
        </f7-list>
        <f7-list>
            <f7-list-item v-if="sending">
                <f7-preloader style="margin: 0 auto;" size="44px"></f7-preloader>
            </f7-list-item>
        </f7-list>
        <f7-block>
            <f7-button class="button button-big button-fill button-raised color-green" @click="carriageAdd()">Fahrt
                hinzufügen
            </f7-button>
        </f7-block>
    </f7-page>

</template>

<style lang="sass" rel="stylesheet/scss">
    .pac-container {
        z-index: 999999 !important;

        &:after {
            display: none;
        }
    }
</style>

<script type="text/babel">
    import CarriageRepository from '../carriage/repository';
    import Auth from '../auth/Auth';

    import GoogleAutocomplete from '../components/google/googleAddressAutocomplete.vue';

    export default {
        components: {
            'google-autocomplete': GoogleAutocomplete,
        },
        data: function () {
            return {
                carriage: {
                    time: '',
                    amount_of_people: '',
                    pick_up_address: '',
                    drop_of_address: ''
                },
                sending: false,

                // google autocomplete settings
                output: {},
                address: {},
                sent: false,
                response: {},
                configs: {}

            };
        },

        mounted: function () {
        },
        methods: {
            pickUpAddressChanged: function(value) {
              this.carriage.pick_up_address = value.address;
            },

            dropOfAddressChanged: function(value) {
              this.carriage.drop_of_address = value.address;
            },

            carriageAdd: function () {
                var self = this;

                this.sending = true;

                CarriageRepository.addCarriage(
                    self.carriage,
                    function (response) {
                        if (response.state) {
                            self.clearState();
                            alert('Fahrt hinzugefügt!');
                            self.$router.loadPage('/dashboard');
                        } else {
                            console.log(response)
                        }

                        self.sending = false;
                    });

            },
            clearState: function () {
                this.register_email = '';
                this.register_password = '';
                this.register_re_password = '';
                this.register_name = '';
                this.register_phone = '';
                this.register_zip = '';
                this.register_position = '';
            },
        }
    }
</script>