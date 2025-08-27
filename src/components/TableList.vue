<template>
  <CardBase :title="title" :subtitle="subtitle" :icon="icon" :collapsible="collapsible" searchable>
    <template #filters-prepend>
      <q-input
        v-model="searchQuery"
        :style="!$q.platform.is.mobile ? 'width: 350px' : ''"
        dense
        standout="bg-teal-4 text-white"
        rounded
        :label="labelSearch"
      >
        <template v-slot:append>
          <q-btn round dense flat icon="search" />
        </template>
      </q-input>
    </template>
    <template #subtitle-prepend v-if="subtitle">
      <div
        class="text-weight-light"
        :class="{
          'text-h6 ': !$q.platform.is.mobile,
          'text-subtitle2 q-mt-xs': $q.platform.is.mobile,
        }"
      >
        {{ subtitle }}
      </div>
    </template>
    <template #actions>
      <ActionsDropdown :actions="actions" :tooltip="actionsTooltip" @action="handleAction" />
    </template>
    <q-table
      :rows="filteredRows"
      :columns="tableColumns"
      row-key="id"
      flat
      bordered
      dense
      :rows-per-page-options="[10, 15, 20]"
    >
      <!-- Slot fixo para a coluna de ações -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" style="width: 65px">
          <ActionsDropdown
            :actions="resolveRowActions(props.row)"
            @action="(event) => handleRowAction(event, props.row)"
          />
        </q-td>
      </template>

      <!-- Repassa qualquer slot de coluna customizado -->
      <template
        v-for="col in props.columns"
        :key="col.name"
        v-slot:[`body-cell-${col.name}`]="slotProps"
      >
        <slot
          v-if="$slots[`body-cell-${col.name}`]"
          :name="`body-cell-${col.name}`"
          v-bind="slotProps"
        />
        <q-td v-else :props="slotProps">
          {{ slotProps.value }}
        </q-td>
      </template>
    </q-table>
  </CardBase>
</template>

<script setup>
import { ref, computed } from 'vue'
import CardBase from 'components/CardBase.vue'
import ActionsDropdown from 'components/ActionsDropdown.vue'

// Definição das props do componente
const props = defineProps({
  title: { type: String, default: 'Lista' },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: 'list' },
  labelSearch: { type: String, default: 'Buscar' },
  collapsible: { type: Boolean, default: false },
  rows: { type: Array, required: true },
  columns: { type: Array, required: true },
  actions: { type: Array, default: () => [] },
  actionsTooltip: { type: String, default: 'Ações' },
  rowActions: { type: Array, default: () => [] },
})

// Emite eventos para a manipulação das ações
const emit = defineEmits(['action', 'rowAction'])

// Estado reativo para o campo de busca
const searchQuery = ref('')

// Colunas da tabela com a coluna de ações adicionada
const tableColumns = computed(() => {
  const finalColumns = [...props.columns]
  finalColumns.push({
    name: 'actions',
    label: 'Ações',
    align: 'right',
    field: 'actions',
  })
  return finalColumns
})

// Filtra as linhas com base na busca
const filteredRows = computed(() => {
  if (!searchQuery.value) {
    return props.rows
  }
  const query = searchQuery.value.toLowerCase()
  return props.rows.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(query)),
  )
})

// Lida com as ações do dropdown do header
const handleAction = (event) => {
  emit('action', event)
}

// Lida com as ações do dropdown de cada linha
const handleRowAction = (event, row) => {
  emit('rowAction', { event, row })
}

const resolveRowActions = (row) => {
  return props.rowActions.map((action) => ({
    ...action,
    disabled:
      typeof action.disabled === 'function' ? action.disabled(row) : action.disabled || false,
  }))
}
</script>
