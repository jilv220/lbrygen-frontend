<template>
    <div id="content">

        <div v-if="queryType == 'channel' && channelData" class="flex-y-start pb-4">
            <div id="cover-wrapper" class="flex-x flex-1">
                <img v-if="channelData?.result[queryContent]?.value?.cover"
                    :src="channelData?.result[queryContent]?.value?.cover?.url" loading="lazy" id="cover"
                    class="rounded">
                <div v-else></div>
            </div>

            <div class="p-3 text-left w-full bg-dark">

                <LGAvatarLabel class="pb-3" :avatar="channelData?.result[queryContent]" :showName="true">
                </LGAvatarLabel>

                <div id="channel-desc" class="text-left pb-5">
                    <div v-for="(line, index) in descList" :key="index">
                        <span v-html="linkify(line)"></span>
                    </div>
                </div>

                <button id="expand-btn" class="text-green pt-3" @click="expandDesc('channel-desc')">More</button>

            </div>
        </div>

        <ul>
            <li v-for="item in items" :key="item">
                <SearchItem :thumbnail="item.value.thumbnail" :avatar="item.signing_channel">
                    <template v-slot:center>

                        <router-link :to="{ name: 'stream', query: {curl: item.canonical_url} }">
                            <div v-if="item.value.title">
                                {{ item.value.title }}
                            </div>

                            <div v-else>
                                {{ item.name }}
                            </div>
                        </router-link>

                    </template>
                    <template v-slot:rear>
                        <div v-if="item.value.tags" id="tag-group" class="flex">
                            <div v-for="tag in item.value.tags.slice(0,3)" :key="tag">
                                <router-link :to="tagRoutes(tag)">
                                    <div v-if="!isLastTag(tag, item.value.tags.slice(0,3))" class="badge tag-spacing rounded-md">
                                        {{ tag }}
                                    </div>
                                    <div v-else class="badge rounded-md">
                                        {{ tag }}
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </template>
                </SearchItem>
            </li>
        </ul>
    </div>
</template>

<script>
import SearchItem from '@/components/SearchItem.vue'
import { linkify } from "@/utils/ReUtils"
import LGAvatarLabel from "@/components/LGAvatarLabel.vue";
import Normalizer from "@/utils/Normalizer";
import EventService from "@/services/EventService";
import Logger from "@/utils/Logger";
import last from "lodash/last";

export default {
    components: {
        SearchItem,
        LGAvatarLabel
    },
    data() {
        return {
            items: [],
            channelData: undefined,
            descList: [''],
            shouldExpand: true,
            queryContent: this.$route.query.q,
            queryType: this.$route.query.qt,
            streamType: this.$route.query.st,
            readyToLoadMore: true,
            pageNum: 6,
            pageSize: 8,
            Logger: new Logger('SearchView')
        };
    },
    mounted() {
        this.performSearch(
            this.$route.query.qt, 
            this.$route.query.q, 
            this.$route.query.st,
        )
        window.addEventListener('scroll', this.fetechMoreData)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.fetechMoreData)
    },
    methods: {
        linkify,
        isLastTag(tag, tags) {
            return tag === last(tags)
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
        async fetechMoreData() {
            let windowHeight = document.documentElement.scrollTop + window.innerHeight
            let offsetHeight = document.documentElement.offsetHeight
            let bottomOfWindow = windowHeight >= (0.99 * offsetHeight)

            if (bottomOfWindow && this.readyToLoadMore) {
                this.readyToLoadMore = false

                let normalizedSearch = Normalizer.run(this.queryContent, this.queryType)
                let sourceData = await EventService.getContent(this.queryType, this.streamType
                                        , normalizedSearch, this.pageNum, this.pageSize)

                if (sourceData) {
                    const updatedItems = this.items.concat(sourceData?.result?.items)
                    this.items = updatedItems
                    this.pageNum += 1
                    this.readyToLoadMore = true
                }
            }
        },
        tagRoutes(queryContent) {
            return {
                name: 'search',
                query: {
                    q: queryContent,
                    qt: 'tag',
                    st: 'video',
                    p: '1'
                }
            }
        },
        async performSearch(searchType, searchContent, streamType) {
            
            let normalizedSearch = Normalizer.run(searchContent, searchType)

            try {

                if (searchType == 'channel') {
                    this.channelData = await EventService.resolveClaimSingle(normalizedSearch)
                    this.descList = this.channelData?.result[this.queryContent]?.value?.description?.split('\n')
                }

                let sourceData = await EventService.getContent(searchType, streamType, 
                                    normalizedSearch, 1)
                this.items = sourceData?.result?.items
            } 
            catch (err) {
                console.error(err)
            }
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