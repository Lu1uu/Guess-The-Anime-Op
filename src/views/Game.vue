<template>
    <div class="container" v-if="!isGameOver">
        <router-link to="/">
            <button @click="RefreshPage" class="btn btn-primary btn-lg home-btn">Home</button>
        </router-link>
        <Game_Videoplayer />
        <Game_Guess v-if="phase == 'guessing'" />
        <Game_Bottom />
    </div>
</template>

<script>
import Game_Videoplayer from '@/components/Game/Game_Videoplayer'
import Game_Guess from '@/components/Game/Game_Guess'
import Game_Bottom from '@/components/Game/Game_Bottom'

import { mapActions, mapGetters } from 'vuex'
import helpers from '@/mixins/helpers.js'

export default {
    mixins: [helpers],
    components: {
        Game_Videoplayer,
        Game_Guess,
        Game_Bottom,
    },
    async mounted() {
        await this.PopulateDatabase()
        // await this.LoadPreferences();
        await this.AnilistRequest('list')
        await this.AnilistRequest('avatar')
        await this.CreatePlaylist()
    },
    computed: {
        ...mapGetters('game', ['isGameOver', 'playList', 'phase']),
        ...mapGetters('user', ['user', 'hasUser']),
    },
    methods: {
        ...mapActions('game', ['CreatePlaylist', 'PopulateDatabase']),
        ...mapActions('user', ['AnilistRequest', 'FilterForUserList', 'LoadPreferences']),
    },
}
</script>

<style lang="scss" scoped>
.home-btn {
    position: absolute;
    top: 6rem;
    left: 6rem;
}
.container {
    width: 100%;
    max-width: 60rem;
}

.square {
    background: orange;
    &:nth-child(even) {
        background: blue;
    }
}

.user {
    position: absolute;
    left: 2rem;
    top: 2rem;
    &__avatar {
        width: 10rem;
    }
    &__name {
        font-size: 1.6rem;
    }
}
</style>
