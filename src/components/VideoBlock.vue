<template>
    <el-container class="p-4">
      <el-main>
        <div v-if="store.embedUrl" class="video-wrapper mt-4">
          <iframe
            :src="store.embedUrl"
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
  
        <el-input
          v-model="store.youtubeLink"
          placeholder="請貼上 YouTube 影片連結"
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
    import { useYTDLStore } from '../stores/ytdls'
    import { watch } from 'vue'
    const store = useYTDLStore()
  
    // 監聽連結變化，自動解析
    watch(() => store.youtubeLink, () => {
      store.extractAndEmbed()
    })
  
  </script>
  
  
  <style scoped>
  .video-wrapper {
    display: flex;
    justify-content: center;
  }
  </style>
  