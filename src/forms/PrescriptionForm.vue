<template>
  <q-form @submit="handleSubmit" class="col">
    <CardBase title="Prescrição" icon="healing">
      <q-input
        standout="bg-indigo-3 text-indigo-9"
        rounded
        v-model="formData.medicamentos"
        type="textarea"
        label="Medicamentos prescritos"
        hint="Ex: Nome, dosagem, frequência, via de administração, duração."
        rows="2"
      />

      <q-space class="q-mt-md" />

      <q-input
        standout="bg-indigo-3 text-indigo-9"
        rounded
        v-model="formData.cuidados"
        type="textarea"
        label="Cuidados gerais / recomendações"
        hint="Ex: repouso, hidratação, dieta específica."
        rows="2"
      />

      <q-space class="q-mt-md" />

      <q-input
        standout="bg-indigo-3 text-indigo-9"
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
  medicamentos: '',
  cuidados: '',
  observacoes: '',
})

const resetForm = () => {
  formData.value = {
    medicamentos: '',
    cuidados: '',
    observacoes: '',
  }
}

const onReset = () => {
  emit('close')
  console.log('Formulário de Prescrição resetado e fechado')
}

const handleSubmit = () => {
  console.log('Prescrição salva:', formData.value)
  emit('save', formData.value)
  resetForm()
  emit('close')
}
</script>
