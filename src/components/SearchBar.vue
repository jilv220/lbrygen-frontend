<template>
    <div class="flex-1 mr-3">
        <input
            tabindex="0"
            id="input-bar"
            class="input w-full focus:outline-green"
            type="text"
            v-model="searchContent"
            placeholder="Search some contents..."
            autocomplete="off"
            @keyup.enter="gotoSearchPage(); $event.target.blur();"
        />
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
                this.searchContent = ''
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
            this.searchContent = ''
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
    @apply border-black
}

[data-theme="dark"] #input-bar {
    @apply bg-gray-white;
}

</style>