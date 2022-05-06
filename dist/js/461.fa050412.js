(self["webpackChunklbrygen_frontend"]=self["webpackChunklbrygen_frontend"]||[]).push([[461],{166:function(a,t,e){"use strict";e.d(t,{o:function(){return l}});var r=e(8650),s=e(3852);let i={url:"",desc:"",title:"",claimId:"",claimName:"",avatar:Object,tags:[""]};const l=(0,r.Q_)("stream",{state:()=>({stream:i}),getters:{getStreamUrl:a=>a.stream.url,getStreamDesc:a=>a.stream.desc,getStreamTitle:a=>a.stream.title,getClaimId:a=>a.stream.claimId,getClaimName:a=>a.stream.claimName,getStreamTags:a=>a.stream.tags,getAvatar:a=>a.stream.avatar},actions:{async requestStream(a){s.Z.getStreamByUrl(a).then((a=>{this.stream.url=a.streaming_url,this.stream.claimId=a.claim_id,this.stream.claimName=a.claim_name,void 0!==a.metadata&&(void 0!==a.metadata.description?this.stream.desc=a.metadata.description:this.stream.desc="No video description found.",void 0!==a.metadata.title?this.stream.title=a.metadata.title:this.stream.title=a.metadata.source.name,void 0!==a.metadata.tags&&(this.stream.tags=Object.values(a.metadata.tags)))}))},storeChannelInfo(a){this.stream.avatar=a}}})},9715:function(a,t){t.N=a=>{let t=/(?![^<]*>|[^<>]*<\/)((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi,e=a.replace(t,'<a href="$1" target="_blank">$1</a>');return e}},5001:function(a,t,e){"use strict";e.d(t,{Z:function(){return A}});var r=e(3396),s=e(7139);const i={key:0,id:"channel-avatar"},l=["src"],n={id:"channel-title"},m={key:0},u={key:1,id:"channel-name"};function o(a,t,e,o,d,c){const h=(0,r.up)("AvatarLabel");return(0,r.wg)(),(0,r.j4)(h,{showAvatar:this.showAvatar,onClick:t[0]||(t[0]=a=>c.gotoChannelView())},{avatar:(0,r.w5)((()=>[e.avatar&&e.avatar.value&&e.avatar.value.thumbnail?((0,r.wg)(),(0,r.iD)("div",i,[(0,r._)("img",{src:e.avatar.value.thumbnail.url,loading:"lazy"},null,8,l)])):(0,r.kq)("",!0)])),label:(0,r.w5)((()=>[(0,r._)("label",n,[e.avatar&&e.avatar.value&&e.avatar.value.title?((0,r.wg)(),(0,r.iD)("div",m,(0,s.zw)(e.avatar.value.title),1)):(0,r.kq)("",!0),e.showName?((0,r.wg)(),(0,r.iD)("div",u,(0,s.zw)(e.avatar.name),1)):(0,r.kq)("",!0)])])),_:1},8,["showAvatar"])}const d={class:"flex-x-start mt-2"},c={key:0,class:"avatar mr-2"},h={id:"base-avatar",class:"rounded-full"},v={key:1},b={id:"base-label"};function g(a,t,e,s,i,l){return(0,r.wg)(),(0,r.iD)("div",d,[e.showAvatar?((0,r.wg)(),(0,r.iD)("div",c,[(0,r._)("div",h,[(0,r.WI)(a.$slots,"avatar")])])):((0,r.wg)(),(0,r.iD)("div",v)),(0,r._)("div",b,[(0,r.WI)(a.$slots,"label")])])}var p={props:{showAvatar:{default:!0,type:Boolean}}},w=e(89);const f=(0,w.Z)(p,[["render",g]]);var k=f,_={name:"LGAvatarLabel",components:{AvatarLabel:k},props:{avatar:Object,showAvatar:{default:!0,type:Boolean},showName:{default:!1,type:Boolean}},methods:{gotoChannelView(){this.$router.push({name:"search",query:{q:this.avatar.name,qt:"channel",st:"video",p:1}})}}};const y=(0,w.Z)(_,[["render",o],["__scopeId","data-v-dd2e6dea"]]);var A=y},8910:function(a,t,e){"use strict";e.d(t,{Z:function(){return w}});var r=e(3396);const s={class:"flex-x items-stretch"},i={class:"avatar"},l={id:"thumbnail",class:"rounded"},n=["src"],m={id:"streaming-url-wrapper",class:"flex-1 grid"},u={id:"search-result-rear",class:"grid grid-rows-6"},o=(0,r._)("div",{class:"divider h-0"},null,-1);function d(a,t,e,d,c,h){const v=(0,r.up)("LGAvatarLabel");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",s,[(0,r._)("div",i,[(0,r._)("div",l,[e.thumbnail?((0,r.wg)(),(0,r.iD)("img",{key:0,src:c.optimizedThumbnail,onError:t[0]||(t[0]=a=>h.useBackupThumbnail())},null,40,n)):(0,r.kq)("",!0)])]),(0,r._)("div",m,[(0,r._)("label",{id:"streaming-url",onClick:t[1]||(t[1]=a=>h.getStream(e.streamUrl))},[(0,r.WI)(a.$slots,"center")]),(0,r.Wm)(v,{showAvatar:this.showAvatar,avatar:this.avatar},null,8,["showAvatar","avatar"])]),(0,r._)("div",u,[(0,r.WI)(a.$slots,"rear")])]),o],64)}var c=e(166),h=e(5001),v=e(5737),b={components:{LGAvatarLabel:h.Z},props:{thumbnail:Object,streamUrl:String,avatar:Object,showAvatar:{default:!0,type:Boolean}},data(){return{backupThumbnail:"",optimizedThumbnail:""}},mounted(){this.thumbnail&&this.thumbnail.url&&(this.optimizedThumbnail=v.li+this.thumbnail.url,this.backupThumbnail=this.thumbnail.url)},setup(){const a=(0,c.o)();return{stream:a}},methods:{async getStream(a){this.stream.storeChannelInfo(this.avatar),this.stream.requestStream(a).then((()=>{this.$router.push({name:"stream",query:{url:a}})}))},useBackupThumbnail(){this.optimizedThumbnail=this.backupThumbnail}}},g=e(89);const p=(0,g.Z)(b,[["render",d]]);var w=p}}]);
//# sourceMappingURL=461.fa050412.js.map