<template>
    <section v-if="hasUser" class="user">
        <img class="user__avatar" :src="user.avatar" alt="userAvatar" />
        <p class="user__name">{{ user.anilistUsername }}</p>
    </section>
    <div class="container" v-if="!isGameOver">
        <Game_Results />
        <Game_Videoplayer />
        <Game_Guess />
        <Game_Settings />
    </div>
</template>

<script>
import Game_Videoplayer from '@/components/Game/Game_Videoplayer'
import Game_Guess from '@/components/Game/Game_Guess'
import Game_Results from '@/components/Game/Game_Results'
import Game_Settings from '@/components/Game/Game_Settings'

import { mapActions, mapGetters } from 'vuex'

export default {
    components: {
        Game_Videoplayer,
        Game_Guess,
        Game_Results,
        Game_Settings,
    },
    async mounted() {
        await this.PopulateDatabase()
        // await this.LoadPreferences()
        await this.AnilistRequest('list')
        await this.AnilistRequest('avatar')
        await this.CreatePlaylist()
    },
    computed: {
        ...mapGetters('game', ['isGameOver', 'playList']),
        ...mapGetters('user', ['user', 'hasUser']),
    },
    methods: {
        ...mapActions('game', ['CreatePlaylist', 'PopulateDatabase']),
        ...mapActions('user', [
            'AnilistRequest',
            'FilterForUserList',
            'LoadPreferences',
        ]),
    },
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 50rem;
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
