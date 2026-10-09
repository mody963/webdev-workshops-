<script setup lang="ts">
import type { Product } from '../types/Product'

interface Props {
  product: Product
}

defineProps<Props>()

const emit = defineEmits<{
  delete: [id: number]
  edit: [product: Product]
}>()
</script>

<template>
  <div class="product-card">
    <!-- 1. Product Image Thumbnail -->
    <div v-if="product.image" class="image-wrapper">
      <img
        :src="product.image"
        :alt="product.name"
        referrerpolicy="no-referrer"
        class="card-img"
      />
    </div>

    <h2>
      <RouterLink :to="`/products/${product.id}`">{{ product.name }}</RouterLink>
    </h2>

    <div class="header">
      <span class="badge">{{ product.category }}</span>
      <h3>{{ product.name }}</h3>
      <p>Product ID: {{ product.id }}</p>
    </div>

    <p class="price">${{ product.price.toFixed(2) }}</p>
    <p class="description">{{ product.description }}</p>

    <!-- Stock Indicator -->
    <p v-if="product.stock === 0" class="stock-status out-of-stock">Out of Stock</p>
    <p v-else-if="product.stock < 5" class="stock-status low-stock">Low Stock ({{ product.stock }} left)</p>
    <p v-else class="stock-status in-stock">In Stock: {{ product.stock }}</p>

    <!-- Action Buttons -->
    <div class="actions">
      <button type="button" @click="emit('edit', product)">Edit</button>
      <button type="button" class="secondary" @click="emit('delete', product.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
}

/* Image thumbnail styling */
.image-wrapper {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.card-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background-color: #e2e8f0;
  color: #4a5568;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
}

.description {
  color: #64748b;
  margin: 0;
}

.stock-status {
  font-weight: 600;
  margin: 0;
}

.out-of-stock {
  color: #e53e3e;
}

.low-stock {
  color: #dd6b20;
}

.in-stock {
  color: #38a169;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}
</style>