"use strict";(self["webpackChunklbrygen_electron"]=self["webpackChunklbrygen_electron"]||[]).push([[910],{166:function(e,a,t){t.d(a,{o:function(){return n}});var r=t(8650),s=t(7764);let i={url:"",desc:"",title:"",tags:[""]};const n=(0,r.Q_)("stream",{state:()=>({stream:i}),getters:{getStreamUrl:e=>e.stream.url,getStreamDesc:e=>e.stream.desc,getStreamTitle:e=>e.stream.title,getStreamTags:e=>e.stream.tags},actions:{async requestStream(e){s.Z.getStreamByUrl(e).then((e=>{this.stream.url=e.streaming_url,void 0!==e.metadata&&(void 0!==e.metadata.description?this.stream.desc=e.metadata.description:this.stream.desc="No video description found.",void 0!==e.metadata.title?this.stream.title=e.metadata.title:this.stream.title=e.metadata.source.name,void 0!==e.metadata.tags&&(this.stream.tags=Object.values(e.metadata.tags)))}))}}})},1947:function(e,a,t){t.d(a,{Z:function(){return _}});var r=t(3396);const s={class:"flex-x items-stretch"},i={class:"avatar"},n={id:"thumbnail",class:"rounded"},l=["src"],c={id:"streaming-url-wrapper",class:"flex-1 grid"},u={class:"flex-x-start mt-2"},g={key:0,id:"channel-avatar-wrapper",class:"avatar mr-2"},o={id:"channel-avatar",class:"rounded-full"},d=["src"],h={key:1},v={id:"channel-name"},m={id:"search-result-rear",class:"grid grid-rows-6"},w=(0,r._)("div",{class:"divider h-0"},null,-1);function k(e,a,t,k,p,y){return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",s,[(0,r._)("div",i,[(0,r._)("div",n,[t.thumbnail?((0,r.wg)(),(0,r.iD)("img",{key:0,src:t.thumbnail.url},null,8,l)):(0,r.kq)("",!0)])]),(0,r._)("div",c,[(0,r._)("label",{id:"streaming-url",onClick:a[0]||(a[0]=e=>y.getStream(t.streamUrl))},[(0,r.WI)(e.$slots,"center")]),(0,r._)("div",u,[t.showAvatar?((0,r.wg)(),(0,r.iD)("div",g,[(0,r._)("div",o,[t.avatar&&t.avatar.value&&t.avatar.value.thumbnail?((0,r.wg)(),(0,r.iD)("img",{key:0,src:t.avatar.value.thumbnail.url,loading:"lazy"},null,8,d)):(0,r.kq)("",!0)])])):((0,r.wg)(),(0,r.iD)("div",h)),(0,r._)("label",v,[(0,r.WI)(e.$slots,"center-sub")])])]),(0,r._)("div",m,[(0,r.WI)(e.$slots,"rear")])]),w],64)}var p=t(166),y={props:{thumbnail:Object,streamUrl:String,avatar:Object,showAvatar:{default:!0,type:Boolean}},setup(){const e=(0,p.o)();return{stream:e}},methods:{async getStream(e){window.scrollTo(0,0),this.stream.requestStream(e).then((()=>{this.$router.push({name:"stream",query:{url:e}})}))}}},b=t(89);const D=(0,b.Z)(y,[["render",k]]);var _=D},910:function(e,a,t){t.r(a),t.d(a,{default:function(){return S}});var r=t(3396),s=t(7139);const i={id:"content",class:"mx-10 pt-20 overflow-hidden"},n={key:0},l={key:0},c={key:1},u={key:0},g={key:1},o={key:0,id:"tag-group",class:"flex-x row-start-6"},d=["onClick"],h=["onClick"],v=["onClick"],m={key:1},w={class:"font-heavy"},k={class:"btn-group flex-x-center my-4"};function p(e,a,t,p,y,b){const D=(0,r.up)("SearchItem");return(0,r.wg)(),(0,r.iD)("div",i,[y.sourceData&&y.sourceData.result?((0,r.wg)(),(0,r.iD)("div",n,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(y.sourceData.result.items,(e=>((0,r.wg)(),(0,r.iD)("li",{key:e},[(0,r.Wm)(D,{thumbnail:e.value.thumbnail,streamUrl:e.short_url,avatar:e.signing_channel},{center:(0,r.w5)((()=>[e.value.title?((0,r.wg)(),(0,r.iD)("div",l,(0,s.zw)(e.value.title),1)):((0,r.wg)(),(0,r.iD)("div",c,(0,s.zw)(e.name),1))])),"center-sub":(0,r.w5)((()=>[e.signing_channel&&e.signing_channel.value?((0,r.wg)(),(0,r.iD)("div",u,(0,s.zw)(e.signing_channel.value.title),1)):((0,r.wg)(),(0,r.iD)("div",g," Anonymous "))])),rear:(0,r.w5)((()=>[e.value.tags?((0,r.wg)(),(0,r.iD)("div",o,[e.value.tags[0]?((0,r.wg)(),(0,r.iD)("div",{key:0,class:"badge tag-spacing rounded-md",onClick:a=>b.queryTag(e.value.tags[0])},(0,s.zw)(e.value.tags[0]),9,d)):(0,r.kq)("",!0),e.value.tags[1]?((0,r.wg)(),(0,r.iD)("div",{key:1,class:"badge tag-spacing rounded-md",onClick:a=>b.queryTag(e.value.tags[1])},(0,s.zw)(e.value.tags[1]),9,h)):(0,r.kq)("",!0),e.value.tags[2]?((0,r.wg)(),(0,r.iD)("div",{key:2,class:"badge rounded-md",onClick:a=>b.queryTag(e.value.tags[2])},(0,s.zw)(e.value.tags[2]),9,v)):(0,r.kq)("",!0)])):(0,r.kq)("",!0)])),_:2},1032,["thumbnail","streamUrl","avatar"])])))),128))])):(0,r.kq)("",!0),y.sourceData&&y.sourceData.result?((0,r.wg)(),(0,r.iD)("div",m,[(0,r._)("p",w,(0,s.zw)(this.currPage),1),(0,r._)("div",k,[(0,r._)("button",{class:"btn",onClick:a[0]||(a[0]=e=>b.firstPage())},"First"),(0,r._)("button",{class:"btn",onClick:a[1]||(a[1]=e=>b.prevPage())},"Prev"),(0,r._)("button",{class:"btn",onClick:a[2]||(a[2]=e=>b.nextPage())},"Next")])])):(0,r.kq)("",!0)])}var y=t(6801),b=t(1947),D={components:{SearchItem:b.Z},setup(){const e=(0,y.R)();return{search:e}},props:{searchContent:String,queryType:String,streamType:String,currPage:String},data(){return{sourceData:""}},mounted(){this.sourceData=this.search.getSourceData,this.search.$subscribe(((e,a)=>{"search"==e.storeId&&(this.sourceData=a.search.sourceData)}))},methods:{navigateToSearch(){this.$router.push({name:"search",query:{q:this.searchContent,qt:this.search.getSearchType,st:this.search.getStreamType,p:this.search.getCurrPage}})},firstPage(){this.search.resetPage(),this.navigateToSearch()},prevPage(){this.search.prevPage(),this.navigateToSearch()},nextPage(){this.search.nextPage(),this.navigateToSearch()},queryTag(e){this.$router.push({name:"search",query:{q:e,qt:"tag",st:"video",p:"1"}})}}},_=t(89);const f=(0,_.Z)(D,[["render",p]]);var S=f}}]);
//# sourceMappingURL=910.bc64ba86.js.map