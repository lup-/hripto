<template>
    <v-stepper vertical class="elevation-0 pa-0 offer-vertical-stepper" :value="st+1">
        <v-stepper-step :complete="st > 0" step="1" class="px-0"
                :class="{'v-stepper__step--current': st === 0, 'warning--text': alert}"
                :rules="(error || alert) && st === 0 ? [() => false] : []"
        >
            Поиск предложения
            <small v-if="st === 0 && status">{{status}}</small>
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-card v-if="st > 0">
                <v-card-text>
                    <h3>Выбран вариант:</h3>
                    <p>99 USDT за 2 500 (25.25$ за монету)</p>
                </v-card-text>
            </v-card>
            <v-card v-else-if="!status">
                <v-card-text>
                    Подходящих вариантов пока нет
                </v-card-text>
            </v-card>
            <v-card v-else>
                <v-card-text>
                    <h3>Продавцы, готовые к сделке</h3>
                    <v-radio-group>
                        <v-radio label="99 USDT за 2 500 (25.25$ за монету)" :value="0"></v-radio>
                        <v-radio label="50 USDT за 1 500$ (30$ за монету)" :value="1"></v-radio>
                        <v-radio label="12 USDT за 500$ (41.7$ за монету)" :value="2"></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="nextStep" class="mr-4">Выбрать</v-btn>
                    <small>Или можете еще подождать подходящие варианты</small>
                </v-card-actions>
            </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="st > 1" step="2" class="px-0"
                :class="{'v-stepper__step--current': st === 1, 'warning--text': alert}"
                :rules="(error || alert) && st === 1 ? [() => false] : []"
        >
            Перевод покупателя
            <small v-if="st === 1 && status">{{status}}</small>
        </v-stepper-step>

        <v-stepper-content step="2">
            <v-card v-if="st > 1">
                <v-card-text>
                    Ваш перевод успешно получен площадкой
                </v-card-text>
            </v-card>
            <v-card v-else>
                <v-card-text>
                    Для продолжения сделки переведите 1 500$ на эскроу-счет площадки
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="nextStep">Перевести</v-btn>
                </v-card-actions>
            </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="st > 2" step="3" class="px-0"
            :class="{'v-stepper__step--current': st === 2, 'warning--text': alert}"
            :rules="(error || alert) && st === 2 ? [() => false] : []"
        >
            Перевод продавца
            <small v-if="st === 2 && status">{{status}}</small>
        </v-stepper-step>

        <v-stepper-content step="3">
            <v-card v-if="st > 2">
                <v-card-text>
                    Перевод продавца успешно получен площадкой
                </v-card-text>
            </v-card>
            <v-card v-else-if="!error">
                <v-card-text>
                    Ожидание перевода продавца
                </v-card-text>
            </v-card>
        </v-stepper-content>

        <v-stepper-step :complete="st > 3" step="4" class="px-0"
                :class="{'v-stepper__step--current': st === 3, 'warning--text': alert}"
                :rules="(error || alert) && st === 3 ? [() => false] : []"
        >
            Завершение сделки
            <small v-if="st === 2 && status">{{status}}</small>
        </v-stepper-step>

        <v-stepper-content step="4">
            <v-card v-if="st > 4">
                <v-card-text>
                    Валюта переведена участникам сделки, все операции завершены успешно
                </v-card-text>
            </v-card>
            <v-card v-else>
                <v-card-text>
                    Подождите пока площадка переведет средства на ваш кошелек
                </v-card-text>
            </v-card>
        </v-stepper-content>
    </v-stepper>
</template>

<script>
    export default {
        props: ['stageIndex', 'statusText', 'alert', 'error'],
        data() {
            return {
                st: this.stageIndex,
                status: this.statusText,
            }
        },
        methods: {
            nextStep() {
                this.st++;
                this.status = null;
            }
        }
    }
</script>

<style scoped>
    .offer-vertical-stepper .v-stepper__content {
        margin: -8px -36px -16px 12px!important;
    }
</style>