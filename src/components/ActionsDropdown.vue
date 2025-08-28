<template>
  <div>
    <q-btn
      v-if="props.actions.length === 1"
      @click="$emit('action', props.actions[0].event)"
      :icon="props.actions[0].icon"
      :disable="props.actions[0].disabled"
      color="teal"
      dense
      padding="xs"
      flat
      :class="!$q.platform.is.mobile ? 'q-ml-md' : 'q-ml-xs'"
    >
      <q-tooltip v-if="props.actions[0].tooltip">
        <span class="text-subtitle2">{{ props.actions[0].tooltip }}</span>
      </q-tooltip>
      <q-badge
        v-if="props.actions[0].alert"
        class="q-ml-sm"
        color="white"
        text-color="grey"
        :label="props.actions[0].alert"
      />
    </q-btn>

    <q-btn-dropdown v-else push color="teal" dense padding="xs" dropdown-icon="more_vert" flat>
      <q-list class="bg-teal-1 text-teal-9 q-py-sm" dense>
        <q-item
          v-for="(action, index) in props.actions"
          :key="index"
          :clickable="!action.disabled"
          :disable="action.disabled"
          v-close-popup
          tabindex="0"
          @click="!action.disabled && $emit('action', action.event)"
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
          <q-item-section side v-if="action.alert">
            <q-icon color="grey" name="info_outline" />
            <q-tooltip
              ><span class="text-subtitle2">{{ action.alert }}</span></q-tooltip
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-tooltip v-if="props.tooltip && props.actions.length > 1">
      <span class="text-subtitle2">{{ props.tooltip }}</span>
    </q-tooltip>
  </div>
</template>

<script setup>
/**
 * Componente: ActionsDropdown
 *
 * Props:
 * - actions: lista de ações dinâmicas [{ icon, label, event, disabled?, alert? }]
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
