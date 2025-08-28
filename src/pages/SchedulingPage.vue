<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Agendamento de Consulta"
      description="Agende consultas presenciais ou de telemedicina"
    />

    <div class="row q-gutter-md" :class="{ 'q-mr-md': $q.platform.is.mobile }">
      <CardBase class="col" icon="badge">
        <template #select-prepend>
          <div class="col-grow q-ml-md">
            <q-select
              v-model="selectedSpecialty"
              :style="!$q.platform.is.mobile ? 'width: 350px' : ''"
              standout="bg-teal-4 text-white"
              rounded
              dense
              label="Especialidade"
              :options="specialtyOptions"
              options-dense
            />
          </div>
        </template>
        <template #actions>
          <q-btn-toggle
            glossy
            v-model="consultationType"
            class="bg-secondary text-white rounded-borders"
            toggle-color="teal-8"
            :options="[
              { label: 'Presencial', value: 'presencial', icon: 'location_on' },
              { label: 'Telemedicina', value: 'telemedicina', icon: 'video_camera_front' },
            ]"
          />
        </template>
        <div class="row q-gutter-md">
          <CardBase
            v-if="selectedSpecialty"
            class="col"
            :title="currentMonthTitle"
            icon="calendar_month"
          >
            <template #actions>
              <q-btn-group glossy push class="q-mt-xs">
                <q-btn color="secondary" icon="chevron_left" @click.stop="moveMonth(-1)" />
                <q-btn color="secondary" icon="today" @click.stop="goToToday()" />
                <q-btn color="secondary" icon="chevron_right" @click.stop="moveMonth(1)" />
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
                  :weekdays="[1, 2, 3, 4, 5]"
                  :day-min-height="80"
                  :disabled-weekdays="[0, 6]"
                  :selected-dates="availableDates"
                >
                  <template #day="{ scope }">
                    <div
                      :class="{
                        'cursor-pointer': true,
                        'q-py-md': true,
                        'text-grey-6': !isDateAvailable(scope.timestamp.date),
                      }"
                      @click="selectDay(scope.timestamp.date)"
                    >
                      <div class="column justify-around">
                        <q-badge
                          rounded
                          color="teal-5"
                          class="justify-center"
                          v-if="getAvailableSlots(scope.timestamp.date).length > 0"
                        >
                          <span
                            class="text-subtitle2"
                            :class="{
                              'q-px-md': !$q.platform.is.mobile,
                              'q-px-sm': $q.platform.is.mobile,
                            }"
                          >
                            {{ getAvailableSlots(scope.timestamp.date).length }}
                          </span>
                          <q-tooltip>
                            <span class="text-subtitle2">
                              {{ getAvailableSlots(scope.timestamp.date).length }} horário(s)
                              disponível(is)
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
            v-if="dailyAvailableSlots.length > 0"
            icon="access_time"
            :class="$q.platform.is.mobile ? 'col-11' : 'col'"
            :label-search="'Profissional'"
            :subtitle="`Disponibilidade em ${formatDateBR(selectedDate)}`"
            :rows="dailyAvailableSlots"
            :columns="columns"
            :row-actions="[{ icon: 'event_available', label: 'Agendar', event: 'schedule', tooltip: 'Agendar consulta' }]"
            @rowAction="handleScheduleAction"
          >
            <template #body-cell-title="props">
              <q-td :props="props">
                <q-badge color="teal-5" rounded class="q-mr-sm">
                  {{ props.row.title }}
                </q-badge>
              </q-td>
            </template>
          </TableList>
          <q-card
            v-else-if="!selectedSpecialty"
            class="col text-center flex flex-center text-grey-6 q-mt-md q-pt-md q-pb-xs"
          >
            <q-icon name="thumb_up" size="md" class="q-mb-md q-mr-md" />
            <p>Selecione uma especialidade.</p>
          </q-card>
          <q-card
            v-else
            class="col text-center flex flex-center text-grey-6 q-mt-md q-pt-md q-pb-xs"
          >
            <q-icon name="event_busy" size="md" class="q-mb-md q-mr-md" />
            <p>Nenhuma disponibilidade para este dia.</p>
          </q-card>
        </div></CardBase
      >
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { format, eachDayOfInterval, getDay, isAfter, isToday as isTodayFns } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { QCalendarMonth } from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/dist/index.css'
import { useFormatters } from 'src/composables/useFormatters'
import { professionals as professionalMocks } from 'src/mocks/professionals'
import CardBase from 'src/components/CardBase.vue'

const { formatDateBR } = useFormatters()

// 📌 Estado Principal
const consultationType = ref('presencial')
const selectedSpecialty = ref(null)
const selectedDate = ref(format(new Date(), 'yyyy-MM-dd'))
const calendarMonth = ref(null)
const allAvailableEvents = ref([])

// 📌 Computed properties
const currentMonthTitle = computed(() => {
  if (selectedDate.value) {
    const [year, month, day] = selectedDate.value.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return format(date, 'MMMM', { locale: ptBR }).toUpperCase() + ` / ${year}`
  }
  return 'Calendário'
})

const specialtyOptions = computed(() => {
  const specialties = new Set(professionalMocks.map((p) => p.specialty))
  return Array.from(specialties).sort()
})

const filteredProfessionals = computed(() => {
  if (!selectedSpecialty.value) return []
  return professionalMocks.filter((p) => p.specialty === selectedSpecialty.value)
})

const availableDates = computed(() => {
  return allAvailableEvents.value.map((e) => e.date)
})

const dailyAvailableSlots = computed(() => {
  return allAvailableEvents.value
    .filter((e) => e.date === selectedDate.value)
    .sort((a, b) => a.time.localeCompare(b.time))
})

// 📌 Lógica de Geração de Eventos (adaptada do módulo Agenda)
function generateAvailableEvents() {
  if (!selectedSpecialty.value || !consultationType.value) {
    allAvailableEvents.value = []
    return
  }

  const start = new Date() // Começa do dia atual
  const end = new Date()
  end.setMonth(start.getMonth() + 4) // Simula 4 meses de disponibilidade
  const days = eachDayOfInterval({ start, end })
  const generatedEvents = []

  const slots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

  let eventIdCounter = 1
  days.forEach((day) => {
    const dateStr = format(day, 'yyyy-MM-dd')
    const dow = getDay(day)

    if (dow === 0 || dow === 6) {
      // Ignora fins de semana (ajuste conforme necessário)
      return
    }

    const availableSlotsForDay = Math.floor(Math.random() * 5) + 3 // Simula 3 a 7 horários por dia
    const shuffledSlots = [...slots].sort(() => Math.random() - 0.5)

    for (let i = 0; i < availableSlotsForDay; i++) {
      const time = shuffledSlots[i]
      const eventDateTime = new Date(`${dateStr}T${time}:00`)

      // Não exibe horários que já passaram
      if (isAfter(eventDateTime, new Date()) || isTodayFns(eventDateTime)) {
        const professional = filteredProfessionals.value[i % filteredProfessionals.value.length]
        if (professional) {
          generatedEvents.push({
            id: `slot-${eventIdCounter++}`,
            date: dateStr,
            time,
            title: professional.name,
            professionalId: professional.id,
            type: consultationType.value,
            specialty: selectedSpecialty.value,
          })
        }
      }
    }
  })

  allAvailableEvents.value = generatedEvents
}

// 📌 Watchers para gerar eventos quando as seleções mudarem
watch([consultationType, selectedSpecialty], generateAvailableEvents)

// 📌 Funções de controle do calendário
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

const selectDay = (date) => {
  if (isDateAvailable(date)) {
    selectedDate.value = date
  }
}

const isDateAvailable = (date) => {
  return allAvailableEvents.value.some((e) => e.date === date)
}

const getAvailableSlots = (date) => {
  return allAvailableEvents.value.filter((e) => e.date === date)
}

// 📌 Colunas da tabela
const columns = [
  { name: 'time', label: 'Hora', field: 'time', align: 'left' },
  { name: 'title', label: 'Profissional', field: 'title', align: 'left' },
  { name: 'especialty', label: 'Especialidade', field: 'specialty', align: 'left' },
]

// 📌 Ações da tabela
const handleScheduleAction = ({ event, row }) => {
  if (event === 'schedule') {
    alert(`Agendar consulta com ${row.title} para ${formatDateBR(row.date)} às ${row.time}`)
    // Futuramente, esta ação abriria um formulário de agendamento.
  }
}
</script>
