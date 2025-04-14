<template>
    <el-button type="primary" @click="dialogVisible = true">打開彈窗</el-button>
  
    <el-dialog v-model="dialogVisible" title="哈囉">
      <span>這是一個 Element Plus 的 Dialog 元件</span>
    </el-dialog>
</template>
  
<script setup>
  import { ref } from 'vue'
  
  const dialogVisible = ref(false)
</script>
  