<template>
  <q-card class="q-mt-md" :class="{ 'col-grow': $q.platform.is.mobile }">
    <q-card-section
      class="row items-center justify-between q-py-sm q-px-md"
      :class="{ 'cursor-pointer': collapsible }"
      @click="collapsible && toggleVisibility()"
    >
      <q-icon :name="props.icon" color="secondary" size="md" />

      <div v-if="props.title" class="col-grow q-mx-md text-h6 text-weight-light">
        {{ props.title }}
      </div>

      <slot name="select-prepend" />

      <slot name="filters-prepend" />

      <slot name="header-actions" />

      <slot name="subtitle-prepend" />

      <q-card-actions class="q-pa-none">
        <q-btn
          v-if="props.collapsible"
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

const props = defineProps({
  title: { type: String, required: false, default: '' },
  subtitle: { type: [String, Boolean], default: '' },
  icon: { type: String, default: 'info' },
  collapsible: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
  selectable: { type: Boolean, default: false },
})

const isVisible = ref(false)

function toggleVisibility() {
  isVisible.value = !isVisible.value
}
</script>
