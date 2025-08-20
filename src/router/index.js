import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import menuMiddleware from 'src/middleware/MenuMiddleware'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Middleware global
  router.beforeEach((to, from, next) => {
    const userRole = localStorage.getItem('userRole') || 'guest'

    // Libera páginas públicas
    if (to.path === '/login' || to.path.startsWith('/error')) {
      return next()
    }

    // Busca item no menu para verificar permissões
    const menuItem = menuMiddleware.find(item => item.link === to.path)

    if (menuItem && !menuItem.roles.includes(userRole)) {
      // Redireciona para a primeira rota acessível ao role
      const firstAccessible = menuMiddleware.find(item => item.roles.includes(userRole))
      if (firstAccessible) {
        return next(firstAccessible.link)
      } else {
        return next('/login') // fallback
      }
    }

    // Se rota não está no menu ou usuário tem permissão
    next()
  })

  return router
})
