import type { App } from 'vue'
import MenuSearchModal from './MenuSearchModal'

MenuSearchModal.install = function (app: App) {
  app.component(MenuSearchModal.name, MenuSearchModal)
  return app
}

export type {
  MenuSearchModalOption,
} from './MenuSearchModal'

export default MenuSearchModal
