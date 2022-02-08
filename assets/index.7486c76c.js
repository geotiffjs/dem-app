var j=Object.defineProperty;var M=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var L=(a,e,t)=>e in a?j(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,E=(a,e)=>{for(var t in e||(e={}))B.call(e,t)&&L(a,t,e[t]);if(M)for(var t of M(e))F.call(e,t)&&L(a,t,e[t]);return a};import{c as V,G as W,W as G,a as O,o as R,T as q,b as K,M as Z,d as J,V as Q,e as u,f as c,r as X,g as i,t as x,h as Y,i as w,w as f,v as $,j as g,k as m,F as I,l as H,m as h,p as ee,n as te,q as U,s as ae,u as se}from"./vendor.a0180028.js";const le=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerpolicy&&(n.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?n.credentials="include":s.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}};le();function A(a,e,t){return["/",["-",a,["var",e]],["-",["var",t],["var",e]]]}function d(a=0,e=0){return a===0&&e===0?["band",1]:["band",1,a,e]}function ie(a){return["-",a,["%",a,1]]}function k(a,e){return["abs",["-",a,e]]}function _(a,e,t){return ie(["/",["+",a,["var",e]],["var",t]])}function ne(a,e,t="offset",o="spacing",s="min",n="max"){return["case",["between",d(),["var",s],["var",n]],["palette",["*",["*",["clamp",["+",k(_(d(),t,o),_(d(1,0),t,o)),k(_(d(),t,o),_(d(0,1),t,o))],0,1],A(d(),s,n)],a.length+1],[[0,0,0,0],...a]],["color",0,0,0,0]]}function oe(a,e="vert",t="sunEl",o="sunAz"){const s=["*",3e-5,["var",e]],n=["*",2,["resolution"]],r=["*",s,d(-1,0)],l=["*",s,d(1,0)],b=["/",["-",l,r],n],D=["*",s,d(0,-1)],N=["*",s,d(0,1)],z=["/",["-",N,D],n],C=["atan",["^",["+",["^",b,2],["^",z,2]],.5]],P=["clamp",["atan",["-",0,b],z],-Math.PI,Math.PI],S=["*",Math.PI/180,["var",t]],T=["*",Math.PI/180,["var",o]],y=["+",["*",["sin",S],["cos",C]],["*",["*",["cos",S],["sin",C]],["cos",["-",T,P]]]];return["color",["*",255,y],["*",255,y],["*",255,y],["match",d(),0,0,1]]}function re(a,e,t="min",o="max"){return["case",["between",d(),["var",t],["var",o]],["palette",["*",A(d(),t,o),a.length],a],["color",0,0,0,0]]}var p=(a,e)=>{const t=a.__vccOpts||a;for(const[o,s]of e)t[o]=s;return t};const ue={props:{variables:Object},async mounted(){await this.initiateMap()},computed:{renderVariables(){if(this.variables.visualization=="relief")return{vert:this.variables.vert,sunEl:this.variables.sunEl,sunAz:this.variables.sunAz};if(this.variables.visualization=="contours")return{offset:this.variables.offset,spacing:this.variables.spacing,min:this.variables.min,max:this.variables.max};if(this.variables.visualization=="shaded")return{min:this.variables.min,max:this.variables.max}},renderStyle(){if(this.variables.visualization=="relief")return oe(-9999,"vert","sunEl","sunAz");if(this.variables.visualization=="contours"){const a=V({colormap:this.variables.colorscale,format:"rgba",nshades:16});return ne(a,-9999,"offset","spacing","min","max")}else if(this.variables.visualization=="shaded"){const a=V({colormap:this.variables.colorscale,format:"rgba",nshades:16});return re(a,-9999,"min","max")}}},watch:{"variables.visualization"(){this.demLayer.styleVariables_=this.renderVariables,this.demLayer.setStyle({color:this.renderStyle,variables:this.renderVariables})},"variables.colorscale"(){this.variables.visualization!=="relief"&&(this.demLayer.styleVariables_=this.renderVariables,this.demLayer.setStyle({color:this.renderStyle,variables:this.renderVariables}))},renderVariables(a){this.demLayer.updateStyleVariables(a)},"variables.tiffUrl"(a){this.resetDemLayer()}},methods:{createDemSource(a){if(!a)return null;const e=new W({normalize:!1,sources:[{url:a,nodata:-9999}]});return e.setAttributions("European Environment Agency (EAA)"),e},async resetDemLayer(){const a=this.createDemSource(this.variables.tiffUrl);if(this.demLayer?this.demLayer.setSource(a):(this.demLayer=new G({source:a,style:{variables:this.renderVariables,color:this.renderStyle}}),this.map.addLayer(this.demLayer)),a!==null){const e=await a.getView();this.map.getView().fit(e.extent)}},async initiateMap(){const a=await fetch("https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml"),e=new O().read(await a.text()),t="s2cloudless-2020",o=e.Contents.Layer.filter(r=>r.Identifier===t)[0].Abstract,s=R(e,{layer:t,matrixSet:"EPSG:4326"}),n=new q({source:new K(E({attributions:o},s))});this.map=new Z({target:this.$refs.map,controls:J({attribution:!0}),layers:[n],view:new Q({projection:"EPSG:4326",center:[0,0],zoom:2})}),this.resetDemLayer()}}},de={id:"map",ref:"map"};function ce(a,e,t,o,s,n){return u(),c("div",de,[X(a.$slots,"default")],512)}var me=p(ue,[["render",ce]]);const ve={props:{modelValue:Number,label:String,min:Number,max:Number,step:Number},methods:{handleInput(a){this.$emit("update:modelValue",parseInt(a.target.value))}}},be={class:"mui-textfield",style:{display:"flex"}},fe=["value","min","max","step"],he=["value","min","max","step"];function _e(a,e,t,o,s,n){return u(),c("div",be,[i("input",{value:t.modelValue,type:"range",min:t.min,max:t.max,step:t.step,style:{cursor:"initial","flex-grow":"2"},onInput:e[0]||(e[0]=(...r)=>n.handleInput&&n.handleInput(...r))},null,40,fe),i("input",{value:t.modelValue,type:"number",min:t.min,max:t.max,step:t.step,style:{width:"auto","flex-grow":"0","margin-left":"20px"},onInput:e[1]||(e[1]=(...r)=>n.handleInput&&n.handleInput(...r))},null,40,he),i("label",null,x(t.label),1)])}var pe=p(ve,[["render",_e],["__scopeId","data-v-1fb7a1ba"]]);const ye={props:{tiffUrl:String,variables:Object},components:{InputSlider:pe},data(){return{availableColormaps:Object.keys(Y).sort()}},mounted(){this.renderColorscalePreview()},methods:{renderColorscalePreview(){const a=this.variables.colorscale,e=this.$refs["colormap-preview"];if(e){const t=e.getContext("2d"),o=48,s=V({colormap:a,nshades:o,format:"rgbaString"});e.width=480,e.height=90;for(let n=0;n<o;n++)t.fillStyle=s[n],t.fillRect(n*10,0,10,90)}}},watch:{"variables.visualization"(a){a!=="relief"&&this.$nextTick(()=>{this.renderColorscalePreview()})},"variables.colorscale"(){this.renderColorscalePreview()}}},v=a=>(ee("data-v-1037a332"),a=a(),te(),a),Ve={class:"container mui-panel mui-container mui-form"},xe=v(()=>i("legend",null,"Visualization Settings",-1)),we={class:"mui-textfield"},ge=v(()=>i("label",null,"URL",-1)),ze={class:"mui-select"},Ce=v(()=>i("option",{value:"relief"},"Relief",-1)),Se=v(()=>i("option",{value:"contours"},"Contours",-1)),Me=v(()=>i("option",{value:"shaded"},"Shaded",-1)),Le=[Ce,Se,Me],Ee=v(()=>i("label",null,"Mode",-1)),Ie={key:0},He={key:1},Ue={class:"mui-row"},Ae={class:"mui-col-md-4"},ke={class:"mui-select"},De=["value"],Ne=v(()=>i("label",null," Colorscale ",-1)),Pe={class:"mui-col-md-8"},Te={ref:"colormap-preview",style:{width:"100%"}},je={key:2},Be={class:"mui-row"},Fe={class:"mui-col-md-4"},We={class:"mui-select"},Ge=["value"],Oe=v(()=>i("label",null," Colorscale ",-1)),Re={class:"mui-col-md-8"},qe={ref:"colormap-preview",style:{width:"100%"}};function Ke(a,e,t,o,s,n){const r=w("input-slider");return u(),c("div",Ve,[xe,i("div",we,[ge,f(i("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>t.variables.tiffUrl=l),type:"text"},null,512),[[$,t.variables.tiffUrl]])]),i("div",ze,[f(i("select",{"onUpdate:modelValue":e[1]||(e[1]=l=>t.variables.visualization=l)},Le,512),[[g,t.variables.visualization]]),Ee]),t.variables.visualization=="relief"?(u(),c("div",Ie,[m(r,{modelValue:t.variables.vert,"onUpdate:modelValue":e[2]||(e[2]=l=>t.variables.vert=l),label:"Vertical Exaggeration",min:1,max:5},null,8,["modelValue"]),m(r,{modelValue:t.variables.sunEl,"onUpdate:modelValue":e[3]||(e[3]=l=>t.variables.sunEl=l),label:"Sun Elevation",min:0,max:90},null,8,["modelValue"]),m(r,{modelValue:t.variables.sunAz,"onUpdate:modelValue":e[4]||(e[4]=l=>t.variables.sunAz=l),label:"Sun Azimuth",min:0,max:360},null,8,["modelValue"])])):t.variables.visualization=="contours"?(u(),c("div",He,[i("div",Ue,[i("div",Ae,[i("div",ke,[f(i("select",{"onUpdate:modelValue":e[5]||(e[5]=l=>t.variables.colorscale=l)},[(u(!0),c(I,null,H(s.availableColormaps,l=>(u(),c("option",{key:l,value:l},x(l),9,De))),128))],512),[[g,t.variables.colorscale]]),Ne])]),i("div",Pe,[i("canvas",Te,null,512)])]),m(r,{modelValue:t.variables.offset,"onUpdate:modelValue":e[6]||(e[6]=l=>t.variables.offset=l),label:"Offset",min:0,max:200},null,8,["modelValue"]),m(r,{modelValue:t.variables.spacing,"onUpdate:modelValue":e[7]||(e[7]=l=>t.variables.spacing=l),label:"Spacing",min:0,max:500},null,8,["modelValue"]),m(r,{modelValue:t.variables.min,"onUpdate:modelValue":e[8]||(e[8]=l=>t.variables.min=l),label:"Elevation Minimum",min:0,max:8800},null,8,["modelValue"]),m(r,{modelValue:t.variables.max,"onUpdate:modelValue":e[9]||(e[9]=l=>t.variables.max=l),label:"Elevation Maximum",min:0,max:8800,step:10},null,8,["modelValue"])])):t.variables.visualization=="shaded"?(u(),c("div",je,[i("div",Be,[i("div",Fe,[i("div",We,[f(i("select",{"onUpdate:modelValue":e[10]||(e[10]=l=>t.variables.colorscale=l)},[(u(!0),c(I,null,H(s.availableColormaps,l=>(u(),c("option",{key:l,value:l},x(l),9,Ge))),128))],512),[[g,t.variables.colorscale]]),Oe])]),i("div",Re,[i("canvas",qe,null,512)])]),m(r,{modelValue:t.variables.min,"onUpdate:modelValue":e[11]||(e[11]=l=>t.variables.min=l),label:"Elevation Minimum",min:0,max:8800},null,8,["modelValue"]),m(r,{modelValue:t.variables.max,"onUpdate:modelValue":e[12]||(e[12]=l=>t.variables.max=l),label:"Elevation Maximum",min:0,max:8800,step:10},null,8,["modelValue"])])):h("",!0)])}var Ze=p(ye,[["render",Ke],["__scopeId","data-v-1037a332"]]);const Je={name:"App",components:{Map:me,DemControl:Ze},data(){return{variables:{tiffUrl:"./src/assets/Copernicus_DSM_30_N03_00_E016_00_DEM.tif",visualization:"shaded",colorscale:"jet",min:360,max:700,offset:0,spacing:100,vert:1,sunEl:45,sunAz:45},showControls:window.innerWidth>700}}},Qe={id:"dem-control"},Xe={class:"ol-control",style:{top:"0",right:"0"}},Ye=i("svg",{style:{width:"24px",height:"24px"},viewBox:"0 0 24 24"},[i("path",{fill:"currentColor",d:"M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"})],-1),$e=[Ye],et=i("svg",{style:{width:"24px",height:"24px"},viewBox:"0 0 24 24"},[i("path",{fill:"currentColor",d:"M20,14H4V10H20"})],-1),tt=[et];function at(a,e,t,o,s,n){const r=w("DemControl"),l=w("Map");return u(),U(l,{variables:s.variables},{default:ae(()=>[i("aside",Qe,[i("div",Xe,[s.showControls?h("",!0):(u(),c("button",{key:0,id:"expand-control",class:"mui-btn mui-btn--primary",onClick:e[0]||(e[0]=b=>s.showControls=!0)},$e))]),s.showControls?(u(),U(r,{key:0,variables:s.variables},null,8,["variables"])):h("",!0),s.showControls?(u(),c("button",{key:1,id:"contract-control",class:"mui-btn",onClick:e[1]||(e[1]=b=>s.showControls=!1)},tt)):h("",!0)])]),_:1},8,["variables"])}var st=p(Je,[["render",at]]);se(st).mount("#app");
