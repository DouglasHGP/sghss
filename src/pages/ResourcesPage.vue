<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Recursos"
      description="Gerencie os recursos hospitalares, como equipamentos e suprimentos médicos."
    />

    <div class="row q-gutter-md">
      <CardBase class="col" title="Resumo" icon="info" collapsible>
        <q-card>
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
            <q-tab name="leitos" label="Leitos" icon="hotel" />
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
                      <div class="row justify-between">
                        <span>Antibióticos</span><span>40%</span>
                      </div>
                      <q-linear-progress :value="0.4" color="teal-9" rounded />
                    </div>
                    <div class="q-mb-md">
                      <div class="row justify-between">
                        <span>Analgésicos</span><span>30%</span>
                      </div>
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
                      <div class="row justify-between">
                        <span>Clínica Médica</span><span>75%</span>
                      </div>
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
      </CardBase>
    </div>

    <TableList
      icon="list"
      :rows="materiais"
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

const tab = ref('materiais')

const materiais = ref([
  // Exemplo de ordem embaralhada
  { id: 1, nome: 'LTM-002', categoria: 'Leito', tipo: 'Motorizada', quantidade: 1 },
  { id: 2, nome: 'Luvas Cirúrgicas', categoria: 'Material', tipo: 'Descartáveis', quantidade: 500 },
  { id: 3, nome: 'Morfina 10mg', categoria: 'Medicamento', tipo: 'Opioide', quantidade: 50 },
  { id: 4, nome: 'LTH-003', categoria: 'Leito', tipo: 'Manual', quantidade: 1 },
  { id: 5, nome: 'Omeprazol 20mg', categoria: 'Medicamento', tipo: 'Gastro', quantidade: 180 },
  { id: 6, nome: 'Algodão', categoria: 'Material', tipo: 'Curativos', quantidade: 300 },
  { id: 7, nome: 'LTM-005', categoria: 'Leito', tipo: 'Motorizada', quantidade: 1 },
  { id: 8, nome: 'Soro Fisiológico', categoria: 'Medicamento', tipo: 'Hidratante', quantidade: 1000 },
  { id: 9, nome: 'Máscaras N95', categoria: 'Material', tipo: 'EPI', quantidade: 200 },
  { id: 10, nome: 'Vacina Antitetânica', categoria: 'Medicamento', tipo: 'Vacina', quantidade: 75 },
  { id: 11, nome: 'Ataduras', categoria: 'Material', tipo: 'Curativos', quantidade: 400 },
  { id: 12, nome: 'Paracetamol 750mg', categoria: 'Medicamento', tipo: 'Analgésico', quantidade: 450 },
  { id: 13, nome: 'LTH-005', categoria: 'Leito', tipo: 'Manual', quantidade: 1 },
  { id: 14, nome: 'Amoxicilina 500mg', categoria: 'Medicamento', tipo: 'Antibiótico', quantidade: 150 },
  { id: 15, nome: 'Bisturis Descartáveis', categoria: 'Material', tipo: 'Instrumentos', quantidade: 100 },
  { id: 16, nome: 'Ibuprofeno 400mg', categoria: 'Medicamento', tipo: 'Analgésico', quantidade: 200 },
  { id: 17, nome: 'LTH-001', categoria: 'Leito', tipo: 'Manual', quantidade: 1 },
  { id: 18, nome: 'Álcool 70%', categoria: 'Material', tipo: 'Higiene', quantidade: 50 },
  { id: 19, nome: 'Dipirona 500mg', categoria: 'Medicamento', tipo: 'Analgésico', quantidade: 300 },
  { id: 20, nome: 'LTM-003', categoria: 'Leito', tipo: 'Motorizada', quantidade: 1 },
  { id: 21, nome: 'Gazes Estéreis', categoria: 'Material', tipo: 'Curativos', quantidade: 250 },
  { id: 22, nome: 'Insulina', categoria: 'Medicamento', tipo: 'Diabetes', quantidade: 60 },
  { id: 23, nome: 'Cefalexina 500mg', categoria: 'Medicamento', tipo: 'Antibiótico', quantidade: 120 },
  { id: 24, nome: 'Seringas 5ml', categoria: 'Material', tipo: 'Insumos', quantidade: 1000 },
  { id: 25, nome: 'Agulhas Hipodérmicas', categoria: 'Material', tipo: 'Insumos', quantidade: 700 },
  { id: 26, nome: 'LTH-004', categoria: 'Leito', tipo: 'Manual', quantidade: 1 },
  { id: 27, nome: 'LTM-004', categoria: 'Leito', tipo: 'Motorizada', quantidade: 1 },
  { id: 28, nome: 'LTH-002', categoria: 'Leito', tipo: 'Manual', quantidade: 1 },
])

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
  { name: 'categoria', label: 'Categoria', field: 'categoria', align: 'center' },
  { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'center' },
  { name: 'quantidade', label: 'Quantidade', field: 'quantidade', align: 'center' },
]

const handleTableAction = (action) => {
  console.log('Ação da tabela:', action)
}

const handleLineAction = ({ action, row }) => {
  console.log('Ação na linha:', action, row)
}
</script>
