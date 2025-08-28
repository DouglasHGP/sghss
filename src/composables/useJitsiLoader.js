import { ref } from 'vue'

const jitsiLoaded = ref(false)

export function useJitsiLoader() {
  async function loadJitsi() {
    if (jitsiLoaded.value) return
    await new Promise((resolve, reject) => {
      const existing = document.getElementById('jitsi-script')
      if (existing) {
        jitsiLoaded.value = true
        resolve()
        return
      }

      const script = document.createElement('script')
      script.id = 'jitsi-script'
      script.src = 'https://meet.jit.si/external_api.js'
      script.async = true
      script.onload = () => {
        jitsiLoaded.value = true
        resolve()
      }
      script.onerror = () => reject(new Error('Erro ao carregar Jitsi API'))
      document.body.appendChild(script)
    })
  }

  return { jitsiLoaded, loadJitsi }
}
