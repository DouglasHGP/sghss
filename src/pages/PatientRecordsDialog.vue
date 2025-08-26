<template>
  <q-dialog v-model="isDialogOpen" persistent>
    <q-card class="full-width q-pa-md" style="overflow-y: auto" :style="{ maxWidth: $q.platform.is.mobile ? '100%' : '70vw' }">
      <div>
        <TitlePage
          title="Atendimento"
          description="Gerencie os prontuários dos pacientes, incluindo histórico médico, exames e tratamentos."
          @close="handleClose"
          isDialog
        />
        <div class="row q-gutter-md">
          <CardBase class="col" :title="patientData.name" :subtitle="true" icon="person" collapsible>
            <template #subtitle-prepend>
              <div
                class="text-weight-light"
                :class="{
                  'text-h6 ': !$q.platform.is.mobile,
                  'text-subtitle2 q-mt-xs': $q.platform.is.mobile,
                }"
              >
                Idade: {{ patientData.age }}
              </div>
            </template>
            <q-card>
              <q-tabs
                v-model="tab"
                :inline-label="!$q.platform.is.mobile"
                dense
                class="text-white bg-teal-3 q-mt-sm"
                active-color="teal-9"
                indicator-color="teal-9"
                align="justify"
                narrow-indicator
              >
                <q-tab name="resumo" label="Resumo" icon="info" />
                <q-tab name="historico" label="Histórico" icon="history" />
                <q-tab name="evolucao" label="Evolução" icon="notes" />
                <q-tab name="prescricao" label="Prescrições" icon="history_edu" />
                <q-tab name="exames" label="Exames e Outros" icon="science" />
              </q-tabs>
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="resumo">
                  <div class="text-h6">Resumo</div>
                  <q-list bordered separator>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Condição</q-item-label>
                        <q-item-label caption
                          ><q-badge
                            class="q-px-sm"
                            rounded
                            :color="conditionColors[patientData.condition]"
                            >{{ patientData.condition }}</q-badge
                          ></q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Telefone</q-item-label>
                        <q-item-label caption>{{ patientData.phone }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Endereço</q-item-label>
                        <q-item-label caption>{{ patientData.address }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-tab-panel>
                <q-tab-panel name="historico">
                  <div class="text-h6">Histórico de Atendimentos</div>
                  <q-list bordered separator>
                    <q-item v-for="att in historyData" :key="att.id" clickable v-ripple>
                      <q-item-section>
                        <q-item-label>{{ att.date }}</q-item-label>
                        <q-item-label caption>
                          {{ att.type }} com {{ att.professional }}
                        </q-item-label>
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
                      :icon="evol.icon"
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
          </CardBase>
        </div>

        <div class="row q-gutter-md">
          <AnamneseForm @onSave="handleAnamneseSubmit" @close="handleClose"/>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import AnamneseForm from 'src/forms/AnamneseForm.vue'

const tab = ref('resumo')

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

const handleAnamneseSubmit = (data) => {
  console.log('Dados da anamnese recebidos:', data)
  handleClose()
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
