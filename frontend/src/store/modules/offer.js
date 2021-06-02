import Crud from "./baseCrud";

const API_LIST_URL = `/api/offer/list`;
const API_ADD_URL = `/api/offer/list`;
const API_UPDATE_URL = `/api/offer/update`;
const API_DELETE_URL = `/api/offer/delete`;

const NAME_ITEMS = 'offers';
const NAME_ITEM = 'offer';

export default new Crud({
    API_LIST_URL,
    API_ADD_URL,
    API_UPDATE_URL,
    API_DELETE_URL,

    NAME_ITEMS,
    NAME_ITEM
});