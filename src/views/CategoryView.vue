<script setup lang="ts">
import categories from "@/constants/categories"
import EventService from '@/services/EventService'
import ContentFragment from '@/components/ContentFragment.vue'
import InfiniteScroll from '@/components/base/InfiniteScroll.vue'

import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

let items = ref()
let pageNum = 6

const router = useRouter()
let currRoute = router.currentRoute.value.name as string
let currIcon = categories.filter(category => category.link === currRoute)[0].icon

async function infiniteHandler () {
  const sourceData = await EventService.fetchCategoryData(currRoute, 'y', pageNum)
  const moreItems = sourceData?.result?.items
  items?.value?.push(...moreItems)
  pageNum += 1
}

onBeforeMount(async () => {
  try {
    let sourceData = await EventService.fetchCategoryData(currRoute)
    items.value = sourceData?.result?.items
  }
  catch (err) {
    console.log(err)
  }
})

</script>

<template>
  <div id="content">
    <ContentFragment :icon="currIcon" :content-label="currRoute" :items="items"></ContentFragment>
  </div>
  <InfiniteScroll :infinite="infiniteHandler"></InfiniteScroll>
</template>

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