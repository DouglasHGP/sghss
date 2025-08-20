<template>
  <div class="row items-center no-wrap">
    <div class="row items-center">
      <div class="text-h4 text-weight-thin text-grey-8">
        {{ props.title }}
      </div>
      <q-icon name="info_outline" size="xs" color="grey-6" class="q-mt-sm q-ml-sm cursor-pointer">
        <q-tooltip>{{ props.description }}</q-tooltip>
      </q-icon>
    </div>
    <q-space />
    <q-card-actions>
      <slot name="actions">
        <!-- Caso não seja passado nada no slot actions, não mostra nada -->
      </slot>
    </q-card-actions>
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
