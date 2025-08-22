<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Relatórios"
      description="Gerencie os relatórios e estatísticas da Organização"
    />
  </q-page>
</template>
<!-- 
    <div class="q-pa-md">
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-select
                filled
                v-model="selectedReport"
                :options="reportOptions"
                label="Selecione o Relatório"
                emit-value
                map-options
              />
            </div>

            <div class="col-12 col-md-8">
              <div class="row q-gutter-md">
                <q-input
                  v-if="selectedReport === 'patients' || selectedReport === 'professionals'"
                  filled
                  v-model="filters.name"
                  label="Nome"
                  class="col"
                />
                <q-select
                  v-if="selectedReport === 'professionals'"
                  filled
                  v-model="filters.role"
                  :options="['Médico', 'Enfermeiro', 'Técnico']"
                  label="Função"
                  class="col"
                />
                <q-select
                  v-if="selectedReport === 'professionals'"
                  filled
                  v-model="filters.status"
                  :options="['Ativo', 'Afastado']"
                  label="Status"
                  class="col"
                />
                <q-select
                  v-if="selectedReport === 'patients'"
                  filled
                  v-model="filters.condition"
                  :options="['Estável', 'Crítico', 'Recuperação']"
                  label="Condição"
                  class="col"
                />
                <q-select
                  v-if="selectedReport === 'resources'"
                  filled
                  v-model="filters.resourceCategory"
                  :options="['Material', 'Medicamento', 'Leito']"
                  label="Categoria"
                  class="col"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Limpar Filtros" color="grey" @click="clearFilters" />
          <q-btn flat label="Gerar Relatório" color="primary" @click="generateReport" />
          <q-btn
            v-if="reportData.length > 0"
            flat
            label="Imprimir"
            color="secondary"
            icon="print"
            @click="printReport"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-table
      v-if="reportData.length > 0"
      :rows="reportData"
      :columns="reportColumns"
      row-key="id"
      flat
      bordered
      class="q-mt-md"
    >
      <template v-slot:top-right>
        <div class="text-h6">
          Total de Itens: <span class="text-teal-9">{{ reportData.length }}</span>
        </div>
      </template>
    </q-table>

    <div v-else class="text-center q-mt-xl">
      <q-icon name="description" size="xl" color="grey" />
      <div class="text-subtitle1 text-grey-6 q-mt-sm">
        Selecione uma categoria e aplique os filtros para gerar o relatório.
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import {
  professionalsData,
  patientsData,
  resourcesData,
  professionalColumns,
  patientsColumns,
  resourcesColumns,
} from './reportData' // Assumindo a importação dos dados

const selectedReport = ref(null)
const filters = ref({})
const reportData = ref([])
const reportColumns = ref([])

const reportOptions = [
  { label: 'Profissionais', value: 'professionals' },
  { label: 'Pacientes', value: 'patients' },
  { label: 'Recursos', value: 'resources' },
]

// Observa a mudança da categoria para limpar e preparar os filtros e colunas
watch(selectedReport, (newValue) => {
  clearFilters()
  reportData.value = []
  if (newValue === 'professionals') {
    reportColumns.value = professionalColumns
  } else if (newValue === 'patients') {
    reportColumns.value = patientsColumns
  } else if (newValue === 'resources') {
    reportColumns.value = resourcesColumns
  }
})

function generateReport() {
  let sourceData = []
  let filtered = []

  if (selectedReport.value === 'professionals') {
    sourceData = professionalsData
    filtered = sourceData.filter((prof) => {
      const nameMatch = filters.value.name
        ? prof.name.toLowerCase().includes(filters.value.name.toLowerCase())
        : true
      const roleMatch = filters.value.role ? prof.role === filters.value.role : true
      const statusMatch = filters.value.status ? prof.status === filters.value.status : true
      return nameMatch && roleMatch && statusMatch
    })
  } else if (selectedReport.value === 'patients') {
    sourceData = patientsData
    filtered = sourceData.filter((patient) => {
      const nameMatch = filters.value.name
        ? patient.name.toLowerCase().includes(filters.value.name.toLowerCase())
        : true
      const conditionMatch = filters.value.condition
        ? patient.condition === filters.value.condition
        : true
      return nameMatch && conditionMatch
    })
  } else if (selectedReport.value === 'resources') {
    sourceData = resourcesData
    filtered = sourceData.filter((resource) => {
      const categoryMatch = filters.value.resourceCategory
        ? resource.categoria === filters.value.resourceCategory
        : true
      return categoryMatch
    })
  }

  reportData.value = filtered
}

function clearFilters() {
  filters.value = {}
}

function printReport() {
  window.print()
}
</script> -->
