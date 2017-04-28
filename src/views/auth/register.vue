<template>

    <f7-page login-screen @page:reinit="afteranimation" @page:back="afteranimation" @page:afterback="afteranimation">
        <f7-list form>
            <!-- LOGIN -->
            <f7-list-item>
                <f7-block-title v-show="errors.has('email')">
                    {{ errors.first('email') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>E-Mail</f7-label>
                <f7-input v-model="register_email" v-validate="'required|email'" name="email" placeholder="Email"
                          type="text" :class="{'input': true, 'is-danger': errors.has('email') }"></f7-input>
            </f7-list-item>

            <!--PASSWORD-->
            <f7-list-item>
                <f7-block-title v-show="errors.has('password')">
                    {{ errors.first('password') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Passwort</f7-label>
                <f7-input v-model="register_password" v-validate="'required|min:6|max:32|confirmed:re_password'"
                          name="password" type="password"
                          placeholder="Passwort"></f7-input>
            </f7-list-item>

            <!--RE PASSWORD-->
            <f7-list-item>
                <f7-block-title v-show="errors.has('re_password')">
                    {{ errors.first('re_password') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Passwort wiederholen</f7-label>
                <f7-input v-model="register_re_password" v-validate="'required|min:6|max:32'" name="re_password"
                          type="password"
                          placeholder="Re-Password"></f7-input>
            </f7-list-item>

            <!-- NAME -->
            <f7-list-item>
                <f7-block-title v-show="errors.has('name')">
                    {{ errors.first('name') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Name</f7-label>
                <f7-input v-model="register_name" v-validate="'required|min:2|max:32'" name="name" placeholder="Name"
                          type="text" :class="{'input': true, 'is-danger': errors.has('name') }"></f7-input>
            </f7-list-item>

            <!-- PHONE -->
            <f7-list-item>
                <f7-block-title v-show="errors.has('phone')">
                    {{ errors.first('phone') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Telefon Nr.</f7-label>
                <f7-input v-model="register_phone" v-validate="'required|min:5|max:32'" name="phone" placeholder="Phone"
                          type="text" :class="{'input': true, 'is-danger': errors.has('phone') }"></f7-input>
            </f7-list-item>

            <!-- ZIP -->
            <f7-list-item>
                <f7-block-title v-show="errors.has('zip')">
                    {{ errors.first('zip') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>PLZ</f7-label>
                <f7-input v-model="register_zip" v-validate="'min:3|max:32'" name="zip" placeholder="Zip"
                          type="text" :class="{'input': true, 'is-danger': errors.has('zip') }"></f7-input>
            </f7-list-item>

            <!-- POSITION -->
            <f7-list-item>
                <f7-block-title v-show="errors.has('zip')">
                    {{ errors.first('zip') }}
                </f7-block-title>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Rolle</f7-label>
                <f7-list-item smart-select smart-select-back-on-select title="Ausgewählt:">
                    <label>
                        <select name="position" @change="changePosition($event)">
                            <option value="1" selected>Fahrer</option>
                            <option value="2">Auftraggeber</option>
                            <option value="3">Manager</option>
                        </select>
                    </label>
                </f7-list-item>
            </f7-list-item>

        </f7-list>
        <f7-list>
            <f7-list-item v-if="sending">
                <f7-preloader style="margin: 0 auto;" size="44px"></f7-preloader>
            </f7-list-item>
        </f7-list>
        <f7-block>
            <f7-button class="button button-big button-fill button-raised color-blue" :disabled="isBlocked()" @click="register()">Registrieren</f7-button>
            <div class="spacer"></div>
            <f7-button :disabled="sending" @click="$router.back()">Zurück</f7-button>
            <div class="spacer"></div>
        </f7-block>
    </f7-page>

</template>
<script type="text/babel">
    import Login from '../../auth/Login';

    export default {
        data: function () {
            return {
                register_email: 'qwe@qwe.qwe',
                register_password: 'qweqwe',
                register_re_password: 'qweqwe',
                register_name: 'John',
                register_phone: '+38 063 491 2000',
                register_zip: '78010',
                register_position: '1',

                sending: false,
                email_exists: false
            }
        },

        methods: {
            register: function () {
                var self = this;

                this.sending = true;
                this.email_exists = false;

                if (!this.errors.any()) {
                    Login.signup(
                        this.register_email,
                        this.register_password,
                        this.register_re_password,
                        this.register_name,
                        this.register_phone,
                        this.register_zip,
                        this.register_position,
                        function (response) {
                            if (response.state) {
                                self.clearState();
                                alert('Register success!');
                                self.$router.loadPage('/login');
                            } else {
                                self.email_exists = true;
                            }

                            self.sending = false;
                        });
                }
            },

            changePosition: function (event) {
                this.register_position = event.target.value;
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

            isBlocked: function () {
                return this.errors.any() || this.sending;
            },

            afteranimation: function(){
//                if(Auth.isAuthenticated()) {
//                    Router.go('/dashboard');
//                }
            }
        }
    }
</script>
