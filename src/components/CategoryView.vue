<template>
  <div id="content">
    <ContentFragment :icon="currIcon" :content-label="currRoute" :items="items"></ContentFragment>
  </div>
</template>

<script lang="ts">
import categories from "@/constants/categories";
import EventService from '@/services/EventService'
import { defineComponent, onActivated, onDeactivated, onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import Logger from '@/utils/Logger'
import ContentFragment from './ContentFragment.vue';

export default defineComponent ({
  name: 'CategoryView',
  components: {
    ContentFragment
},
  setup() {
    let items = ref()
    let pageNum = 6
    let readyToLoadMore = true
    let logger = new Logger('CategoryView')

    const router = useRouter()
    let currRoute = router.currentRoute.value.name as string
    let currIcon = categories.filter(category => category.link === currRoute)[0].icon

    const upperFirst = require('lodash/upperFirst')

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
      items,
      currRoute,
      currIcon,
      upperFirst
    }
  },
})
</script>

<style lang="scss">
#card-avatar-label .flex .flex {

    .avatar {
        width: 2.1rem;
        height: 2.1rem;
        cursor: pointer;
    }

    #channel-title {
        cursor: pointer;
    }
}

.label > span {
  svg {
    height: 16px;
    width: 16px;
  }
}
</style>