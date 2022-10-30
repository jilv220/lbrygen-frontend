<script setup lang="ts">
import EventService from "../services/EventService"
import SearchItem from "@/components/SearchItem.vue"
import LGAvatarLabel from "@/components/LGAvatarLabel.vue"
import plyrHelper from '@/lib/plyrHelper'
import random from 'lodash/random'

import { API_PROD, VIDEO_TYPES, AUDIO_TYPES } from '@/constants/env'
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { MaybeTimer, MaybePlyr } from '@/types/StreamTypes'
import { linkify } from "@/utils/ReUtils"
import { useHead } from "@vueuse/head"

const props = defineProps(['claimUrl'])

let player : MaybePlyr = undefined
let polling : MaybeTimer = undefined
let downloadUrl = ''
let shouldExpand = true

// Maybe should make a state for this ...
let videoReady = ref(false)
let shortUrl = ref('')
let title = ref('')
let desc = ref('')
let streamUrl = ref('')
let mimeType = ref('')

// Should use reactive and define interfaces for them
let avatar = ref()
let relatedVideosData = ref()

// Setup metadata
useHead({
    title,
    meta: [
        {
            name: 'description',
            content: () => desc.value
        }
    ]
})

onBeforeMount(() => {
    pollData()
})

onMounted(async () => {
    let claimUrlCopy = props.claimUrl.split('#').join(':')
    let claimUrlTranformed = claimUrlCopy
    let tags = ['']

    try {
        let claimRes = await EventService.resolveClaimSingle(claimUrlTranformed)
        let result = claimRes.result

        let claimAvatar = result[claimUrlTranformed]?.signing_channel
        if (claimAvatar) { avatar.value = claimAvatar }

        let claimShortUrl = result[claimUrlTranformed]?.short_url
        if (claimShortUrl) { shortUrl.value = claimShortUrl }

        let value = result[claimUrlTranformed]?.value
        tags = value?.tags

        // Setup decription and title
        title.value = value?.title
        desc.value = value?.description?.replaceAll('\n', '<br>')

        let streamRes = await EventService.getStreamByUrl(claimShortUrl)
        streamUrl.value = streamRes.streaming_url
        mimeType.value = streamRes.mime_type

        // Setup download
        const blob = streamUrl?.value.split('/').pop()
        downloadUrl = `${API_PROD}/download/${blob}`

        let relatedRes = await EventService.getContent('tag', 'video', tags, random(1, 14), 14, "trending_group")
        relatedVideosData.value = relatedRes
    }
    catch (err) {
        console.error(err)
    }
})

watch(() => videoReady.value, () => {

    let value = videoReady.value
    console.log(`is video ready : ${value}`)

    // init Plyr instance
    if (value) {
        player = plyrHelper.initPlyr()
        plyrHelper.plyrEnableDblClickSeek(player, '#player')

        clearInterval(polling)
        polling = undefined
    }
})

onBeforeUnmount(() => {
    player?.destroy()
    plyrHelper.destroy()
})

function pollData() {
    polling = setInterval(() => {
        let video = document.getElementById("player")
        if (video) {
            videoReady.value = true
        }
    }, 250)
}

function expandDesc(eleToExpand) {
    if (shouldExpand) {
        document.getElementById('expand-btn')!.innerHTML = 'Less'
        document.getElementById(eleToExpand)!.style.overflow = 'unset'
        document.getElementById(eleToExpand)!.style.maxHeight = 'unset'
    } else {
        document.getElementById('expand-btn')!.innerHTML = 'More'
        document.getElementById(eleToExpand)!.style.overflow = 'hidden'
        document.getElementById(eleToExpand)!.style.maxHeight = '10em'
    }
    shouldExpand = !shouldExpand
}
</script>

<template>
    <div>
        <div class="pt-16">

            <div v-if="streamUrl!=''" id="layout" class="grid grid-cols-3 gap-8 mt-4 px-4">

                <div id="container" class="grid col-span-2">

                    <div id="iframe-container">

                        <video v-if="VIDEO_TYPES.includes(mimeType)" playsinline controls id="player">
                            <source :src="streamUrl"/>
                        </video>

                        <video v-else-if="AUDIO_TYPES.includes(mimeType)" playsinline controls id="player">
                            <source :src="streamUrl"/>
                        </video>

                        <iframe v-else allowfullscreen webkitallowfullscreen :src="streamUrl" frameborder="0">
                        </iframe>

                    </div>

                    <div id="stream-info" class="mt-3">

                        <h1 id="stream-title">
                            {{ title }}
                        </h1>

                        <div id="stream-info-divider" class="divider h-0"></div>

                        <div class="flex justify-between">
                            <LGAvatarLabel v-if="avatar" id="stream-channel"
                                :showAvatar="true" 
                                :showName="true" 
                                :avatar="avatar"
                            >
                            </LGAvatarLabel>
                            <a class="btn bg-green hover:bg-green-800 text-white" :href="downloadUrl">
                                Download
                            </a>
                        </div>

                        <article id="stream-desc">
                            <span v-html="linkify(desc)"></span>
                        </article>

                        <button id="expand-btn" class="text-green" @click="expandDesc('stream-desc')">More</button>
                    </div>
                </div>

                <div id="related-videos" class="card flex-1 md:px-2">
                    <div v-for="item in relatedVideosData?.result?.items" :key="item">
                        <SearchItem
                        :thumbnail="item.value.thumbnail" 
                        :showAvatar="false" 
                        :avatar="item.signing_channel">
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
                        </SearchItem>
                    </div>
                </div>

            </div>

            <div v-else id="stream-loading" class="flex-y-center">
                <div class="fancy-spinner">
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="dot"></div>
                </div>
            </div>

        </div>

    </div>
</template>

<style lang="scss">
span {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
}

iframe {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

#container {
    position: relative;
    overflow: hidden;
}

/* md screen */
@media (max-width: 1240px) {

    #layout {
        display: unset;
    }

    #container {
        padding-bottom: 1rem;
    }
}

#stream-loading {
    padding-top: 17.5%;

    @media (max-width: 1240px) {
        padding-top: 60%;
    }
}

#stream-loading .fancy-spinner div.ring {
    border-width: 2rem;
    width: 20rem;
    height: 20rem;
    box-shadow: none;

    @media (max-width: 1240px) {
        border-width: 1.5rem;
        width: 15rem;
        height: 15rem;
        box-shadow: none;
    }
}

#stream-info {
    text-align: start;
    overflow: auto;
    overflow-wrap: break-word;

    @media (max-width: 1240px) {
        @apply px-4;
    }

    @media (min-width: 1241px) {
        padding-bottom: 150%;
    }
}

#stream-channel {

    @apply mt-0

    #channel-title {
        font-size: 1rem;
        font-weight: 700;
    }

    .avatar {
        @apply w-12;
        @apply h-12;
    }

    #channel-name {
        font-size: 0.78rem;
        font-weight: 300;
    }
}

#stream-info-divider {
    @apply my-3
}

#stream-title {
    display: block;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 700;
}

#stream-desc {
    max-width: 50em;
    overflow: hidden;
    max-height: 10em;
}

#expand-btn {
    font-size: 1.1rem;
    font-weight: 400;
}

#related-videos {
    div > div > #thumbnail {
        width: 192px;
        height: 108px;
    }
}
</style>