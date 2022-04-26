<script setup>
import { reactive, computed } from 'vue'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import VideoComponent from './Video.vue'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

const frontmatter = usePageFrontmatter()
const muxPlaybackId = computed(() => {
   return frontmatter.value.muxPlaybackId
   })
</script>

<template>
  <ParentLayout>
    <template #page-top>
      <div class="video">
         <VideoComponent 
            v-if="muxPlaybackId"
            :key="muxPlaybackId"
            :playbackId="muxPlaybackId"
         />
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.video {
  text-align: center;
}
</style>