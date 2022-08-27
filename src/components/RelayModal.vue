<template>
    <BaseModal modalID="relay-modal">
        <template v-slot:modal-btn-icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path
                    d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
            </svg>
        </template>
        <template v-slot:modal-content>

            <div class="bg-neutral p-6 min-w-60vw max-w-full">
                <div class="flex flex-start">
                    Host: {{ activeRelay.host }}
                </div>

                <div class="flex flex-row justify-between items-center py-4" id="relay-refresh">
                    <div>Volunteer relay peers: </div>
                    <IconBtn @click="loadRelays()">
                        <template v-slot:btn-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4.5 12c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 48.678 48.678 0 017.324 0 4.006 4.006 0 013.7 3.7c.017.22.032.441.046.662M4.5 12l-3-3m3 3l3-3m12 3c0 1.232-.046 2.453-.138 3.662a4.006 4.006 0 01-3.7 3.7 48.657 48.657 0 01-7.324 0 4.006 4.006 0 01-3.7-3.7c-.017-.22-.032-.441-.046-.662M19.5 12l-3 3m3-3l3 3" />
                            </svg>
                        </template>
                    </IconBtn>
                </div>

                <div class="flex flex-col">
                    <div v-for="relay in relays" :key="relay" :class="{ active: relay.host == activeRelay.host }"
                        :style="{ order: relay.ping }">

                        <div class="flex flex-row justify-between p-1 cursor-pointer" @click="setPeer(relay.url)">
                            <div class="underline text-justify md:truncate md:w-56"> {{ relay.host }} </div>
                            <div> {{ relay.ping }} ms </div>
                        </div>
                    </div>
                </div>
            </div>

        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
import IconBtn from "./base/IconBtn.vue"

import { useRelays } from "@/lib/gun/useRelays";
import { useRelay } from "@/lib/gun/useRelay";
import { onMounted } from "vue";

// eslint-disable-next-line
const { relay: activeRelay, setPeer } = useRelay() as any 
const { relays, loadRelays } = useRelays() as any

onMounted(() => {
    loadRelays()
})
</script>

<style lang="scss">
.active {
  @apply text-lg bg-secondary font-bold
}
#relay-refresh {

    .p-0 {
        padding: 6px
    }

    .btn {
        border-radius: 0.75rem;
    }
}
</style>