<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Meu Espaço"
      description="Gerencie suas prescrições médicas e veja o histórico de medicamentos"
    />
  </q-page>

  <div class="row q-gutter-md" :class="{ 'q-mr-md': $q.platform.is.mobile }">
    <CardBase class="col" :title="'temporário'" :subtitle="true" icon="person">
      <template #subtitle-prepend>
        <div
          class="text-weight-light"
          :class="{
            'text-h6 ': !$q.platform.is.mobile,
            'text-subtitle2 q-mt-xs': $q.platform.is.mobile,
          }"
        >
          Idade: temporário
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
              >Logradouro: <span class="text-subtitle2">{{ patientData.address }}</span></label
            >
            <label class="text-subtitle1"
              >Complemento: <span class="text-subtitle2">{{ patientData.complement }}</span></label
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
          <q-tab name="exame" label="Exames e Outros" icon="science" />
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

          <q-tab-panel name="declaracao">
            <q-table
              :rows="patientData.Statements"
              :columns="statementsColumns"
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
                    @action="(event) => handleRowAction('declaracao', event, props.row)"
                  />
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </CardBase>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tab = ref('prescricao')

const patientData = ref({})


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
</script>
