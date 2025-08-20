<template>
  <q-card class="q-mt-md">
    <!-- Header -->
    <q-card-section class="row items-center justify-between q-pa-none">
      <div class="row items-center q-ml-md">
        <q-icon :name="icon" color="secondary" size="md" class="q-mr-md" />
        <span class="text-h6 text-weight-light">{{ title }}</span>
      </div>

      <q-card-actions>
        <slot name="actions">
          <!-- Caso não seja passado nada no slot actions, não mostra nada -->
        </slot>
      </q-card-actions>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <slot />
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: 'info' },
})
</script>
