import { defineStore } from 'pinia'
import EventService from "../services/EventService.js"

let streamModel = {
    url: '',
    desc: '',
    title: '',
    claimId: '',
    claimName: '',
    avatar: Object,
    channelName: '',
    tags: ['']
}

export const useStreamStore = defineStore (
    'stream', 
    {
        state: () => ({
            stream : streamModel
        }),
        getters: {
            getStreamUrl: (state) => state.stream.url,
            getStreamDesc: (state) => state.stream.desc,
            getStreamTitle: (state) => state.stream.title,
            getClaimId: (state) => state.stream.claimId,
            getClaimName: (state) => state.stream.claimName,
            getStreamTags: (state) => state.stream.tags,
            getAvatar: (state) => state.stream.avatar,
            getChannelName: (state) => state.stream.channelName,
        },
        actions: {
            async requestStream(url) {
                EventService.getStreamByUrl(url).then((response) => {

                    this.stream.url = response.streaming_url
                    this.stream.claimId = response.claim_id
                    this.stream.claimName = response.claim_name

                    // console.log(response)
                    // console.log(this.claimId)
                    // console.log(this.claimName)

                    if (response.metadata !== undefined) {
                        
                        if (response.metadata.description !== undefined) {
                            this.stream.desc = response.metadata.description
                        } else {
                            this.stream.desc = 'No video description found.'
                        }

                        if (response.metadata.title !== undefined) {
                            this.stream.title = response.metadata.title
                        } else {
                            this.stream.title = response.metadata.source.name
                        }

                        if (response.metadata.tags !== undefined) {
                            this.stream.tags = Object.values(response.metadata.tags)
                        }
                    }
                })
            },
            storeChannelInfo(avatar, channelName) {
                this.stream.avatar = avatar
                this.stream.channelName = channelName
            }
        }
        
    }
)
