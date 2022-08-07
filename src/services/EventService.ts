import axios from "axios"
import { API_PROD } from '@/constants/env'
import Logger from "@/utils/Logger";
const qs = require('qs');

// const base_api = `http://localhost:5000/api`
const base_api = API_PROD
const logger = new Logger('EventService')

export default {

  async getStreamByUrl(url: string) {
    const res = await axios.get(`${base_api}/getStream?url=${url}`);
    return res.data;
  },

  async downloadFromStream(url: string) {
    const res = await axios.get(`${base_api}/getStream?url=${url}`, { params: { d: 'y' } });
    return res.data;
  },

  async getContent(type: any, streamType: any, queryContent: string | string[], 
                        pageNum = 1, pageSize = 20, order = 'release_time') {

    const params: any = { 
      p: pageNum, 
      ps: pageSize, 
      st: streamType,
      o: order,
      t: undefined,
      q: undefined,
      c: undefined,
      chs: undefined
    }

    let queryType = ''
    switch (type) {
      case "tag":
        queryType = 't'
        break
      case "text":
        queryType = 'q'
        break
      case "channel":
        queryType = 'c'
        break
      case "channelIds":
        queryType = 'chs'
        break
    }

    if (queryType === 'chs' 
    &&  Array.isArray(queryContent)) {
      queryContent = queryContent.slice(0,19)
    }
    params[queryType] = queryContent
    
    // Insert some kind of trending algorithm
    logger.log(params)

    const res = 
    await axios.get( `${base_api}/search`,
    { 
        params: params,
        paramsSerializer: params => {
          return qs.stringify(params)
        }
    })

    return res.data 
  },

  async getChannels() {
    const res = await axios.get(`${base_api}/get`)
    return res.data
  },

  async resolveClaimSingle(curl: string) {
    const res = await axios.get(`${base_api}/resolveSingle?curl=${curl}`);
    return res.data;
  },

  async getDaemonStatus() {
    const res = await axios.get(`${base_api}/status`)
    return res.data 
  }
  
}