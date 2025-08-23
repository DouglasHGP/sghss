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
        <q-card class="row justify-around">
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
                <div class="row items-start q-gutter-xs flex-wrap justify-around">
                  <q-badge
                    v-for="group in getEventsGrouped(scope.timestamp.date)"
                    :key="group.status"
                    :color="statusColors[group.status]"
                    class="text-center"
                  >
                    {{ group.sample.title }} #{{ group.count }}
                  </q-badge>
                </div>
              </div>
            </template>
          </q-calendar-month>
        </q-card>
      </CardBase>
    </div>

    <TableList
      v-if="filteredDailyEvents.length > 0"
      icon="event"
      :label-search="'Paciente ou Profissional'"
      :subtitle="`Eventos em ${selectedDate}`"
      :rows="filteredDailyEvents"
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
    <q-card v-else class="text-center text-grey-6 q-mt-md q-pt-md q-pb-xs">
      <q-icon name="event_busy" size="md" />
      <p>Nenhum evento agendado para este dia.</p>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { format, eachDayOfInterval, getDay } from 'date-fns'
import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

const selectedDate = ref(format(new Date(), 'yyyy-MM-dd'))
const searchQuery = ref('')
const isAdminOrDev = ref(true)
const calendarMonth = ref(null)

const events = ref([])

function generateEvents() {
  const start = new Date(2025, 5, 1)
  const end = new Date(2025, 9, 31)

  const days = eachDayOfInterval({ start, end })
  let idCounter = 1

  days.forEach((day) => {
    const dateStr = format(day, 'yyyy-MM-dd')
    const dow = getDay(day)

    if (day.getMonth() === 5) {
      events.value.push({
        id: idCounter++,
        date: dateStr,
        time: '09:00',
        title: 'Férias',
        patientName: '-',
        professionalName: 'Dr. Carlos Mendes',
        status: 'ferias',
      })
      return
    }

    if (dow === 0 || dow === 6) {
      events.value.push({
        id: idCounter++,
        date: dateStr,
        time: '09:00',
        title: 'Folga',
        patientName: '-',
        professionalName: 'Dr. Carlos Mendes',
        status: 'folga',
      })
      return
    }

    if (dow === 5) {
      events.value.push({
        id: idCounter++,
        date: dateStr,
        time: '09:00',
        title: 'Disponibilidade',
        patientName: '-',
        professionalName: 'Dr. Carlos Mendes',
        status: 'disponivel',
      })
      return
    }

    if (dow === 2 || dow === 4) {
      const morningSlots = ['08:00', '09:00', '10:00', '11:00']
      const afternoonSlots = ['14:00', '15:00', '16:00']

      morningSlots.forEach((time) => {
        events.value.push({
          id: idCounter++,
          date: dateStr,
          time,
          title: 'Consulta',
          patientName: `Paciente ${idCounter}`,
          professionalName: 'Dr. Carlos Mendes',
          status: 'marcada',
        })
      })

      afternoonSlots.forEach((time) => {
        events.value.push({
          id: idCounter++,
          date: dateStr,
          time,
          title: 'Consulta',
          patientName: `Paciente ${idCounter}`,
          professionalName: 'Dr. Carlos Mendes',
          status: 'marcada',
        })
      })
    }
  })
}

generateEvents()

const statusColors = {
  disponivel: 'green',
  marcada: 'orange',
  confirmada: 'blue',
  efetivada: 'teal',
  cancelada: 'red',
  folga: 'grey',
  ferias: 'purple',
  afastamento: 'brown',
}

const columns = [
  { name: 'status', label: 'Status', align: 'left', field: 'status' },
  { name: 'time', label: 'Hora', field: 'time', align: 'left' },
  { name: 'title', label: 'Evento', field: 'title', align: 'left' },
  { name: 'patientName', label: 'Paciente', field: 'patientName', align: 'left' },
  { name: 'professionalName', label: 'Profissional', field: 'professionalName', align: 'left' },
]

const selectDay = (date) => {
  selectedDate.value = date
}

const getEvents = (date) => {
  return events.value.filter((e) => e.date === date)
}

const isToday = (date) => {
  return date === format(new Date(), 'yyyy-MM-dd')
}

const dailyEvents = computed(() => {
  return events.value
    .filter((e) => e.date === selectedDate.value)
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

const handleTableAction = (event) => {
  if (event === 'add') {
    console.log('Adicionar clicado')
  }
  if (event === 'filter') {
    console.log('Filtros clicado')
  }
}

const handleLineAction = ({ event, row }) => {
  if (event === 'view') {
    console.log('Visualizar clicado para a linha:', row)
  }
  if (event === 'edit') {
    console.log('Editar clicado para a linha:', row)
  }
  if (event === 'delete') {
    console.log('Deletar clicado para a linha:', row)
  }
}

const getEventsGrouped = (date) => {
  const grouped = {}
  for (const e of getEvents(date)) {
    if (!grouped[e.status]) {
      grouped[e.status] = { status: e.status, count: 0, sample: e }
    }
    grouped[e.status].count++
  }
  return Object.values(grouped)
}
</script>

<style scoped>
.full-width {
  display: block;
  width: 100%;
}
</style>
