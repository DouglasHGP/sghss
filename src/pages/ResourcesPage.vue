<template>
  <q-page padding>
    <TitlePage
      title="Recursos"
      description="Gerencie os recursos hospitalares, como equipamentos e suprimentos médicos."
    />

    <div class="row q-gutter-md" :class="{ 'q-mr-sm q-pr-sm': $q.platform.is.mobile }">
      <CardBase class="col" title="Leitos" icon="hotel" collapsible>
        <template #actions>
          <q-btn glossy color="secondary" icon="add">
            <q-tooltip><span class="text-subtitle2">Adicionar Leito</span></q-tooltip>
          </q-btn>
        </template>
        <div class="row q-gutter-md">
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-primary"
              >
                250
              </div>
              <div class="text-caption">Total</div></q-card-section
            ></q-card
          >
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md, // desktops grandes
                  'text-h4': $q.screen.lt.lg, // médios
                  'text-h6': $q.screen.lt.md, // tablets/celulares
                }"
                class="text-negative"
              >
                180
              </div>
              <div class="text-caption">Ocupados</div></q-card-section
            ></q-card
          >
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-positive"
              >
                60
              </div>
              <div class="text-caption">Disponíveis</div></q-card-section
            ></q-card
          >
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-warning"
              >
                10
              </div>
              <div class="text-caption">Em Manutenção</div></q-card-section
            ></q-card
          >
        </div>

        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Ocupação por Ala" icon="apartment">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility">
                <q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip>
              </q-btn>
            </template>
            <div class="q-mb-md">
              <div class="row justify-between"><span>Clínica Médica</span><span>75%</span></div>
              <q-linear-progress :value="0.75" color="primary" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between"><span>UTI</span><span>90%</span></div>
              <q-linear-progress :value="0.9" color="negative" rounded />
            </div>
            <div>
              <div class="row justify-between"><span>Pediatria</span><span>60%</span></div>
              <q-linear-progress :value="0.6" color="secondary" rounded />
            </div>
          </CardBase>

          <CardBase class="col" title="Alertas" icon="warning">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility">
                <q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip>
              </q-btn>
            </template>
            <q-list bordered separator>
              <q-item
                ><q-item-section avatar><q-icon name="bed" color="orange" /></q-item-section
                ><q-item-section
                  ><q-item-label>Leito UTI bloqueado</q-item-label
                  ><q-item-label caption>Sala 204</q-item-label></q-item-section
                ></q-item
              >
              <q-item
                ><q-item-section avatar><q-icon name="build" color="red" /></q-item-section
                ><q-item-section
                  ><q-item-label>Leito em manutenção</q-item-label
                  ><q-item-label caption>Sala 305</q-item-label></q-item-section
                ></q-item
              >
            </q-list>
          </CardBase>
        </div>
      </CardBase>
    </div>
    <div class="row q-gutter-md q-mt-xs" :class="{ 'q-mr-sm q-pr-sm': $q.platform.is.mobile }">
      <CardBase class="col" title="Medicamentos" icon="medication" collapsible>
        <template #actions>
          <q-btn glossy color="secondary" icon="add">
            <q-tooltip><span class="text-subtitle2">Cadastrar Medicamento</span></q-tooltip>
          </q-btn>
        </template>

        <div class="row q-gutter-md">
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-primary"
              >
                450
              </div>
              <div class="text-caption">Itens Cadastrados</div></q-card-section
            ></q-card
          >
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-positive"
              >
                320
              </div>
              <div class="text-caption">Em Estoque</div></q-card-section
            ></q-card
          >
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-warning"
              >
                25
              </div>
              <div class="text-caption">Próx. ao Vencimento</div></q-card-section
            ></q-card
          >
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-negative"
              >
                12
              </div>
              <div class="text-caption">Em Falta</div></q-card-section
            ></q-card
          >
        </div>

        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Estoque por Categoria" icon="category">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility">
                <q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip>
              </q-btn>
            </template>
            <div class="q-mb-md">
              <div class="row justify-between"><span>Antibióticos</span><span>40%</span></div>
              <q-linear-progress :value="0.4" color="primary" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between"><span>Analgésicos</span><span>30%</span></div>
              <q-linear-progress :value="0.3" color="secondary" rounded />
            </div>
            <div>
              <div class="row justify-between"><span>Vacinas</span><span>30%</span></div>
              <q-linear-progress :value="0.3" color="accent" rounded />
            </div>
          </CardBase>

          <CardBase class="col" title="Alertas" icon="warning">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility">
                <q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip>
              </q-btn>
            </template>
            <q-list bordered separator>
              <q-item
                ><q-item-section avatar
                  ><q-icon name="medication_liquid" color="orange" /></q-item-section
                ><q-item-section
                  ><q-item-label>Lote vence em 5 dias</q-item-label
                  ><q-item-label caption>Amoxicilina - Lote #224</q-item-label></q-item-section
                ></q-item
              >
              <q-item
                ><q-item-section avatar><q-icon name="local_pharmacy" color="red" /></q-item-section
                ><q-item-section
                  ><q-item-label>Medicamento em falta</q-item-label
                  ><q-item-label caption>Dipirona 500mg</q-item-label></q-item-section
                ></q-item
              >
            </q-list>
          </CardBase>
        </div>
      </CardBase>
    </div>
    <div class="row q-gutter-md q-mt-xs" :class="{ 'q-mr-sm q-pr-sm': $q.platform.is.mobile }">
      <CardBase class="col" title="Materiais" icon="inventory" collapsible>
        <template #actions>
          <q-btn glossy color="secondary" icon="add">
            <q-tooltip><span class="text-subtitle2">Adicionar Material</span></q-tooltip>
          </q-btn>
        </template>

        <div class="row q-gutter-md">
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-primary"
              >
                1.250
              </div>
              <div class="text-caption">Itens Cadastrados</div></q-card-section
            ></q-card
          >
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-positive"
              >
                980
              </div>
              <div class="text-caption">Disponíveis</div></q-card-section
            ></q-card
          >
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
            ><q-card-section class="text-center"
              ><div
                :class="{
                  'text-h2': $q.screen.gt.md,
                  'text-h4': $q.screen.lt.lg,
                  'text-h6': $q.screen.lt.md,
                }"
                class="text-warning"
              >
                150
              </div>
              <div class="text-caption">Estoque Crítico</div></q-card-section
            ></q-card
          >
        </div>

        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Consumo por Setor" icon="bar_chart">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility">
                <q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip>
              </q-btn>
            </template>
            <div class="q-mb-md">
              <div class="row justify-between"><span>Bloco Cirúrgico</span><span>45%</span></div>
              <q-linear-progress :value="0.45" color="primary" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between"><span>Enfermaria</span><span>35%</span></div>
              <q-linear-progress :value="0.35" color="secondary" rounded />
            </div>
            <div>
              <div class="row justify-between"><span>UTI</span><span>20%</span></div>
              <q-linear-progress :value="0.2" color="accent" rounded />
            </div>
          </CardBase>

          <CardBase class="col" title="Alertas" icon="warning">
            <template #actions>
              <q-btn flat color="secondary" icon="visibility">
                <q-tooltip><span class="text-subtitle2">Detalhar</span></q-tooltip>
              </q-btn>
            </template>
            <q-list bordered separator>
              <q-item
                ><q-item-section avatar><q-icon name="inventory_2" color="orange" /></q-item-section
                ><q-item-section
                  ><q-item-label>Estoque crítico</q-item-label
                  ><q-item-label caption>Luvas cirúrgicas</q-item-label></q-item-section
                ></q-item
              >
              <q-item
                ><q-item-section avatar><q-icon name="delete_sweep" color="red" /></q-item-section
                ><q-item-section
                  ><q-item-label>Material em falta</q-item-label
                  ><q-item-label caption>Máscaras N95</q-item-label></q-item-section
                ></q-item
              >
            </q-list>
          </CardBase>
        </div>
      </CardBase>
    </div>
  </q-page>
</template>
