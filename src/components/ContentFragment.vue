<script setup lang="ts">
import CardItem from './CardItem.vue'
const upperFirst = require('lodash/upperFirst')

const props = defineProps({
    icon: String,
    contentLabel: String,
    items: Array<any>  // need to define interface
})
</script>

<template>
    <label class="label justify-start pb-3">
        <span v-html="icon" class="mr-2"></span>
        <span class="label-text text-lg font-bold"> {{ upperFirst(contentLabel) }}</span>
    </label>

    <ul class="grid grid-cols-4 gap-4">
        <li v-for="item in items" :key="item" class="pb-8">
            <CardItem :thumbnail="item.value.thumbnail" :avatar="item.signing_channel" :curl="item.canonical_url">
                <template v-slot:center>
                    <router-link :to="{ name: 'stream', query: { curl: item.canonical_url } }">
                        <div v-if="item.value.title">
                            {{ item.value.title }}
                        </div>

                        <div v-else>
                            {{ item.name }}
                        </div>
                    </router-link>
                </template>
            </CardItem>
        </li>
    </ul>
</template>