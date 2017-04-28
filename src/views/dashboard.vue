<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-center v-if="user.position_id > 2">Fahrtenübersicht</f7-nav-center>
            <f7-nav-center v-else>Meine Fahrten</f7-nav-center>
            <f7-nav-right>
                <f7-link @click="refreshCarriages()"><i class="mdi mdi-refresh"></i></f7-link>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block v-if="user.position_id == 2">
            <f7-button class="button button-big button-fill button-raised color-green" href="/carriage/add">Fahrt hinzufügen</f7-button>
        </f7-block>
        <f7-block-title>Aktuelle Fahrten</f7-block-title>
        <f7-list>
            <f7-list-item v-for="carriage in carriages" v-if="!carriage.done" :link="'/carriage/detail/' + carriage.id" :title="carriage.pick_up_address">
            <span v-if="carriage.driver_id"><i class="mdi mdi-car"></i></span>
            </f7-list-item>
        </f7-list>
        <f7-block-title>Abgeschlossene Fahrten</f7-block-title>
        <f7-list>
            <f7-list-item v-for="carriage in carriages" v-if="carriage.done" :link="'/carriage/detail/' + carriage.id" :title="carriage.pick_up_address">
            </f7-list-item>
        </f7-list>
    </f7-page>

</template>
<script type="text/babel">
    import CarriageRepository from '../carriage/repository';
    import configApi from '../config/api';
    import Auth from '../auth/Auth';

    export default {
        data: function () {
            return {
                carriages: [],
                user: Auth.getUser()
            };
        },

        mounted: function () {
            var self = this;
            if (self.user.position_id >= 2) {
                CarriageRepository.showActive(function (response) {
                    if (response.state) {
                        self.carriages = response.data;
                    }
                });
            } else {
                Vue.http.get(configApi.api_server + configApi.api_url.carriage.show.my, {}
                ).then(function (response) {
                    self.carriages = response.body.carriage_requests
                }, function (response) {
                });
            }
        },
        methods: {
            refreshCarriages: function() {
                var self = this;
                if (self.user.position_id >= 2) {
                    CarriageRepository.showActive(function (response) {
                        if (response.state) {
                            self.carriages = response.data;
                        }
                    });
                } else {
                    Vue.http.get(configApi.api_server + configApi.api_url.carriage.show.my, {}
                    ).then(function (response) {
                        self.carriages = response.body.carriage_requests
                    }, function (response) {
                    });
                }
            }
        }
    }
</script>