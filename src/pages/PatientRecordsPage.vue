<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Prontuários"
      description="Gerencie os registros e históricos de seus pacientes"
    />

    <div class="row q-gutter-md">
      <CardBase class="col" title="Resumo" icon="info" collapsible>
        <q-card class="row justify-around">
          <q-card-section class="text-center q-py-xs col">
            <div :class="[responsiveText()]" class="text-teal">128</div>
            <div class="text-caption">Prontuários</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center q-py-xs col">
            <div :class="[responsiveText()]" class="text-teal">96</div>
            <div class="text-caption">Anamneses Completas</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center q-py-xs col">
            <div :class="[responsiveText()]" class="text-negative">12</div>
            <div class="text-caption">Incompletas</div>
          </q-card-section>
        </q-card>
        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Tipo de Anamnese" icon="search">
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Pediátrica</span><span>40%</span>
              </div>
              <q-linear-progress :value="0.4" color="teal-9" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Clínica Geral</span><span>35%</span>
              </div>
              <q-linear-progress :value="0.35" color="teal-4" rounded />
            </div>
            <div>
              <div class="row justify-between items-center">
                <span>Geriátrica</span><span>25%</span>
              </div>
              <q-linear-progress :value="0.25" color="teal-3" rounded />
            </div>
          </CardBase>
          <CardBase class="col" title="Alertas" icon="warning">
            <q-list bordered separator>
              <q-item clickable>
                <q-item-section>
                  <q-item-label>Prontuário incompleto</q-item-label>
                  <q-item-label caption>Paciente: Marcos Lima</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-item-label>Aguardando informações</q-item-label>
                  <q-item-label caption>Paciente: Ana Silva</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </CardBase>
        </div>
      </CardBase>
    </div>

    <TableList
      icon="list"
      :rows="patientRecords"
      :label-search="'Nome do Paciente ou Diagnóstico'"
      :columns="columns"
      :actions="[
        { icon: 'add', label: 'Expontâneo', event: 'respond', alert: 'Extra Agenda' },
        { icon: 'filter_alt', label: 'Filtros', event: 'filter' },
      ]"
      :row-actions="[
        { icon: 'visibility', label: 'Detalhar', event: 'view' },
        { icon: 'edit', label: 'Editar', event: 'edit' },
        { icon: 'delete', label: 'Excluir', event: 'delete' },
      ]"
      @action="handleTableAction"
      @rowAction="handleLineAction"
    />
    <PatientRecordsDialog ref="patientDialogRef" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { patients } from 'src/mocks/patients'
import PatientRecordsDialog from './PatientRecordsDialog.vue'
import { useResponsiveText } from 'src/composables/useResponsiveText'

const { responsiveText } = useResponsiveText()

const patientDialogRef = ref(null)

const patientRecords = ref(
  patients.map((p, index) => ({
    id: p.id,
    patientName: p.name,
    diagnosis: mockDiagnosis(index),
    type: mockType(index),
    lastUpdate: '12/08/2025',
    status: index % 3 === 0 ? 'Incompleta' : 'Completa',
  })),
)

function mockDiagnosis(index) {
  const list = [
    'Hipertensão',
    'Asma',
    'Diabetes Tipo 2',
    'Enxaqueca',
    'Otite Média',
    'Gastrite',
    'Artrite',
    'Ansiedade',
    'Alergia',
    'Insônia',
    'Catarata',
    'Sinusite',
  ]
  return list[index % list.length]
}

function mockType(index) {
  const list = ['Clínica Geral', 'Pediátrica', 'Geriátrica']
  return list[index % list.length]
}

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'patientName', label: 'Paciente', field: 'patientName', align: 'left' },
  { name: 'diagnosis', label: 'Último Diagnóstico', field: 'diagnosis', align: 'left' },
  { name: 'type', label: 'Tipo de Anamnese', field: 'type', align: 'left' },
  { name: 'lastUpdate', label: 'Última Atualização', field: 'lastUpdate', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'left' },
]

const handleTableAction = (event) => {
  if (event === 'respond') {
    if (patientDialogRef.value) {
      patientDialogRef.value.openDialog({
        context: 'prontuario',
      })
    }
  }

  if (event === 'filter') {
    console.log('Filtros clicado')
  }
}

const handleLineAction = ({ event, row }) => {
  if (event === 'view') {
    console.log('Detalhar prontuário clicado:', row)
    if (patientDialogRef.value) {
      patientDialogRef.value.openDialog({
        context: 'prontuario',
        patientId: row.id,
      })
    }
  }
  if (event === 'edit') {
    console.log('Editar prontuário clicado:', row)
  }
  if (event === 'delete') {
    console.log('Excluir prontuário clicado:', row)
  }
}
</script>
