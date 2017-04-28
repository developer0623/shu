<template>

    <f7-page>
        <f7-navbar>
            <f7-nav-left back-link="zurück"></f7-nav-left>
            <f7-nav-center>Fahrt</f7-nav-center>
            <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-card title="Fahrt-Details" class="card-spacing">
            <f7-list>
                <f7-list-item>
                    <b>Status</b> <span v-if="carriage.done">Abgeschlossen</span><span v-else>In Auftrag</span>
                </f7-list-item>
                <f7-list-item v-for="l in geo.pickup">
                    <b>Abholadresse</b> <f7-button class="button button-raised" :href="'geo:'+l.lat+','+l.lng+'?q='+carriage.pick_up_address" external><i class="mdi mdi-map-marker"></i> {{carriage.pick_up_address}}</f7-button>
                </f7-list-item>
                <f7-list-item v-for="l in geo.dropoff">
                    <b>Zieladresse</b> <f7-button class="button button-raised" :href="'geo:'+l.lat+','+l.lng+'?q='+carriage.drop_of_address" external><i class="mdi mdi-map-marker"></i> {{carriage.drop_of_address}}</f7-button>
                </f7-list-item>
                <f7-list-item>
                    <b>Fahrtdistanz</b> {{geo.distance}}
                </f7-list-item>
                <f7-list-item>
                    <b>Abholzeit</b> {{carriage.time | toDate}}
                </f7-list-item>
                <f7-list-item>
                    <b>Fahrgäste</b> {{carriage.amount_of_people}}
                </f7-list-item>
            </f7-list>
        </f7-card>

        <f7-popup id="driver-popup">
            <!-- Popover content goes here -->
            <f7-block-title>Fahrerdetails</f7-block-title>
            <f7-list>
                <f7-list-item>
                    <b>Name:</b> {{selectedDriver.name}}
                </f7-list-item>
                <f7-list-item>
                    <b>E-Mail</b> {{selectedDriver.email}}
                </f7-list-item>
                <f7-list-item>
                    <b>PLZ</b> {{selectedDriver.zip}}
                </f7-list-item>
                <f7-list-item>
                        <b>Telefon</b> {{selectedDriver.phone}}
                </f7-list-item>

            </f7-list>
            <f7-block>
                <f7-button class="button button-big button-fill button-raised color-green" :href="'tel:'+selectedDriver.phone" external><i class="mdi mdi-phone"></i> Anrufen</f7-button>
            </f7-block>
            <f7-block>
            <f7-buttons>
                <f7-button class="button button-big" close-popup="#driver-popup">Shließen</f7-button>
                <f7-button class="button button-big button-fill button-raised color-blue" @click="addDriver(selectedDriver.id, carriage.id)" close-popup="#driver-popup">
                    Fahrer zuweisen
                </f7-button>
            </f7-buttons>
            </f7-block>
        </f7-popup>

        <f7-block v-if="sending" style="text-align:center;">
            <f7-preloader style="margin: 0 auto;" size="44px"></f7-preloader>
        </f7-block>
        <div v-if="!sending">
            <f7-card title="Fahrer" v-if="user.position_id == 3">
                <div v-if="Object.keys(selected).length === 0">
                    <f7-list>
                        <f7-list-item v-for="d in drivers.users">
                            <f7-link open-popup="#driver-popup" @click="selectDriver(d)">{{d.name}} <i class="mdi mdi-chevron-right"></i></f7-link>
                            <!--  @click="carriageAccept(d.id, carriage.id)" -->
                        </f7-list-item>
                    </f7-list>
                </div>
                <div v-else>
                    <f7-block v-if="user.position_id == 3" v-for="u in selected">
                        <f7-list>
                            <f7-list-item>
                                <b>Name:</b> {{u.name}}
                            </f7-list-item>
                            <f7-list-item>
                                <b>E-Mail</b> {{u.email}}
                            </f7-list-item>
                            <f7-list-item>
                                <b>PLZ</b> {{u.zip}}
                            </f7-list-item>
                            <f7-list-item>
                                <b>Telefon</b> {{u.phone}}
                            </f7-list-item>
                        </f7-list>
                        <f7-block v-if="!carriage.done">
                            <f7-button class="button button-big button-fill button-raised color-green"
                                       :href="'tel:'+u.phone" external><i class="mdi mdi-phone"></i> Anrufen
                            </f7-button>
                            <f7-button style="margin-top: 10px;" class="button button-big" color="red"
                                       @click="deleteDriver(carriage.id)">Fahrer löschen
                            </f7-button>
                        </f7-block>
                    </f7-block>
                </div>
            </f7-card>
        </div>
        <f7-block inner>
            <f7-buttons>
                <f7-button class="button button-big" @click="$router.back()"><i class="mdi mdi-chevron-left"></i> Zurück</f7-button>
                <f7-button v-if="!carriage.done && user.position_id == 3"
                           class="button button-big button-fill button-raised color-blue"
                           @click="carriageDone(carriage.id)"><i class="mdi mdi-check"></i> Abgeschlossen
                </f7-button>

            </f7-buttons>
        </f7-block>
        <div class="spacer"></div>
    </f7-page>
</template>
<script type="text/babel">
    import CarriageRepository from '../carriage/repository';
    import configApi from '../config/api';
    import Auth from '../auth/Auth';
    import Router from '../router';
    import dateFormat from 'dateformat'
    export default {
        data: function () {
            return {
                carriage: {},
                user: Auth.getUser(),
                drivers: [],
                selected: Object,
                selectedDriver: '',
                sending: false,
                done: 0,
                geo: ''
            };
        },
        mounted: function () {
            var self = this;
            var carriageId = this.$route.params.id;

            CarriageRepository.showDetail(carriageId, function (response) {
                if (response.state) {
                    self.carriage = response.data;
                    self.geo = self.carriage.geo;
                }
            });

            if (self.user.position_id == 3) {

                Vue.http.get(configApi.api_server + configApi.api_url.driver + carriageId, {}
                ).then(function (response) {
                    self.selected = response.body
                }, function (response) {
                });

                Vue.http.get(configApi.api_server + configApi.api_url.user.drivers, {}
                ).then(function (response) {
                    self.drivers = response.body
                }, function (response) {
                });
            }
        },
        methods: {
            addDriver: function (driver_id, carriage_id) {
                this.sending = true;
                var self = this;
                Vue.http.post(configApi.api_server + configApi.api_url.carriage.assign, {
                            carriage: carriage_id,
                            driver: driver_id
                        }, {}
                ).then(function (response) {
                    Vue.http.get(configApi.api_server + configApi.api_url.driver + carriage_id, {}
                    ).then(function (response) {
                        self.selected = response.body
                    }, function (response) {
                    });
                    self.sending = false;
                }, function (response) {
                    console.log(response)
                });
            },
            selectDriver: function (driver) {
                this.selectedDriver = driver;
            },
            deleteDriver: function (carriage_id) {
                this.sending = true;
                var self = this;
                Vue.http.delete(configApi.api_server + configApi.api_url.carriage.deleteDriver + carriage_id, {}, {}
                ).then(function (response) {
                    Vue.http.get(configApi.api_server + configApi.api_url.driver + carriage_id, {}
                    ).then(function (response) {
                        self.selected = response.body
                    }, function (response) {
                    });
                    self.sending = false;
                }, function (response) {
                    console.log(response)
                });
            },
            carriageDone: function (carriage_id) {
                this.sending = true;
                var self = this;
                Vue.http.post(configApi.api_server + configApi.api_url.carriage.done + carriage_id, {}, {}
                ).then(function (response) {
                    self.done = 1;
                    self.sending = false;
                }, function (response) {
                    console.log(response)
                });
            }
        },
        filters: {
            toDate: function(value) {
                return dateFormat(value, "HH:mm - dd.mm.yy");
            }
        }
    }
</script>