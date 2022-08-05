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

  async getContent(type: any, streamType: any, content: string | any[], 
                        pageNum = 1, pageSize = 18, order = 'release_time') {

    let queryType = ''

    //console.log(content)

    const params: any = { 
      p: pageNum, 
      ps: pageSize, 
      st: streamType,
      o: order
    }

    if (Array.isArray(content)) {

      if (content.length > 5) {
        params['t'] = content.slice(0,6)
      } else {
        params['t'] = content
      }

    } else {

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
      }
      params[queryType] = content
    }

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