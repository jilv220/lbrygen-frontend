<template>
  <div v-for="item in props.items" :key="item.label">
    <SideBarItem :link="item.link">
      <template v-slot:item-icon>
        <span v-html="item.icon"></span>
      </template>
      <template v-slot:item-label>
        {{ item.label }}
      </template>
    </SideBarItem>
  </div>
</template>

<script setup="props" lang="ts">
import SideBarItem from "@/components/base/SideBarItem.vue";
import { ISideBarItem } from "@/constants/interfaces";

const props = defineProps({
  items: Array<ISideBarItem>
});
</script>