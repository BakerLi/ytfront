

<template>
  <div>
      <h1>Home</h1>
      <VideoBlock></VideoBlock>
      <el-button type="primary" @click="startDownload">
      salute!
      </el-button>

      <div class="log-output" ref="logContainerRef">
        <p v-for="(log, i) in store.logs" :key="i">{{ log }}</p>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { ref, onUpdated } from 'vue'
  import VideoBlock from '../components/VideoBlock.vue'
  import { io, Socket } from 'socket.io-client'
  import axios from 'axios'
  import { useYTDLStore } from '../stores/ytdls'

  const store = useYTDLStore()
  const logContainerRef = ref<HTMLElement | null>(null)
  let socket: Socket | null = null

  onUpdated(() => {
    if (logContainerRef.value) {
      logContainerRef.value.scrollTop = logContainerRef.value.scrollHeight
    }
  })

  const startDownload = async () => {
    if (!store.youtubeLink) return
    socket = io('http://localhost:3000', {
      query: { taskId: store.youtubeLink }
    })

    store.setDownloading(true)
    store.clearLogs()

    socket.on('log', (msg) => {
      store.addLog(msg)
    })

    socket.on('downloadComplete', (url) => {
      store.logs.push('下載完成!')
      store.logs.push(`here：<a href="${url}" target="_blank">download</a>`)

      socket.disconnect()  // 關閉 Socket 連接
      socket = null
      store.setDownloading(false)
    })

    socket.on('disconnect', () => {
      store.setDownloading(false)
    })
  
    try {
      await axios.post('http://localhost:3000/socketdl', { url: store.youtubeLink })
    } catch (err) {
      store.addLog(`[錯誤] ${err.message || err}`)
      socket?.disconnect()
      store.setDownloading(false)
    }

}
</script>

<style scoped>
.log-output {
  font-family: monospace;
  background: #000;
  color: #00ff00;
  padding: 10px;
  margin-top: 20px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden; /* 避免橫向滾動 */
  width: 100%;         /* 讓它固定寬度，不會被內容撐開 */
  word-break: break-word; /* 自動換行 */
  white-space: pre-wrap;  /* 保留空白 & 自動換行 */
  border-radius: 6px;
  box-shadow: 0 0 5px #00ff00;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}
</style>
