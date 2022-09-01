<template>
    <router-link :to="link">
        <li>
            <div id="sidebar-item" class="h-12">
                <slot name="item-icon"></slot>
                <slot name="item-label"></slot>
            </div>
        </li>
    </router-link>
</template>

<script>
export default {
    props: {
        link: String
    }
}
</script>

<style>
</style>