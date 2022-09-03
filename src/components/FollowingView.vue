<script setup lang="ts">
import { followingIcon } from '@/constants/svgs';
import EventService from '@/services/EventService';
import { getAllSubscriptions } from '@/services/Subscriptions';
import { onMounted, ref } from 'vue';
import ContentFragment from './ContentFragment.vue';

let currIcon = followingIcon
let currRoute = 'following'
let subscriptions: string[]
let items = ref()

onMounted(async () => {

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