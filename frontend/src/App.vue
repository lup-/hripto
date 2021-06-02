<template>
    <v-app>
        <v-alert type="error" v-model="showError" dismissible tile class="global-error">{{appError}}</v-alert>

        <v-snackbar v-model="showMessage" :timeout="5000" :color="appMessage.color" :top="!mobile" :bottom="mobile">
            {{ appMessage.text }}
            <template v-slot:action="{ attrs }">
                <v-btn icon v-bind="attrs" @click="showMessage = false"> <v-icon>mdi-close</v-icon></v-btn>
            </template>
        </v-snackbar>

        <v-app-bar flat shrink-on-scroll app prominent dense v-if="!mobile && isLoggedIn">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Хрипто<sup>&alpha;</sup></v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-if="$store.getters.isLoggedIn" link @click="logout">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Выход</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>

                <v-progress-linear
                        :active="isLoading"
                        :indeterminate="isLoading"
                        absolute
                        bottom
                ></v-progress-linear>

            <template v-slot:extension>
                <v-tabs align-with-title>
                    <v-tab v-for="route in routes" :key="route.code" @click="$router.push({name: route.code})">{{route.title}}</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-progress-circular v-if="isLoading && mobile"
                active
                indeterminate
                color="primary"
        ></v-progress-circular>

        <v-main class="pb-16">
            <router-view></router-view>
        </v-main>

        <v-footer padless fixed v-if="mobile && isLoggedIn">
            <v-card flat tile width="100%" class="text-center">
                <v-card-text>
                    <v-btn class="mx-4" icon v-for="route in routes" :key="route.code" @click="$router.push({name: route.code})">
                         <v-icon size="24px" v-text="route.icon"></v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-footer>

    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data: () => ({
            drawer: false,
            showError: false,
            showMessage: false,
            clientWidth: 0,
        }),
        watch: {
            appError() {
                this.showError = true;
            },
            appMessage() {
                this.showMessage = true;
            },
            mobile() {
                this.drawer = !this.mobile;
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.handleResize)
        },
        methods: {
            async logout() {
                await this.$store.dispatch('logoutUser');
                return this.$router.push({name: 'login'});
            },
            handleResize() {
                this.clientWidth = window.innerWidth;
            },
        },
        computed: {
            appError() {
                return this.$store.state.appError;
            },
            appMessage() {
                return this.$store.state.appMessage;
            },
            routes() {
                return this.$store.getters.allowedRoutes;
            },
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            isLoading() {
                return this.$store.state.loading;
            },
            mobile() {
                return this.clientWidth <= this.$vuetify.breakpoint.thresholds.xs;
            }
        }
    }
</script>

<style>
    .v-application .error {z-index: 100}
    .global-error {position: fixed!important; top: 0; width: 100%}
    .v-navigation-drawer--fixed {z-index: 1000}
</style>
