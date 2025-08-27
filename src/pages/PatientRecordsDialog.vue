<template>
  <q-dialog v-model="isDialogOpen" persistent :maximized="$q.platform.is.mobile">
    <q-card
      class="full-width q-pa-md"
      :class="tab === '' || tab === 'evolucao' ? 'q-pb-xl' : ''"
      style="overflow-y: auto"
      :style="!$q.platform.is.mobile ? 'max-width: 150vh' : ''"
    >
      <div>
        <TitlePage
          title="Atendimento"
          description="Gerencie os prontuários dos pacientes, incluindo histórico médico, exames e tratamentos."
          @close="handleClose"
          isDialog
        />
        <div class="row q-gutter-md" :class="{ 'q-mr-md': $q.platform.is.mobile }">
          <CardBase class="col" :title="patientData.name" :subtitle="true" icon="person" selectable>
            <template #select-prepend>
              <div class="col-grow q-ml-md">
                <q-select
                  v-if="context === 'prontuario' && !patientData.id"
                  v-model="patientData.id"
                  :style="!$q.platform.is.mobile ? 'width: 350px' : ''"
                  standout="bg-teal-4 text-white"
                  rounded
                  dense
                  label="Selecione o Paciente"
                  map-options
                  :options="options"
                  emit-value
                  @update:model-value="handleSelectPatient"
                />
              </div>
            </template>
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
                <q-tab name="evolucao" label="Evolução/Histórico" icon="notes" />
                <q-tab name="anamnese" label="Anamnese" icon="search" />
                <q-tab name="prescricao" label="Prescrições" icon="history_edu" />
                <q-tab name="exames" label="Exames e Outros" icon="science" />
              </q-tabs>
              <q-tab-panels v-model="tab" animated>
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

                <q-tab-panel name="anamnese">
                  <q-table
                    :rows="historyData"
                    :columns="historyColumns"
                    row-key="id"
                    flat
                    bordered
                    dense
                  >
                    <template v-slot:body-cell-actions="props">
                      <q-td :props="props" style="width: 65px">
                        <ActionsDropdown
                          :actions="[
                            { icon: 'visibility', label: 'Visualizar', event: 'view' },
                            { icon: 'download', label: 'Download', event: 'download' },
                          ]"
                          tooltip="Ações"
                          @action="(event) => handleRowAction('anamnese', event, props.row)"
                        />
                      </q-td>
                    </template>
                  </q-table>
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
                    <template v-slot:body-cell-actions="props">
                      <q-td :props="props" style="width: 65px">
                        <ActionsDropdown
                          :actions="[
                            { icon: 'visibility', label: 'Visualizar', event: 'view' },
                            { icon: 'download', label: 'Download', event: 'download' },
                          ]"
                          tooltip="Ações"
                          @action="(event) => handleRowAction('prescricao', event, props.row)"
                        />
                      </q-td>
                    </template>
                  </q-table>
                </q-tab-panel>

                <q-tab-panel name="exames">
                  <q-table
                    :rows="examsData"
                    :columns="examsColumns"
                    row-key="id"
                    flat
                    bordered
                    dense
                  >
                    <template v-slot:body-cell-actions="props">
                      <q-td :props="props" style="width: 65px">
                        <ActionsDropdown
                          :actions="[
                            { icon: 'visibility', label: 'Visualizar', event: 'view' },
                            { icon: 'download', label: 'Download', event: 'download' },
                          ]"
                          tooltip="Ações"
                          @action="(event) => handleRowAction('exames', event, props.row)"
                        />
                      </q-td>
                    </template>
                  </q-table>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </CardBase>
        </div>

        <div class="row q-gutter-md">
          <AnamneseForm
            v-show="tab === 'anamnese'"
            @onSave="handleSubmit('anamnese', data)"
            @close="handleClose"
          />
          <PrescriptionForm
            v-show="tab === 'prescricao'"
            @onSave="handleSubmit('prescription', data)"
            @close="handleClose"
          />
          <ExamForm
            v-show="tab === 'exames'"
            @onSave="handleSubmit('exam', data)"
            @close="handleClose"
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { patients } from 'src/mocks/patients'
import AnamneseForm from 'src/forms/AnamneseForm.vue'
import PrescriptionForm from 'src/forms/PrescriptionForm.vue'
import ExamForm from 'src/forms/ExamForm.vue'

const tab = ref('')

const isDialogOpen = ref(false)

const patientData = ref({})

const context = ref('') // agenda - prontuário

const options = computed(() =>
  patients.map((p) => ({
    label: p.name,
    value: p.id,
  })),
)

const openDialog = (payload) => {
  /**
   * payload esperado:
   * {
   *   context: 'agenda' | 'prontuario',
   *   patientId?: string
   * }
   */
  context.value = payload.context
  if (payload.context === 'agenda' && payload.patientId) {
    patientData.value = patients.find((p) => p.id === payload.patientId) || {}
  } else {
    patientData.value = {} // força abrir o select
  }
  isDialogOpen.value = true
}

defineExpose({
  openDialog,
})

const handleClose = () => {
  console.log('Fechando o diálogo')
  isDialogOpen.value = false
  patientData.value = {}
}

const handleSelectPatient = (id) => {
  patientData.value = patients.find((p) => p.id === id) || {}
}

const handleSubmit = (form, data) => {
  console.log(`Formulário salvo (${form}):`, data)
  // Aqui salvar em prescriptionData, examsData ou outro array
  handleClose()
}

const evolutionColors = {
  Melhora: 'positive',
  Alerta: 'warning',
  Piora: 'negative',
}

const handleRowAction = (tab, event, row) => {
  if (event === 'view') {
    console.log('Tab:', tab)
    console.log('Ação Visualizar clicado para a linha:', row)
  } else if (event === 'download') {
    console.log('Tab:', tab)
    console.log('Ação Download clicado para a linha:', row)
  }
}

const historyColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'date', label: 'Data', field: 'date', align: 'left' },
  { name: 'description', label: 'Descrição', field: 'description', align: 'left' },
  { name: 'professional', label: 'Profissional', field: 'professional', align: 'left' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
]

const prescriptionColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'date', label: 'Data', field: 'date', align: 'left' },
  { name: 'item', label: 'Item', field: 'item', align: 'left' },
  { name: 'instruction', label: 'Instrução', field: 'instruction', align: 'left' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
]

const examsColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'date', label: 'Data', field: 'date', align: 'left' },
  { name: 'name', label: 'Exame', field: 'name', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'left' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
]

const historyData = [
  {
    id: '',
    date: '',
    description: '',
    professional: '',
  },
]

const evolutionData = [
  {
    id: '',
    date: '',
    description: '',
    professional: '',
  },
]

const prescriptionData = [
  {
    id: '',
    date: '',
    description: '',
    professional: '',
  },
]

const examsData = [
  {
    id: '',
    date: '',
    description: '',
    professional: '',
  },
]
</script>
