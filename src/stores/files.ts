// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilesStore = defineStore('files', () => {
    
    const files = ref<FileItem[]>([])

    interface FileItem{
        name: string
        size: number
        thumbnail: string
        url: string
    }
    
    const addFiles = (file: FileItem) => {
      files.value.push(file)
      if(files.value.length >3) files.value.pop()
    }
  
    return {
        files,
        addFiles
    }
  })


  // const files = ref([
  //   {
  //     name: 'video1.mp4',
  //     size: '25 MB',
  //     thumbnail: 'https://img.youtube.com/vi/o_oy760hgSY/hqdefault.jpg',
  //     url: '/downloads/video1.mp4',
  //   },
  //   {
  //     name: 'song1.mp3',
  //     size: '4.5 MB',
  //     thumbnail: 'https://img.youtube.com/vi/kzZ6KXDM1RI/hqdefault.jpg',
  //     url: '/downloads/song1.mp3',
  //   },
  // ])