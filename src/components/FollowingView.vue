<script setup lang="ts">
import { followingIcon } from '@/constants/svgs';
import EventService from '@/services/EventService';
import { getAllSubscriptions } from '@/services/Subscriptions';
import { onBeforeMount, onMounted, ref } from 'vue';
import ContentFragment from './ContentFragment.vue';
import InfiniteScroll from './base/InfiniteScroll.vue';

const currIcon = followingIcon
const currRoute = 'following'
const items = ref()

let subscriptions: string[]
let pageNum = 2

async function infiniteHandler() {
    const sourceData = await EventService.getContent('channelIds', 'video', subscriptions, pageNum)
    const moreItems = sourceData.result?.items
    items?.value?.push(...moreItems)
    pageNum += 1
}

onBeforeMount(async () => {
    subscriptions = await getAllSubscriptions()
    try {
        let sourceData = await EventService.getContent('channelIds', 'video', subscriptions)
        items.value = sourceData.result?.items
    } catch (err) {
        console.log(err)
    }
})

</script>

<template>
    <div id="content">
        <ContentFragment :icon="currIcon" :content-label="currRoute" :items="items"></ContentFragment>
        <InfiniteScroll :infinite="infiniteHandler"></InfiniteScroll>
    </div>
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