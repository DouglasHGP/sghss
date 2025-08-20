<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Profissionais"
      description="Gerencie os profissionais disponíveis no sistema"
    />

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
                128
              </div>
              <div class="text-caption">Matriculados</div>
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
                class="text-primary"
              >
                96
              </div>
              <div class="text-caption">Disponíveis Hoje</div>
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
                class="text-negative"
              >
                12
              </div>
              <div class="text-caption">Afastados</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Especialidades" icon="search">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility"
                ><q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip></q-btn
              >
            </template>
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Médicos</span><span>40%</span>
              </div>
              <q-linear-progress :value="0.4" color="primary" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Enfermeiros</span><span>35%</span>
              </div>
              <q-linear-progress :value="0.35" color="secondary" rounded />
            </div>
            <div>
              <div class="row justify-between items-center">
                <span>Técnicos</span><span>25%</span>
              </div>
              <q-linear-progress :value="0.25" color="accent" rounded />
            </div>
          </CardBase>
          <CardBase class="col" title="Alertas" icon="warning">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility"
                ><q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip></q-btn
              >
            </template>
            <q-list bordered separator>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="warning" color="orange" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>CRM vence em 7 dias</q-item-label>
                  <q-item-label caption>Médico: João Silva</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="event" color="red" />
                </q-item-section>
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

    <CardBase title="Lista" icon="list" searchable>
      <template #filters-prepend>
        <q-input
          :style="!$q.platform.is.mobile ? 'width: 350px' : ''"
          dense
          standout="bg-teal-4 text-white"
          rounded
          label="Buscar"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="search" />
          </template>
        </q-input>
      </template>
      <template #actions>
        <ActionsDropdown
          :actions="[
            { icon: 'add', label: 'Adicionar', event: 'add' },
            { icon: 'filter_alt', label: 'Filtros', event: 'filter' }
          ]"
          tooltip="Ações"
          @action="handleAction"
        />
      </template>
      <q-table
        :rows="[
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
        ]"
        :columns="[
          { name: 'id', label: 'ID', field: 'id', align: 'left' },
          { name: 'name', label: 'Nome', field: 'name', align: 'left' },
          { name: 'role', label: 'Função', field: 'role', align: 'left' },
          { name: 'status', label: 'Status', field: 'status', align: 'center' },
        ]"
        row-key="name"
        flat
        bordered
        dense
        :rows-per-page-options="[10, 15, 20]"
      ></q-table>
    </CardBase>
  </q-page>
</template>
<script>
export default {
  setup() {
    return {}
  },
  methods: {
    handleAction(event) {
      if (event === 'add') {
        console.log('Adicionar clicado')
      }
      if (event === 'filter') {
        console.log('Filtros clicado')
      }
    },
  },
}
</script>
