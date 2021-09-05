<template>
    <!-- <div class="results"> -->
    <ul v-show="phase == 'results'" class="list-group shadow-sm">
        <li class="list-group-item">
            Anime Title: <strong>{{ currentSong?.source }}</strong>
        </li>
        <li class="list-group-item">
            Anime Opening: <strong>{{ currentSong.title }}</strong>
        </li>
        <li v-show="currentSong?.song?.title" class="list-group-item">
            Song Name: <strong>{{ currentSong?.song?.title }}</strong>
        </li>
        <li v-show="currentSong?.song?.artist" class="list-group-item">
            Song Artist: <strong>{{ currentSong?.song.artist }}</strong>
        </li>
    </ul>
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
