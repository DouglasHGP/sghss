import { boot } from 'quasar/wrappers'
import TitlePage from 'components/TitlePage.vue'
import CardBase from 'components/CardBase.vue'

export default boot(({ app }) => {
  // Registra o componente globalmente
  app.component('TitlePage', TitlePage)
  app.component('CardBase', CardBase)
})
