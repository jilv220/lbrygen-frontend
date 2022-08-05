import { defineStore } from 'pinia'

const searchModel = {
    searchType: '',
    searchContent: '',
    streamType: '',
    currPage: '1',
    sourceData: null,
    channelData: null
}

export const useSearchStore = defineStore (
    'search', 
    {
        state: () => ({
            search: searchModel
        }),
        getters: {
            getSearchType: (state) => state.search.searchType,
            getSearchContent: (state) => state.search.searchContent,
            getStreamType: (state) => state.search.streamType,
            getCurrPage: (state) => state.search.currPage,
            getSourceData: (state) => state.search.sourceData,
            getChannelData: (state) => state.search.channelData
        },
        actions: {
            init() {
                this.search.searchType = 'tag'
                this.search.searchContent = ''
                this.search.streamType = 'video'
                this.search.currPage = '1'
            },
            initFilter() {
                this.search.searchType = 'tag'
                this.search.streamType = 'video'
            },
            storeSearchContent(searchContent: string) {
                this.search.searchContent = searchContent
            },
            storeCurrPage(currPage: string) {
              this.search.currPage = currPage  
            },
            storeFilterInfo(searchType: string, streamType: string) {
                this.search.searchType = searchType
                this.search.streamType = streamType
            },
            storeSourceData(sourceData: any) {
                this.search.sourceData = sourceData
            },
            storeChannelData(channelData: any) {
                this.search.channelData = channelData
            }
        }
        
    }
)