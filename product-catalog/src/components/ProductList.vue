<script setup lang="ts">
import type { Product } from '../types/Product'
import ProductCard from './ProductCard.vue'

interface Props {
  products: Product[]
}

defineProps<Props>()

const emit = defineEmits<{
  edit: [product: Product]
  delete: [id: number]
}>()
</script>

<template>
  <div class="product-list-container">
    <!-- Empty State -->
    <p v-if="products.length === 0" class="empty-state">
      No products yet. Add your first product above!
    </p>

    <!-- Product Grid -->
    <div v-else class="product-list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @edit="emit('edit', product)"
        @delete="emit('delete', product.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.product-list-container {
  margin-top: 2rem;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.empty-state {
  text-align: center;
  color: #64748b;
  font-size: 1.1rem;
  padding: 3rem 1rem;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
}
</style>