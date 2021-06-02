import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../components/Users/Login';
import Register from '../components/Users/Register';

import OfferList from '../components/Offer/List';
import OfferNew from '../components/Offer/New';
import TradeList from '../components/Trade/List';
import TradeAsset from '../components/Trade/Asset';


import store from "../store";

Vue.use(VueRouter);

const routes = [
    { name: 'home', path: '/', component: OfferList, meta: {requiresAuth: true} },
    { name: 'login', path: '/login', component: Login },
    { name: 'register', path: '/register', component: Register },
    { name: 'offerNew', path: '/offer/:type', component: OfferNew, meta: {requiresAuth: true} },
    { name: 'tradeList', path: '/trade', component: TradeList, meta: {requiresAuth: true}},
    { name: 'asset', path: '/asset/:code', component: TradeAsset, meta: {requiresAuth: true}}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        await store.dispatch('loginLocalUser');
        let isNotLoggedIn = !store.getters.isLoggedIn;
        let loginTo = {
            path: '/login',
            query: { redirect: to.fullPath }
        };

        if (isNotLoggedIn) {
            next(loginTo);
        }
        else {
            let mainMatchedRoute = to.matched[0].meta;

            if (mainMatchedRoute && store.getters.userHasRights(mainMatchedRoute)) {
                next();
            }
            else {
                store.commit('setErrorMessage', 'Не достаточно прав!');
                next(loginTo);
            }
        }
    }
    else {
        next();
    }
})

export {router, store};
