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
            <label id="channel-name">
                <div v-if="
                avatar &&
                avatar.value &&
                avatar.value.title">
                    {{ avatar.value.title }}
                </div>
                <div v-else> 
                    {{ avatar.name}}
                </div>
            </label>
        </template>

    </AvatarLabel>
</template>

<script>
import AvatarLabel from "./base/AvatarLabel.vue";
export default {
    components: {
        AvatarLabel
    },
    props: {
        avatar: Object,
        showAvatar: {
            default: true,
            type: Boolean
        },
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
    width: 2.1rem;
    height: 2.1rem;
    cursor: pointer !important;
}

#channel-name {
    font-size: 0.78rem;
    font-weight: 300;
    cursor: pointer !important;
}
</style>