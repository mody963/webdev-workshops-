<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ProductForm from '../components/ProductForm.vue'
import ProductList from '../components/ProductList.vue'
import { useCounter } from '../composables/useCounter'
import { useProducts } from '../composables/useProduct'
import type { Product } from '../types/Product'

const {
  products,
  productCount,
  totalValue,
  addProduct: addToProducts,
  updateProduct: updateInProducts,
  deleteProduct,
  lastSaved,
  hasUnsavedChanges,
  saveAll,
  fetchProducts,
  initProducts,
  loading,
  error
} = useProducts()

const { count, increment, decrement } = useCounter()

const editingProduct = ref<Product | null>(null)

function startEditing(product: Product) {
  editingProduct.value = product
}

function cancelEdit() {
  editingProduct.value = null
}

function handleAdd(
  name: string,
  price: number,
  description: string,
  stock: number,
  category: string
) {
  addToProducts({
    name,
    price,
    description,
    stock,
    category,
  })
}

function handleUpdate(updatedProduct: Product) {
  updateInProducts(updatedProduct)
  cancelEdit()
}

function handleDelete(id: number) {
  if (editingProduct.value?.id === id) {
    cancelEdit()
  }
  deleteProduct(id)
}



function handleKeyPress(event: KeyboardEvent) {
  if (event.key === 'Escape' && editingProduct.value !== null) {
    cancelEdit()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
  initProducts()
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div v-if="loading" class="status-msg">Loading products...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else>
    <div class="stats">
      <div class="stat"><strong>Products:</strong> {{ productCount }}</div>
      <div class="stat"><strong>Total Value:</strong> ${{ totalValue.toFixed(2) }}</div>
      <div v-if="lastSaved">Last saved: {{ lastSaved }}</div>
      <div>
        <p v-if="hasUnsavedChanges" class="warning">You have unsaved changes!</p>
        <button type="button" @click="saveAll">Save all</button>
      </div>
    </div>

    <!-- Reusable Form Component -->
    <ProductForm
      :editing-product="editingProduct"
      @add="handleAdd"
      @update="handleUpdate"
      @cancel="cancelEdit"
    />

    <!-- Nested ProductList Component (Coordinates cards and re-emits actions) -->
    <ProductList
      :products="products"
      @edit="startEditing"
      @delete="handleDelete"
    />
  </div> <!-- <-- Added missing closing tag here -->
</template>
<style scoped>
h1 {
  color: #42b983;
}

.warning {
  color: red;
}

.stat {
  margin: 1rem;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
</style>