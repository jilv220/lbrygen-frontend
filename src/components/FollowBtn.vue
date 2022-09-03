<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import Logger from '@/utils/Logger'
import { useUser, channelSubscribe } from '@/lib/gun/useUser'

const userStore = useUserStore()
const router = useRouter()
const logger = new Logger('FollowBtn')

const props = defineProps({
    channelAddress: String
})

const user = useUser()
let following = ref(false)
let hover = ref(false)

async function getSubscription(address: String) {
    return user
        .get('subscriptions')
        .get(address)
        .then()
}

onMounted(async () => {
    const res = await getSubscription(props.channelAddress as string)
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
        channelSubscribe(props.channelAddress, following.value)
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