import { queryAnimeListCompleted } from '@/graphql/userList.js'
import { queryUserProfile } from '@/graphql/userProfile.js'

export default {
    namespaced: true,
    state: {
        user: {
            correctAnswers: 0,
            anilistUsername: 'Lewlewonics',
            animeList: [],
            avatar: '',
            settings: {},
            currentFace: 'https://files.catbox.moe/ebmruz.png',
            images: {
                neutral: 'https://files.catbox.moe/ebmruz.png',
                happy: 'https://files.catbox.moe/qyrdyi.png',
                sad: 'https://files.catbox.moe/k4s7hq.png',
            },
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        username(state) {
            return state.user.anilistUsername
        },
        hasUser(state) {
            return state.user.anilistUsername != null ? true : false
        },
    },
    actions: {
        updateCurrentFace(context, emotion) {
            context.getters.user.currentFace = context.getters.user.images[emotion]
        },
        async AnilistRequest(context, type) {
            const url = 'https://graphql.anilist.co'
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    query: type == 'list' ? queryAnimeListCompleted : queryUserProfile,
                    variables: { name: context.getters.username },
                }),
            }
            try {
                const res = await fetch(url, options)
                const data = await res.json()
                if (type == 'list') context.commit('FetchUserList', data)
                if (type == 'avatar') context.commit('FetchUserAvatar', data)
            } catch {
                context.state.user.anilistUsername = null
            }
        },
        async FilterForUserList(context, data) {
            const userListEntryTitles = context.getters.user.animeList.map(
                (entry) => entry.media.title.romaji
            )
            const filteredDatabase = data.filter((entry) => {
                if (userListEntryTitles.includes(entry.title)) return entry
            })
            return filteredDatabase
        },
        async SetUsername(context, username) {
            context.commit('SetUsername', username)
            await context.dispatch('AnilistRequest', 'list')
            await context.dispatch('AnilistRequest', 'avatar')
        },
        SavePreferences(context, settings) {
            localStorage.setItem('settings', JSON.stringify(settings))
            context.dispatch('LoadPreferences')
        },
        LoadPreferences(context) {
            const { username, guessTime } = JSON.parse(localStorage.getItem('settings'))
            context.dispatch('SetUsername', username)
            context.dispatch('game/SetGuessTime', guessTime, { root: true })
        },
    },
    mutations: {
        FetchUserList(state, data) {
            state.user.animeList = data.data.MediaListCollection.lists[0].entries
        },
        FetchUserAvatar(state, data) {
            state.user.avatar = data.data.User.avatar.large
        },
        SetUsername(state, username) {
            state.user.anilistUsername = username
        },
        IncrementScore(state) {
            state.user.correctAnswers++
        },
    },
}
