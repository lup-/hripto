import Vue from 'vue';
import Vuex from 'vuex';

import portfolio from "./modules/portfolio";
import offer from "./modules/offer";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appError: false,
        appMessage: false,
        loading: false,
        routes: [
            {code: 'home', title: 'Сделки', icon: 'mdi-briefcase-variant'},
            {code: 'tradeList', title: 'История', icon: 'mdi-history'},
        ]
    },
    getters: {
        allowedRoutes(state, getters) {
            return state.routes.filter(route => getters.userHasRights(route));
        },
    },
    mutations: {
        setLoading(state, newLoadingState) {
            state.loading = newLoadingState;
        },
        setAppError(state, error) {
            state.appError = error;
        },
        setErrorMessage(state, text) {
            state.appMessage = {text, color: 'error'};
        },
        setSuccessMessage(state, text) {
            state.appMessage = {text, color: 'success'};
        },
        setInfoMessage(state, text) {
            state.appMessage = {text, color: 'info'};
        },
        setWarnMessage(state, text) {
            state.appMessage = {text, color: 'orange darken-2'};
        },
    },
    actions: {},
    modules: {
        portfolio,
        offer,
        user,
    }
})
