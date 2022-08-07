<template>
  <div id="content">
    <ul>
      <li v-for="item in items" :key="item">
        <SearchItem :thumbnail="item.value.thumbnail" :streamUrl="item.canonical_url" :avatar="item.signing_channel">
          <template v-slot:center>

            <div v-if="item.value.title">
              {{ item.value.title }}
            </div>

            <div v-else>
              {{ item.name }}
            </div>

          </template>
        </SearchItem>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import SearchItem from '@/components/SearchItem.vue'
import EventService from '@/services/EventService'
import { defineComponent, onBeforeUnmount, onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent ({
  components: {
    SearchItem,
  },
  setup() {
    let categoryData: any
    let channelIds: any

    let items = ref()
    let pageSize = 4
    let readyToLoadMore = true

    const router = useRouter()
    let currRoute = router.currentRoute.value.name as string

    function getCategoryChIds(routeName: string, categoryData: any) {
      switch(routeName) {
        case 'tech':
          return categoryData.categories.TECHNOLOGY.channelIds
        case 'art':
          return categoryData.categories.ART.channelIds
      }
    }

    async function fetechMoreData() {
      let windowHeight = document.documentElement.scrollTop + window.innerHeight
      let offsetHeight = document.documentElement.offsetHeight
      let bottomOfWindow = windowHeight >= (0.99 * offsetHeight)

      if (bottomOfWindow && readyToLoadMore) {

        readyToLoadMore = false
        let sourceData = await EventService.getContent('channelIds', 'video', channelIds as string[], 5, pageSize)

        if (sourceData) {
          const updatedItems = items.value.concat(sourceData?.result?.items)
          items.value = updatedItems
          pageSize += 4
          readyToLoadMore = true
        }
      }
    }

    onMounted(async () => {
      try {
        categoryData = await EventService.getChannels()
        channelIds = getCategoryChIds(currRoute, categoryData.en)

        let sourceData = await EventService.getContent('channelIds', 'video', channelIds as string[])
        items.value = sourceData?.result?.items
      }
      catch (err) {
        console.log(err)
      }

      window.addEventListener('scroll', fetechMoreData)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', fetechMoreData)
    })

    return { 
      items
    }
  },
})
</script>

<style lang="scss">
</style>