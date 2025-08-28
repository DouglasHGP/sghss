<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Meu Espaço"
      description="Gerencie suas prescrições médicas e veja o histórico de medicamentos"
    />

    <div class="row q-gutter-md" :class="{ 'q-mr-md': $q.platform.is.mobile }">
      <CardBase class="col" :title="patientData.name" :subtitle="true" icon="person">
        <template #subtitle-prepend>
          <div
            class="text-weight-light"
            :class="{
              'text-h6 ': !$q.platform.is.mobile,
              'text-subtitle2 q-mt-xs': $q.platform.is.mobile,
            }"
          >
            Idade: {{ patientAge }}
          </div>
        </template>
        <template #actions>
          <ActionsDropdown
            :actions="[
              {
                icon: 'edit',
                label: 'Editar',
                event: 'edit',
                tooltip: 'Editar',
              },
            ]"
            @action="handleTableAction"
          />
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
                >Logradouro: <span class="text-subtitle2">{{ patientData.address }}</span></label
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
              >Observação: <span class="text-subtitle2">{{ patientData.observation }}</span></label
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
            <q-tab name="prescricao" label="Prescrições" icon="history_edu" />
            <q-tab name="exame" label="Exames" icon="science" />
            <q-tab name="declaracao" label="Declarações" icon="description" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="prescricao">
              <q-table
                :rows="patientData.prescriptions"
                :columns="prescriptionColumns"
                row-key="id"
                flat
                bordered
                dense
              >
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props" style="width: 65px">
                    <q-td :props="props" style="width: 65px">
                      <ActionsDropdown
                        :actions="getActions(props.row)"
                        tooltip="Ações"
                        @action="(event) => handleRowAction('prescricao', event, props.row)"
                      />
                    </q-td>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="exame">
              <q-table
                :rows="patientData.exams"
                :columns="examsColumns"
                row-key="id"
                flat
                bordered
                dense
              >
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props" style="width: 65px">
                    <q-td :props="props" style="width: 65px">
                      <ActionsDropdown
                        :actions="getActions(props.row)"
                        tooltip="Ações"
                        @action="(event) => handleRowAction('prescricao', event, props.row)"
                      />
                    </q-td>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="declaracao">
              <q-table
                :rows="patientData.statements"
                :columns="statementsColumns"
                row-key="id"
                flat
                bordered
                dense
              >
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props" style="width: 65px">
                    <q-td :props="props" style="width: 65px">
                      <ActionsDropdown
                        :actions="getActions(props.row)"
                        tooltip="Ações"
                        @action="(event) => handleRowAction('prescricao', event, props.row)"
                      />
                    </q-td>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </CardBase>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAge } from 'src/composables/useAge'
import ActionsDropdown from 'src/components/ActionsDropdown.vue'
import CardBase from 'src/components/CardBase.vue'
import TitlePage from 'src/components/TitlePage.vue'
import { differenceInDays, parse } from 'date-fns'

const tab = ref('prescricao')

const { age: patientAge } = useAge(computed(() => patientData.value.birth_date))

const patientData = ref({
  name: 'João da Silva',
  birth_date: '10/05/1990',
  document: '123.456.789-00',
  registration: '987654',
  phone: '(11) 98765-4321',
  email: 'joao.silva@email.com',
  address: 'Rua das Flores, 123',
  complement: 'Apto 45',
  district: 'Centro',
  city: 'São Paulo',
  state: 'SP',
  observation: 'Paciente com histórico de hipertensão.',
  prescriptions: [
    { id: 1, date: '01/08/2025', item: 'AAS 100mg', instruction: '1 comprimido, 1 vez ao dia.' },
    {
      id: 2,
      date: '15/07/2025',
      item: 'Paracetamol 500mg',
      instruction: '1 comprimido a cada 6 horas, se dor.',
    },
  ],
  exams: [
    { id: 1, date: '05/08/2025', name: 'Hemograma completo', status: 'Concluído' },
    { id: 2, date: '02/08/2025', name: 'Glicemia', status: 'Pendente' },
  ],
  statements: [
    {
      id: 1,
      date: '10/08/2025',
      description: 'Atestado de 3 dias para repouso.',
      professional: 'Dra. Ana Costa',
    },
    {
      id: 2,
      date: '20/07/2025',
      description: 'Declaração para fins de trabalho.',
      professional: 'Dr. Bruno Lima',
    },
  ],
})

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

const statementsColumns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'date', label: 'Data', field: 'date', align: 'left' },
  { name: 'description', label: 'Descrição', field: 'description', align: 'left' },
  { name: 'professional', label: 'Profissional', field: 'professional', align: 'left' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' },
]

const handleRowAction = (tab, event, row) => {
  console.log(`Tab: ${tab}, Ação: ${event}, Linha:`, row)
}

const handleTableAction = (event, row) => {
  console.log(`Ação: ${event}, Linha:`, row)
}

const isRecent = (dateStr) => {
  const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date())
  return differenceInDays(new Date(), parsedDate) <= 30
}

const getActions = (row) => {
  const actions = []
  if (isRecent(row.date)) {
    actions.push({
      icon: 'download',
      label: 'Download',
      event: 'download',
      tooltip: 'Baixar',
    })
  } else {
    actions.push({
      icon: 'block',
      label: 'Expirado',
      event: 'disabled',
      tooltip: 'Documento com mais de 30 dias',
    })
  }
  return actions
}
</script>
