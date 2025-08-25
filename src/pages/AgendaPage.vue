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
                      v-for="group in getEventsGrouped(scope.timestamp.date)"
                      :key="group.status"
                      :color="statusColors[group.status]"
                      class="justify-center"
                    >
                      QTD:[ {{ group.count }} ]
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
                  v-for="(color, status) in statusColors"
                  :key="status"
                  :color="color"
                  rounded
                  class="justify-center"
                >
                  <span class="text-subtitle2">{{ status }}</span>
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
import { ptBR } from 'date-fns/locale'
import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'

const selectedDate = ref(format(new Date(), 'yyyy-MM-dd'))
const searchQuery = ref('')
const isAdminOrDev = ref(true)
const calendarMonth = ref(null)

const events = ref([])

const formatDateBR = (dateStr) => {
  return format(new Date(dateStr), 'dd/MM/yyyy', { locale: ptBR })
}

function generateEvents() {
  const start = new Date(2025, 5, 1)
  const end = new Date(2025, 9, 31)
  const days = eachDayOfInterval({ start, end })
  let idCounter = 1

  const slots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  days.forEach((day) => {
    const dateStr = format(day, 'yyyy-MM-dd')
    const dow = getDay(day)

    // Junho = férias
    if (day.getMonth() === 5) {
      events.value.push({
        id: idCounter++,
        date: dateStr,
        time: '09:00',
        title: 'Férias',
        patientName: '-',
        professionalName: 'Dr. Carlos Mendes',
        status: 'folga', // 'folga' é o status correto para ausências
      })
      return
    }

    // Fins de semana = folga
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

    // Sexta-feira = todas vagas disponíveis
    if (dow === 5) {
      slots.forEach((time) => {
        events.value.push({
          id: idCounter++,
          date: dateStr,
          time,
          title: 'Nenhum',
          patientName: '-',
          professionalName: 'Dr. Carlos Mendes',
          status: 'disponivel',
        })
      })
      return
    }

    // Segunda a quinta -> mix consultas/vagas
    const consultas = Math.floor(Math.random() * 9)
    const shuffled = [...slots].sort(() => Math.random() - 0.5)

    shuffled.forEach((time, index) => {
      if (index < consultas) {
        events.value.push({
          id: idCounter++,
          date: dateStr,
          time,
          title: 'Marcada',
          patientName: `Paciente ${idCounter}`,
          professionalName: 'Dr. Carlos Mendes',
          status: 'a confirmar', // Status: 'a confirmar'
        })
      } else {
        events.value.push({
          id: idCounter++,
          date: dateStr,
          time,
          title: 'Nenhum',
          patientName: '-',
          professionalName: 'Dr. Carlos Mendes',
          status: 'disponivel', // Status: 'disponivel'
        })
      }
    })
  })

  // 🔄 Ajustar status conforme a data/hora
  const hoje = format(new Date(), 'yyyy-MM-dd')

  events.value.forEach((ev) => {
    // se o evento está marcado
    if (ev.title === 'Marcada') {
      if (ev.date < hoje) {
        ev.status = 'não aplica'
        ev.title = 'Efetivada'
      } else if (ev.date === hoje) {
        ev.status = 'aguarda'
        ev.title = 'Confirmada'
      } else {
        ev.status = 'a confirmar'
        ev.title = 'Marcada'
      }
    }
  })
}

generateEvents()

const statusColors = {
  disponivel: 'green',
  'a confirmar': 'orange',
  aguarda: 'blue',
  'não aplica': 'teal',
  cancelada: 'red',
  folga: 'grey',
  ferias: 'purple',
  afastamento: 'brown',
}

const columns = [
  { name: 'time', label: 'Hora', field: 'time', align: 'left' },
  { name: 'title', label: 'Evento', field: 'title', align: 'left' },
  { name: 'status', label: 'Status', align: 'left', field: 'status' },
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
