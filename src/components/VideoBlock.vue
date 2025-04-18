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

        <el-button type="primary" @click="startDownload">
        salute!
        </el-button>
        
      </el-main>
    </el-container>
  </template>
  
  <script setup>
    import { useYTDLStore } from '../stores/ytdls'
    import { useFilesStore } from '../stores/files'
    import { watch } from 'vue'
    import { io } from 'socket.io-client'
    import axios from 'axios'
    const store = useYTDLStore()
    const filesStore = useFilesStore()
    let socket = null
  
    // 監聽連結變化，自動解析
    watch(() => store.youtubeLink, () => {
      store.extractAndEmbed()
    })

    const startDownload = async () => {
      if (!store.youtubeLink) return
        socket = io('https://thxjupiter.ddns.net/', {
        query: { taskId: store.youtubeLink }
      })

      store.setDownloading(true)
      store.clearLogs()

      socket.on('log', (msg) => {
        store.addLog(msg)
      })

      socket.on('downloadComplete', (url) => {
        store.addLog('下載完成!')
        store.addLog(`here：<a href="${url}" target="_blank">download</a>`)
        filesStore.addFiles({
          name: `${store.videoId}`,
          size: '* MB',
          thumbnail: `https://img.youtube.com/vi/${store.videoId}/hqdefault.jpg`,
          url: `/downloads/${store.videoId}.mp4`,
        })
        socket.disconnect()  // 關閉 Socket 連接
        socket = null
        store.setDownloading(false)
      })

      socket.on('disconnect', () => {
        store.setDownloading(false)
      })
    
      try {
        await axios.post('https://thxjupiter.ddns.net/socketdl', { url: store.youtubeLink })
      } catch (err) {
        store.addLog(`[錯誤] ${err.message || err}`)
        socket?.disconnect()
        store.setDownloading(false)
      }
    }
  
  </script>
  
  <style scoped>
    .video-wrapper {
      display: flex;
      justify-content: center;
    }
  </style>
  