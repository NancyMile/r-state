import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth:true},
      children: [
        {
          path: '/admin/proprieties',
          name: 'admin-proprieties',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/new',
          name: 'new-propriety',
          component: () => import('../views/admin/NewProprietyView.vue')
        },
        {
          path: '/admin/edit/:id',
          name: 'edit-propriety',
          component: () => import('../views/admin/EditProprietyView.vue')
        }
      ]
    }
  ]
})

//guard navigation
router.beforeEach( async (to, from, next) => {
  //console.log(to)
  // console.log(from)
  // console.log(next)

  //checks if aleats one of the elemens on the array requires outh in this case main admin layout, all the childer heredate it
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  //console.log(requiresAuth)
  if (requiresAuth) {
    //check that the user is authenticated
    try {
      await authenticatedUser()
      next()
    } catch (error) {
        console.log(error)
        next({name: 'login'})
    }

  } else {
    // no protected display view
    next()
  }
})

function authenticatedUser() {
  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    //ususcribe only calss the funcions once
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      unsuscribe()
      //console.log(user)
      if (user) {
        resolve(user)
      } else {
        reject()
      }
    })
  })
}


export default router
