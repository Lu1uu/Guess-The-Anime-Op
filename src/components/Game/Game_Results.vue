<template>
    <div class="results">
        <div v-show="phase == 'results'" class="results__info">
            <p class="results__title">{{ currentSong?.source }}</p>
            <p class="results__type">{{ currentSong?.title }}</p>
            <p v-show="currentSong?.song?.title" class="results__song__name">
                {{ currentSong?.song?.title }}
            </p>
            <p v-show="currentSong?.song?.artist" class="results__song__artist">
                {{ currentSong?.song?.artist }}
            </p>
        </div>
        <div class="results__stats">
            <h4 class="results__song-num">
                {{ songNumber }} / {{ totalSongs }}
            </h4>
            <h4 class="results__correctAnswers">{{ user.correctAnswers }}</h4>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('game', [
            'currentSong',
            'phase',
            'songNumber',
            'totalSongs',
        ]),
        ...mapGetters('user', ['user']),
    },
};
</script>

<style lang="scss" scoped>
.results {
    padding: 0;
    position: relative;
    height: 20rem;
    max-height: 20rem;
    max-width: 55rem;
    font-size: 1.6rem;
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
