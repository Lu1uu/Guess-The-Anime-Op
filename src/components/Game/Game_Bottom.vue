<template>
    <div class="my-container">
        <div class="card profile-card">
            <img src="https://avatars.githubusercontent.com/u/89555647?v=4" alt="..." />
            <div class="card-body">
                <div class="points">
                    <strong class="card-title">Points</strong>
                    <hr />
                    <p class="card-text">{{ user.correctAnswers }}</p>
                </div>
                <div class="songs">
                    <strong class="card-title">Songs Left</strong>
                    <hr />
                    <p class="card-text">{{ totalSongs - songNumber + 1 }}</p>
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
import { mapGetters } from 'vuex'

export default {
    components: {
        Game_Song_Info,
    },
    computed: {
        ...mapGetters('game', ['currentSong', 'phase', 'songNumber', 'totalSongs']),
        ...mapGetters('user', ['user']),
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
