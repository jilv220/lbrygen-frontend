<template>
    <div>
        <div id="content-wrapper" class="">
            
            <div v-if="streamUrl" id="layout" class="grid grid-cols-3 gap-8 mt-4 px-4">

                <div id="container" class="grid col-span-2">

                    <div id="iframe-container">

                        <video 
                        v-if="this.mimeType == 'video/mp4'"
                        playsinline 
                        controls
                        id="player"
                        >
                            <!-- Video files -->
                            <source
                            :src="streamUrl"
                            type="video/mp4"
                            />
                        </video>

                        <iframe 
                        v-else
                        allowfullscreen webkitallowfullscreen :src="streamUrl" frameborder="0">
                        </iframe>

                    </div>

                    <div id="stream-info" class="mt-6">

                        <h1 id="stream-title">
                            {{ title }}
                        </h1>

                        <div id="stream-info-divider" class="divider h-0"></div>

                        <LGAvatarLabel 
                        v-if="avatar"
                        id="stream-channel" class="flex-x-start" 
                            :showAvatar="this.showAvatar"
                            :showName="true" 
                            :avatar="this.avatar" 
                            :channelName="this.channelName">
                                <template v-slot:lg-label>
                                    {{ this.channelName }}
                                </template>
                        </LGAvatarLabel>

                        <div id="stream-desc">
                            <div v-for="(line, index) in descList" :key="index">
                                <span v-html="linkify(line)"></span>
                            </div>
                        </div>

                        <button id="expand-btn" class="text-green" @click="expandDesc('stream-desc')">More</button>
                    </div>
                </div>

                <div 
                v-if="this.relatedVideosData != ''"
                id="related-videos" 
                class="card flex-1 md:px-2">
                    <li v-for="item in relatedVideosData.result.items" :key="item">
                        <SearchItem :thumbnail="item.value.thumbnail" :streamUrl="item.short_url" :showAvatar="false"
                            :avatar="item.signing_channel">
                            <template v-slot:center>
                                {{ item.name }}
                            </template>
                        </SearchItem>
                    </li>
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

<script>
import EventService from "../services/EventService"
import { useStreamStore } from "@/stores/StreamStore"
import SearchItem from "@/components/SearchItem.vue"
import { linkify } from "@/utils/ReUtils"
import PlatformUtils from "@/utils/PlatformUtils"
import LGAvatarLabel from "@/components/LGAvatarLabel.vue"
import Plyr from 'plyr'

export default {
    props: {
        claimUrl: String,
    },
    components: {
        SearchItem,
        LGAvatarLabel
    },
    setup() {
        const stream = useStreamStore()
        return { stream }
    },
    data() {
        return {
            avatar: undefined,
            player: null,
            polling: null,
            platformUtils: null,
            channelName: '',
            claimUrlTranformed: '',
            relatedVideosData: '',
            title: '',
            descList: [''],
            mimeType: '',
            shortUrl: '',
            streamUrl: '',
            videoReady: false,
            shouldExpand: true,
            showAvatar: true
        }
    },
    created () {
        this.pollData()
    },
    watch: {
        videoReady(value) {
            console.log(`is video ready : ${value}`)
            this.platformUtils = new PlatformUtils()

            // init Plyr instance
            if (value) {
                this.initPlyr()
                if (this.platformUtils.isMobilePlatform()) {
                    this.plyrEnableDblClickSeek()
                }

                clearInterval(this.polling)
                this.polling = null
            }
        }
    },
    mounted() {

        let claimUrlCopy = this.claimUrl.split('#').join(':')
        this.claimUrlTranformed = claimUrlCopy

        let tags = ['']
        //console.log(this.claimUrlTranformed)
        EventService.resolveClaimSingle(this.claimUrlTranformed)
            .then((response) => {
                //console.log(response)
                if (response.error !== undefined) {
                    console.error(response)
                } else {
                    let result = response.result

                    let avatar = result[this.claimUrlTranformed].signing_channel
                    if (avatar) { this.avatar = avatar }

                    let shortUrl = result[this.claimUrlTranformed].short_url
                    if (shortUrl) { this.shortUrl = shortUrl }
                    
                    let value = result[this.claimUrlTranformed].value
                    let title = value.title
                    tags = value.tags
                    let desc = value.description

                    if (value) {
                        if (desc) {
                            this.descList = desc.split('\n')
                        }
                        if (title) {
                            this.title = title
                        }
                    }
                }
            })
            .then(() => {
                EventService.getStreamByUrl(this.shortUrl)
                    .then((response) => {
                        //console.log(response)
                        if (response.error !== undefined) {
                            console.error(response)
                        } else {
                            this.streamUrl = response.streaming_url
                            this.mimeType = response.mime_type
                        }
                    })
            })
            .then(() => {
                function getRandomInt(max) {
                    return Math.floor(Math.random() * max);
                }
                
                EventService.getContent('tag', 'video', tags, getRandomInt(21), 14, "trending_group")
                    .then((response) => {
                        if (response.error !== undefined) {
                            console.error(response)
                        } else {
                            this.relatedVideosData = response
                        }
                    })
            })
            .catch(e => {
                console.error('fucked up in stupid long chainquery : ' + e)
            })
    },
    methods: {
        linkify,
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
        initPlyr() {
            let config = {
                debug: false,
                keyboard: {
                    global: true
                },
                tooltips: {
                    controls: true,
                    seek: true
                },
                fullscreen: {
                    enabled: true,
                    fallback: true
                },
                clickToPlay: !this.platformUtils.isMobilePlatform(),
                autoplay: true,
                ratio: '16:9',
                disableContextMenu: false,
                invertTime: false
            }

            this.player = new Plyr('#player', config)
            window.player = this.player
        },
        plyrEnableDblClickSeek() {
            let videoWrapper = document.querySelector('.plyr__video-wrapper')
            const plyrWidth = document.querySelector("#player").getBoundingClientRect().width

            // Remove EventListeners from Plyr
            this.player.eventListeners.forEach( function(eventListener) {
                if(eventListener.type === 'dblclick') {
                    eventListener.element
                        .removeEventListener(
                            eventListener.type, 
                            eventListener.callback, 
                            eventListener.options);
                }
            })

            // Add custom Dblclick EventListener
            const forwardThres = 0.7 * plyrWidth
            const rewindThres = 0.3 * plyrWidth
            videoWrapper.addEventListener('dblclick', (e) => {

                if (forwardThres < e.offsetX) {
                    this.player.forward(10)
                } else if (e.offsetX < rewindThres) {
                    this.player.rewind(10)
                }
            })

            videoWrapper.addEventListener('click', (e) => {
                if (e.offsetX >= rewindThres
                &&  e.offsetX <= forwardThres) {
                    this.player.togglePlay()
                }
            })
        },
        pollData () {
            this.polling = setInterval(() => {
                let video = document.getElementsByTagName('video')[0]
                if (video) {
                    this.videoReady = true
                }
            }, 250)
        },
    }
}
</script>

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

#content-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 4rem;
}

#stream-loading {
    padding-top: 17.5%;
}

#stream-loading .fancy-spinner div.ring {
    border-width: 2rem;
    width: 20rem;
    height: 20rem;
    box-shadow: none;
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
</style>