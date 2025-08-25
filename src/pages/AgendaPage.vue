<template>
  <q-page class="q-pa-md">
    <TitlePage title="Agenda" description="Gerencie suas consultas e horários de forma eficiente" />
    <div class="row q-gutter-md">
      <CardBase class="col" title="Geral" icon="calendar_month" collapsible>
        <template #header-actions>
          <q-btn-group glossy push>
            <q-btn color="secondary" icon="chevron_left" @click.stop="moveMonth(-1)">
              <q-tooltip><span class="text-subtitle2">Anterior</span></q-tooltip>
            </q-btn>
            <q-btn color="secondary" icon="today" @click.stop="goToToday()">
              <q-tooltip><span class="text-subtitle2">Vigente</span></q-tooltip>
            </q-btn>
            <q-btn color="secondary" icon="chevron_right" @click.stop="moveMonth(1)">
              <q-tooltip><span class="text-subtitle2">Posterior</span></q-tooltip>
            </q-btn>
          </q-btn-group>
        </template>
        <div class="row q-gutter-md">
          <q-card class="col">
            <q-calendar-month
              ref="calendarMonth"
              v-model="selectedDate"
              animated
              short-weekday-label
              bordered
              locale="pt-BR"
              :weekdays="[0, 1, 2, 3, 4, 5, 6]"
              :day-min-height="80"
            >
              <template #day="{ scope }">
                <div
                  :class="{
                    'bg-blue-grey-1': isToday(scope.timestamp.date),
                    'cursor-pointer': true,
                  }"
                  class="q-pa-xs"
                  @click="selectDay(scope.timestamp.date)"
                >
                  <div class="column q-gutter-xs">
                    <q-badge
                      :outline="statusConfig[group.status].label === 'Efetivada'"
                      v-for="group in getEventsGrouped(scope.timestamp.date)"
                      :key="group.status"
                      :color="statusConfig[group.status]?.color"
                      class="justify-center"
                    >
                      <span v-if="group.type === 'full-day'">
                        {{ statusConfig[group.status].label }}
                      </span>
                      <span v-else>
                        {{ group.count }}
                      </span>
                    </q-badge>
                  </div>
                </div>
              </template>
            </q-calendar-month>
          </q-card>
          <q-card class="col-auto">
            <q-card-section>
              <div class="text-subtitle1 text-weight-light">Legenda</div>
              <q-separator class="q-mb-sm" />
              <div class="column q-gutter-sm">
                <q-badge
                  v-for="(config, status) in statusConfig"
                  :outline="config.label === 'Efetivada'"
                  :key="status"
                  :color="config.color"
                  rounded
                  class="justify-center"
                >
                  <span class="text-subtitle2">{{ config.label }}</span>
                </q-badge>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </CardBase>
    </div>

    <TableList
      v-if="filteredDailyEvents.length > 0"
      icon="event"
      :label-search="'Paciente ou Profissional'"
      :subtitle="`Eventos em ${formatDateBR(selectedDate)}`"
      :rows="filteredDailyEvents"
      :columns="columns"
      :actions="[
        { icon: 'add', label: 'Adicionar', event: 'add' },
        { icon: 'filter_alt', label: 'Filtros', event: 'filter' },
      ]"
      :row-actions="[
        { icon: 'done', label: 'Atender', event: 'respond' },
        { icon: 'edit', label: 'Editar', event: 'edit' },
        { icon: 'delete', label: 'Excluir', event: 'delete' },
      ]"
      @action="handleTableAction"
      @rowAction="handleLineAction"
    />
    <q-card v-else class="text-center text-grey-6 q-mt-md q-pt-md q-pb-xs">
      <q-icon name="event_busy" size="md" />
      <p v-if="hasFullDayEvent(selectedDate)">
        {{ statusConfig[getEventType(selectedDate).status].label }}
      </p>
      <p v-else>Nenhum evento agendado para este dia.</p>
    </q-card>
    <PatientRecordsDialog ref="patientDialogRef" />
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { format, eachDayOfInterval, getDay, isBefore, isToday as isTodayFns } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'
import PatientRecordsDialog from './PatientRecordsDialog.vue'

// 📌 Estado principal
const selectedDate = ref(format(new Date(), 'yyyy-MM-dd'))
const searchQuery = ref('')
const isAdminOrDev = ref(true)
const calendarMonth = ref(null)
const events = ref([])
const patientDialogRef = ref(null)

// 📌 Configuração centralizada dos status
const statusConfig = {
  // Status de Consultas (slots)
  efetivada: {
    label: 'Efetivada',
    color: 'teal-9',
    statusEvent: 'Não Aplica',
  },
  confirmada: {
    label: 'Confirmada',
    color: 'teal-9',
    statusEvent: 'A Consultar',
  },
  prevista: {
    label: 'Prevista',
    color: 'teal-5',
    statusEvent: 'A Confirmar',
  },
  // Status de Ausência (full-day)
  folga: {
    label: 'Folga',
    color: 'grey',
    statusEvent: '',
  },
  ferias: {
    label: 'Férias',
    color: 'purple',
    statusEvent: '',
  },
  afastamento: {
    label: 'Ausencia',
    color: 'red',
    statusEvent: '',
  },
}

// 📌 Utilitário
const formatDateBR = (dateStr) => {
  return format(new Date(dateStr), 'dd/MM/yyyy', { locale: ptBR })
}

// 📌 Geração de eventos fake
function generateEvents() {
  const start = new Date(2025, 5, 1)
  const end = new Date(2025, 9, 31)
  const days = eachDayOfInterval({ start, end })
  let idCounter = 1
  const allGeneratedEvents = []

  const slots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  days.forEach((day) => {
    const dateStr = format(day, 'yyyy-MM-dd')
    const dow = getDay(day)

    // 1. Eventos de full-day
    if (day.getMonth() === 5) {
      allGeneratedEvents.push({
        id: idCounter++,
        date: dateStr,
        title: statusConfig.ferias.label,
        professionalName: 'Dr. Carlos Mendes',
        status: 'ferias',
        eventType: 'full-day',
      })
      return
    }
    if (dow === 0 || dow === 6) {
      allGeneratedEvents.push({
        id: idCounter++,
        date: dateStr,
        title: statusConfig.folga.label,
        professionalName: 'Dr. Carlos Mendes',
        status: 'folga',
        eventType: 'full-day',
      })
      return
    }

    // 2. Slots de consultas (dias sem full-day)
    const consultas = Math.floor(Math.random() * 9)
    const shuffled = [...slots].sort(() => Math.random() - 0.5)
    const now = new Date()

    shuffled.forEach((time, index) => {
      let status = 'prevista'
      let title = statusConfig.prevista.label
      let patientName = `Paciente ${idCounter}`

      const eventDateTime = new Date(`${dateStr}T${time}:00`)

      if (isBefore(eventDateTime, now)) {
        // Passado → tudo efetivada
        status = 'efetivada'
        title = statusConfig.efetivada.label
      } else if (isTodayFns(eventDateTime)) {
        // Presente → mistura confirmada e prevista
        if (index < consultas) {
          status = 'confirmada'
          title = statusConfig.confirmada.label
        } else {
          status = 'prevista'
          title = statusConfig.prevista.label
        }
      } else {
        // Futuro → prevista
        status = 'prevista'
        title = statusConfig.prevista.label
      }

      allGeneratedEvents.push({
        id: idCounter++,
        date: dateStr,
        time,
        title,
        patientName,
        professionalName: 'Dr. Carlos Mendes',
        status,
        eventType: 'slot',
      })
    })
  })

  events.value = allGeneratedEvents
}

generateEvents()

// 📌 Colunas da tabela
const columns = [
  { name: 'time', label: 'Hora', field: 'time', align: 'left' },
  { name: 'title', label: 'Consulta', field: 'title', align: 'left' },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    format: (val) => statusConfig[val]?.statusEvent || val,
  },
  { name: 'patientName', label: 'Paciente', field: 'patientName', align: 'left' },
  { name: 'professionalName', label: 'Profissional', field: 'professionalName', align: 'left' },
]

// 📌 Funções auxiliares
const selectDay = (date) => {
  selectedDate.value = date
}

const getEvents = (date) => {
  return events.value.filter((e) => e.date === date)
}

const isToday = (date) => {
  return date === format(new Date(), 'yyyy-MM-dd')
}

const hasFullDayEvent = (date) => {
  return getEvents(date).some((e) => e.eventType === 'full-day')
}

const getEventType = (date) => {
  return getEvents(date).find((e) => e.eventType === 'full-day')
}

const dailyEvents = computed(() => {
  return events.value
    .filter((e) => e.date === selectedDate.value && e.eventType === 'slot')
    .sort((a, b) => a.time.localeCompare(b.time))
})

const filteredDailyEvents = ref([])

watch(
  [dailyEvents, searchQuery, isAdminOrDev],
  () => {
    if (!isAdminOrDev.value) {
      const loggedInProfessionalName = 'Dr. Carlos Mendes'
      filteredDailyEvents.value = dailyEvents.value.filter(
        (event) => event.professionalName === loggedInProfessionalName,
      )
    } else {
      if (searchQuery.value) {
        filteredDailyEvents.value = dailyEvents.value.filter(
          (event) =>
            event.patientName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            event.professionalName.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )
      } else {
        filteredDailyEvents.value = dailyEvents.value
      }
    }
  },
  { immediate: true },
)

// 📌 Navegação do calendário
const goToToday = () => {
  if (calendarMonth.value) {
    calendarMonth.value.moveToToday()
  }
}

const moveMonth = (val) => {
  if (calendarMonth.value) {
    calendarMonth.value.move(val)
  }
}

// 📌 Ações
const handleTableAction = (event) => {
  if (event === 'add') {
    console.log('Adicionar clicado')
  }
  if (event === 'filter') {
    console.log('Filtros clicado')
  }
}

const handleLineAction = ({ event, row }) => {
  if (event === 'respond') {
    console.log('Responder clicado para a linha:', row)
    // Chamando o diálogo e passando os dados do paciente
    if (patientDialogRef.value) {
      patientDialogRef.value.openDialog({
        patient: {
          name: row.patientName,
          age: 30,
          condition: 'Estável',
          last_appointment: row.date,
        },
        history: [], // aqui você pode passar histórico real
        evolution: [],
        prescriptions: [],
        exams: [],
      })
    }
  }
  if (event === 'edit') {
    console.log('Editar clicado para a linha:', row)
  }
  if (event === 'delete') {
    console.log('Deletar clicado para a linha:', row)
  }
}

// 📌 Agrupador de eventos por status
const getEventsGrouped = (date) => {
  const allEventsForDay = getEvents(date)
  const fullDayEvent = allEventsForDay.find((e) => e.eventType === 'full-day')

  // Se houver um evento de dia inteiro (folga, férias, etc.), exiba apenas ele.
  if (fullDayEvent) {
    return [
      {
        status: fullDayEvent.status,
        type: 'full-day',
        label: statusConfig[fullDayEvent.status].label,
      },
    ]
  }

  // Caso contrário, agrupe e conte os eventos de consulta (slots).
  const grouped = {}
  const slotEvents = allEventsForDay.filter((e) => e.eventType === 'slot')

  for (const e of slotEvents) {
    if (!grouped[e.status]) {
      grouped[e.status] = { status: e.status, count: 0, type: 'slot' }
    }
    grouped[e.status].count++
  }
  return Object.values(grouped).sort((a, b) => {
    // Ordem de exibição
    const order = ['efetivada', 'confirmada', 'prevista']
    return order.indexOf(a.status) - order.indexOf(b.status)
  })
}
</script>

<style scoped>
.full-width {
  display: block;
  width: 100%;
}
</style>
