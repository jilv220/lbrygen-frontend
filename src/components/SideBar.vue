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
  
  <div class="h-6 w-6 absolute bottom-3 left-4">
    <div class="flex flex-row justify-between">
        <a href="https://github.com/jilv220/lbrygen-frontend">
          <img class="h-full w-full cursor-pointer" alt="Lbry logo" src="@/assets/github.png" />
        </a>
      </div>
  </div>
</template>

<style lang="scss">
#sidebar-item {
  @apply active:bg-green
}
</style>