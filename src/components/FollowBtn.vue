<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import Logger from '@/utils/Logger'
import { useUser } from '@/lib/gun/useUser'
import { channelSubscribe, getSubscription } from '@/services/Subscriptions'

const userStore = useUserStore()
const router = useRouter()
const logger = new Logger('FollowBtn')

const props = defineProps({
    claimId: {
        type: String,
        required: true
    }
})

const user = useUser()
let following = ref(false)
let hover = ref(false)

onMounted(async () => {
    const res = await getSubscription(props.claimId as string)
    if(res) {
        following.value = res
    }
})

async function handleSubscribe() {

    following.value = !following.value

    if (!userStore.isUserLoggedIn()) {
        logger.log('User not logged in !!')
        router.push({ name: 'signup' })
    } else {
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