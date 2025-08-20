<template>
  <q-card class="q-mt-md" :class="{ 'col-grow': $q.platform.is.mobile }">
    <q-card-section
      clickable
      class="row items-center justify-between q-pa-none cursor-pointer"
      @click="toggleVisibility"
    >
      <div class="row items-center q-ml-md">
        <q-icon :name="icon" color="secondary" size="md" class="q-mr-md" />
        <span class="text-h6 text-weight-light">{{ title }}</span>
      </div>

      <q-card-actions>
        <q-btn
          flat
          dense
          round
          :icon="isVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click.stop="toggleVisibility"
        />
        <slot name="actions"></slot>
      </q-card-actions>
    </q-card-section>

    <q-separator inset />

    <q-card-section v-if="isVisible">
      <slot />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: 'info' },
})

const isVisible = ref(false)

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>
