<template>
  <q-card class="q-mt-md" :class="{ 'col-grow': $q.platform.is.mobile }">
    <q-card-section
      class="row items-center justify-between q-pa-none" :class="{ 'cursor-pointer': collapsible }"
      @click="collapsible && toggleVisibility()"
    >
      <div class="row items-center q-ml-md">
        <q-icon :name="icon" color="secondary" size="md" class="q-mr-md" />
        <span class="text-h6 text-weight-light">{{ title }}</span>
      </div>

      <q-card-actions>
        <q-btn
          v-if="collapsible"
          flat
          dense
          round
          :icon="isVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click.stop="toggleVisibility"
        />
        <slot name="actions" />
      </q-card-actions>
    </q-card-section>

    <q-separator inset />

    <q-card-section v-if="collapsible ? isVisible : true">
      <slot />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: 'info' },
  collapsible: { type: Boolean, default: false },
})

const isVisible = ref(false)

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>
