import { boot } from 'quasar/wrappers'
import TitlePage from 'components/TitlePage.vue'
import CardBase from 'components/CardBase.vue'
import ActionsDropdown from 'src/components/ActionsDropdown.vue'

export default boot(({ app }) => {
  // Registra o componente globalmente
  app.component('TitlePage', TitlePage)
  app.component('CardBase', CardBase)
  app.component('ActionsDropdown', ActionsDropdown)
})
