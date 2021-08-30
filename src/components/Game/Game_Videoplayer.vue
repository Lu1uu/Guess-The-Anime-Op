<template>
    <input
        ref="video_volume"
        type="range"
        min="0"
        max="100"
        step="1"
        @input="SetVolume"
        @change="SetVolume"
    />
    <div class="container">
        <video
            v-if="!refreshComponent"
            @loadeddata="NewVideo"
            class="video"
            ref="video"
            disablePictureInPicture
        >
            <source
                :src="`https://openings.moe/video/${currentSong?.file}.mp4`"
                ref="video_source"
                disablePictureInPicture
            />
            Your browser does not support the video tag
        </video>
        <div v-show="!isVisible" class="video__overlay">
            {{ songTime - currentSongTime }}
        </div>
    </div>
    <div v-if="isHelperMode" class="video__buttons">
        <!-- <TheButton class="video__button" @click="PlayVideo">Play</TheButton> -->
        <!-- <TheButton class="video__button" @click="PauseVideo">Pause</TheButton>
        <TheButton class="video__button" @click="RestartVideo"
            >Restart</TheButton
        >
        <TheButton class="video__button" @click="HideVideo"
            >Hide Video</TheButton
        >
        <TheButton class="video__button" @click="ShowVideo"
            >Show Video</TheButton
        > -->
        <TheButton class="video__button" @click="SkipPhase">Skip</TheButton>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import helpers from '@/mixins/helpers.js';

export default {
    mixins: [helpers],
    data() {
        return {
            refreshComponent: false,
            isVisible: false,
            isSongOver: false,
            isHelperMode: true,
            startTime: 0,
        };
    },
    watch: {
        phase(phase) {
            switch (phase) {
                case 'done':
                    this.NextVideo();
                    break;
                case 'results':
                    this.ShowResults();
                    break;
                case 'guessing':
                    this.HideVideo();
                    break;
            }
        },
    },
    computed: {
        ...mapGetters('game', [
            'playList',
            'currentSong',
            'songTime',
            'currentSongTime',
            'phase',
            'isGameOver',
        ]),
    },
    methods: {
        ...mapActions('game', [
            'FetchNewSong',
            'StartTimer',
            'SkipPhase',
            'MaxOutCurrentSongTime',
        ]),
        NewVideo() {
            this.SetIntervalForVideo();
            this.SetVolume();
            this.PlayVideo();
            this.StartTimer();
            console.log('Song: ', this.currentSong);
        },
        SetIntervalForVideo() {
            this.startTime = Math.abs(
                this.RandomInt(
                    0,
                    Math.floor(this.$refs.video.duration) - this.songTime
                )
            );
            this.$refs.video.currentTime = this.startTime;
        },
        SetVolume() {
            this.$refs.video.volume = this.$refs.video_volume.value / 100;
        },
        ShowVideo() {
            this.isVisible = true;
        },
        HideVideo() {
            this.isVisible = false;
        },
        PlayVideo() {
            this.$refs.video.play();
        },
        PauseVideo() {
            this.$refs.video.pause();
        },
        RestartVideo() {
            this.$refs.video.currentTime = 0;
        },
        NextVideo() {
            this.FetchNewSong();
            this.PauseVideo();
            this.RefreshComponent();
        },

        ShowResults() {
            this.ShowVideo();
            this.StartTimer();
            this.$refs.video.currentTime = this.startTime;
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    width: 50rem;
    height: 30rem;
    border-radius: 1rem;
    overflow: hidden;
}
.video {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    &__overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #333;
        display: grid;
        place-items: center;
        color: white;
        font-size: 8rem;
        font-weight: 600;
    }
    &__buttons {
        margin: 1rem 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    &__button {
    }
}
</style>
