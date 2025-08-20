<template>
  <q-page class="q-pa-md">
    <TitlePage title="Pacientes" description="Gerencie os pacientes e mapeie-os" />

    <div class="row q-gutter-md">
      <CardBase class="col" title="Resumo" icon="info" collapsible>
        <div class="row q-gutter-md">
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-primary"
              >
                4.523
              </div>
              <div class="text-caption">Cadastrados</div>
            </q-card-section>
          </q-card>
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-positive"
              >
                128
              </div>
              <div class="text-caption">Novos no Mês</div>
            </q-card-section>
          </q-card>
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-secondary"
              >
                56
              </div>
              <div class="text-caption">Consultas Agendadas</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Perfil Demográfico" icon="pie_chart">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility">
                <q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip>
              </q-btn>
            </template>
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Crianças</span><span>15%</span>
              </div>
              <q-linear-progress :value="0.15" color="info" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Adultos</span><span>55%</span>
              </div>
              <q-linear-progress :value="0.55" color="primary" rounded />
            </div>
            <div>
              <div class="row justify-between items-center">
                <span>Idosos</span><span>30%</span>
              </div>
              <q-linear-progress :value="0.3" color="orange" rounded />
            </div>
          </CardBase>
          <CardBase class="col" title="Alertas" icon="warning">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility">
                <q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip>
              </q-btn>
            </template>
            <q-list bordered separator>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="priority_high" color="red" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Paciente crítico em UTI</q-item-label>
                  <q-item-label caption>José da Silva</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="assignment_late" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Exame pendente</q-item-label>
                  <q-item-label caption>Maria Souza</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </CardBase>
        </div>
      </CardBase>
    </div>

    <TableList
      icon="list"
      :rows="patients"
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

const patients = ref([
  { id: 1, name: 'João da Silva', age: 30, condition: 'Estável' },
  { id: 2, name: 'Maria Oliveira', age: 45, condition: 'Crítico' },
  { id: 3, name: 'Ana Costa', age: 60, condition: 'Recuperação' },
  { id: 4, name: 'Carlos Pereira', age: 50, condition: 'Estável' },
  { id: 5, name: 'Luiza Fernandes', age: 35, condition: 'Estável' },
  { id: 6, name: 'Ricardo Alves', age: 40, condition: 'Estável' },
  { id: 7, name: 'Carla Mendes', age: 55, condition: 'Estável' },
  { id: 8, name: 'Bruno Santos', age: 25, condition: 'Estável' },
  { id: 9, name: 'Fernanda Lima', age: 65, condition: 'Estável' },
  { id: 10, name: 'Pedro Rocha', age: 70, condition: 'Crítico' },
  { id: 11, name: 'Lucas Pereira', age: 75, condition: 'Recuperação' },
  { id: 12, name: 'Mariana Rocha', age: 80, condition: 'Estável' },
])
const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'name', label: 'Nome', field: 'name', align: 'left' },
  { name: 'age', label: 'Idade', field: 'age', align: 'center' },
  { name: 'condition', label: 'Condição', field: 'condition', align: 'center' },
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
