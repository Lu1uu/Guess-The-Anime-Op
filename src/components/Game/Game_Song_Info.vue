<template>
    <!-- <div class="results"> -->
    <ul v-show="phase == 'results'" class="list-group shadow-sm">
        <li class="list-group-item">
            Anime Title:
            <strong>{{ currentSong?.animeRomaji ?? currentSong?.animeEnglish }}</strong>
        </li>
        <li class="list-group-item">
            Anime Opening: <strong>{{ currentSong?.type }}</strong>
        </li>
        <li v-show="currentSong?.songName" class="list-group-item">
            Song Name: <strong>{{ currentSong?.song?.title }}</strong>
        </li>
        <li v-show="currentSong?.artist" class="list-group-item">
            Song Artist: <strong>{{ currentSong?.song?.artist }}</strong>
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
