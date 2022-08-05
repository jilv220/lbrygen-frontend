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

export default {
    setup() {
        const search = useSearchStore()
        return { search }
    },
    data() {
        return {
            searchContent: '',
        }
    },
    watch:{
        $route(to, from) {
            // clear searchbar when leave searchView
            if (from.name == 'search') {
                this.searchContent = ''
            }
            if (to.name == 'search') {
                this.searchContent = this.$route.query.q
                this.search.storeFilterInfo(this.$route.query.qt, this.$route.query.st)
            }
        }
    },
    mounted() {
        if(this.$route.query.q) {
            this.searchContent = this.$route.query.q
            this.search.storeFilterInfo(this.$route.query.qt, this.$route.query.st)
        }
    },
    methods: {
        gotoSearchPage() {
            this.$router.push({ 
                    name: 'search',
                    query: { 
                        q:  this.searchContent,
                        qt: this.search.getSearchType,
                        st: this.search.getStreamType,
                        p: this.search.getCurrPage
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