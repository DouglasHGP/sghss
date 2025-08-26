<template>
  <q-form @submit="onSubmit" class="col">
    <CardBase title="Anamnese" icon="search">
      <q-input
        standout="bg-teal text-white"
        rounded
        v-model="formData.queixaPrincipal"
        type="textarea"
        label="Descreva o principal motivo da consulta"
        hint="Ex: Dor de cabeça recorrente há 2 semanas."
        rows="2"
      />

      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal text-white"
        rounded
        v-model="formData.hda"
        type="textarea"
        label="Descreva detalhadamente a evolução do quadro"
        hint="Ex: Início dos sintomas, duração, características da dor, fatores de melhora/piora, sintomas associados, etc."
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
        </div>

        <div class="col-8 q-gutter-md">
          <div class="text-subtitle1 q-mb-sm text-grey-7">Uso de Substâncias</div>

          <q-input
            standout="bg-teal text-white"
            rounded
            v-model="formData.tabagismo"
            type="textarea"
            label="Tabagismo"
            rows="1"
            class="row"
          />
          <q-input
            standout="bg-teal text-white"
            rounded
            v-model="formData.alcoolismo"
            type="textarea"
            label="Etilismo"
            rows="1"
            class="row"
          />
          <q-input
            standout="bg-teal text-white"
            rounded
            v-model="formData.alcoolismo"
            type="textarea"
            label="Outras Substâncias"
            rows="1"
            class="row"
          />
        </div>
      </div>
      <q-input
        standout="bg-teal text-white"
        rounded
        v-if="formData.doencasCronicas.includes('outras')"
        v-model="formData.outrasDoencasCronicas"
        type="textarea"
        label="Especifique outras doenças"
        rows="2"
        class="q-mt-md"
      />

      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal text-white"
        rounded
        v-model="formData.medicamentos"
        type="textarea"
        label="Medicamentos em uso"
        rows="2"
        hint="Ex: Nome do medicamento, dosagem, frequência, duração, etc."
      />
      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal text-white"
        rounded
        v-model="formData.cirurgias"
        type="textarea"
        label="Cirurgias prévias"
        rows="2"
        hint="Ex: Tipo de cirurgia, data, complicações, etc."
      />
      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal text-white"
        rounded
        v-model="formData.alergias"
        type="textarea"
        label="Alergias"
        rows="2"
        hint="Ex: Medicamentos, alimentos, outros materiais, etc."
      />
      <q-space class="q-mt-md" />

      <q-input
        standout="bg-teal text-white"
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
      />
      <q-btn
        glossy
        label="Salvar"
        style="width: 150px"
        type="submit"
        color="secondary"
      />
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import CardBase from 'src/components/CardBase.vue' // Ajuste o caminho conforme a sua estrutura

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
  atividadeFisica: '',
  historiaFamiliar: '',
})

const doencasCronicasOptions = [
  { label: 'Hipertensão Arterial Sistêmica', value: 'has' },
  { label: 'Diabetes Mellitus', value: 'dm' },
  { label: 'Asma', value: 'asma' },
  { label: 'Artrite Reumatoide', value: 'artrite' },
  { label: 'Outras Doenças', value: 'outras' },
]

const onSubmit = () => {
  console.log('Anamnese salva:', formData.value)
  // Aqui você pode adicionar a lógica para enviar os dados para a API
  // ou para o estado global da aplicação.
}
</script>
