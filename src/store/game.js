export default {
    namespaced: true,
    state: {
        playList: [],
        playListSize: 10,
        currentSong: 0,
        songTime: 25,
        currentSongTime: 0,
        phase: 1,
        isCorrect: false,
        isGameOver: true,
    },
    getters: {
        phase(state) {
            if (state.phase % 3 == 0) return 'done'
            if (state.phase % 3 == 1) return 'guessing'
            return 'results'
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
            return state.currentSong + 1
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
                //Done with set to prevent duplicate songs from being played
                const songs = new Set()
                while (songs.size - 1 <= context.state.playListSize) {
                    songs.add(Math.floor(Math.random() * data.length))
                }
                return [...songs]
            }
            for (const songIndex of songsChosen()) {
                context.commit('AddSongToPlaylist', data[songIndex])
            }
            context.commit('StartGame')
        },
        FilterEntries(context, type) {
            const possibleEntries = context.state.dataBase.filter((entry) => {
                switch (type) {
                    case 'op':
                        if (entry.title.toLowerCase().includes(type))
                            return entry
                        break
                    case 'ending':
                        if (entry.title.toLowerCase().includes(type))
                            return entry
                        break
                    default:
                        return entry
                }
            })
            return possibleEntries
        },
        FilterSearch(context, input) {
            const possibleEntries = context.state.dataBase
                .filter((entry) => {
                    if (
                        entry.source
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) != -1
                    )
                        return entry.source
                })
                .map((entry) => entry.source)
            return [...new Set(possibleEntries)]
        },
        FetchNewSong(context) {
            context.commit('IncrementCurrentSong')
            context.commit('ResetPhase')
        },
        StartTimer(context) {
            const timer = setInterval(() => {
                if (
                    context.getters.currentSongTime >= context.getters.songTime
                ) {
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
            const isCorrect =
                answer.toLowerCase() ==
                context.getters.currentSong.source.toLowerCase()
                    ? true
                    : false
            if (isCorrect)
                context.commit('user/IncrementScore', isCorrect, { root: true })
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
            state.currentSong == state.playList.length - 1
                ? (state.currentSong = 0)
                : state.currentSong++
            if (state.currentSong == 0) state.isGameOver = true
        },
    },
}
