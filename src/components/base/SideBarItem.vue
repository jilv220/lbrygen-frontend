<template>
    <li @click="navigateTo(link)">
        <div class=" active:bg-green h-10">
            <slot name="item-icon"></slot>
            <slot name="item-label"></slot>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        link: String
    },
    methods:{
        navigateTo(routeName, options) {
            //console.log(`Should navigate to ${routeName}`)
            this.$router.push({ 
                name: routeName,
                query: options
            })
        }
    }
}
</script>

<style>
</style>