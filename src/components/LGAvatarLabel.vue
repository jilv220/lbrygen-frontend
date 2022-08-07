<template>
    <AvatarLabel :showAvatar="this.showAvatar" @click="gotoChannelView()">
        <template v-slot:avatar>
            <div v-if="avatar?.value?.thumbnail" 
            id="channel-avatar">
                <TriFallbackImg
                :originURI="optimizedThumbnail"
                :backupURI="backupThumbnail"
                fallbackURI='spaceman.png'>
                </TriFallbackImg>
            </div>
            <img v-else src='../assets/spaceman.png'>
        </template>

        <template v-slot:label>
            <label id="channel-title">
                <div v-if="avatar?.value?.title">
                    {{ avatar.value.title }}
                </div>
                <div v-else-if="backupTitle"> 
                    {{ backupTitle.replace('@','') }} 
                </div>
                <div v-else>Anonymous</div>
                <div id="channel-name" v-if="showName"> 
                    {{ avatar?.name }}
                </div>
            </label>
        </template>

    </AvatarLabel>
</template>

<script>
import AvatarLabel from "./base/AvatarLabel.vue"
import { AVATAR_OPTIMIZE } from '@/constants/env'
import TriFallbackImg from "./base/TriFallbackImg.vue"

export default {
    name: "LGAvatarLabel",
    components: {
    AvatarLabel,
    TriFallbackImg
},
    props: {
        avatar: Object,
        showAvatar: {
            default: true,
            type: Boolean
        },
        showName: {
            default: false,
            type: Boolean
        },
    },
    data() {
        return {
            backupTitle: '',
            backupThumbnail: '',
            optimizedThumbnail: '',
        }
    },
    mounted() {
        if (this.avatar &&
            this.avatar.name) {
            this.backupTitle = this.avatar.name.split('').join('')
        }
        if (this.avatar && 
            this.avatar.value && 
            this.avatar.value.thumbnail) {
            this.optimizedThumbnail = AVATAR_OPTIMIZE + this.avatar.value.thumbnail.url
            this.backupThumbnail = this.avatar.value.thumbnail.url
        }
    },
    methods: {
        gotoChannelView() {
            this.$router.push({
                name: 'search',
                query: {
                    q: this.avatar.name,
                    qt: 'channel',
                    st: 'video'
                }
            })
        },
    }
}
</script>

<style scoped>
#channel-avatar {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

#channel-title {
    font-size: 0.78rem;
    font-weight: 300;
    cursor: pointer;
}
</style>