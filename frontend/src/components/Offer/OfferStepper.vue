<template>
    <v-stepper :value="stageIndex" class="elevation-0 offer-stepper">
        <v-stepper-header>
            <template v-for="(stage, i) in stages">
                <v-stepper-step
                    class="py-1"
                    :step="i+1"
                    :complete="stageIndex > i"
                    :class="{'v-stepper__step--current': stageIndex === i, 'warning--text': alert}"
                    :rules="(error || alert) && stageIndex === i ? [() => false] : []"
                    :key="i"
                >
                    {{stageIndex === i ? stage.title : ''}}
                    <small v-if="stageIndex === i && statusText">{{statusText}}</small>
                </v-stepper-step>
                <v-divider v-if="i < stages.length-1" :key="'d-'+i"></v-divider>
            </template>
        </v-stepper-header>
    </v-stepper>
</template>

<script>
    export default {
        props: ['stageIndex', 'statusText', 'alert', 'error'],
        data: () => ({
            stages: [
                // {status: 'created', title: 'Сделка зарегистрирована'},
                {status: 'offerPending', title: 'Поиск предложения'},
                {status: 'buyerTransfer', title: 'Перевод покупателя'},
                {status: 'sellerTransfer', title: 'Перевод продавца'},
                {status: 'escrowFinalize', title: 'Завершение сделки'},
            ]
        })
    }
</script>

<style>
    .offer-stepper .v-stepper__header {
        height: 32px!important;
        background: transparent!important;
        box-shadow: none!important;
    }

    .offer-stepper.theme--light.v-stepper {
        background: transparent;
    }

    .v-stepper__step--current:not(.v-stepper__step--error) .v-stepper__step__step {
        background-color: #1867c0 !important;
        border-color: #1867c0 !important;
    }

    .v-stepper__step--current .v-stepper__label {
        text-shadow: 0 0 0 #000;
    }

    .v-stepper__step--current.warning--text .mdi-alert:before {
        content: "\F02D7" !important;
    }
</style>