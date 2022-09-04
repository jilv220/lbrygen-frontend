<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'

const props = defineProps({
    infinite: {
        type: Function, 
        required: true
    }
})

let readyToLoadMore = true

function shouldLoadMore() {
    let windowHeight = document.documentElement.scrollTop + window.innerHeight
    let offsetHeight = document.documentElement.offsetHeight
    let bottomOfWindow = windowHeight >= (0.95 * offsetHeight)
    return bottomOfWindow && readyToLoadMore
}

const handleInfiniteScroll = async () => {

    if (shouldLoadMore()) {
        readyToLoadMore = false
        await props.infinite()
        readyToLoadMore = true
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleInfiniteScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleInfiniteScroll)
})
    
onActivated(() => {
    window.addEventListener('scroll', handleInfiniteScroll)
})

onDeactivated(() => {
    window.removeEventListener('scroll', handleInfiniteScroll)
})
</script>

<template>
    <div></div>
</template>