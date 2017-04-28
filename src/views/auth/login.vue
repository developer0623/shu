<template>

    <f7-page login-screen @page:reinit="reinit" @page:afteranimation="afteranimation">


        <f7-list form v-if="!logged">
            <f7-list-item>
                <f7-block-title v-show="loginOrPassInvalidError">
                    Benutzername oder Passwort sind falsch
                </f7-block-title>
                <f7-block-title v-show="errors.has('email')">
                    {{ errors.first('email') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>E-Mail</f7-label>
                <f7-input v-model="login_email" v-validate="'required|email'" name="email" placeholder="E-Mail eingeben"
                          type="text" :class="{'input': true, 'is-danger': errors.has('email') }"></f7-input>
            </f7-list-item>


            <f7-list-item>
                <f7-block-title v-show="errors.has('password')">
                    {{ errors.first('password') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Passwort</f7-label>
                <f7-input v-model="login_password" v-validate="'required|min:6|max:32'" name="password" type="password"
                          placeholder="Passwort eingeben"></f7-input>
            </f7-list-item>
        </f7-list>
        <f7-list v-if="!logged">
            <f7-list-item v-if="sending">
                <f7-preloader style="margin: 0 auto;" size="44px"></f7-preloader>
            </f7-list-item>

        </f7-list>
        <f7-block>
            <f7-button class="button button-big button-fill button-raised color-blue" :disabled="isBlocked()" @click="login">Einloggen</f7-button>
            <div class="spacer"></div>
            <f7-button :disabled="sending" href="/register">Registrieren</f7-button>
        </f7-block>
        <f7-list v-if="logged">
            <f7-button href="/dashboard">Sie sind eingeloggt</f7-button>
        </f7-list>
    </f7-page>

</template>
<script type="text/babel">
    import Auth from '../../auth/Auth';
    import Login from '../../auth/Login';
    import Router from '../../router';

    export default {
        data: function () {
            return {
                login_email: 'manager@test.de',
                login_password: 'qweqwe',
                sending: false,
                loginOrPassInvalidError: false,
                logged: Auth.isAuthenticated()
            }
        },

        beforeCreate: function () {
            if (Auth.isAuthenticated()) {
                Router.go('/dashboard');
            }
        },

        methods: {
            login: function () {
                var self = this;

                this.sending = true;
                this.loginOrPassInvalidError = false;

                if (!this.errors.any()) {
                    Login.signin(this.login_email, this.login_password, function (response) {
                        if (response.state) {
                            self.clearState();

                            Router.loaded(function (router) {
                                router.loadPage('/dashboard');
                            });
                        } else {
                            self.loginOrPassInvalidError = true;
                        }

                        self.sending = false;
                    });
                }
            },

            clearState: function () {
                this.login_email = '';
                this.login_password = '';
            },

            isBlocked: function () {
                return this.errors.any() || this.sending;
            },

            redirectAuthenticated: function () {
                if (Auth.isAuthenticated()) {
                    Router.loaded(function (router) {
                        router.loadPage('/dashboard');
                    });
                }
            },

            reinit: function () {
                this.logged = Auth.isAuthenticated();

                this.redirectAuthenticated();
            },

            afteranimation: function () {
                this.redirectAuthenticated();
            }
        },
    }
</script>
