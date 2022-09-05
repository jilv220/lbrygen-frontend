<script setup lang="ts">
import connectWallet from '../lib/walletConnect/connect/connectWallet'
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore()

const connectUser = async () => {
    await connectWallet()
    userStore.$state.status = true
};
</script>

<template>
    <button class="btn btn-accent min-h-0 h-10 mr-2 text-white"
    @click="connectUser"> 
        Connect
    </button>
</template>