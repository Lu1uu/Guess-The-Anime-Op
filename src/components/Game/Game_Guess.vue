<template>
    <div class="guess">
        <input v-model.trim="guess" type="text" class="guess__input" />
    </div>
    <div v-show="showOptions" class="entries">
        <p
            @click="UpdateGuess(entry)"
            class="entries__entry"
            v-for="entry in possibleEntries"
            :key="entry"
        >
            {{ entry }}
        </p>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            guess: '',
            showOptions: false,
            possibleEntries: [],
        }
    },
    watch: {
        phase(phase) {
            if (phase == 'results') this.CheckAnswer(this.guess)
            else if (phase == 'done') this.guess = ''
        },
        async guess(input) {
            this.possibleEntries = await this.FilterSearch(input)
            this.showOptions = true
        },
    },
    computed: {
        ...mapGetters('game', ['currentSong', 'phase']),
        ...mapGetters('user', ['user']),
    },
    methods: {
        ...mapActions('game', ['CheckAnswer', 'FilterSearch']),
        UpdateGuess(input) {
            this.guess = input
            this.showOptions = false
        },
    },
}
</script>

<style lang="scss" scoped>
.guess {
    &__input {
        font-size: 1.6rem;
        width: 100%;
        border: 1px solid hsl(248, 53%, 58%);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
    }
}

.entries {
    color: white;
    max-width: 100%;
    background: hsl(248, 53%, 58%);
    max-height: 15rem;
    overflow: auto;
    &__entry {
        font-size: 1.2rem;
        cursor: pointer;
        width: 100%;
        padding: 1rem;
        &:hover {
            background: hsl(248, 53%, 48%);
        }
    }
}
</style>
