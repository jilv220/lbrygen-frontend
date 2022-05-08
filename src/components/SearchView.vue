<template>
    <div id="content" class="mx-10 pt-20 overflow-hidden">

        <div class="flex-1">
            <SearchBar></SearchBar>
        </div>

        <div v-if="
        queryType == 'channel' &&
        channelData &&
        channelData.result &&
        channelData.result[channelName] &&
        channelData.result[channelName].value" class="flex-y-start pb-4">
            <div id="cover-wrapper" class="flex-x flex-1">
                <img v-if="channelData.result[channelName].value.cover"
                    :src="channelData.result[channelName].value.cover.url" loading="lazy" id="cover" class="rounded">
                <div v-else></div>
            </div>

            <div class="p-3 text-left w-full bg-dark">
                <LGAvatarLabel class="pb-3" :avatar="channelData.result[channelName]" :showName="true">
                </LGAvatarLabel>

                <div id="channel-desc" class="text-left pb-5">
                    <div v-for="(line, index) in descList" :key="index">
                        <span v-html="linkify(line)"></span>
                    </div>
                </div>

                <button id="expand-btn" class="text-green pt-3" @click="expandDesc('channel-desc')">More</button>

            </div>
        </div>


        <div v-if="sourceData">
            <ul><li v-for="item in sourceData.result.items" :key="item">
                <SearchItem :thumbnail="item.value.thumbnail" :streamUrl="item.canonical_url"
                    :avatar="item.signing_channel">
                    <template v-slot:center>

                        <div v-if="item.value.title">
                            {{ item.value.title }}
                        </div>

                        <div v-else>
                            {{ item.name }}
                        </div>

                    </template>
                    <template v-slot:rear>

                        <div v-if="item.value.tags" id="tag-group" class="flex-x row-start-6">
                            <div v-if="item.value.tags[0]" class="badge tag-spacing rounded-md"
                                @click="queryTag(item.value.tags[0])">
                                {{ item.value.tags[0] }}
                            </div>

                            <div v-if="item.value.tags[1]" class="badge tag-spacing rounded-md"
                                @click="queryTag(item.value.tags[1])">
                                {{ item.value.tags[1] }}
                            </div>

                            <div v-if="item.value.tags[2]" class="badge rounded-md"
                                @click="queryTag(item.value.tags[2])">
                                {{ item.value.tags[2] }}
                            </div>

                        </div>

                    </template>
                </SearchItem>
            </li></ul>
        </div>

        <!-- pagination -->
        <div v-if="sourceData && sourceData.result">
            <p class="font-heavy"> {{ this.currPage }} </p>
            <div class="btn-group flex-x-center my-4">
                <button class="btn" @click="firstPage()">First</button>
                <button class="btn" @click="prevPage()">Prev</button>
                <button class="btn" @click="nextPage()">Next</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useSearchStore } from "@/stores/SearchStore.js"
import SearchItem from '@/components/SearchItem.vue'
import { linkify } from "@/utils/ReUtils.js"
import LGAvatarLabel from "@/components/LGAvatarLabel.vue";

export default {
    components: {
        SearchItem,
        LGAvatarLabel
    },
    setup() {
        const search = useSearchStore()
        return { search }
    },
    props: {
        currPage: String
    },
    data() {
        return {
            sourceData: undefined,
            channelData: undefined,
            channelName: '',
            descList: [''],
            shouldExpand: true,
            queryType: this.$route.query.qt
        };
    },
    mounted() {
        this.search.$onAction(
            ({
                name,
                after
            }) => {

                after(() => {
                    if (name == 'storeSourceData') {
                        this.sourceData = this.search.getSourceData
                    }

                    if (name == 'storeChannelData') {
                        this.channelData = this.search.getChannelData
                        this.channelName = this.$route.query.q

                        let channelRes = this.channelData.result[this.channelName]
                        if (channelRes.value && channelRes.value.description) {
                            this.descList = channelRes.value.description.split('\n')
                        }
                    }
                })
            }
        )
    },
    methods: {
        linkify,
        navigateToSearch() {
            this.$router.push({
                name: 'search',
                query: {
                    q: this.$route.query.q,
                    qt: this.search.getSearchType,
                    st: this.search.getStreamType,
                    p: this.search.getCurrPage
                }
            })
        },
        expandDesc(eleToExpand) {
            if (this.shouldExpand) {
                document.getElementById('expand-btn').innerHTML = 'Less'
                document.getElementById(eleToExpand).style.overflow = 'unset'
                document.getElementById(eleToExpand).style.maxHeight = 'unset'
            } else {
                document.getElementById('expand-btn').innerHTML = 'More'
                document.getElementById(eleToExpand).style.overflow = 'hidden'
                document.getElementById(eleToExpand).style.maxHeight = '10em'
            }
            this.shouldExpand = !this.shouldExpand
        },
        firstPage() {
            this.search.resetPage()
            this.navigateToSearch()
        },
        prevPage() {
            this.search.prevPage()
            this.navigateToSearch()
        },
        nextPage() {
            this.search.nextPage()
            this.navigateToSearch()
        },
        queryTag(queryContent) {
            this.$router.push({
                name: 'search',
                query: {
                    q: queryContent,
                    qt: 'tag',
                    st: 'video',
                    p: '1'
                }
            })
        }
    },
};
</script>

<style scoped>
.btn-group .btn {
    @apply bg-green !important;
    @apply hover:bg-green-800 !important;
    @apply text-white;
}

.badge {
    @apply bg-white-sub;
    @apply text-black;
    @apply hover:bg-green;
    @apply border-0;
    cursor: pointer;
}

[data-theme="dark"] .badge {
    @apply bg-gray-white;
    @apply text-white;
    @apply hover:bg-green;
}

.avatar {
    float: left;
    object-fit: cover;
}

.tag-spacing {
    margin: 0 6.4px 0 0;
}

#cover-wrapper {
    min-width: 100%;
}

#cover {
    width: 100%;
    max-height: 210px;
}

#channel-desc {
    overflow: hidden;
    max-height: 10em;
}

#search-filter {
    margin-right: auto;
}

#stream-filter {
    margin-right: auto;
}

#search-result-item {
    align-content: center;
}

#text-unknown {
    padding-right: 10px;
}

@media (max-width: 960px) {
    #content {
        margin-right: 1rem;
        margin-left: 1rem;
    }
}
</style>

<style lang="scss">
.flex-y-start .flex-x-start {

    @apply mt-0;

    .avatar {
        width: 56px;
        height: 56px;
        cursor: auto;
    }

    #base-label {
        cursor: auto;

        #channel-title {
            font-size: 1rem;
            font-weight: bold;
        }

        #channel-name {
            font-size: 0.78rem;
            font-weight: 300;
            text-align: left;
        }
    }

}

#streaming-url-wrapper .flex-x-start {

    .avatar {
        width: 2.1rem;
        height: 2.1rem;
        cursor: pointer;
    }

    #channel-title {
        cursor: pointer;
    }
}
</style>