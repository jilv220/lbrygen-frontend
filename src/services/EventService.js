import axios from "axios"

const base_api = 'http://localhost:5000/api'
export default {

  async getStreamByUrl(url) {
    let res = await axios.get(`${base_api}/getStream?url=${url}`);
    return res.data;
  },

  async downloadFromStream(url) {
    let res = await axios.get(`${base_api}/getStream?url=${url}`, { params: { d: "y" } });
    return res.data;
  },

  async getContent(type, streamType, content, pageNum = 1) {

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
    }

    let params = { p: pageNum, st: streamType}

    let res = await axios.get(`${base_api}/search?${queryType}=${content}`, { params: params } )
    return res.data 
  },
  
}