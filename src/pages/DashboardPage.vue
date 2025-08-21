<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Painel"
      description="Bem-vindo ao painel de controle do Sistema de Gestão Hospitalar"
    />

    <div class="row q-gutter-md" :class="{ 'q-mr-sm q-pr-sm': $q.platform.is.mobile }">
      <CardBase class="col" title="Profissionais" icon="badge">
        <template #actions>
          <q-btn glossy color="secondary" icon="open_in_new" to="/professionals"
            ><q-tooltip
              ><span class="text-subtitle2">Ir para o Módulo Profissional</span></q-tooltip
            ></q-btn
          >
        </template>
        <div class="row q-gutter-md">
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div :class="[responsiveText()]" class="text-primary">128</div>
              <div class="text-caption">Matriculados</div>
            </q-card-section>
          </q-card>
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div :class="[responsiveText()]" class="text-primary">96</div>
              <div class="text-caption">Disponíveis Hoje</div>
            </q-card-section>
          </q-card>
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div :class="[responsiveText()]" class="text-negative">12</div>
              <div class="text-caption">Afastados</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Função" icon="search">
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
      <CardBase class="col" title="Pacientes" icon="group">
        <template #actions>
          <q-btn glossy color="secondary" icon="open_in_new" to="/patients"
            ><q-tooltip
              ><span class="text-subtitle2">Ir para o Módulo Pacientes</span></q-tooltip
            ></q-btn
          >
        </template>
        <div class="row q-gutter-md">
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div :class="[responsiveText()]" class="text-primary">4.523</div>
              <div class="text-caption">Cadastrados</div>
            </q-card-section>
          </q-card>
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div :class="[responsiveText()]" class="text-positive">128</div>
              <div class="text-caption">Novos no Mês</div>
            </q-card-section>
          </q-card>
          <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }">
            <q-card-section class="text-center">
              <div :class="[responsiveText()]" class="text-secondary">56</div>
              <div class="text-caption">Consultas Agendadas</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Perfil" icon="pie_chart">
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

    <CardBase class="col" title="Materiais" icon="inventory" collapsible>
      <template #actions>
        <q-btn glossy color="secondary" icon="open_in_new" to="/resources"
          ><q-tooltip
            ><span class="text-subtitle2">Ir para o Módulo Outros Recursos</span></q-tooltip
          ></q-btn
        >
      </template>

      <div class="row q-gutter-md">
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-primary">1.250</div>
            <div class="text-caption">Itens Cadastrados</div></q-card-section
          ></q-card
        >
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-positive">980</div>
            <div class="text-caption">Disponíveis</div></q-card-section
          ></q-card
        >
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-warning">150</div>
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

    <CardBase class="col" title="Medicamentos" icon="medication" collapsible>
      <template #actions>
        <q-btn glossy color="secondary" icon="open_in_new" to="/resources"
          ><q-tooltip
            ><span class="text-subtitle2">Ir para o Módulo Outros Recursos</span></q-tooltip
          ></q-btn
        >
      </template>

      <div class="row q-gutter-md">
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-primary">450</div>
            <div class="text-caption">Itens Cadastrados</div></q-card-section
          ></q-card
        >
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-positive">320</div>
            <div class="text-caption">Em Estoque</div></q-card-section
          ></q-card
        >
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-warning">25</div>
            <div class="text-caption">Próx. ao Vencimento</div></q-card-section
          ></q-card
        >
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-negative">12</div>
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

    <CardBase class="col" title="Leitos" icon="hotel" collapsible>
      <template #actions>
        <q-btn glossy color="secondary" icon="open_in_new" to="/resources"
          ><q-tooltip
            ><span class="text-subtitle2">Ir para o Módulo Outros Recursos</span></q-tooltip
          ></q-btn
        >
      </template>
      <div class="row q-gutter-md">
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-primary">250</div>
            <div class="text-caption">Total</div></q-card-section
          ></q-card
        >
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-negative">180</div>
            <div class="text-caption">Ocupados</div></q-card-section
          ></q-card
        >
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-positive">60</div>
            <div class="text-caption">Disponíveis</div></q-card-section
          ></q-card
        >
        <q-card class="col" :class="{ 'col-grow': $q.platform.is.mobile }"
          ><q-card-section class="text-center"
            ><div :class="[responsiveText()]" class="text-warning">10</div>
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
  </q-page>
</template>
<script setup>
import { useResponsiveText } from 'src/composables/useResponsiveText'

const { responsiveText } = useResponsiveText()
</script>
