<template>
  <div>
    <q-btn-dropdown push color="teal" dense padding="xs" dropdown-icon="more_vert" flat>
      <q-list class="bg-teal-1 text-teal-9 q-py-sm" dense>
        <q-item
          v-for="(action, index) in props.actions"
          :key="index"
          clickable
          v-close-popup
          tabindex="0"
          @click="$emit('action', action.event)"
        >
          <q-item-section avatar>
            <q-avatar
              :icon="action.icon"
              rounded
              :color="action.event === 'delete' ? 'red' : 'teal'"
              text-color="white"
              class="custom-shadow glossy"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ action.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-tooltip v-if="props.tooltip">
      <span class="text-subtitle2">{{ props.tooltip }}</span>
    </q-tooltip>
  </div>
</template>

<script setup>
/**
 * Componente: ActionsDropdown
 *
 * Props:
 * - actions: lista de ações dinâmicas [{ icon, label, event }]
 * - tooltip: texto exibido no tooltip
 *
 * Emits:
 * - action → emite o nome do evento da ação clicada
 */
const props = defineProps({
  actions: {
    type: Array,
    required: true,
    default: () => [],
  },
  tooltip: {
    type: String,
    default: '',
  },
})

defineEmits(['action'])
</script>
