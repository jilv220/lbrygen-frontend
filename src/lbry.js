const r = require('request');
const lbry = {}
const url = 'http://127.0.0.1:5279/lbryapi'

const _request = (method_name, params) => {
    const options = {
      url: url,
      method: 'POST',
      body: {
        method: method_name
      },
      json: true
    }
  
    if (params) {
      options.body.params = params
    }
  
    let requestPromise = new Promise((resolve, reject) => {
      const callback = (error, response, body) => {
        if (error)
          reject(error);
        else
          resolve(body)
      }
      r.post(options, callback)
    })
  
    return requestPromise
}

// tag = request.args.get("t")
// text = request.args.get("q")
// page_num = request.args.get("p")
// stream_type = request.args.get("st")
// channel = request.args.get("c")

// #print("param tag is : " + str(tag))
// #print("param text is : " + str(text))
// #print("param text is : " + str(page_num))
// #print("param channel is : " + str(channel))

// params = {  "method": "claim_search", 
//             "params": { "any_tags": [ str(tag) if tag != None else "" ], 
//                         "text": str(text) if text !=None else "",
//                         "page": int(page_num) if page_num !=None else 1,
//                         "page_size": page_size,
//                         "stream_types": [ str(stream_type) if stream_type!=None else "video" ],
//                         "order_by" : "release_time",
//                         "no_totals" : True}}

// # handle channel seperately                
// if channel != None:
//     params["params"]["channel"] = channel

// claim_search = requests.post(f'{base}:{lbry_port}', json = params).json()

// #print(type(claim_search))
// #print(claim_search.keys())

// return claim_search

lbry.claim_search = (uri) => {
    const method = "claim_search"
    const params = {
      any_tags: []
    }
    return _request(method, params)
  }

module.exports = lbry