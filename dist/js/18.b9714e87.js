"use strict";(self["webpackChunklbrygen_frontend"]=self["webpackChunklbrygen_frontend"]||[]).push([[18],{59:function(e,a,t){t.r(a),t.d(a,{default:function(){return S}});var n=t(3396),s=t(7139);const r={id:"content",class:"mx-10 pt-20 overflow-hidden"},l={key:0,class:"flex-y-start pb-4"},i={id:"cover-wrapper",class:"flex-x flex-1"},c=["src"],u={key:1},o={class:"p-3 text-left w-full bg-dark"},h={id:"channel-desc",class:"text-left pb-5"},d=["innerHTML"],g={key:1},v={key:0},m={key:1},p={key:0,id:"tag-group",class:"flex-x row-start-6"},y=["onClick"],D=["onClick"],k=["onClick"],w={key:2},b={class:"font-heavy"},f={class:"btn-group flex-x-center my-4"};function x(e,a,t,x,q,_){const T=(0,n.up)("LGAvatarLabel"),C=(0,n.up)("SearchItem");return(0,n.wg)(),(0,n.iD)("div",r,["channel"==q.queryType&&q.channelData&&q.channelData.result&&q.channelData.result[q.channelName]&&q.channelData.result[q.channelName].value?((0,n.wg)(),(0,n.iD)("div",l,[(0,n._)("div",i,[q.channelData.result[q.channelName].value.cover?((0,n.wg)(),(0,n.iD)("img",{key:0,src:q.channelData.result[q.channelName].value.cover.url,loading:"lazy",id:"cover",class:"rounded"},null,8,c)):((0,n.wg)(),(0,n.iD)("div",u))]),(0,n._)("div",o,[(0,n.Wm)(T,{class:"pb-3",avatar:q.channelData.result[q.channelName],showName:!0},null,8,["avatar"]),(0,n._)("div",h,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(q.descList,((e,a)=>((0,n.wg)(),(0,n.iD)("div",{key:a},[(0,n._)("span",{innerHTML:_.linkify(e)},null,8,d)])))),128))]),(0,n._)("button",{id:"expand-btn",class:"text-green pt-3",onClick:a[0]||(a[0]=e=>_.expandDesc("channel-desc"))},"More")])])):(0,n.kq)("",!0),q.sourceData?((0,n.wg)(),(0,n.iD)("div",g,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(q.sourceData.result.items,(e=>((0,n.wg)(),(0,n.iD)("li",{key:e},[(0,n.Wm)(C,{thumbnail:e.value.thumbnail,streamUrl:e.short_url,avatar:e.signing_channel},{center:(0,n.w5)((()=>[e.value.title?((0,n.wg)(),(0,n.iD)("div",v,(0,s.zw)(e.value.title),1)):((0,n.wg)(),(0,n.iD)("div",m,(0,s.zw)(e.name),1))])),rear:(0,n.w5)((()=>[e.value.tags?((0,n.wg)(),(0,n.iD)("div",p,[e.value.tags[0]?((0,n.wg)(),(0,n.iD)("div",{key:0,class:"badge tag-spacing rounded-md",onClick:a=>_.queryTag(e.value.tags[0])},(0,s.zw)(e.value.tags[0]),9,y)):(0,n.kq)("",!0),e.value.tags[1]?((0,n.wg)(),(0,n.iD)("div",{key:1,class:"badge tag-spacing rounded-md",onClick:a=>_.queryTag(e.value.tags[1])},(0,s.zw)(e.value.tags[1]),9,D)):(0,n.kq)("",!0),e.value.tags[2]?((0,n.wg)(),(0,n.iD)("div",{key:2,class:"badge rounded-md",onClick:a=>_.queryTag(e.value.tags[2])},(0,s.zw)(e.value.tags[2]),9,k)):(0,n.kq)("",!0)])):(0,n.kq)("",!0)])),_:2},1032,["thumbnail","streamUrl","avatar"])])))),128))])):(0,n.kq)("",!0),q.sourceData&&q.sourceData.result?((0,n.wg)(),(0,n.iD)("div",w,[(0,n._)("p",b,(0,s.zw)(this.currPage),1),(0,n._)("div",f,[(0,n._)("button",{class:"btn",onClick:a[1]||(a[1]=e=>_.firstPage())},"First"),(0,n._)("button",{class:"btn",onClick:a[2]||(a[2]=e=>_.prevPage())},"Prev"),(0,n._)("button",{class:"btn",onClick:a[3]||(a[3]=e=>_.nextPage())},"Next")])])):(0,n.kq)("",!0)])}var q=t(6801),_=t(8910),T=t(9715),C=t(9932),P={components:{SearchItem:_.Z,LGAvatarLabel:C.Z},setup(){const e=(0,q.R)();return{search:e}},props:{currPage:String},data(){return{sourceData:void 0,channelData:void 0,channelName:"",descList:[""],shouldExpand:!0,queryType:this.$route.query.qt}},mounted(){this.search.$onAction((({name:e,after:a})=>{a((()=>{if("storeSourceData"==e&&(this.sourceData=this.search.getSourceData),"storeChannelData"==e){this.channelData=this.search.getChannelData,this.channelName=this.$route.query.q;let e=this.channelData.result[this.channelName];e.value&&e.value.description&&(this.descList=e.value.description.split("\n"))}}))}))},methods:{linkify:T.N,navigateToSearch(){this.$router.push({name:"search",query:{q:this.$route.query.q,qt:this.search.getSearchType,st:this.search.getStreamType,p:this.search.getCurrPage}})},expandDesc(e){this.shouldExpand?(document.getElementById("expand-btn").innerHTML="Less",document.getElementById(e).style.overflow="unset",document.getElementById(e).style.maxHeight="unset"):(document.getElementById("expand-btn").innerHTML="More",document.getElementById(e).style.overflow="hidden",document.getElementById(e).style.maxHeight="10em"),this.shouldExpand=!this.shouldExpand},firstPage(){this.search.resetPage(),this.navigateToSearch()},prevPage(){this.search.prevPage(),this.navigateToSearch()},nextPage(){this.search.nextPage(),this.navigateToSearch()},queryTag(e){this.$router.push({name:"search",query:{q:e,qt:"tag",st:"video",p:"1"}})}}},L=t(89);const N=(0,L.Z)(P,[["render",x],["__scopeId","data-v-6999f532"]]);var S=N}}]);
//# sourceMappingURL=18.b9714e87.js.map