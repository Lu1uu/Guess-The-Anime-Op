import party from 'party-js'
export default {
    namespaced: true,
    state: {
        playList: [],
        playListSize: 10,
        currentSong: 1,
        songTime: 25,
        currentSongTime: 0,
        phase: 1,
        isCorrect: false,
        isGameOver: true,
    },

    getters: {
        isCorrect(state) {
            return state.isCorrect
        },
        phase(state) {
            if (state.phase % 3 == 0) return 'done'
            if (state.phase % 3 == 1) return 'guessing'
            return 'results'
        },
        totalSongs(state) {
            return state.playListSize
        },
        currentSong(state) {
            return state.playList[state.currentSong]
        },
        playList(state) {
            return state.playList
        },
        songTime(state) {
            return state.songTime
        },
        currentSongTime(state) {
            return state.currentSongTime
        },
        isGameOver(state) {
            return state.isGameOver
        },
        songNumber(state) {
            return state.currentSong
        },
    },
    actions: {
        async PopulateDatabase(context) {
            const res = await fetch('./db.json')
            const data = await res.json()
            context.commit('PopulateDatabase', data)
        },
        async CreatePlaylist(context) {
            let data = await context.dispatch('FilterEntries', 'op')
            if (context.getters['user/hasUser']) {
                data = await context.dispatch('user/FilterForUserList', data, {
                    root: true,
                })
            }
            const songsChosen = () => {
                const songs = new Set()
                while (songs.size <= context.state.playListSize) {
                    songs.add(Math.floor(Math.random() * data.length))
                }
                return [...songs]
            }
            context.commit('EmptyPlaylist')
            for (const songIndex of songsChosen()) {
                context.commit('AddSongToPlaylist', data[songIndex])
            }
            context.commit('StartGame')
        },
        FilterEntries(context, type) {
            const possibleEntries = context.state.dataBase.filter((entry) => {
                switch (type) {
                    case 'op':
                        if (entry.type.toLowerCase().includes(type)) return entry
                        break
                    case 'ending':
                        if (entry.type.toLowerCase().includes(type)) return entry
                        break
                    default:
                        return entry
                }
            })
            return possibleEntries
        },
        FilterSearch(context, input) {
            const entries = context.state.dataBase
            const possibleEntries = []
            for (let i = 0; i < entries.length; i++) {
                if (
                    entries[i].animeEnglish.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
                    entries[i].animeRomaji.toLowerCase().indexOf(input.toLowerCase()) > -1
                ) {
                    possibleEntries.push(entries[i].animeEnglish)
                    possibleEntries.push(entries[i].animeRomaji)
                }
            }
            return [...new Set(possibleEntries)]
        },
        FetchNewSong(context) {
            context.commit('IncrementCurrentSong')
            context.commit('ResetPhase')
        },
        StartTimer(context) {
            const timer = setInterval(() => {
                if (context.getters.currentSongTime >= context.getters.songTime) {
                    clearInterval(timer)
                    context.commit('IncrementPhase')
                    context.commit('ResetCurrentSongTime')
                    return
                }
                context.commit('IncrementCurrentSongTime')
            }, 1000)
        },
        SkipPhase(context) {
            context.commit('SkipPhase')
        },
        CheckAnswer(context, answer = '') {
            console.log(context.getters.currentSong)
            let isCorrect =
                answer.toLowerCase() == context.getters.currentSong.animeEnglish.toLowerCase() ||
                answer.toLowerCase() == context.getters.currentSong.animeRomaji.toLowerCase()
                    ? true
                    : false
            if (isCorrect) {
                context.commit('user/IncrementScore', isCorrect, {
                    root: true,
                })
                const $app = document.getElementById('app')
                party.confetti($app)
                setTimeout(() => {
                    party.confetti($app)
                }, 1500)
                setTimeout(() => {
                    party.confetti($app)
                }, 3000)
            }
            context.commit('CheckCorrect', isCorrect)
        },
        SetGuessTime(context, guessTime) {
            context.commit('SetGuessTime', guessTime)
        },
    },
    mutations: {
        SetGuessTime(state, newTime) {
            state.songTime = newTime
        },
        EmptyPlaylist(state) {
            state.playList = []
        },
        AddSongToPlaylist(state, song) {
            state.playList.push(song)
        },
        PopulateDatabase(state, data) {
            state.dataBase = data
        },
        CheckCorrect(state, isCorrect) {
            state.isCorrect = isCorrect
        },
        SkipPhase(state) {
            state.currentSongTime = state.songTime
        },
        EndGame(state) {
            state.isGameOver = true
        },
        StartGame(state) {
            state.isGameOver = false
        },
        ResetPhase(state) {
            state.phase = 1
        },
        ResetCurrentSongTime(state) {
            state.currentSongTime = 0
        },
        IncrementPhase(state) {
            state.phase++
        },
        IncrementCurrentSongTime(state) {
            state.currentSongTime++
        },
        IncrementCurrentSong(state) {
            state.currentSong == state.playList.length
                ? (state.currentSong = 1)
                : state.currentSong++
            if (state.currentSong == state.playListSize + 1) state.isGameOver = true
        },
    },
}
