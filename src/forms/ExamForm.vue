<template>
  <q-form @submit="handleSubmit" class="col">
    <CardBase title="Exames" icon="science">
      <q-input
        standout="bg-purple-3 text-purple-9"
        rounded
        v-model="formData.examesSolicitados"
        type="textarea"
        label="Exames solicitados"
        hint="Ex: Exames laboratoriais, imagem, outros complementares."
        rows="2"
      />

      <q-space class="q-mt-md" />

      <q-input
        standout="bg-purple-3 text-purple-9"
        rounded
        v-model="formData.examesRealizados"
        type="textarea"
        label="Exames já realizados"
        hint="Ex: Resultados prévios disponíveis no prontuário."
        rows="2"
      />

      <q-space class="q-mt-md" />

      <q-input
        standout="bg-purple-3 text-purple-9"
        rounded
        v-model="formData.observacoes"
        type="textarea"
        label="Observações adicionais"
        rows="2"
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
        @click="onReset"
      />
      <q-btn glossy label="Salvar" style="width: 150px" type="submit" color="secondary" />
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'save'])

const formData = ref({
  examesSolicitados: '',
  examesRealizados: '',
  observacoes: '',
})

const resetForm = () => {
  formData.value = {
    examesSolicitados: '',
    examesRealizados: '',
    observacoes: '',
  }
}

const onReset = () => {
  emit('close')
  console.log('Formulário de Exames resetado e fechado')
}

const handleSubmit = () => {
  console.log('Exames salvos:', formData.value)
  emit('save', formData.value)
  resetForm()
  emit('close')
}
</script>
