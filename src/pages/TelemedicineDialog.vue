<template>
  <q-dialog v-model="internalValue" maximized persistent>
    <CardBase :title="'Consulta Online'" icon="videocam">
      <template #actions>
        <q-btn flat round icon="close" @click="closeDialog" />
      </template>

      <div ref="jitsiContainer" style="height: 80vh; width: 100%; position: relative">
        <transition name="fade">
          <div
            v-if="loading"
            class="absolute-full flex flex-center"
            style="background-color: rgba(0, 0, 0, 0.05); z-index: 10"
          >
            <div class="column q-pa-md q-gutter-md items-center">
              <div class="row justify-center q-mb-md">
                <q-skeleton type="QAvatar" size="250px" />
              </div>
              <div class="row q-gutter-md justify-center">
                <q-skeleton type="QBtn" />
                <q-skeleton type="QBtn" />
                <q-skeleton type="QBtn" />
              </div>
              <div v-if="timeoutReached" class="text-center text-subtitle1 text-red q-mt-md">
                Conexão lenta, aguarde...
              </div>
            </div>
          </div>
        </transition>
      </div>
    </CardBase>
  </q-dialog>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  roomName: { type: String, default: 'consulta-telemedicina' },
})
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
const loading = ref(false)
const timeoutReached = ref(false)
const jitsiContainer = ref(null)
let jitsiApi = null
let loadTimeout = null

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val
    if (val) initJitsi()
    else disposeJitsi()
  },
)

watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

const initJitsi = async () => {
  await nextTick()
  loading.value = true
  timeoutReached.value = false

  // Timeout para fallback
  loadTimeout = setTimeout(() => {
    timeoutReached.value = true
  }, 5000) // 10 segundos

  const domain = 'meet.jit.si'
  jitsiApi = new window.JitsiMeetExternalAPI(domain, {
    roomName: props.roomName,
    parentNode: jitsiContainer.value,
    interfaceConfigOverwrite: {
      TOOLBAR_BUTTONS: ['microphone', 'camera', 'hangup'],
    },
  })

  jitsiApi.addEventListener('videoConferenceJoined', () => {
    clearTimeout(loadTimeout)
    loading.value = false
    console.log('Jitsi carregado e pronto!')
  })
}

const disposeJitsi = () => {
  clearTimeout(loadTimeout)
  timeoutReached.value = false
  loading.value = false
  if (jitsiApi) {
    jitsiApi.dispose()
    jitsiApi = null
  }
}

const closeDialog = () => {
  internalValue.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.absolute-full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
