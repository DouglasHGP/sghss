<template>
  <q-form @submit="handleSubmit" class="col">
    <CardBase title="Anamnese" :subtitle="true" icon="search">
      <template #subtitle-prepend>
        <div
          class="text-weight-light"
          :class="{
            'text-h6 ': !$q.platform.is.mobile,
            'text-subtitle2 q-mt-xs': $q.platform.is.mobile,
          }"
        >
          Data: {{ formatDateBR(today) }}
        </div>
      </template>
      <q-input
        standout="bg-teal-3 text-teal-9"
        rounded
        v-model="formData.queixaPrincipal"
        type="textarea"
        label="Descreva o principal motivo da consulta"
        hint="Ex: Dor de cabeça recorrente há 2 semanas."
        rows="2"
      />

      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal-3 text-teal-9"
        rounded
        v-model="formData.hda"
        type="textarea"
        label="Descreva detalhadamente a evolução do quadro"
        hint="Ex: Início dos sintomas, duração, características da dor, fatores de melhora/piora, etc."
        rows="2"
      />

      <q-space class="q-mt-md" />

      <div class="row q-mb-md q-col-gutter-xl">
        <div class="col-grow">
          <div class="text-subtitle1 q-mb-sm text-grey-7">Doenças Crônicas</div>
          <q-option-group
            class="text-grey-7"
            v-model="formData.doencasCronicas"
            type="checkbox"
            :options="doencasCronicasOptions"
          />
          <q-input
            standout="bg-teal-3 text-teal-9"
            rounded
            v-if="formData.doencasCronicas.includes('outras') && $q.screen.lt.md"
            v-model="formData.outrasDoencasCronicas"
            type="textarea"
            label="Especifique outras doenças *"
            rows="2"
            class="q-mt-md"
          />
        </div>

        <div
          :class="{
            'col-8 q-gutter-md': !$q.platform.is.mobile,
            'col-grow': $q.screen.lt.md,
          }"
        >
          <div class="text-subtitle1 q-mb-sm text-grey-7">Uso de Substâncias</div>

          <q-input
            standout="bg-teal-3 text-teal-9"
            rounded
            v-model="formData.tabagismo"
            type="textarea"
            label="Tabagismo"
            rows="1"
            class="row"
          />
          <q-input
            standout="bg-teal-3 text-teal-9"
            rounded
            v-model="formData.alcoolismo"
            type="textarea"
            label="Etilismo"
            rows="1"
            class="row"
            :class="{ 'q-mt-md': $q.platform.is.mobile }"
          />
          <q-input
            standout="bg-teal-3 text-teal-9"
            rounded
            v-model="formData.outras_substancias"
            type="textarea"
            label="Outras Substâncias"
            rows="1"
            class="row"
            :class="{ 'q-mt-md': $q.platform.is.mobile }"
          />
        </div>
      </div>

      <q-input
        standout="bg-teal-3 text-teal-9"
        rounded
        v-if="formData.doencasCronicas.includes('outras') && $q.screen.lt.sm"
        v-model="formData.outrasDoencasCronicas"
        type="textarea"
        label="Especifique outras doenças *"
        rows="2"
        class="q-mt-md"
      />

      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal-3 text-teal-9"
        rounded
        v-model="formData.medicamentos"
        type="textarea"
        label="Medicamentos em uso"
        rows="2"
        hint="Ex: Nome do medicamento, dosagem, frequência, duração, etc."
      />
      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal-3 text-teal-9"
        rounded
        v-model="formData.cirurgias"
        type="textarea"
        label="Cirurgias prévias"
        rows="2"
        hint="Ex: Tipo de cirurgia, data, complicações, etc."
      />
      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal-3 text-teal-9"
        rounded
        v-model="formData.alergias"
        type="textarea"
        label="Alergias"
        rows="2"
        hint="Ex: Medicamentos, alimentos, outros materiais, etc."
      />
      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal-3 text-teal-9"
        rounded
        v-model="formData.historiaFamiliar"
        type="textarea"
        label="Histórico de doenças na família"
        rows="2"
        hint="Ex: Doenças hereditárias, condições crônicas, etc."
      />
    </CardBase>

    <q-card-actions :align="$q.platform.is.mobile ? 'center' : 'right'" class="q-px-none">
      <q-btn
        glossy
        outline
        label="Cancelar"
        style="width: 150px"
        type="reset"
        color="secondary"
        class="q-ml-md"
        @click="onReset"
      />
      <q-btn glossy label="Salvar" style="width: 150px" type="submit" color="secondary" />
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useFormatters } from 'src/composables/useFormatters'

const { formatDateBR } = useFormatters()
const today = new Date().toISOString().split('T')[0]

const emit = defineEmits(['close', 'save'])

const formData = ref({
  queixaPrincipal: '',
  hda: '',
  doencasCronicas: [],
  outrasDoencasCronicas: '',
  medicamentos: '',
  cirurgias: '',
  alergias: '',
  tabagismo: '',
  alcoolismo: '',
  outras_substancias: '',
  atividadeFisica: '',
  historiaFamiliar: '',
})

const doencasCronicasOptions = [
  { label: 'Hipertensão Arterial Sistêmica', value: 'has' },
  { label: 'Diabetes Mellitus', value: 'dm' },
  { label: 'Asma', value: 'asma' },
  { label: 'Artrite Reumatoide', value: 'artrite' },
  { label: 'Outras Doenças *', value: 'outras' },
]

const resetForm = () => {
  formData.value = {
    queixaPrincipal: '',
    hda: '',
    doencasCronicas: [],
    outrasDoencasCronicas: '',
    medicamentos: '',
    cirurgias: '',
    alergias: '',
    tabagismo: '',
    alcoolismo: '',
    outras_substancias: '',
    atividadeFisica: '',
    historiaFamiliar: '',
  }
}

const onReset = () => {
  emit('close')
  console.log('Formulário resetado e fechado')
}

const handleSubmit = () => {
  console.log('Anamnese salva:', formData.value)
  emit('save', formData.value)
  resetForm()
  emit('close')
}
</script>
