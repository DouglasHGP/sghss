<template>
  <q-page class="q-pa-md">
    <TitlePage title="Agenda" description="Gerencie suas consultas e horários de forma eficiente" />

    <div class="row q-gutter-md">
      <CardBase class="col" :title="currentMonthTitle" icon="calendar_month">
        <template #actions>
          <q-btn-group glossy push class="q-mt-xs">
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
              dateType="rounded"
              dateAlign="left"
              short-weekday-label
              bordered
              locale="pt-BR"
              :weekdays="[0, 1, 2, 3, 4, 5, 6]"
              :day-min-height="80"
            >
              <template #day="{ scope }">
                <div
                  :class="{
                    'bg-teal-2': isBeforeToday(scope.timestamp.date),
                    'cursor-pointer': true,
                    'q-py-md': !isToday(scope.timestamp.date),
                  }"
                  @click="selectDay(scope.timestamp.date)"
                >
                  <div class="column justify-around">
                    <q-badge
                      rounded
                      :outline="
                        statusConfig[group.status].label === 'Atendida' ||
                        statusConfig[group.status].label === 'Folga'
                      "
                      v-for="group in getEventsGrouped(scope.timestamp.date)"
                      :key="group.status"
                      :color="statusConfig[group.status]?.color"
                      class="justify-center"
                    >
                      <span
                        v-if="group.type === 'full-day'"
                        class="text-subtitle2"
                        :class="{
                          'q-px-sm': !$q.platform.is.mobile,
                        }"
                      >
                        {{ statusConfig[group.status].label }}
                      </span>
                      <span
                        v-else
                        class="text-subtitle2"
                        :class="{
                          'q-px-md': !$q.platform.is.mobile,
                          'q-px-sm': $q.platform.is.mobile,
                        }"
                      >
                        {{ group.count }}
                      </span>
                      <q-tooltip v-if="group.type === 'slot'">
                        <span class="text-subtitle2">
                          {{ group.count }} {{ statusConfig[group.status].label }}(s)
                        </span>
                      </q-tooltip>
                    </q-badge>
                  </div>
                </div>
              </template>
            </q-calendar-month>
          </q-card>
        </div>
      </CardBase>

      <TableList
        v-if="filteredDailyEvents.length > 0"
        icon="event"
        :class="$q.platform.is.mobile ? 'col-11' : 'col'"
        :label-search="'Paciente ou Profissional'"
        :subtitle="`Data: ${formatDateBR(selectedDate)}`"
        :rows="filteredDailyEvents"
        :columns="columns"
        :actions="[
          { icon: 'add', label: 'Adicionar', event: 'add' },
          { icon: 'filter_alt', label: 'Filtros', event: 'filter' },
        ]"
        :row-actions="rowActions"
        @action="handleTableAction"
        @rowAction="handleLineAction"
      >
        <template #body-cell-title="props">
          <q-td :props="props">
            <q-badge
              :color="statusConfig[props.row.status]?.color"
              :outline="statusConfig[props.row.status].label === 'Atendida'"
              class="q-mr-sm"
              rounded
            >
              {{ statusConfig[props.row.status]?.label }}
            </q-badge>
          </q-td>
        </template>
      </TableList>

      <q-card v-else class="col text-center flex flex-center text-grey-6 q-mt-md q-pt-md q-pb-xs">
        <q-icon name="event_busy" size="md" class="q-mb-md q-mr-md" />
        <p v-if="hasFullDayEvent(selectedDate)">
          {{ statusConfig[getEventType(selectedDate).status].label }}
        </p>
        <p v-else>Nenhum evento agendado para este dia.</p>
      </q-card>
    </div>

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
import { useFormatters } from 'src/composables/useFormatters'
import { patients as patientMocks } from 'src/mocks/patients' // Importa a lista de pacientes
import { professionals as professionalMocks } from 'src/mocks/professionals' // Importa a lista de profissionais

const { formatDateBR } = useFormatters()

// 📌 Estado principal
const selectedDate = ref(format(new Date(), 'yyyy-MM-dd'))
const searchQuery = ref('')
const isAdminOrDev = ref(true)
const calendarMonth = ref(null)
const events = ref([])
const patientDialogRef = ref(null)

// 📌 Adicione esta computed property
const currentMonthTitle = computed(() => {
  if (selectedDate.value) {
    const [year, month, day] = selectedDate.value.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return format(date, 'MMMM', { locale: ptBR }).toUpperCase() + ` / ${year}`
  }
  return 'Geral'
})

// 📌 Configuração centralizada dos status
const statusConfig = {
  atendida: { label: 'Atendida', color: 'teal-9', statusEvent: '- - -' },
  confirmada: { label: 'Confirmada', color: 'teal-9', statusEvent: 'A Consultar' },
  prevista: { label: 'Prevista', color: 'teal-5', statusEvent: 'A Confirmar' },
  folga: { label: 'Folga', color: 'grey', statusEvent: '' },
  ferias: { label: 'Férias', color: 'purple', statusEvent: '' },
  afastamento: { label: 'Ausencia', color: 'red', statusEvent: '' },
}

// 📌 Geração de eventos com dados dos mocks
function generateEvents() {
  const start = new Date(2025, 5, 1)
  const end = new Date(2025, 9, 31)
  const days = eachDayOfInterval({ start, end })
  const allGeneratedEvents = []
  const slots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  let patientIndex = 0
  let professionalIndex = 0

  days.forEach((day) => {
    const dateStr = format(day, 'yyyy-MM-dd')
    const dow = getDay(day)

    // 1. Eventos de full-day
    if (day.getMonth() === 5) {
      const professional = professionalMocks[professionalIndex % professionalMocks.length]
      allGeneratedEvents.push({
        id: `full-day-${allGeneratedEvents.length}`,
        date: dateStr,
        title: statusConfig.ferias.label,
        professionalId: professional.id,
        professionalName: professional.name,
        status: 'ferias',
        eventType: 'full-day',
      })
      professionalIndex++
      return
    }
    if (dow === 0 || dow === 6) {
      const professional = professionalMocks[professionalIndex % professionalMocks.length]
      allGeneratedEvents.push({
        id: `full-day-${allGeneratedEvents.length}`,
        date: dateStr,
        title: statusConfig.folga.label,
        professionalId: professional.id,
        professionalName: professional.name,
        status: 'folga',
        eventType: 'full-day',
      })
      professionalIndex++
      return
    }

    // 2. Slots de consultas (dias sem full-day)
    const consultas = Math.floor(Math.random() * 9)
    const shuffled = [...slots].sort(() => Math.random() - 0.5)
    const now = new Date()

    shuffled.forEach((time, index) => {
      let status = 'prevista'
      const eventDateTime = new Date(`${dateStr}T${time}:00`)

      const patient = patientMocks[patientIndex % patientMocks.length]
      const professional = professionalMocks[professionalIndex % professionalMocks.length]

      if (isTodayFns(eventDateTime)) {
        if (isBefore(eventDateTime, now)) {
          status = 'atendida'
        } else {
          if (index < consultas) {
            status = 'prevista'
          } else {
            status = 'confirmada'
          }
        }
      } else if (isBefore(eventDateTime, now)) {
        status = 'atendida'
      } else {
        status = 'prevista'
      }

      allGeneratedEvents.push({
        id: `slot-${allGeneratedEvents.length}`,
        date: dateStr,
        time,
        title: statusConfig[status].label,
        patientId: patient.id,
        patientName: patient.name,
        professionalId: professional.id,
        professionalName: professional.name,
        status,
        eventType: 'slot',
      })

      patientIndex++
      professionalIndex++
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

// 📌 Actions da tabela
const rowActions = [
  {
    icon: 'done',
    label: 'Confirmar',
    event: 'confirm',
    disabled: (row) => row.status !== 'prevista',
  },
  {
    icon: 'done_all',
    label: 'Atender',
    event: 'respond',
    disabled: (row) => row.status !== 'confirmada',
  },
  {
    icon: 'edit',
    label: 'Editar',
    event: 'edit',
    disabled: (row) => row.status === 'atendida',
  },
  {
    icon: 'delete',
    label: 'Excluir',
    event: 'delete',
    disabled: (row) => row.status === 'atendida',
  },
]

// 📌 Funções auxiliares
const selectDay = (date) => {
  selectedDate.value = date
}

const getEvents = (date) => {
  return events.value.filter((e) => e.date === date)
}

const isBeforeToday = (date) => {
  return date < format(new Date(), 'yyyy-MM-dd')
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
    // Essa lógica precisa ser adaptada para usar os IDs de profissional para filtrar
    if (!isAdminOrDev.value) {
      const loggedInProfessionalId = professionalMocks[0].id // Exemplo: Pega o primeiro profissional do mock
      filteredDailyEvents.value = dailyEvents.value.filter(
        (event) => event.professionalId === loggedInProfessionalId,
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
    // Chama o diálogo para uma demanda espontânea
    if (patientDialogRef.value) {
      patientDialogRef.value.openDialog({ context: 'agenda' })
    }
  }
  if (event === 'filter') {
    console.log('Filtros clicado')
  }
}

const handleLineAction = ({ event, row }) => {
  if (event === 'respond') {
    console.log('Responder clicado para a linha:', row)
    // Chama o diálogo de prontuário, passando o ID do paciente
    if (patientDialogRef.value) {
      patientDialogRef.value.openDialog({
        context: 'agenda',
        patientId: row.patientId, // Passa o ID do paciente do evento
      })
    }
  }

  if (event === 'confirm') {
    console.log('Confirmar clicado:', row)
    const eventToUpdate = events.value.find((e) => e.id === row.id)
    if (eventToUpdate) {
      eventToUpdate.status = 'confirmada'
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

  if (fullDayEvent) {
    return [
      {
        status: fullDayEvent.status,
        type: 'full-day',
        label: statusConfig[fullDayEvent.status].label,
      },
    ]
  }

  const grouped = {}
  const slotEvents = allEventsForDay.filter((e) => e.eventType === 'slot')

  for (const e of slotEvents) {
    if (!grouped[e.status]) {
      grouped[e.status] = { status: e.status, count: 0, type: 'slot' }
    }
    grouped[e.status].count++
  }
  return Object.values(grouped).sort((a, b) => {
    const order = ['atendida', 'confirmada', 'prevista']
    return order.indexOf(a.status) - order.indexOf(b.status)
  })
}
</script>
