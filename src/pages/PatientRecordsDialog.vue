<template>
  <q-dialog v-model="isDialogOpen" persistent>
    <q-card
      class="full-width q-pa-md"
      style="max-width: 900px; max-height: 90vh; overflow-y: auto"
    >
      <TitlePage
        title="Atendimento"
        description="Gerencie os prontuários dos pacientes, incluindo histórico médico, exames e tratamentos."
        @close="handleClose"
        isDialog
      />
      <CardBase class="q-mb-md" title="Dados do Paciente" icon="person">
        <div class="row items-center q-col-gutter-md">
          <div class="col-12 col-md-4">
            <div class="text-caption text-grey-6">Nome</div>
            <div class="text-subtitle1">{{ patientData.name }}</div>
          </div>
          <div class="col-12 col-md-2">
            <div class="text-caption text-grey-6">Idade</div>
            <div class="text-subtitle1">{{ patientData.age }} anos</div>
          </div>
          <div class="col-12 col-md-3">
            <div class="text-caption text-grey-6">Condição</div>
            <q-badge :color="conditionColors[patientData.condition]" class="q-mt-xs text-subtitle1">
              {{ patientData.condition }}
            </q-badge>
          </div>
          <div class="col-12 col-md-3">
            <div class="text-caption text-grey-6">Último Atendimento</div>
            <div class="text-subtitle1">{{ patientData.last_appointment }}</div>
          </div>
        </div>
      </CardBase>
      <q-card flat bordered>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey-7"
          active-color="teal-9"
          indicator-color="teal-9"
          align="justify"
          narrow-indicator
        >
          <q-tab name="historico" label="Histórico de Atendimentos" icon="history" />
          <q-tab name="evolucao" label="Evolução Clínica" icon="notes" />
          <q-tab name="prescricao" label="Prescrições" icon="medical_services" />
          <q-tab name="exames" label="Exames e Resultados" icon="science" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="historico">
            <div class="text-h6">Histórico de Atendimentos</div>
            <q-list bordered separator>
              <q-item v-for="att in historyData" :key="att.id" clickable v-ripple>
                <q-item-section>
                  <q-item-label>{{ att.date }}</q-item-label>
                  <q-item-label caption> {{ att.type }} com {{ att.professional }} </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="chevron_right" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="evolucao">
            <div class="text-h6">Evolução Clínica</div>
            <q-timeline color="teal">
              <q-timeline-entry
                v-for="evol in evolutionData"
                :key="evol.id"
                :title="`Evolução de ${evol.professional}`"
                :subtitle="evol.date"
                :icon="`sym_o_${evol.icon}`"
                :color="evolutionColors[evol.type]"
              >
                <div>{{ evol.description }}</div>
              </q-timeline-entry>
            </q-timeline>
          </q-tab-panel>
          <q-tab-panel name="prescricao">
            <div class="text-h6">Prescrições</div>
            <q-table
              :rows="prescriptionData"
              :columns="prescriptionColumns"
              row-key="id"
              flat
              bordered
              dense
            >
              <template v-slot:body-cell-item="props">
                <q-td :props="props">
                  <q-item-label>{{ props.row.item }}</q-item-label>
                  <q-item-label caption>{{ props.row.instruction }}</q-item-label>
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="exames">
            <div class="text-h6">Exames e Resultados</div>
            <q-list bordered separator>
              <q-item v-for="exam in examsData" :key="exam.id" clickable v-ripple>
                <q-item-section>
                  <q-item-label>{{ exam.name }}</q-item-label>
                  <q-item-label caption>
                    Data: {{ exam.date }} | Status: {{ exam.status }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round icon="download" color="primary" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('historico')

const isDialogOpen = ref(false)

const openDialog = (data) => {
  console.log('Dados recebidos no diálogo:', data)
  isDialogOpen.value = true
}

defineExpose({
  openDialog,
})

const handleClose = () => {
  console.log('Fechando o diálogo')
  isDialogOpen.value = false
}

const patientData = {
  name: 'João da Silva',
  age: 30,
  condition: 'Estável',
  last_appointment: '20/08/2025',
}

const historyData = [
  { id: 1, date: '20/08/2025', type: 'Consulta de Rotina', professional: 'Dr. Carlos Mendes' },
  { id: 2, date: '15/07/2025', type: 'Retorno Pós-operatório', professional: 'Dra. Ana Costa' },
  { id: 3, date: '10/06/2025', type: 'Revisão de Exames', professional: 'Dr. Lucas Pereira' },
]

const evolutionData = [
  {
    id: 1,
    date: '20/08/2025',
    type: 'Melhora',
    icon: 'sentiment_satisfied',
    professional: 'Dr. Carlos Mendes',
    description:
      'Paciente apresentou melhora significativa do quadro clínico. Refere ausência de dores e melhora da mobilidade.',
  },
  {
    id: 2,
    date: '15/07/2025',
    type: 'Alerta',
    icon: 'warning',
    professional: 'Dra. Ana Costa',
    description:
      'Quadro evoluiu com dor e inchaço no tornozelo. Sugerido encaminhamento para ortopedista.',
  },
]

const prescriptionData = [
  { id: 1, date: '20/08/2025', item: 'Dipirona 500mg', instruction: '1 comprimido a cada 6 horas' },
  {
    id: 2,
    date: '20/08/2025',
    item: 'Amoxicilina 500mg',
    instruction: '1 comprimido a cada 8 horas por 7 dias',
  },
]

const examsData = [
  { id: 1, date: '18/08/2025', name: 'Exame de Sangue', status: 'Finalizado' },
  { id: 2, date: '16/07/2025', name: 'Radiografia do Tórax', status: 'Finalizado' },
  { id: 3, date: '05/06/2025', name: 'Ressonância Magnética', status: 'Pendente' },
]

const conditionColors = {
  Estável: 'teal-8',
  Crítico: 'negative',
  Recuperação: 'warning',
}

const evolutionColors = {
  Melhora: 'positive',
  Alerta: 'warning',
  Piora: 'negative',
}

const prescriptionColumns = [
  { name: 'date', label: 'Data', field: 'date', align: 'left' },
  { name: 'item', label: 'Item/Instrução', field: 'item', align: 'left' },
]
</script>

<style scoped>
.full-width {
  display: block;
  width: 100%;
}
</style>
