import { defineStore } from 'pinia'

const globalModel = {
    channelData: null
}

export const useGlobalStore = defineStore (
    'gloabl', 
    {
        state: () => ({
            global: globalModel
        }),
        getters: {
            getChannelData: (state) => state.global.channelData
        },
        actions: {
            storeChannelData(channelData: any) {
                this.global.channelData = channelData
            }
        }
        
    }
)