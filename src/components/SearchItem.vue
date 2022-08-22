<template>
    <div class="flex-x items-stretch">

        <div class="avatar">
            <div id="thumbnail" class="rounded">
                <TriFallbackImg v-if="thumbnail"
                    :originURI="optimizedThumbnail"
                    :backupURI="backupThumbnail"
                    fallbackURI='spaceman.png'>
                </TriFallbackImg>
                <img v-else src='../assets/spaceman.png'>
            </div>
        </div>

        <div id="streaming-url-wrapper" class="flex-1 grid">

            <label id="streaming-url">
                <slot name="center"></slot>
            </label>

            <LGAvatarLabel
            id="streaming-avatar-label"
            :showAvatar="this.showAvatar"
            :avatar="this.avatar">
            </LGAvatarLabel>

        </div>

        <div id="search-result-rear" class="self-end">
            <slot name="rear"></slot>
        </div>

    </div>
    <div class="divider h-0"></div>
</template>

<script>
import LGAvatarLabel from "./LGAvatarLabel.vue"
import { THUMBNAIL_OPTIMIZE } from '@/constants/env'
import TriFallbackImg from "./base/TriFallbackImg.vue"
export default {
    components: {
        LGAvatarLabel,
        TriFallbackImg
    },
    props: {
        thumbnail: Object,
        avatar: Object,
        showAvatar: {
            default: true,
            type: Boolean
        },
    },
    data() {
        return {
            backupThumbnail: '',
            optimizedThumbnail: '',
        }
    },
    mounted() {
        if (this.thumbnail &&
            this.thumbnail.url) {
            this.optimizedThumbnail = THUMBNAIL_OPTIMIZE + this.thumbnail.url
            this.backupThumbnail = this.thumbnail.url
        }
    }
}
</script>

<style lang="scss">
#search-result-rear {
    align-content: center;
}

#streaming-url-wrapper {
    padding-left: calc(3rem/2);
    width: 300px;
    text-align: start;
    align-self: flex-start;
    font-size: 1rem;
    font-weight: 700;  
}

#streaming-url {
    cursor: pointer;

    /* Standard way to clamp */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

#thumbnail {
    width: 13.75rem;
    height: calc(13.75rem / 1.7);
}

/* md screen */
@media (max-width: 960px) {
    #search-result-rear {
        display: none;
    }
}

@media (max-width: 960px) {
    #thumbnail {
        width: calc(12rem * 1.2 * 0.66);
        height: calc(12rem * 0.6 * 0.77);
    }
    #content {
        margin-right: 1rem;
        margin-left: 1rem;
    }
    #streaming-url {
        -webkit-line-clamp: 2;
    }
    #streaming-avatar-label {
        #base-label {
            @apply line-clamp-1
        }
    }
}
</style>