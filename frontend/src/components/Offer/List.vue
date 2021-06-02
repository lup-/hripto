<template>
    <v-container class="fill-height align-start align-content-start pt-6">
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-text>
                        <v-row class="flex-column-reverse flex-sm-row">
                            <v-col cols="12" sm="6">
                                <v-card-title class="pt-0 d-none d-sm-block">Ваши сделки</v-card-title>
                                <v-btn-toggle>
                                    <v-btn :color="isEmpty ? 'primary' : null" :dark="isEmpty" @click="gotoOffer('buy')">Купить</v-btn>
                                    <v-btn :color="isEmpty ? 'primary' : null" :dark="isEmpty" @click="gotoOffer('sell')">Продать</v-btn>
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn v-bind="attrs" v-on="on">
                                                Еще
                                                <v-icon class="ml-2">mdi-chevron-down</v-icon>
                                            </v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item link>
                                                <v-list-item-title>События</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item link>
                                                <v-list-item-title>Вывести</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-btn-toggle>
                            </v-col>
                            <v-col cols="12" sm="6" class="d-flex flex-column align-sm-end">
                                <v-card-title class="pt-0">Сделок в работе</v-card-title>
                                <v-card-title class="pt-0">6 125 ₽</v-card-title>
                                <v-card-subtitle class="pb-0 green--text">&uarr; +25%</v-card-subtitle>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row align="center" justify="start" class="mt-6" v-if="!isEmpty">
            <v-col cols="12">
                <v-expansion-panels>
                    <v-expansion-panel v-for="(deal, i) in deals" :key="i">
                        <v-expansion-panel-header>
                            <template v-slot:default="{ open }">
                                <v-row class="align-center">
                                    <v-col cols="3">
                                        <span class="d-inline-flex flex-column align-start">
                                            <span>{{deal.title}}</span>
                                            <small>{{deal.descr}}</small>
                                            <small>{{deal.date}}</small>
                                        </span>
                                    </v-col>
                                    <v-col cols="6" class="d-none d-md-block" v-if="deal.finished">
                                        <v-alert type="success" dense outlined class="ma-0 ml-5">Сделка завершена</v-alert>
                                    </v-col>
                                    <v-col cols="9" md="3" class="text-right" v-if="!open && deal.finished">
                                        <v-btn color="success" small elevation="0" class="mr-5">Готово</v-btn>
                                    </v-col>
                                    <v-col cols="9" v-else>
                                        <offer-stepper v-if="!open && !deal.finished"
                                            :stage-index="deal.stageIndex"
                                            :status-text="deal.statusText"
                                            :alert="deal.alert"
                                            :error="deal.error"
                                        ></offer-stepper>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <offer-stepper-full
                                :stage-index="deal.stageIndex"
                                :status-text="deal.statusText"
                                :alert="deal.alert"
                                :error="deal.error"
                            ></offer-stepper-full>
                            <v-btn color="success" class="mt-6" v-if="deal.finished"><v-icon class="mr-2">mdi-check-circle</v-icon>Готово</v-btn>
                            <v-btn color="error" class="mt-6" outlined v-else><v-icon class="mr-2">mdi-alert-circle</v-icon>Отменить сделку</v-btn>
                            <v-btn text small class="mt-6 ml-2" v-if="deal.finished">Повторить</v-btn>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>

        <v-row align="center" justify="center" class="mt-6 pa-3" v-else>
            <v-card width="100%" height="100%" class="pa-16" flat>
                <v-card-text class="text-center">Сделок пока нет. Добавьте новую сделку, чтобы начать работу</v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import CrudList from "@/components/CrudList";
    import OfferStepper from "@/components/Offer/OfferStepper";
    import OfferStepperFull from "@/components/Offer/OfferStepperFull";

    export default {
        extends: CrudList,
        components: {OfferStepper, OfferStepperFull},
        data() {
            return {
                isLoading: false,
                deals: [
                    {title: 'Покупка USDT', descr: '100 монет за 2-3k$', date: '12.05.2021', stageIndex: 0, statusText: null, alert: false, error: false},
                    {title: 'Покупка ETH', descr: '100 монет за 2-3k$', date: '13.05.2021',stageIndex: 0, statusText: 'Получено предложений: 3', alert: true, error: false},
                    {title: 'Покупка BTC', descr: '100 монет за 2-3k$', date: '14.05.2021',stageIndex: 1, statusText: 'Переведите деньги', alert: true, error: false},
                    {title: 'Покупка USDT', descr: '200 монет за 4-5k$', date: '15.05.2021',stageIndex: 2, statusText: null, alert: false, error: false},
                    {title: 'Покупка ETH', descr: '100 монет за 4-5k$', date: '16.05.2021',stageIndex: 2, statusText: 'Продавец отказался от сделки', alert: false, error: true},
                    {title: 'Покупка BTC', descr: '100 монет за 4-5k$', date: '17.05.2021',stageIndex: 3, statusText: 'Ожидайте перевода', alert: false, error: false},
                    {title: 'Покупка USDT', descr: '50 монет за 1-2k$', date: '18.05.2021',stageIndex: 4, statusText: null, alert: false, error: false, finished: true},
                ],
                headers: [
                    {text: 'Название', value: 'title'},
                    {text: 'Действия', value: 'actions', sortable: false},
                ],

                ACTION_LOAD: 'offer/loadItems',
                ACTION_DELETE: 'offer/deleteItem',
                ROUTE_EDIT: 'offerEdit',
                ROUTE_NEW: 'offerNew',
                STORE_MODULE: 'offer'
            }
        },
        methods: {
            gotoOffer(type) {
                this.$router.push({ name: 'offerNew', params: {type}});
            }
        },
        computed: {
            isEmpty() {
                return false;
            }
        }
    }

</script>

<style scoped>
    .v-expansion-panel-header small {
        color: rgba(0, 0, 0, 0.38);
    }
</style>