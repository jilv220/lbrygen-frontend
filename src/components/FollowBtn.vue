<script setup lang="ts">
import userState from '@/stores/UserStore'
import Logger from '@/utils/Logger'
import Session from '@/services/Session'

import { onMounted, ref } from 'vue'
import { channelSubscribe, getSubscription } from '@/services/Subscriptions'

const logger = new Logger('FollowBtn')

const props = defineProps({
    claimId: {
        type: String,
        required: true
    }
})

let following = ref(false)
let hover = ref(false)

onMounted(async () => {
    const res = await getSubscription(props.claimId as string)
    if(res) {
        following.value = res
    }
})

async function handleSubscribe() {

    if (!userState.status) {
        logger.error('User not logged in !! Prompt Login !!')
        await Session.ethereumLogin()
    } else {
        following.value = !following.value
        channelSubscribe(props.claimId, following.value)
    }
}
</script>

<template>
    <button class="btn btn-accent text-white" 
    :class="{ unfollow: following && hover }"
    @mouseover="hover=true" @mouseleave="hover=false"
    @click="handleSubscribe()">
        <span v-text ="following && !hover ? 'following'
                    : following && hover ? 'unfollow' 
                    : 'follow'"></span>
    </button>
</template>

<style lang="scss" scoped>
.unfollow {
    @apply bg-error border-error
}
</style>