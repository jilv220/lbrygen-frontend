<template>
    <div class="flex flex-row items-center justify-between mt-2">

        <div class="flex items-center">
            <div v-if="showAvatar" class="avatar mr-2">
                <div id="base-avatar" class="rounded-full">
                    <slot name="avatar"></slot>
                </div>
            </div>
            <div v-else></div>

            <div id="base-label">
                <slot name="label"></slot>
            </div>
        </div>

        <div v-if="showRear">
            <slot name="rear"></slot> 
        </div>
        <div v-else></div>
    </div>
</template>

<script>
export default {
    props: {
        showAvatar: {
            default: true,
            type: Boolean
        },
        showRear: {
            default: false,
            type: Boolean
        }
    },
}
</script>