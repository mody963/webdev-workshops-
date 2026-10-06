<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProducts } from '../composables/useProduct'
 
const route = useRoute()
const { getProduct } = useProducts()
   
const productId = Number(route.params.id)
const product = getProduct(productId)
</script>
 
<template>
<div v-if="product">
<h1>{{ product.name }}</h1>
<p>Price: ${{ product.price }}</p>
<RouterLink to="/products">← Back to Products</RouterLink>
</div>
<div v-else>
<h1>Product Not Found</h1>
<p>No product exists with ID {{ productId }}.</p>
<RouterLink to="/products">← Back to Products</RouterLink>
</div>
</template>