<script setup lang="ts">
import Session from '@/services/Session'

const connectUser = async () => {
    await Session.ethereumLogin()
};
</script>

<template>
    <button class="btn btn-accent min-h-0 h-10 mr-2 text-white"
    @click="connectUser"> 
        Connect
    </button>
</template>