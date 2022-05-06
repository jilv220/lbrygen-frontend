<template>
    <div class="flex-x-start mt-2">
        <div v-if="showAvatar" class="avatar mr-2">
            <div id="base-avatar" class="rounded-full">
                <slot name="avatar"></slot>
            </div>
        </div>
        <div v-else></div>

        <div id="base-label" >
            <slot name="label"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showAvatar: {
            default: true,
            type: Boolean
        },
    },
}
</script>

<style>

</style>