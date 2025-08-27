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
        { icon: 'add', label: 'Expontâneo', event: 'add', alert: 'Extra Agenda' },
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
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useResponsiveText } from 'src/composables/useResponsiveText'

const { responsiveText } = useResponsiveText()

const patientRecords = ref([
  {
    id: 1,
    patientName: 'João Silva',
    type: 'Clínica Geral',
    lastUpdate: '12/08/2025',
    diagnosis: 'Hipertensão',
    status: 'Completa',
  },
  {
    id: 2,
    patientName: 'Ana Costa',
    type: 'Pediátrica',
    lastUpdate: '11/08/2025',
    diagnosis: 'Asma',
    status: 'Completa',
  },
  {
    id: 3,
    patientName: 'Carlos Lima',
    type: 'Geriátrica',
    lastUpdate: '10/08/2025',
    diagnosis: 'Diabetes Tipo 2',
    status: 'Incompleta',
  },
  {
    id: 4,
    patientName: 'Maria Souza',
    type: 'Clínica Geral',
    lastUpdate: '09/08/2025',
    diagnosis: 'Enxaqueca',
    status: 'Completa',
  },
  {
    id: 5,
    patientName: 'Pedro Rocha',
    type: 'Pediátrica',
    lastUpdate: '08/08/2025',
    diagnosis: 'Otite Média',
    status: 'Completa',
  },
  {
    id: 6,
    patientName: 'Luiza Fernandes',
    type: 'Clínica Geral',
    lastUpdate: '07/08/2025',
    diagnosis: 'Gastrite',
    status: 'Completa',
  },
  {
    id: 7,
    patientName: 'Ricardo Alves',
    type: 'Geriátrica',
    lastUpdate: '06/08/2025',
    diagnosis: 'Artrite',
    status: 'Completa',
  },
  {
    id: 8,
    patientName: 'Carla Mendes',
    type: 'Clínica Geral',
    lastUpdate: '05/08/2025',
    diagnosis: 'Ansiedade',
    status: 'Incompleta',
  },
  {
    id: 9,
    patientName: 'Bruno Santos',
    type: 'Pediátrica',
    lastUpdate: '04/08/2025',
    diagnosis: 'Alergia',
    status: 'Completa',
  },
  {
    id: 10,
    patientName: 'Fernanda Lima',
    type: 'Clínica Geral',
    lastUpdate: '03/08/2025',
    diagnosis: 'Insônia',
    status: 'Completa',
  },
  {
    id: 11,
    patientName: 'Lucas Pereira',
    type: 'Geriátrica',
    lastUpdate: '02/08/2025',
    diagnosis: 'Catarata',
    status: 'Completa',
  },
  {
    id: 12,
    patientName: 'Mariana Rocha',
    type: 'Clínica Geral',
    lastUpdate: '01/08/2025',
    diagnosis: 'Sinusite',
    status: 'Incompleta',
  },
])

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'patientName', label: 'Paciente', field: 'patientName', align: 'left' },
  { name: 'diagnosis', label: 'Último Diagnóstico', field: 'diagnosis', align: 'left' },
  { name: 'type', label: 'Tipo de Anamnese', field: 'type', align: 'left' },
  { name: 'lastUpdate', label: 'Última Atualização', field: 'lastUpdate', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'left' },
]

const handleTableAction = (event) => {
  if (event === 'add') {
    console.log('Adicionar prontuário clicado')
  }
  if (event === 'filter') {
    console.log('Filtros clicado')
  }
}

const handleLineAction = ({ event, row }) => {
  if (event === 'view') {
    console.log('Detalhar prontuário clicado:', row)
  }
  if (event === 'edit') {
    console.log('Editar prontuário clicado:', row)
  }
  if (event === 'delete') {
    console.log('Excluir prontuário clicado:', row)
  }
}
</script>
