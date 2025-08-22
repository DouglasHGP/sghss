<template>
  <q-page class="q-pa-md">
    <TitlePage title="Agenda" description="Gerencie suas consultas e horários de forma eficiente" />

    <div class="row q-gutter-md">
      <CardBase class="col" title="Geral" icon="calendar_month" collapsible>
        <template #header-actions>
            <q-btn-group glossy push>
              <q-btn color="secondary" icon="chevron_left" @click.stop="moveMonth(-1)" />
              <q-btn color="secondary" icon="today" @click.stop="goToToday()" />
              <q-btn color="secondary" icon="chevron_right" @click.stop="moveMonth(1)" />
            </q-btn-group>
          </template>
        <q-card class="row justify-around">
          <q-calendar-month
            ref="calendarMonth"
            v-model="selectedDate"
            animated
            bordered
            locale="pt-BR"
            :weekdays="[0, 1, 2, 3, 4, 5, 6]"
            :day-min-height="80"
          >
            <template #day="{ scope }">
              <div class="q-pa-xs">
                <div class="text-caption">{{ scope.timestamp.day }}</div>
                <div v-for="event in getEvents(scope.timestamp.date)" :key="event.id">
                  <q-badge
                    :color="statusColors[event.status]"
                    class="q-mt-xs full-width text-center"
                  >
                    {{ event.title }}
                  </q-badge>
                </div>
              </div>
            </template>
          </q-calendar-month>
        </q-card>
      </CardBase>
    </div>

    <div class="row q-gutter-md q-mt-xs">
      <CardBase class="col-6" title="Minha Semana" icon="event">
        <q-scroll-area style="height: 670px">
          <q-calendar
            v-model="selectedDate"
            view="week"
            locale="pt-BR"
            animated
            shortWeekdayLabel
            bordered
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
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
                <div class="text-caption text-bold">
                  {{ scope.timestamp.dayName.slice(0, 3) }} {{ scope.timestamp.day }}
                </div>
                <div v-for="event in getEvents(scope.timestamp.date)" :key="event.id">
                  <q-badge
                    :color="statusColors[event.status]"
                    class="q-mt-xs full-width text-center"
                  >
                    {{ event.title }}
                  </q-badge>
                </div>
              </div>
            </template>
          </q-calendar>
        </q-scroll-area>
      </CardBase>
      <div class="col-grow q-pt-md" :class="{ 'q-pr-md': $q.platform.is.mobile }">
        <span class="col-grow q-mx-md text-h6 text-weight-light">Eventos para {{ formatDate(selectedDate) }}</span>
        <q-separator inset class="q-mb-md"/>
        <q-input
          v-if="isAdminOrDev"
          standout
          rounded
          v-model="searchQuery"
          label="Buscar por Paciente ou Profissional"
          clearable
          class="q-mb-md"
          @update:model-value="filterEvents"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-table
          v-if="filteredDailyEvents.length > 0"
          :rows="filteredDailyEvents"
          :columns="columns"
          row-key="id"
          flat
          bordered
          dense
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge :color="statusColors[props.row.status]" rounded />
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat round icon="info" @click="showDetails(props.row)" />
            </q-td>
          </template>
        </q-table>
        <div v-else class="text-center text-grey-6 q-mt-xl">
          <q-icon name="event_busy" size="md" />
          <p>Nenhum evento agendado para este dia.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar'
import { QCalendar } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

const selectedDate = ref(format(new Date(), 'yyyy-MM-dd'))
const searchQuery = ref('')
const isAdminOrDev = ref(true)
const calendarMonth = ref(null)

const events = ref([
  {
    id: 1,
    date: '2025/08/21',
    time: '09:00',
    title: 'Consulta de Rotina',
    patientName: 'João da Silva',
    professionalName: 'Dr. Carlos Mendes',
    status: 'marcada',
  },
  {
    id: 2,
    date: '2025/08/21',
    time: '14:30',
    title: 'Retorno Pós-operatório',
    patientName: 'Maria Oliveira',
    professionalName: 'Dra. Ana Costa',
    status: 'confirmada',
  },
  {
    id: 3,
    date: '2025/08/22',
    time: '10:00',
    title: 'Disponibilidade',
    patientName: '-',
    professionalName: 'Dr. Carlos Mendes',
    status: 'disponivel',
  },
  {
    id: 4,
    date: '2025/08/23',
    time: '11:00',
    title: 'Folga',
    patientName: '-',
    professionalName: 'Dr. Carlos Mendes',
    status: 'folga',
  },
  {
    id: 5,
    date: '2025/08/24',
    time: '09:00',
    title: 'Férias',
    patientName: '-',
    professionalName: 'Dr. Carlos Mendes',
    status: 'ferias',
  },
])

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
  { name: 'status', label: ' ', align: 'left', field: 'status' },
  { name: 'time', label: 'Hora', field: 'time', align: 'left' },
  { name: 'title', label: 'Evento', field: 'title', align: 'left' },
  { name: 'patientName', label: 'Paciente', field: 'patientName', align: 'left' },
  { name: 'professionalName', label: 'Profissional', field: 'professionalName', align: 'left' },
  { name: 'actions', label: '', field: 'actions', align: 'right' },
]

const selectDay = (date) => {
  selectedDate.value = date
}

const getEvents = (date) => {
  return events.value.filter((e) => e.date === date.replaceAll('-', '/'))
}

const isToday = (date) => {
  return date === format(new Date(), 'yyyy/MM/dd')
}

const formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'EEEE, dd/MM', { locale: ptBR })
}

const dailyEvents = computed(() => {
  const eventsForDay = events.value.filter(
    (e) => e.date === selectedDate.value.replaceAll('-', '/'),
  )
  return eventsForDay.sort((a, b) => a.time.localeCompare(b.time))
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

const filterEvents = () => {}

const showDetails = (event) => {
  console.log('Detalhes do evento:', event)
}
</script>

<style scoped>
.full-width {
  display: block;
  width: 100%;
}
</style>
