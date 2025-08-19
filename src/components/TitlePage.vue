<template>
  <div>
    <div class="text-h4 text-weight-thin text-grey-8">{{ props.title }}</div>
    <p>{{ props.description }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>
