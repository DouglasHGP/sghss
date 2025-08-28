<template>
  <q-dialog v-model="internalValue" maximized persistent>
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Consulta Online</q-toolbar-title>
        <q-btn flat round icon="close" @click="closeDialog" />
      </q-toolbar>

      <div ref="jitsiContainer" style="height: 80vh; width: 100%; position: relative">
        <q-spinner
          v-if="loading"
          color="teal"
          size="50px"
          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
const loading = ref(false)

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  roomName: { type: String, default: 'consulta-telemedicina' },
})
const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)

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

const jitsiContainer = ref(null)
let jitsiApi = null

const initJitsi = async () => {
  await nextTick()
  loading.value = true

  const domain = 'meet.jit.si'
  jitsiApi = new window.JitsiMeetExternalAPI(domain, {
    roomName: props.roomName,
    parentNode: jitsiContainer.value,
    interfaceConfigOverwrite: {
      TOOLBAR_BUTTONS: ['microphone', 'camera', 'hangup'],
    },
  })

  jitsiApi.addEventListener('videoConferenceJoined', () => {
    loading.value = false
    console.log('Jitsi carregado e pronto!')
  })
}

const disposeJitsi = () => {
  if (jitsiApi) {
    jitsiApi.dispose()
    jitsiApi = null
  }
}

const closeDialog = () => {
  internalValue.value = false
}
</script>
