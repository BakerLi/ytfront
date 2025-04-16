// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useYTDLStore = defineStore('ytdls', () => {
    const youtubeLink = ref('')
    const videoId = ref('')
    const playlistId = ref('')
    const embedUrl = ref('')
    const logs = ref<string[]>([])
    const isDownloading = ref(false)

    const addLog = (msg: string) => logs.value.push(msg)
    const clearLogs = () => (logs.value = [])
    const setDownloading = (val: boolean) => (isDownloading.value = val)
  
    const extractAndEmbed = () => {
      const url = youtubeLink.value
      const videoRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      const playlistRegex = /[?&]list=([a-zA-Z0-9_-]+)/
  
      const videoMatch = url.match(videoRegex)
      const playlistMatch = url.match(playlistRegex)
  
      if (playlistMatch && !videoMatch) {
        playlistId.value = playlistMatch[1]
        embedUrl.value = `https://www.youtube.com/embed?listType=playlist&list=${playlistId.value}`
        videoId.value = ''
      } else if (videoMatch) {
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
    
    
  
    return {
      youtubeLink,
      videoId,
      playlistId,
      embedUrl,
      extractAndEmbed,
      addLog,
      clearLogs,
      logs,
      setDownloading,
      isDownloading
    }
  })