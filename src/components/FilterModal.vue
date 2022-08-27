<template>
    <BaseModal modalID="filter-modal">
        <template v-slot:modal-btn-icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clip-rule="evenodd" />
            </svg>
        </template>
        <template v-slot:modal-content>
            <div id="filter-area" class="p-6 grid grid-cols-2 gap-4 text-left bg-neutral">

                <form id="stream-filter" class="gird pr-6" autocomplete="off">

                    <div>
                        <label class="pl-02 pr-06">Filter by : </label>
                    </div>

                    <div>
                        <input type="radio" id="video" value="video" v-model="streamType">
                        <label class="pl-02 pr-06" for="video">Video</label>
                    </div>

                    <div>
                        <input type="radio" id="image" value="image" v-model="streamType">
                        <label class="pl-02 pr-06" for="image">Image</label>
                    </div>

                    <div>
                        <input type="radio" id="document" value="document" v-model="streamType">
                        <label class="pl-02" for="document">Document</label>
                    </div>
                </form>

                <form id="search-filter" class="gird grid-flow-row auto-rows-max" autocomplete="off">

                    <div>
                        <label class="pl-02 pr-06">Search by : </label>
                    </div>

                    <div>
                        <input type="radio" id="tag" value="tag" v-model="searchType">
                        <label class="pl-02 pr-06" for="tag">Tag</label>
                    </div>

                    <div>
                        <input type="radio" id="text" value="text" v-model="searchType">
                        <label class="pl-02 pr-06" for="text">Text</label>
                    </div>

                    <div>
                        <input type="radio" id="channel" value="channel" v-model="searchType">
                        <label class="pl-02" for="channel">Channel</label>
                    </div>

                </form>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from '@/components/base/BaseModal.vue'
import { useSearchStore } from "@/stores/SearchStore"

export default {
    components: {
        BaseModal,
    },
    setup() {
        const search = useSearchStore()
        return { search }
    },
    data() {
        return {
            searchType: 'tag',
            streamType: 'video',
        };
    },
    mounted() {
        // Init dropdown
        if (this.$route.path == '/') {
            this.search.storeFilterInfo(this.searchType, this.streamType)
        } else if (this.$route.path == '/search') {
            // mount into search, trigger mutation
            this.searchType = this.$route.query.qt
            this.streamType = this.$route.query.st
        }
    },
    watch: {
        searchType: function () {
            this.search.storeFilterInfo(this.searchType, this.streamType)
        },
        streamType: function () {
            this.search.storeFilterInfo(this.searchType, this.streamType)
        },
        $route(to, from) {
            if (from.name == 'search' && to.name == 'search') {
                // Case 1 : from search to search
                this.searchType = this.search.getSearchType
                this.streamType = this.search.getStreamType
            } else if (from.name == 'search') {
                // Case 2 : from search to other route, reset filter options
                this.searchType = 'tag'
                this.streamType = 'video'
            } else if (to.name == 'search') {
                // Case 3 : from other route to search 
                this.searchType = this.search.getSearchType
                this.streamType = this.search.getStreamType
            }
        }
    }
}
</script>

<style lang="scss">
#filter-modal-layout {
    align-items: flex-start;
    .modal-box {
        margin-top: 4.5rem;
        width: fit-content;
    } 
}
</style>