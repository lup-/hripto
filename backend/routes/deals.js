module.exports = {
    async listStages(ctx) {
        let stages = [
            {status: 'created', title: 'Сделка зарегистрирована'},
            {status: 'offerPending', title: 'Поиск предложения'},
            {status: 'buyerTransfer', title: 'Перевод покупателя'},
            {status: 'sellerTransfer', title: 'Перевод продавца'},
            {status: 'escrowFinalize', title: 'Завершение сделки'},
            {status: 'finished', title: 'Сделка закрыта'}
        ]
        ctx.body = {stages}
    },
}