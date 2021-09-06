<template>
    <div class="my-container">
        <div class="card profile-card">
            <img :src="user.currentFace" alt="..." />
            <div class="card-body">
                <div class="points">
                    <strong class="card-title">Points</strong>
                    <hr />
                    <p class="card-text">{{ user.correctAnswers }}</p>
                </div>
                <div class="songs">
                    <strong class="card-title">Songs Left</strong>
                    <hr />
                    <p class="card-text">{{ totalSongs - songNumber }}</p>
                </div>
            </div>
        </div>
        <div class="game-info">
            <Game_Song_Info />
        </div>
    </div>
</template>

<script>
import Game_Song_Info from '@/components/Game/Game_Song_Info'
import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        Game_Song_Info,
    },
    watch: {
        phase(value) {
            if (value == 'guessing') {
                this.updateCurrentFace('neutral')
                document.body.style.backgroundColor = '#f8f9fa'
            }
            if (value == 'results') {
                setTimeout(() => {
                    if (this.isCorrect) {
                        this.updateCurrentFace('happy')
                        document.body.style.backgroundColor = '#f8f9fa'
                    } else {
                        this.updateCurrentFace('sad')
                        document.body.style.backgroundColor = 'gray'
                    }
                }, 0)
            }
        },
    },
    computed: {
        ...mapGetters('game', ['currentSong', 'phase', 'songNumber', 'totalSongs', 'isCorrect']),
        ...mapGetters('user', ['user']),
    },
    methods: {
        ...mapActions('user', ['updateCurrentFace']),
    },
}
</script>

<style lang="scss" scoped>
.my-container {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    margin-top: 1rem;
    font-size: 1.4rem;
}
.profile-card {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-height: 13rem;
    // flex-wrap: wrap;
    img {
        max-width: 13rem;
        max-height: 13rem;
    }
    .card-body {
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        text-align: center;
        flex-wrap: wrap;
    }
}

.game-info {
    width: 100%;
}
</style>
