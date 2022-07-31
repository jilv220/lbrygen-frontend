import { createRouter, createWebHistory } from 'vue-router';
import categories from "@/constants/categories";

const Home = () => import('../components/HomeView.vue')
const Search = () => import('../components/SearchView.vue')
const Stream = () => import('../components/StreamView.vue')

/**
 * Generate category routes
 */
let category_routes = []
for (let i = 0; i < categories.length; i++) {
  category_routes[i] = {
    path: `/${categories[i].link}`,
    name: `${categories[i].link}`,
    component: Search,
  }
}

/**
 * Generate other routes
 */
let other_routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: route => ({ 
      searchContent: route.query.q,
      queryType: route.query.qt,
      streamType: route.query.st,
      currPage: route.query.p
    })
  },
  {
    path: '/stream',
    name: 'stream',
    component: Stream,
    props: route => ({ claimUrl: route.query.curl })
  },
]
const routes = category_routes.concat(other_routes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(() => {
  // scroll to top on new route
  window.scrollTo(0, 0)
})

export default router