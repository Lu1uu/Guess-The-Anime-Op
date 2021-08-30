import { createStore } from 'vuex'

import game from './game.js'
import user from './user.js'

export default createStore({
    modules: { game, user },
    state: {
        dataBase: [],
    },
    getters: {},
    mutations: {},
    actions: {},
})
