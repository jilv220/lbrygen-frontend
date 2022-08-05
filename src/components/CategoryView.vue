<template>
  <div v-if="sourceData">
    <ul>
      <li v-for="item in sourceData.result.items" :key="item">
        <SearchItem :thumbnail="item.value.thumbnail" :streamUrl="item.canonical_url" :avatar="item.signing_channel">
          <template v-slot:center>

            <div v-if="item.value.title">
              {{ item.value.title }}
            </div>

            <div v-else>
              {{ item.name }}
            </div>
          </template>
        </SearchItem>
      </li>
    </ul>
  </div>
</template>

<script>
import EventService from '@/services/EventService';

export default {
  components: {
    SearchItem,
  },
  data() {
    return {
      sourceData: undefined,
    };
  },
  mounted() {
    EventService.getContent('c','video', )
  }
}
</script>

<style>
</style>