<template>
    <div>Nothing here</div>
</template>

<script>
import EventService from "../services/EventService.js"
export default {
    mounted() {
        EventService.getDaemonStatus().then((response) => {
            console.log(response)   
        })
    },
}
</script>

<style>

</style>