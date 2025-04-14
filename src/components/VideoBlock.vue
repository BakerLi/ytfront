<template>
    <el-container class="p-4">
      <el-main>
        <div v-if="embedUrl" class="video-wrapper mt-4">
          <iframe
            :src="embedUrl"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
  
        <el-input
          v-model="youtubeLink"
          placeholder="請貼上 YouTube 影片連結"
          @input="extractAndEmbed"
          clearable
        ></el-input>
  
        <!-- <el-alert
          v-if="videoId"
          title="擷取成功！"
          type="success"
          class="mt-4"
          show-icon
        >
          <template #default>
            Video ID：<strong>{{ videoId }}</strong>
          </template>
        </el-alert> -->
        
      </el-main>
    </el-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const youtubeLink = ref('')
  const videoId = ref('')
  const playlistId = ref('')
  const embedUrl = ref('')
  
  const extractAndEmbed = () => {
    const url = youtubeLink.value
  
    const videoRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const playlistRegex = /[?&]list=([a-zA-Z0-9_-]+)/
  
    const videoMatch = url.match(videoRegex)
    const playlistMatch = url.match(playlistRegex)
  
    if (playlistMatch && !videoMatch) {
      // 僅 playlist
      playlistId.value = playlistMatch[1]
      embedUrl.value = `https://www.youtube.com/embed?listType=playlist&list=${playlistId.value}`
      videoId.value = ''
    } else if (videoMatch) {
      // 單部影片或影片 + playlist
      videoId.value = videoMatch[1]
      if (playlistMatch) {
        playlistId.value = playlistMatch[1]
        embedUrl.value = `https://www.youtube.com/embed/${videoId.value}?list=${playlistId.value}`
      } else {
        embedUrl.value = `https://www.youtube.com/embed/${videoId.value}`
      }
    } else {
      videoId.value = ''
      playlistId.value = ''
      embedUrl.value = ''
    }
  }
  </script>
  
  
  <style scoped>
  .video-wrapper {
    display: flex;
    justify-content: center;
  }
  </style>
  