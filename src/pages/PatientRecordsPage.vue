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
            <div :class="[responsiveText()]" class="text-teal">25</div>
            <div class="text-caption">Pediátrica 0-12</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center q-py-xs col">
            <div :class="[responsiveText()]" class="text-teal">96</div>
            <div class="text-caption">Adolescentes 13-17</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center q-py-xs col">
            <div :class="[responsiveText()]" class="text-teal">40</div>
            <div class="text-caption">Adultos 18-59</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center q-py-xs col">
            <div :class="[responsiveText()]" class="text-teal">52</div>
            <div class="text-caption">Idosos 60+</div>
          </q-card-section>
        </q-card>
        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Tipo de Anamnese" icon="search">
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Rotina/Preventiva</span><span>50%</span>
              </div>
              <q-linear-progress :value="0.4" color="teal-9" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Pré-operatório</span><span>25%</span>
              </div>
              <q-linear-progress :value="0.35" color="teal-4" rounded />
            </div>
            <div>
              <div class="row justify-between items-center">
                <span>Pós-operatório</span><span>25%</span>
              </div>
              <q-linear-progress :value="0.25" color="teal-3" rounded />
            </div>
          </CardBase>
          <CardBase class="col" title="Alertas" icon="warning">
            <q-list bordered separator>
              <q-item clickable>
                <q-item-section>
                  <q-item-label>Requereu Declaração de Comparecimento/ Atestado</q-item-label>
                  <q-item-label caption>Paciente: Ana Costa</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-item-label>Só deseja atendimento da Enfermeira</q-item-label>
                  <q-item-label caption>Paciente: Fernanda Lima</q-item-label>
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
        { icon: 'add', label: 'Expontâneo', event: 'add' },
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
import { patientRecords as allPatientRecords } from 'src/mocks/index'
import PatientRecordsDialog from './PatientRecordsDialog.vue'
import { useResponsiveText } from 'src/composables/useResponsiveText'

const { responsiveText } = useResponsiveText()

const patientDialogRef = ref(null)

const patientRecords = ref(allPatientRecords)

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'patientName', label: 'Paciente', field: 'name', align: 'left' },
  { name: 'observation', label: 'Observação', field: 'observation', align: 'left' },
  {
    name: 'type',
    label: 'Tipo de Anamnese',
    field: (row) => row.history[0]?.description || '-',
    align: 'left',
  },
  {
    name: 'lastUpdate',
    label: 'Última Atualização',
    field: (row) => row.history[0]?.date || '-',
    align: 'left',
  }
]

const handleTableAction = (event) => {
  if (event === 'add') {
    if (patientDialogRef.value) {
      patientDialogRef.value.openDialog({
        context: 'expontaneo',
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
        context: 'expontaneo',
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
