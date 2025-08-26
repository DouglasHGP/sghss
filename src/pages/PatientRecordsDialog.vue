<template>
  <q-dialog v-model="isDialogOpen" persistent>
    <q-card
      class="full-width q-pa-md"
      style="overflow-y: auto"
      :style="{ maxWidth: $q.platform.is.mobile ? '100%' : '70vw' }"
    >
      <div>
        <TitlePage
          title="Atendimento"
          description="Gerencie os prontuários dos pacientes, incluindo histórico médico, exames e tratamentos."
          @close="handleClose"
          isDialog
        />
        <div class="row q-gutter-md">
          <CardBase
            class="col"
            :title="patientData.name"
            :subtitle="true"
            icon="person"
            collapsible
          >
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

            <div class="q-gutter-sm">
              <div class="rounded-borders text-teal-9 bg-teal-1 q-pa-sm">
                <div class="row justify-between">
                  <label class="text-subtitle1">
                    Nascimento:
                    <span class="text-subtitle2">{{ patientData.birth_date }}</span>
                  </label>
                  <label class="text-subtitle1"
                    >Documento: <span class="text-subtitle2">{{ patientData.document }}</span>
                  </label>
                  <label class="text-subtitle1"
                    >Matrícula: <span class="text-subtitle2">{{ patientData.registration }}</span>
                  </label>
                </div>

                <div class="row justify-between">
                  <label class="text-subtitle1">
                    Telefone: <span class="text-subtitle2">{{ patientData.phone }}</span>
                  </label>
                  <label class="text-subtitle1"
                    >Email: <span class="text-subtitle2">{{ patientData.email }}</span></label
                  >
                </div>

                <div class="row justify-between">
                  <label class="text-subtitle1"
                    >Logradouro:
                    <span class="text-subtitle2">{{ patientData.address }}</span></label
                  >
                  <label class="text-subtitle1"
                    >Complemento:
                    <span class="text-subtitle2">{{ patientData.complement }}</span></label
                  >
                  <label class="text-subtitle1"
                    >Bairro: <span class="text-subtitle2">{{ patientData.district }}</span></label
                  >
                  <label class="text-subtitle1"
                    >Cidade: <span class="text-subtitle2">{{ patientData.city }}</span></label
                  >
                  <label class="text-subtitle1"
                    >UF: <span class="text-subtitle2">{{ patientData.state }}</span></label
                  >
                </div>

                <label class="text-subtitle1"
                  >Observação:
                  <span class="text-subtitle2">{{ patientData.observation }}</span></label
                >
              </div>
            </div>
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
                <q-tab name="historico" label="Histórico" icon="history" />
                <q-tab name="evolucao" label="Evolução" icon="notes" />
                <q-tab name="prescricao" label="Prescrições" icon="history_edu" />
                <q-tab name="exames" label="Exames e Outros" icon="science" />
              </q-tabs>
              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="historico">
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
                  <div style="border: 1px solid #ddd; padding-left: 20px; padding-right: 20px">
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
                  </div>
                </q-tab-panel>
                <q-tab-panel name="prescricao">
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
          <AnamneseForm @onSave="handleAnamneseSubmit" @close="handleClose" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import AnamneseForm from 'src/forms/AnamneseForm.vue'

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

const handleAnamneseSubmit = (data) => {
  console.log('Dados da anamnese recebidos:', data)
  handleClose()
}

const patientData = {
  name: 'João da Silva',
  age: 30,
  birth_date: '15/05/1995',
  document: '123.456.789-00',
  registration: 'ABC-12345',
  phone: '(11) 98765-4321',
  email: 'joao.silva@email.com',
  address: 'Rua das Flores, 123',
  complement: 'Apto 45',
  district: 'Jardim Primavera',
  city: 'São Paulo',
  state: 'SP',
  observation: 'Paciente com histórico de hipertensão e diabetes tipo 2. Segue tratamento regular.',
}

const historyData = [
  { id: 1, date: '20/08/2025', type: 'Consulta de Rotina', professional: 'Dr. Carlos Mendes' },
  { id: 2, date: '15/07/2025', type: 'Retorno Pós-operatório', professional: 'Dra. Ana Costa' },
  { id: 3, date: '10/06/2025', type: 'Revisão de Exames', professional: 'Dr. Lucas Pereira' },
  { id: 4, date: '05/05/2025', type: 'Primeira Consulta', professional: 'Dr. Lucas Pereira' },
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
  {
    id: 3,
    date: '10/06/2025',
    type: 'Melhora',
    icon: 'sentiment_satisfied',
    professional: 'Dr. Lucas Pereira',
    description:
      'Paciente apresentou melhora após início da medicação. Pressão arterial estável e níveis de glicose controlados.',
  },
  {
    id: 4,
    date: '05/05/2025',
    type: 'Piora',
    icon: 'sentiment_very_dissatisfied',
    professional: 'Dr. Lucas Pereira',
    description:
      'Paciente compareceu com queixa de dores no peito e falta de ar. Iniciado protocolo de exames e medicação de emergência.',
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
  {
    id: 3,
    date: '15/07/2025',
    item: 'Ibuprofeno 400mg',
    instruction: '1 comprimido a cada 8 horas por 3 dias, em caso de dor',
  },
  {
    id: 4,
    date: '10/06/2025',
    item: 'Losartana 50mg',
    instruction: '1 comprimido por dia',
  },
]

const examsData = [
  { id: 1, date: '18/08/2025', name: 'Exame de Sangue', status: 'Finalizado' },
  { id: 2, date: '16/07/2025', name: 'Radiografia do Tórax', status: 'Finalizado' },
  { id: 3, date: '05/06/2025', name: 'Ressonância Magnética', status: 'Pendente' },
  { id: 4, date: '02/05/2025', name: 'Eletrocardiograma', status: 'Finalizado' },
]

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
