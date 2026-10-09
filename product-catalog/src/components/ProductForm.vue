<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Product } from '../types/Product'

// 1. Receive the editingProduct prop (or null when creating)
const props = defineProps<{
  editingProduct: Product | null
}>()

// 2. Define all events this form can send to the parent
const emit = defineEmits<{
  add: [
    name: string,
    price: number,
    description: string,
    stock: number,
    category: string
  ]
  update: [product: Product]
  cancel: []
}>()

// Local form refs (synced via v-model)
const newProductName = ref<string>('')
const newProductPrice = ref<number>(0)
const newProductDescription = ref<string>('')
const newProductStock = ref<number>(0)
const newProductCategory = ref<string>('')
const formError = ref<string>('')
const newProductImage = ref<string>('')

// Watch the prop: populate refs when editing, reset when null
watch(
  () => props.editingProduct,
  (product) => {
    formError.value = ''
    if (product) {
      newProductName.value = product.name
      newProductPrice.value = product.price
      newProductDescription.value = product.description
      newProductStock.value = product.stock
      newProductCategory.value = product.category
      newProductImage.value = product.image || ''
    } else {
      resetInputs()
    }
  },
  { immediate: true }
)

function resetInputs() {
  newProductName.value = ''
  newProductPrice.value = 0
  newProductDescription.value = ''
  newProductStock.value = 0
  newProductCategory.value = ''
  formError.value = ''
  newProductImage.value = ''
}

function handleSubmit() {
  // 1. Validate inputs
  if (newProductName.value.trim() === '' || newProductPrice.value <= 0) {
    formError.value = 'Please enter a valid name and price'
    return
  }

  if (newProductStock.value < 0) {
    formError.value = 'Stock cannot be negative'
    return
  }

  const imageUrl = newProductImage.value.trim()
  // 2. Branch based on edit vs. create mode
 if (props.editingProduct) {
    // EDIT MODE: Create a fresh object keeping the existing ID
    const updated: Product = {
      id: props.editingProduct.id,
      name: newProductName.value.trim(),
      price: newProductPrice.value,
      description: newProductDescription.value.trim(),
      stock: newProductStock.value,
      category: newProductCategory.value || 'General',
      // Attach the image key only if a URL was provided
      ...(imageUrl ? { image: imageUrl } : {}),
    }

    emit('update', updated)
  } else {
    // CREATE MODE: Emit the fields to add a brand new product
    emit(
      'add',
      newProductName.value.trim(),
      newProductPrice.value,
      newProductDescription.value.trim(),
      newProductStock.value,
      newProductCategory.value || 'General'
    )

    // Clear form inputs only when creating a new product
    resetInputs()
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h2>{{ editingProduct ? 'Edit Product' : 'Add Product' }}</h2>

    <label>
      Product Name
      <input v-model="newProductName" type="text" />
    </label>

    <label>
      Price
      <input v-model.number="newProductPrice" type="number" step="0.01" min="0" />
    </label>

    <label>
      Description
      <input v-model="newProductDescription" type="text" />
    </label>

    <label>
      Stock
      <input v-model.number="newProductStock" type="number" min="0" />
    </label>

    <label>
      Category
      <select v-model="newProductCategory">
        <option disabled value="">--Please choose a category--</option>
        <option value="School">School</option>
        <option value="House">House</option>
        <option value="Books">Books</option>
      </select>
    </label>
    <!-- Optional Image Input -->
    <label>
      Image URL (optional)
      <input
        v-model="newProductImage"
        type="url"
        placeholder="https://example.com/item.jpg"
      />
    </label>

    <!-- Dynamic button text based on mode -->
    <button type="submit">
      {{ editingProduct ? 'Update Product' : 'Add Product' }}
    </button>

    <!-- Only show Cancel when actively editing -->
    <button
      v-if="editingProduct !== null"
      type="button"
      @click="emit('cancel')"
    >
      Cancel edit
    </button>

    <p v-if="formError" class="form-error">{{ formError }}</p>
  </form>
</template>

<style scoped>
.form-error {
  color: red;
}
</style>