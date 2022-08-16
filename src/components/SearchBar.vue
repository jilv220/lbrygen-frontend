<template>
    <div class="relative flex items-center mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute ml-3 pointer-events-none" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd" />
        </svg>

        <input tabindex="0" id="input-bar" class="input w-full pl-8 focus:outline-green" type="text"
            v-model="searchContent" placeholder="Search some contents..." autocomplete="off"
            @keyup.enter="gotoSearchPage(); $event.target.blur();" />
        
        <svg xmlns="http://www.w3.org/2000/svg" 
            class="h-4 w-4 absolute right-3 lg:hidden" 
            viewBox="0 0 20 20" fill="currentColor"
            @click="resetSearchContent()"
        >
            <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
        </svg>
    </div>
</template>

<script>
import { useSearchStore } from "@/stores/SearchStore"
import Logger from '@/utils/Logger'

export default {
    setup() {
        const search = useSearchStore()
        return { search }
    },
    data() {
        return {
            searchContent: '',
            Logger: new Logger('SearchBar')
        }
    },
    watch:{
        $route(to, from) {
            // clear searchbar when leave searchView
            if (from.name == 'search') {
                this.resetSearchContent()
            }

            if (from.name === 'search' && to.name === 'search') {
                this.searchContent = this.$route.query.q
                this.search.storeFilterInfo(this.$route.query.qt, this.$route.query.st)
            }

            this.Logger.log(this.searchContent)
        }
    },
    mounted() {
        if(this.$route.query.q) {
            this.searchContent = this.$route.query.q
            this.search.storeFilterInfo(this.$route.query.qt, this.$route.query.st)
        } else {
            this.resetSearchContent()
            this.search.storeFilterInfo('tag', 'video')
        }
    },
    methods: {
        gotoSearchPage() {
            this.$router.push({ 
                    name: 'search',
                    query: { 
                        q:  this.searchContent,
                        qt: this.search.getSearchType,
                        st: this.search.getStreamType
                    }
            })
        },
        resetSearchContent() {
            this.searchContent = ''
        }
    }
}
</script>

<style>
.input {
    height: 2.5rem !important;
    min-height: auto !important;
}

#input-bar {
    @apply bg-white;
    @apply input-bordered;
    @apply border-black;
    @apply rounded-2xl
}

[data-theme="dark"] #input-bar {
    @apply bg-gray-white;
}
</style>