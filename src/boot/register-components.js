import { boot } from 'quasar/wrappers'
import TitlePage from 'components/TitlePage.vue'

export default boot(({ app }) => {
  // Registra o componente globalmente
  app.component('TitlePage', TitlePage)
})
