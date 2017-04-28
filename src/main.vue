<template>
    <div id="app">
        <!-- Statusbar -->
        <f7-statusbar></f7-statusbar>

        <!-- Right Panel -->
        <f7-panel right cover>
            <f7-view id="right-panel-view" navbar-through :dynamic-navbar="false">
                <f7-navbar title="Right Panel" sliding></f7-navbar>
                <f7-pages>
                    <f7-page>
                        <f7-list>
                            <f7-list-item>
                                <f7-link @click="logout">Logout</f7-link>
                            </f7-list-item>
                        </f7-list>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-panel>


        <!-- Main views -->
        <f7-views>
            <f7-view navbar-through :dynamic-navbar="false" main>
                <f7-pages>
                    <login-view></login-view>
                </f7-pages>
            </f7-view>
        </f7-views>

        <!--<f7-views>-->
        <!--<f7-view id="main-view" navbar-through :dynamic-navbar="true" main>-->

        <!--<f7-pages>-->
        <!--<f7-page>-->
        <!--<f7-block-title>Welcome to my App</f7-block-title>-->
        <!--</f7-page>-->
        <!--</f7-pages>-->
        <!--</f7-view>-->
        <!--</f7-views>-->

    </div>


    <!-- App -->
    <!--<div id="app">-->

    <!--&lt;!&ndash; Statusbar &ndash;&gt;-->
    <!--<f7-statusbar></f7-statusbar>-->


    <!--&lt;!&ndash; Right Panel &ndash;&gt;-->
    <!--<f7-panel right cover layout="dark">-->
    <!--<f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">-->
    <!--<f7-navbar title="Right Panel" sliding></f7-navbar>-->
    <!--<f7-pages>-->
    <!--<f7-page>-->
    <!--<f7-block>-->
    <!--<p>Right panel content goes here</p>-->
    <!--</f7-block>-->
    <!--<f7-block-title>Load page in panel</f7-block-title>-->
    <!--<f7-list>-->
    <!--<f7-list-item link="/about/" title="About"></f7-list-item>-->
    <!--<f7-list-item link="/form/" title="Form"></f7-list-item>-->
    <!--</f7-list>-->
    <!--<f7-block-title>Load page in main view</f7-block-title>-->
    <!--<f7-list>-->
    <!--<f7-list-item link="/about/" title="About" link-view="#main-view" link-close-panel></f7-list-item>-->
    <!--<f7-list-item link="/form/" title="Form" link-view="#main-view" link-close-panel></f7-list-item>-->
    <!--</f7-list>-->
    <!--</f7-page>-->
    <!--</f7-pages>-->
    <!--</f7-view>-->
    <!--</f7-panel>-->

    <!--&lt;!&ndash; Main Views &ndash;&gt;-->
    <!--<f7-views>-->
    <!--<f7-view id="main-view" navbar-through :dynamic-navbar="true" main>-->
    <!--&lt;!&ndash; Navbar &ndash;&gt;-->
    <!--<f7-navbar>-->


    <!--<f7-nav-center sliding>Framework7</f7-nav-center>-->
    <!--<f7-nav-right>-->
    <!--<f7-link icon="icon-bars" open-panel="right"></f7-link>-->
    <!--</f7-nav-right>-->
    <!--</f7-navbar>-->
    <!--&lt;!&ndash; Pages &ndash;&gt;-->

    <!--<f7-pages>-->
    <!--<f7-page>-->
    <!--<f7-block-title>Welcome to my App</f7-block-title>-->
    <!--</f7-page>-->
    <!--</f7-pages>-->
    <!--</f7-view>-->
    <!--</f7-views>-->

    <!--</div>-->


</template>

<script type="text/babel">
    // views
    import LoginView from './views/auth/login.vue';
    import Auth from './auth/Auth';
    import Login from './auth/Login';
    import Router from './router';
    export default {
        data: function () {
            return {
                user: Auth.getUser(),
            };
        },
        components: {
            'login-view': LoginView
        },

        mounted: function () {

        },
        methods: {
            logout: function() {
                Login.logout();
                Router.loaded(function (router) {
                    router.loadPage('/login');
                });
                f7.closePanel();
            }
        }
    }
</script>
