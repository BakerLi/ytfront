

<template>
  <div>
      <h1>Home</h1>
      <VideoBlock></VideoBlock>
      
      <el-table :data="filesStore.files" style="width: 100%">
        <el-table-column label="縮圖" width="150">
          <template #default="scope">
            <img :src="scope.row.thumbnail" alt="thumbnail" style="width: 100px; height: auto;" />
          </template>
        </el-table-column>

        <el-table-column prop="name" label="檔案名稱" width="480"/>

        <el-table-column prop="size" label="大小" />

        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button type="primary" size="small" @click="download(scope.row)">
              下載
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="log-output" ref="logContainerRef">
        <p v-for="(log, i) in store.logs" :key="i">{{ log }}</p>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { ref, onUpdated } from 'vue'
  import VideoBlock from '../components/VideoBlock.vue'
  import { useYTDLStore } from '../stores/ytdls' 
  import { useFilesStore } from '../stores/files'
  import axios from 'axios'

  const store = useYTDLStore()
  const filesStore = useFilesStore()
  const logContainerRef = ref<HTMLElement | null>(null)

  const download = (file: any) => {
      const link = document.createElement('a');
      link.href = `http://localhost:3000/downloads/directID?id=${store.videoId}`;
      link.download = `${store.videoId}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

  onUpdated(() => {
    if (logContainerRef.value) {
      logContainerRef.value.scrollTop = logContainerRef.value.scrollHeight
    }
  })

  
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
