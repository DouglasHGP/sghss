<template>
  <q-card class="q-mt-md" :class="{ 'col-grow': $q.platform.is.mobile }">
    <q-card-section
      class="row items-center justify-between q-py-sm q-px-md"
      :class="{ 'cursor-pointer': collapsible }"
      @click="collapsible && toggleVisibility()"
    >
      <q-icon :name="icon" color="secondary" size="md" />

      <div v-if="!searchable" class="col-grow q-mx-md text-h6 text-weight-light">
        {{ title }}
      </div>
      <div v-else class="col-grow q-ml-md q-mr-xs ">
        <slot name="filters-prepend" />
      </div>

      <q-card-actions class="q-pa-none">
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

defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: 'info' },
  collapsible: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
})

const isVisible = ref(false)

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>
