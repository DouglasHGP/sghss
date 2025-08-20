<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Recursos"
      description="Gerencie os recursos hospitalares, como equipamentos e suprimentos médicos."
    />

    <div class="row q-gutter-md">
      <CardBase class="col" title="Resumo" icon="info" collapsible>
        <div class="row q-gutter-md">
          <CardBase class="col" title="Suprimentos e Leitos" icon="medication">
            <q-scroll-area style="height: 200px">
              <div style="width: 98%">
                <div class="q-mb-md">
                  <div class="row justify-between"><span>Antibióticos</span><span>40%</span></div>
                  <q-linear-progress :value="0.4" color="primary" rounded />
                </div>
                <div class="q-mb-md">
                  <div class="row justify-between"><span>Analgésicos</span><span>30%</span></div>
                  <q-linear-progress :value="0.3" color="secondary" rounded />
                </div>
                <div class="q-mb-md">
                  <div class="row justify-between"><span>Vacinas</span><span>30%</span></div>
                  <q-linear-progress :value="0.3" color="accent" rounded />
                </div>
                <div class="q-mb-md">
                  <div class="row justify-between">
                    <span>Bloco Cirúrgico</span><span>45%</span>
                  </div>
                  <q-linear-progress :value="0.45" color="primary" rounded />
                </div>
                <div class="q-mb-md">
                  <div class="row justify-between"><span>Enfermaria</span><span>35%</span></div>
                  <q-linear-progress :value="0.35" color="secondary" rounded />
                </div>
                <div class="q-mb-md">
                  <div class="row justify-between"><span>UTI</span><span>20%</span></div>
                  <q-linear-progress :value="0.2" color="accent" rounded />
                </div>
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
              </div>
            </q-scroll-area>
          </CardBase>

          <CardBase class="col" title="Alertas" icon="warning">
            <q-scroll-area style="height: 200px">
              <q-list bordered separator dense>
                <q-item
                  ><q-item-section avatar
                    ><q-icon name="medication_liquid" color="orange" /></q-item-section
                  ><q-item-section
                    ><q-item-label>Lote vence em 5 dias</q-item-label
                    ><q-item-label caption>Amoxicilina - Lote #224</q-item-label></q-item-section
                  ></q-item
                >
                <q-item
                  ><q-item-section avatar
                    ><q-icon name="local_pharmacy" color="red" /></q-item-section
                  ><q-item-section
                    ><q-item-label>Medicamento em falta</q-item-label
                    ><q-item-label caption>Dipirona 500mg</q-item-label></q-item-section
                  ></q-item
                >
                <q-item
                  ><q-item-section avatar
                    ><q-icon name="inventory_2" color="orange" /></q-item-section
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
            </q-scroll-area>
          </CardBase>
        </div>
      </CardBase>
    </div>
  </q-page>
</template>
