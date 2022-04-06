import flask
import requests
import time as timer 
import os

from flask import request, jsonify
from flask_cors import CORS, cross_origin

# config flask
app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True

# global config
base = 'http://localhost'
lbry_port = 5279

page_size = 20

# api 
@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/api/search', methods=['GET'])
def api_search():

    tag = request.args.get("t")
    text = request.args.get("q")
    page_num = request.args.get("p")
    stream_type = request.args.get("st")
    channel = request.args.get("c")

    #print("param tag is : " + str(tag))
    #print("param text is : " + str(text))
    #print("param text is : " + str(page_num))
    #print("param channel is : " + str(channel))

    params = {  "method": "claim_search", 
                "params": { "any_tags": [ str(tag) if tag != None else "" ], 
                            "text": str(text) if text !=None else "",
                            "page": int(page_num) if page_num !=None else 1,
                            "page_size": page_size,
                            "stream_types": [ str(stream_type) if stream_type!=None else "video" ],
                            "order_by" : "release_time",
                            "no_totals" : True}}

    # handle channel seperately                
    if channel != None:
        params["params"]["channel"] = channel

    claim_search = requests.post(f'{base}:{lbry_port}', json = params).json()
    
    #print(type(claim_search))
    #print(claim_search.keys())
    
    return claim_search

@app.route('/api/getStream', methods=['GET'])
def get_stream_from_url():

    uri = request.args.get("url")
    #print(uri)

    download = request.args.get("d")
    #print(download)

    streaming_url = ""
    e = ""
    is_download = False

    if(download == "y"):
        is_download = True

    params = {  "method": "get", 
                "params": {"uri": str(uri), 
                           "save_file": is_download, 
                           "timeout": 10    }}

    if is_download: 
        params["params"]["file_name"] = str(uri).replace('lbry://', '')           

    lbry_get = requests.post(f'{base}:{lbry_port}', json = params).json()

    try:
        streaming_url = lbry_get["result"]["streaming_url"]
    except:
        e = lbry_get["result"]["error"]
        print(e)
    
    #download_path = lbry_get["result"]["download_path"]
    if e != "":
        return "error"

    #print(streaming_url)
    #print(download_path)

    return streaming_url

app.run()