<template>
  <q-page padding>
    <TitlePage title="Pacientes" description="Gerencie os pacientes e mapeie-os" />

    <div class="row q-gutter-md" :class="{ 'q-mr-sm q-pr-sm': $q.platform.is.mobile }">
      <CardBase class="col" title="Resumo" icon="info">
        <template #actions>
          <q-btn glossy color="secondary" icon="add">
            <q-tooltip><span class="text-subtitle2">Adicionar Paciente</span></q-tooltip>
          </q-btn>
        </template>
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
  </q-page>
</template>