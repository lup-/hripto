import axios from "axios";

export default {
    namespaced: true,
    state: {
        assets: [],
        edit: false,
        currentFilter: false,
    },
    getters: {
        byId(state) {
            return itemId => {
                return state.assets.find(item => item.id === itemId);
            }
        }
    },
    actions: {
        async loadAssets({commit, rootState}, filter = {}) {
            let user = rootState.user.current;
            let response = await axios.post('/api/portfolio/', {filter, user});
            await commit('setFilter', filter);
            return commit('setAssets', response.data.assets);
        },
    },
    mutations: {
        setAssets(state, items) {
            state.assets = items;
        },
    }
}