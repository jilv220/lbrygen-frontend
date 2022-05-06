<template>
    <AvatarLabel :showAvatar="this.showAvatar" @click="gotoChannelView()">
        <template v-slot:avatar>
            <div v-if="
            avatar && 
            avatar.value && 
            avatar.value.thumbnail" 
            id="channel-avatar">
                <img :src="avatar.value.thumbnail.url" loading="lazy">
            </div>
        </template>

        <template v-slot:label>
            <label id="channel-title">
                <div v-if="
                avatar &&
                avatar.value &&
                avatar.value.title">
                    {{ avatar.value.title }}
                </div>
                <div v-else> {{ backupTitle.replace('@','') }} </div>
                <div id="channel-name" v-if="showName"> 
                    {{ avatar.name }}
                </div>
            </label>
        </template>

    </AvatarLabel>
</template>

<script>
import AvatarLabel from "./base/AvatarLabel.vue";
export default {
    name: "LGAvatarLabel",
    components: {
        AvatarLabel
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
            backupTitle: ''
        }
    },
    mounted() {
        if (this.avatar.name) {
            this.backupTitle = this.avatar.name.split('').join('')
        }
    },
    methods: {
        gotoChannelView() {
            this.$router.push({
                name: 'search',
                query: {
                    q: this.avatar.name,
                    qt: 'channel',
                    st: 'video',
                    p: 1
                }
            })
        }
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