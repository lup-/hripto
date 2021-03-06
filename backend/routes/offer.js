const {getDb} = require('../modules/Database');
const shortid = require('shortid');
const moment = require('moment');

const COLLECTION_NAME = 'offers';
const ITEMS_NAME = 'offers';
const ITEM_NAME = 'offer';

module.exports = {
    async list(ctx) {
        let filter = ctx.request.body && ctx.request.body.filter
            ? ctx.request.body.filter || {}
            : {};
        let userId = ctx.request.body && ctx.request.body.user && ctx.request.body.user.id
            ? ctx.request.body.user.id|| null
            : null;

        let defaultFilter = {
            userId,
            'deleted': {$in: [null, false]}
        };

        filter = Object.assign(defaultFilter, filter);

        let db = await getDb();
        let items = await db.collection(COLLECTION_NAME).find(filter).toArray();
        let response = {};
        response[ITEMS_NAME] = items;

        ctx.body = response;
    },
    async add(ctx) {
        const db = await getDb();

        let itemData = ctx.request.body[ITEM_NAME];
        if (itemData._id) {
            let response = {};
            response[ITEM_NAME] = false;
            ctx.body = response;
            return;
        }

        if (ctx.request.body.user) {
            itemData.userId = ctx.request.body.user.id || null;
        }

        itemData = Object.assign(itemData, {
            id: shortid.generate(),
            created: moment().unix(),
            updated: moment().unix(),
        });

        let result = await db.collection(COLLECTION_NAME).insertOne(itemData);
        let item = result.ops[0];
        let response = {};
        response[ITEM_NAME] = item;
        ctx.body = response;
    },
    async update(ctx) {
        let db = await getDb();
        let itemData = ctx.request.body[ITEM_NAME];
        let id = itemData.id;
        let userId = ctx.request.body.user ? ctx.request.body.user.id || null : null;

        if (!id) {
            let response = {};
            response[ITEM_NAME] = false;
            ctx.body = response;
            return;
        }

        if (itemData._id) {
            delete itemData._id;
        }

        await db.collection(COLLECTION_NAME).findOneAndReplace({id, userId}, itemData);
        await db.collection(COLLECTION_NAME).updateOne({id, userId}, {$set: {updated: moment().unix()}}, {returnOriginal: false});
        let item = await db.collection(COLLECTION_NAME).findOne({id, userId});

        let response = {};
        response[ITEM_NAME] = item;
        ctx.body = response;
    },
    async delete(ctx) {
        const db = await getDb();
        let itemData = ctx.request.body[ITEM_NAME];
        let id = itemData.id;
        let userId = ctx.request.body.user ? ctx.request.body.user.id || null : null;

        await db.collection(COLLECTION_NAME).findOneAndUpdate({id, userId}, {$set: {deleted: moment().unix()}}, {returnOriginal: false});
        let item = await db.collection(COLLECTION_NAME).findOne({id, userId});

        let response = {};
        response[ITEM_NAME] = item;
        ctx.body = response;
    }
}