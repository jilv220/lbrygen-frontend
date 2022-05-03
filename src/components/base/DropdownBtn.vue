<template>
    <div class="dropdown dropdown-end dropdown-hover">
        <div class="cursor-pointer" tabindex="0">
            <slot name="btn-icon"></slot>
        </div>
        <div id="dropdown-wrapper" class="dropdown-content menu">
            <slot name="dropdown-content"></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.btn {
  background-color: unset !important;
  color: unset !important;
}

/* md screen */
@media (max-width: 1200px) {
    #dropdown-wrapper {
        right: -6em;
        top: 3.5em;
    }
}
</style>