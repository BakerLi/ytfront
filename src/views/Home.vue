
<template>
  <div class="layout">
    <main class="center-flex" style="height: 100vh">
        <VideoBlock class="rwd-input" />
        <Sidebar class="bt-sidebar">
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
        </Sidebar>
    </main>

    <!-- 控制按鈕 （不會消失，只做位移動畫）-->
    <div :class="['bottom', { raised: showFooter }]">
      <el-button type="primary" @click="toggleFooter">
          {{ showFooter ? 'collapse' : 'expand' }}
        </el-button>
    </div>
    <!-- Footer，帶動畫 -->
    <transition name="slide-fade">
      <footer v-if="showFooter" >
        <span>
          <div class="log-output" ref="logContainerRef">
            <p v-for="(log, i) in store.logs" :key="i">{{ log }}</p>
          </div>
        </span>
      </footer>
    </transition>
  </div>
</template>


<script setup lang="ts">
  import { ref, onUpdated } from 'vue'
  import VideoBlock from '../components/VideoBlock.vue'
  import Sidebar from '../components/SideBar.vue'
  import { useYTDLStore } from '../stores/ytdls' 
  import { useFilesStore } from '../stores/files'

  const store = useYTDLStore()
  const filesStore = useFilesStore()
  const logContainerRef = ref<HTMLElement | null>(null)
  const showFooter = ref(true);

  const download = (file: any) => {
      const link = document.createElement('a');
      link.href = `https://thxjupiter.ddns.net/downloads/directID?id=${store.videoId}`;
      link.download = `${store.videoId}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(file);
  }

  onUpdated(() => {
    if (logContainerRef.value) {
      logContainerRef.value.scrollTop = logContainerRef.value.scrollHeight
    }
  })

  function toggleFooter() {
    showFooter.value = !showFooter.value;
  }

  
</script>

<style scoped>
.log-output {
  font-family: monospace;
  background: #000;
  color: #00ff00;
  padding: 10px;
  margin-top: -20vh;
  height: 13vh;
  overflow-y: auto;
  overflow-x: hidden; /* 避免橫向滾動 */
  width: 70vw;         /* 讓它固定寬度，不會被內容撐開 */
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

.rwd-input {
  position: center;
  width: 80%;
  max-width: 600px;
}

.bt-sidebar{
  position: fixed;
  right: 0;
  top: 0;
}

.center-flex {
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center;     /* 垂直置中 */
}

/* 動畫效果 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1.2s ease;
  transform: translateY(0); /* 初始位置 */
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20vh);
}

.bottom {
  transform: translateY(-5vh);/* 初始位置 */
  transition: transform 0.6s ease-in-out;
}

/* 加上 raised class 時往上移動 80px */
.bottom.raised {
  transform: translateY(-21vh);
}


</style>






