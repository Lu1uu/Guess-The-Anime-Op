<template>
    <section class="settings">
        <!-- 
            Easy | Med | Hard
            Username Entry | Random
            Openings | Ed | Both
            Guess Time 
            Number of Songs
         -->
        <div class="settings__difficulty">
            <button>Easy</button>
            <button>Normal</button>
            <button>Hard</button>
        </div>
        <label for="GuessTime">Guess Time </label>
        <input
            v-model="guessTime"
            name="GuessTime"
            type="number"
            class="settings__guess-time"
        />
        <label for="AnilistUsername">Anilist Username</label>
        <input
            class="settings__username"
            name="AnilistUsername"
            type="text"
            v-model="username"
        />
        <TheButton @click="SavePreferences({ username, guessTime })"
            >Apply</TheButton
        >
    </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            username: '',
            guessTime: 0,
        }
    },
    methods: {
        ...mapActions('user', [
            'SetUsername',
            'SavePreferences',
            'LoadPreferences',
        ]),
    },
}
</script>

<style></style>
