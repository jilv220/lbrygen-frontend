<script setup lang="ts">
import categories from "@/constants/categories";
import primaryNav from "@/constants/primaryNavigation";
import SideBarItemList from "./SideBarItemList.vue";
</script>

<template>
  <div class="pb-3">
    <SideBarItemList :items="primaryNav"></SideBarItemList>
  </div>
  <SideBarItemList :items="categories"></SideBarItemList>
</template>

<style lang="scss">
#sidebar-item {
  @apply active:bg-green
}
</style>