<template>
    <div class="video-container">
      <media-controller autohide="2">
        <mux-video
          slot="media" 
          v-bind:src="videoUrl"
          v-bind:env-key="muxEnvKey"
          v-bind:metadata-video-title="videoTitle"
          v-bind:metadata-viewer-user-id="user.sub"
          stream-type="vod"
        >
        </mux-video>
        <media-control-bar class="mobile" slot="top-chrome">
          <media-mute-button></media-mute-button>
          <div class="spacer"></div>
          <media-pip-button></media-pip-button>
          <media-fullscreen-button></media-fullscreen-button>
        </media-control-bar>
        <media-control-bar class="desktop" slot="top-chrome">
          <div class="spacer"></div>
          <media-pip-button></media-pip-button>
          <media-fullscreen-button></media-fullscreen-button>
        </media-control-bar>
        <div class="overlay" slot="centered-chrome">
          <media-seek-backward-button></media-seek-backward-button>
          <media-play-button></media-play-button>
          <media-seek-forward-button></media-seek-forward-button>
        </div>
        <media-control-bar class="mobile">
          <media-time-range></media-time-range>
          <media-playback-rate-button></media-playback-rate-button>
          <media-time-display show-duration></media-time-display>
        </media-control-bar>
        <media-control-bar class="desktop">
          <media-play-button></media-play-button>
          <media-mute-button></media-mute-button>
          <media-volume-range></media-volume-range>
          <media-time-range></media-time-range>
          <media-playback-rate-button></media-playback-rate-button>
          <media-time-display show-duration></media-time-display>
        </media-control-bar>
      </media-controller>
    </div>
</template>

<script>
import "@mux-elements/mux-video";
import 'media-chrome';
import axios from "axios";

const moonriseApiBaseUrl = envVar.VUE_APP_API_BASE_ENDPOINT
const axiosNoRetryClient = axios.create({ baseURL: moonriseApiBaseUrl });

export default {
  name: "Video",
  data() {
    return {
      muxEnvKey: envVar.VUE_APP_MUX_DATA_ENV_KEY,
      videoUrl: "",
      user: this.$auth0.user,
    };
  },
  methods: {
    async setSignedMuxVideoUrl() {
      const token = await this.$auth.getTokenSilently();
      const signedPlaybackData = await axiosNoRetryClient.get("/signed-mux-url?playback_id=" + this.playbackId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.videoUrl = signedPlaybackData.data.signed_url;
    },
  },
  async mounted() {
    await this.setSignedMuxVideoUrl();
  },
  watch: {
    playbackId: function(newVal, oldVal) {
      this.setSignedMuxVideoUrl()
    }
  },
  props: {
    playbackId: String,
    videoTitle: String,
  }
}

</script>

<style>
  media-controller {
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
    display: block;
  }
  .spacer {
    flex-grow: 1;
  }
  .desktop {
    display: none;
  }
  .overlay > * {
    width: 60px;
    margin: 0 20px;
  }
  @media (min-width: 768px) {
    .mobile {
      display: none;
    }
    media-control-bar.desktop {
      display: inline-flex;
    }
  }
</style>