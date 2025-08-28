<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Painel"
      description="Bem-vindo ao painel de controle do Sistema de Gestão Hospitalar"
    />

    <div class="row q-gutter-md" :class="{ 'q-mr-sm q-pr-sm': $q.platform.is.mobile }">
      <CardBase class="col" title="Profissionais" icon="badge">
        <template #actions>
          <q-btn flat color="secondary" icon="open_in_new" to="/professionals"
            ><q-tooltip
              ><span class="text-subtitle2">Ir para o Módulo Profissional</span></q-tooltip
            ></q-btn
          >
        </template>
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
      <CardBase class="col" title="Pacientes" icon="group" :collapsible="$q.platform.is.mobile">
        <template #actions>
          <q-btn flat color="secondary" icon="open_in_new" to="/patients"
            ><q-tooltip
              ><span class="text-subtitle2">Ir para o Módulo Pacientes</span></q-tooltip
            ></q-btn
          >
        </template>
        <q-card class="row justify-around">
          <q-card-section class="text-center">
            <div :class="[responsiveText()]" class="text-teal">4.523</div>
            <div class="text-caption">Cadastrados</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center">
            <div :class="[responsiveText()]" class="text-teal">128</div>
            <div class="text-caption">Novos Mês</div>
          </q-card-section>
          <q-separator vertical inset />
          <q-card-section class="text-center">
            <div :class="[responsiveText()]" class="text-teal">56</div>
            <div class="text-caption">Agendados Hoje</div>
          </q-card-section>
        </q-card>
        <div class="row q-gutter-md q-mt-xs">
          <CardBase class="col" title="Perfil" icon="pie_chart">
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Crianças</span><span>15%</span>
              </div>
              <q-linear-progress :value="0.15" color="teal-9" rounded />
            </div>
            <div class="q-mb-md">
              <div class="row justify-between items-center">
                <span>Adultos</span><span>55%</span>
              </div>
              <q-linear-progress :value="0.55" color="teal-4" rounded />
            </div>
            <div>
              <div class="row justify-between items-center">
                <span>Idosos</span><span>30%</span>
              </div>
              <q-linear-progress :value="0.3" color="teal-3" rounded />
            </div>
          </CardBase>
          <CardBase class="col" title="Alertas" icon="warning">
            <q-list bordered separator>
              <q-item clickable>
                <q-item-section>
                  <q-item-label>Paciente crítico em UTI</q-item-label>
                  <q-item-label caption>José da Silva</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
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

    <q-card class="q-mt-md">
      <q-tabs
        v-model="tab"
        :inline-label="!$q.platform.is.mobile"
        dense
        class="text-white bg-teal-3 q-mt-sm"
        active-color="teal-9"
        indicator-color="teal-9"
        align="justify"
        narrow-indicator
      >
        <q-tab name="materiais" label="Materais" icon="inventory" />
        <q-tab name="medicamentos" label="Medicamentos" icon="medication" />
        <q-tab name="leitos" label="Equipamentos e Leitos" icon="home_repair_service" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="materiais" class="q-pa-none">
          <div class="q-mx-md q-mb-md">
            <q-card class="row justify-around q-mt-md">
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-teal">1.250</div>
                <div class="text-caption">Itens</div>
              </q-card-section>
              <q-separator vertical inset />
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-teal">980</div>
                <div class="text-caption">Disponíveis</div>
              </q-card-section>
              <q-separator vertical inset />
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-teal">150</div>
                <div class="text-caption">Críticos</div>
              </q-card-section>
            </q-card>
            <div class="row q-gutter-md q-mt-xs">
              <CardBase class="col" title="Consumo por Setor" icon="bar_chart">
                <div class="q-mb-md">
                  <div class="row justify-between">
                    <span>Bloco Cirúrgico</span><span>45%</span>
                  </div>
                  <q-linear-progress :value="0.45" color="teal-9" rounded />
                </div>
                <div class="q-mb-md">
                  <div class="row justify-between"><span>Enfermaria</span><span>35%</span></div>
                  <q-linear-progress :value="0.35" color="teal-4" rounded />
                </div>
                <div>
                  <div class="row justify-between"><span>UTI</span><span>20%</span></div>
                  <q-linear-progress :value="0.2" color="teal-3" rounded />
                </div>
              </CardBase>
              <CardBase class="col" title="Alertas" icon="warning">
                <q-list bordered separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Estoque crítico</q-item-label>
                      <q-item-label caption>Luvas cirúrgicas</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Material em falta</q-item-label>
                      <q-item-label caption>Máscaras N95</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </CardBase>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="medicamentos" class="q-pa-none">
          <div class="q-mx-md q-mb-md">
            <q-card class="row justify-around q-mt-md">
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-teal">450</div>
                <div class="text-caption">Cadastrados</div>
              </q-card-section>
              <q-separator vertical inset />
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-teal">413</div>
                <div class="text-caption">Disponíveis</div>
              </q-card-section>
              <q-separator vertical inset />
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-orange">25</div>
                <div class="text-caption">A vencer</div>
                <q-tooltip>
                  <span class="text-subtitle2">30 dias ou menos</span>
                </q-tooltip>
              </q-card-section>
              <q-separator vertical inset />
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-red">12</div>
                <div class="text-caption">Ruptura</div>
              </q-card-section>
            </q-card>
            <div class="row q-gutter-md q-mt-xs">
              <CardBase class="col" title="Estoque por Categoria" icon="category">
                <div class="q-mb-md">
                  <div class="row justify-between"><span>Antibióticos</span><span>40%</span></div>
                  <q-linear-progress :value="0.4" color="teal-9" rounded />
                </div>
                <div class="q-mb-md">
                  <div class="row justify-between"><span>Analgésicos</span><span>30%</span></div>
                  <q-linear-progress :value="0.3" color="teal-4" rounded />
                </div>
                <div>
                  <div class="row justify-between"><span>Vacinas</span><span>30%</span></div>
                  <q-linear-progress :value="0.3" color="teal-3" rounded />
                </div>
              </CardBase>
              <CardBase class="col" title="Alertas" icon="warning">
                <q-list bordered separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Lote vence em 5 dias</q-item-label>
                      <q-item-label caption>Amoxicilina - Lote #224</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Medicamento em falta</q-item-label>
                      <q-item-label caption>Dipirona 500mg</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </CardBase>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="leitos" class="q-pa-none">
          <div class="q-mx-md q-mb-md">
            <q-card class="row justify-around q-mt-md">
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-teal">250</div>
                <div class="text-caption">Total</div>
              </q-card-section>
              <q-separator vertical inset />
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-teal">180</div>
                <div class="text-caption">Ocupados</div>
              </q-card-section>
              <q-separator vertical inset />
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-teal">60</div>
                <div class="text-caption">Disponíveis</div>
              </q-card-section>
              <q-separator vertical inset />
              <q-card-section class="text-center">
                <div :class="[responsiveText()]" class="text-red">10</div>
                <div class="text-caption">Manutenção</div>
              </q-card-section>
            </q-card>
            <div class="row q-gutter-md q-mt-xs">
              <CardBase class="col" title="Ocupação por Ala" icon="apartment">
                <div class="q-mb-md">
                  <div class="row justify-between"><span>Clínica Médica</span><span>75%</span></div>
                  <q-linear-progress :value="0.75" color="teal" rounded />
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
                <q-list bordered separator>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Leito UTI bloqueado</q-item-label>
                      <q-item-label caption>Sala #204</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Leito em manutenção</q-item-label>
                      <q-item-label caption>Sala #305</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </CardBase>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script setup>
import { useResponsiveText } from 'src/composables/useResponsiveText'
import { ref } from 'vue'

const { responsiveText } = useResponsiveText()

const tab = ref('materiais')
</script>
