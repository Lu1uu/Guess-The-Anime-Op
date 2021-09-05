<template>
    <div class="results">
        <ul v-show="phase == 'results'" class="list-group shadow-sm">
            <li class="list-group-item">Anime Title: {{ currentSong?.source }}</li>
            <li class="list-group-item">Anime Opening: {{ currentSong.title }}</li>
            <li v-show="currentSong?.song?.title" class="list-group-item">
                Song Name: {{ currentSong?.song?.title }}
            </li>
            <li v-show="currentSong?.song?.artist" class="list-group-item">
                Song Artist: {{ currentSong?.song.artist }}
            </li>
        </ul>
        <div class="results__stats">
            <h4 class="results__song-num">{{ songNumber }} / {{ totalSongs }}</h4>
            <h4 class="results__correctAnswers">{{ user.correctAnswers }}</h4>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('game', ['currentSong', 'phase', 'songNumber', 'totalSongs']),
        ...mapGetters('user', ['user']),
    },
}
</script>

<style lang="scss" scoped>
.results {
    padding: 0;
    position: relative;
    height: 20rem;
    max-height: 20rem;
    font-size: 1.4rem;
    &__info {
        * {
            margin: 1rem 0;
        }
        overflow: auto;
    }
    &__stats {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>
