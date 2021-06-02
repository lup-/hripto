<template>
    <v-container class="fill-height align-start">
        <v-row>
            <v-col cols="12">
                <v-card flat>
                    <v-card-title class="mb-8">
                        <v-btn-toggle :value="typeIndex">
                            <v-btn @click="gotoOffer('buy')">Купить</v-btn>
                            <v-btn @click="gotoOffer('sell')">Продать</v-btn>
                        </v-btn-toggle>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="flex-column-reverse flex-md-row">
                            <v-col cols="12" md="8">
                                <v-form autocomplete="off">

                                    <v-select
                                        :label="type === 'buy' ? 'Монеты для покупки' : 'Монеты для продажи'"
                                        :items="coins"
                                        outlined
                                    ></v-select>

                                    <v-text-field type="number" label="Количество монет" outlined></v-text-field>

                                    <v-row v-if="type === 'buy'">
                                        <v-col>
                                            <v-text-field type="number" label="Цена покупки, От" placeholder="От" outlined></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field type="number" placeholder="До" outlined></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-select
                                                label="Валюта"
                                                :items="coinsWithFiat"
                                                outlined
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row v-else>
                                        <v-col>
                                            <v-text-field type="number" label="Цена продажи" outlined></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-select
                                                label="Валюта"
                                                :items="coinsWithFiat"
                                                outlined
                                            ></v-select>
                                        </v-col>
                                    </v-row>

                                </v-form>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-card>
                                    <div class="price-container">
                                        <plotly :data="prices" :layout="layout" :static-plot="true" :responsive="true"></plotly>
                                    </div>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title>Средняя цена на платформе</v-list-item-title>
                                            <v-list-item-content>25 000$</v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title>Биржевой курс (Coinbase)</v-list-item-title>
                                            <v-list-item-content>25 255$</v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-col>
                        </v-row>

                    </v-card-text>
                    <v-card-actions>
                        <v-btn large color="primary" @click="save">Разместить заявку</v-btn>
                        <v-btn @click="gotoList" text small>Отмена</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CrudEdit from '@/components/CrudEdit';
    import { Plotly } from 'vue-plotly';

    export default {
        extends: CrudEdit,
        components: {Plotly},
        data() {
            return {
                item: {},
                coins: [
                    {text: 'Bitcoin', value: 'BTC'},
                    {text: 'Ethereum', value: 'ETH'},
                    {text: 'Tether', value: 'USDT'},
                ],
                coinsWithFiat: [
                    {text: 'Рубли', value: 'RUB'},
                    {text: 'Гривны', value: 'UAH'},
                    {text: 'Доллары', value: 'USD'},
                    {text: 'Bitcoin', value: 'BTC'},
                    {text: 'Ethereum', value: 'ETH'},
                    {text: 'Tether', value: 'USDT'},
                ],
                prices: [
                    {
                        x: [2, 15, 40],
                        y: ['10k-15k$', '15k-25k$', '25k-50k$'],
                        type: 'bar',
                        orientation: 'h',
                        color: '#1976d2',
                        textposition: 'inside',
                        texttemplate: '%{y}'
                    }
                ],
                layout: {
                    title: 'Предложения',
                    showlegend: false,
                    height: 200,
                    margin: {t: 50, l: 20, b: 20, r: 20},
                    yaxis: {visible: false},
                },

                ACTION_LOAD: 'offer/loadItems',
                ACTION_NEW: 'offer/newItem',
                ACTION_SAVE: 'offer/saveItem',
                ACTION_SET_EDIT_ITEM: 'offer/setEditItem',
                ROUTE_LIST: 'home',
                STORE_MODULE: 'offer'
            }
        },
        methods: {
            gotoOffer(type) {
                this.$router.push({ name: 'offerNew', params: {type}});
            }
        },
        computed: {
            type() {
                return this.$route.params.type;
            },
            typeIndex() {
                return this.type === 'buy' ? 0 : 1;
            }
        }
    }
</script>

<style scoped>
    .price-container {
    }
</style>