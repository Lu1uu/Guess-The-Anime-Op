<template>
    <div class="container">
        <div class="px-4 pt-5 my-5 text-center">
            <h1 class="display-4 fw-bold">Anime Openings Quiz</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">
                    A small-scale, limited version of
                    <a href="https://animemusicquiz.com/">AMQ</a> made with Vue, to practice more
                    advanced concepts, enjoy the game!
                </p>
                <div class="mb-5">
                    <router-link to="/game">
                        <button
                            @click="updateDB('./dbEasy.json')"
                            type="button"
                            class="btn btn-primary btn-lg px-5 py-3 me-sm-3"
                        >
                            Easy
                        </button>
                        <button
                            @click="updateDB('./dbMed.json')"
                            type="button"
                            class="btn btn-primary btn-lg px-5 py-3 me-sm-3"
                        >
                            Medium
                        </button>
                        <button
                            @click="updateDB('./db.json')"
                            type="button"
                            class="btn btn-primary btn-lg px-5 py-3 me-sm-3"
                        >
                            Mixed
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="overflow-hidden" style="max-height: 60vh">
                <div class="container px-5">
                    <img
                        src="https://files.catbox.moe/ack9p7.png"
                        class="img-fluid border rounded-3 shadow-lg mb-4"
                        alt="Example image"
                        width="700"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions('game', ['updateDB']),
    },
}
</script>
