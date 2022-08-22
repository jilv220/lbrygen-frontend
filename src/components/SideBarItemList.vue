<template>
  <!-- Sidebar content here -->
  <div v-for="category in Categories" :key="category">
    <SideBarItem :link="category.link">
      <template v-slot:item-icon>
        <span v-html="category.icon"></span>
      </template>
      <template v-slot:item-label>
        <a :href="category.link"> {{ category.label }} </a>
      </template>
    </SideBarItem>
  </div>
</template>

<script>
import SideBarItem from "@/components/base/SideBarItem.vue";
import Categories from "@/constants/categories";
export default {
  components: {
    SideBarItem,
  },
  data() {
    return {
      Categories,
    };
  },
};
</script>

<style>
</style>