<script setup lang="ts">
import { ref } from 'vue'
import ProductManagementPage from './pages/ProductManagementPage.vue'

// Toggle state to mount / unmount the page
const isPageVisible = ref<boolean>(true)
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <button type="button" @click="isPageVisible = !isPageVisible">
        {{ isPageVisible ? 'Hide Product Management' : 'Show Product Management' }}
      </button>
    </header>

    <!-- v-if controls mounting and destruction -->
    <ProductManagementPage v-if="isPageVisible" />
    <p v-else class="status-message">
      Product Management is currently unmounted. Pressing <kbd>Escape</kbd> will do nothing because the listener was cleaned up!
    </p>
  </div>
</template>

<style scoped>
.app-layout {
  padding: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  font-family: inherit;
}

.app-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.status-message {
  margin-top: 2rem;
  color: #64748b;
  font-style: italic;
  padding: 1.5rem;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
}
</style>