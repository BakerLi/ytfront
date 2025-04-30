<template>
  <!-- 桌面版：固定側邊欄 -->
  <div v-if="!isMobile" class="sidebar-fixed">
    <slot />
  </div>

  <!-- 手機版：按鈕 + Drawer 側邊欄 -->
  <div v-else>
    <el-button @click="isDrawerOpen = true" type="primary" class="sidebar-toggle">
      show me the money
    </el-button>

    <el-drawer
      v-model="isDrawerOpen"
      direction="rtl"
      size="70%"
      :with-header="false"
    >
      <slot />
    </el-drawer>
  </div>
</template>


<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'

    const isMobile = ref(false)
    const isDrawerOpen = ref(false)

    function checkIsMobile() {
        // isMobile.value = window.innerWidth < 768
        isMobile.value = true
    }

    onMounted(() => {
        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkIsMobile)
    })
</script>

<style scoped>
.sidebar-fixed {
  width: auto;
  max-width: 80vw;              /* 防止太寬 */
  height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
  position: fixed;
  left: 0;
  top: 0;
  /* overflow-y: auto; */
}

.sidebar-toggle {
  margin: 12px;
}
</style>
