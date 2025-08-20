<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Profissionais"
      description="Gerencie os profissionais disponíveis no sistema"
    />

    <div class="row q-gutter-md">
      <CardBase class="col" title="Resumo" icon="info" collapsible>
        <template #actions>
          <q-btn glossy color="secondary" icon="add"
            ><q-tooltip
              ><span class="text-subtitle2">Adicionar Profissional</span></q-tooltip
            ></q-btn
          >
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

    <CardBase title="Profissionais" icon="search"></CardBase>
  </q-page>
</template>
