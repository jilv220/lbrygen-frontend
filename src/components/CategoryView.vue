<template>
  <div id="content">
    <ul>
      <li v-for="item in items" :key="item">
        <SearchItem :thumbnail="item.value.thumbnail" :avatar="item.signing_channel">
          <template v-slot:center>

            <router-link :to="{ name: 'stream', query: {curl: item.canonical_url} }">
              <div v-if="item.value.title">
                {{ item.value.title }}
              </div>

              <div v-else>
                {{ item.name }}
              </div>
            </router-link>
            
          </template>
        </SearchItem>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import SearchItem from '@/components/SearchItem.vue'
import EventService from '@/services/EventService'
import { defineComponent, onActivated, onDeactivated, onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import Logger from '@/utils/Logger'

export default defineComponent ({
  name: 'CategoryView',
  components: {
    SearchItem,
  },
  setup() {
    let items = ref()
    let pageNum = 6
    let readyToLoadMore = true
    let logger = new Logger('CategoryView')

    const router = useRouter()
    let currRoute = router.currentRoute.value.name as string

    async function fetechMoreData() {
      let windowHeight = document.documentElement.scrollTop + window.innerHeight
      let offsetHeight = document.documentElement.offsetHeight
      let bottomOfWindow = windowHeight >= (0.95 * offsetHeight)

      if (bottomOfWindow && readyToLoadMore) {

        readyToLoadMore = false
        let sourceData = await EventService.fetchCategoryData(currRoute, 'y', pageNum)

        if (sourceData) {
          const updatedItems = items?.value?.concat(sourceData?.result?.items)
          items.value = updatedItems
          pageNum += 1
          readyToLoadMore = true
        }
      }
    }

    onMounted(async () => {
      try {
        let sourceData = await EventService.fetchCategoryData(currRoute)
        items.value = sourceData?.result?.items
      }
      catch (err) {
        console.log(err)
      }
    })

    /**
     * For cached component, 
     * register eventListeners on activated/decativated !!
    */
    onActivated(() => {
      logger.log('activated')
      window.addEventListener('scroll', fetechMoreData)
    })

    onDeactivated(() => {
      logger.log('de-activated')
      window.removeEventListener('scroll', fetechMoreData)
    })

    return { 
      items
    }
  },
})
</script>

<style lang="scss">
#streaming-url-wrapper .flex-x-start {

    .avatar {
        width: 2.1rem;
        height: 2.1rem;
        cursor: pointer;
    }

    #channel-title {
        cursor: pointer;
    }
}
</style>