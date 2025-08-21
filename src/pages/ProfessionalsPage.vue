<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Profissionais"
      description="Gerencie os profissionais disponíveis no sistema"
    />

    <div class="row q-gutter-md">
      <CardBase class="col" title="Resumo" icon="info" collapsible>
        <q-card class="row justify-around">
          <q-card-section class="text-center">
            <div :class="[responsiveText()]" class="text-teal">128</div>
            <div class="text-caption">Matriculados</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center">
            <div :class="[responsiveText()]" class="text-teal">96</div>
            <div class="text-caption">Disponíveis Hoje</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center">
            <div :class="[responsiveText()]" class="text-negative">12</div>
            <div class="text-caption">Afastados</div>
          </q-card-section>
        </q-card>
        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Função" icon="search">
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Médicos</span><span>40%</span>
              </div>
              <q-linear-progress :value="0.4" color="teal-9" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Enfermeiros</span><span>35%</span>
              </div>
              <q-linear-progress :value="0.35" color="teal-4" rounded />
            </div>
            <div>
              <div class="row justify-between items-center">
                <span>Técnicos</span><span>25%</span>
              </div>
              <q-linear-progress :value="0.25" color="teal-3" rounded />
            </div>
          </CardBase>
          <CardBase class="col" title="Alertas" icon="warning">
            <q-list bordered separator>
              <q-item clickable>
                <q-item-section>
                  <q-item-label>CRM vence em 7 dias</q-item-label>
                  <q-item-label caption>Médico: João Silva</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-item-label>Férias programadas</q-item-label>
                  <q-item-label caption>Enfermeira: Ana Costa</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </CardBase>
        </div>
      </CardBase>
    </div>

    <TableList
      icon="list"
      :rows="professionals"
      :columns="columns"
      :actions="[
        { icon: 'add', label: 'Adicionar', event: 'add' },
        { icon: 'filter_alt', label: 'Filtros', event: 'filter' },
      ]"
      :row-actions="[
        { icon: 'visibility', label: 'Detalhar', event: 'view' },
        { icon: 'edit', label: 'Editar', event: 'edit' },
        { icon: 'delete', label: 'Excluir', event: 'delete' },
      ]"
      @action="handleTableAction"
      @rowAction="handleLineAction"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useResponsiveText } from 'src/composables/useResponsiveText'

const { responsiveText } = useResponsiveText()

const professionals = ref([
  { id: 1, name: 'João Silva', role: 'Médico', status: 'Ativo' },
  { id: 2, name: 'Ana Costa', role: 'Enfermeira', status: 'Ativo' },
  { id: 3, name: 'Carlos Lima', role: 'Técnico', status: 'Afastado' },
  { id: 4, name: 'Maria Souza', role: 'Médica', status: 'Ativo' },
  { id: 5, name: 'Pedro Rocha', role: 'Enfermeiro', status: 'Ativo' },
  { id: 6, name: 'Luiza Fernandes', role: 'Técnica', status: 'Ativo' },
  { id: 7, name: 'Ricardo Alves', role: 'Médico', status: 'Ativo' },
  { id: 8, name: 'Carla Mendes', role: 'Enfermeira', status: 'Afastada' },
  { id: 9, name: 'Bruno Santos', role: 'Técnico', status: 'Ativo' },
  { id: 10, name: 'Fernanda Lima', role: 'Médica', status: 'Ativo' },
  { id: 11, name: 'Lucas Pereira', role: 'Enfermeiro', status: 'Ativo' },
  { id: 12, name: 'Mariana Rocha', role: 'Técnica', status: 'Afastada' },
])

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'name', label: 'Nome', field: 'name', align: 'center' },
  { name: 'role', label: 'Função', field: 'role', align: 'center' },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
]

const handleTableAction = (event) => {
  if (event === 'add') {
    console.log('Adicionar clicado')
  }
  if (event === 'filter') {
    console.log('Filtros clicado')
  }
}

const handleLineAction = ({ event, row }) => {
  if (event === 'view') {
    console.log('Visualizar clicado para a linha:', row)
  }
  if (event === 'edit') {
    console.log('Editar clicado para a linha:', row)
  }
  if (event === 'delete') {
    console.log('Deletar clicado para a linha:', row)
  }
}
</script>
