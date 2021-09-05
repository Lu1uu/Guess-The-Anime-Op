<template>
    <div class="shadow-sm">
        <input
            v-model.trim="guess"
            class="form-control"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Guess anime"
        />
        <datalist v-show="showOptions" id="datalistOptions">
            <option
                @click="UpdateGuess(entry)"
                @keyup.enter="UpdateGuess(entry)"
                v-for="entry in possibleEntries"
                :key="entry"
                :value="entry"
                >{{ entry }}
            </option>
        </datalist>
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
            if (phase == 'results') {
                this.CheckAnswer(this.guess)
            } else {
                this.guess = ''
                this.possibleEntries = []
            }
        },
        async guess() {
            this.possibleEntries = await this.FilterSearch(this.guess)
            this.showOptions = true
        },
    },
    computed: {
        ...mapGetters('game', ['phase']),
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

<style scoped>
input {
    padding: 0.8rem 1rem;
    font-size: 1.4rem;
}
</style>
