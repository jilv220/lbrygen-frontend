import { createRouter, createWebHistory, RouterOptions } from 'vue-router';
import categories from "@/constants/categories";

const Home = () => import('../components/HomeView.vue')
const Following = () => import('../components/FollowingView.vue')
const Search = () => import('../components/SearchView.vue')
const Category = () => import('../components/CategoryView.vue')
const Stream = () => import('../components/StreamView.vue')

/**
 * Generate category routes
 */
const category_routes: Array<any> = []
const category_literals: string[] = []

for (let i = 0; i < categories.length; i++) {
  category_routes[i] = {
    path: `/${categories[i].link}`,
    name: `${categories[i].link}`,
    component: Category,
  }
  category_literals.push(categories[i].link)
}

/**
 * Generate other routes
 */
const other_routes: Array<any> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/following',
    name: 'following',
    component: Following
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: (route: any) => ({ 
      searchContent: route.query.q,
      queryType: route.query.qt,
      streamType: route.query.st,
    })
  },
  {
    path: '/stream',
    name: 'stream',
    component: Stream,
    props: (route: any) => ({ claimUrl: route.query.curl })
  },
]
const routes = category_routes.concat(other_routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition): any {
    if (to.name === 'stream' || to.name === 'search') {
      return { left: 0, top: 0 }
    } 
    else if (category_literals.includes(to.name as string)
          && category_literals.includes(from.name as string)) {
      return { left: 0, top: 0 }
    }
    else if (category_literals.includes(to.name as string)) {
      return savedPosition
    }
  }
})

export default router