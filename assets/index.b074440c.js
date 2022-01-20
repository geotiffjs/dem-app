var O=Object.defineProperty;var L=Object.getOwnPropertySymbols;var G=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var A=(a,t,e)=>t in a?O(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,E=(a,t)=>{for(var e in t||(t={}))G.call(t,e)&&A(a,e,t[e]);if(L)for(var e of L(t))W.call(t,e)&&A(a,e,t[e]);return a};import{c as S,G as M,W as B,a as q,o as R,T as K,b as H,M as J,d as Q,V as X,e as d,f as v,g as Y,h as s,w as r,v as m,i as y,t as u,F as f,r as V,j as Z,k as c,p as $,l as ee,m as C,n as D,q as te}from"./vendor.5f2e7337.js";const se=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}};se();const I=["band",1];function k(a,t,e){return["/",["-",a,["var",t]],["-",["var",e],["var",t]]]}function b(a,t){return["band",1,a,t]}function N(a){const t=1/a.length,e=[];e.push(0),e.push([0,0,0,0]);for(let l=0;l<a.length;++l)e.push(l*t),e.push(a[l]);return e.push(1),e.push([0,0,0,0]),e}function ae(a){return["-",a,["%",a,1]]}function T(a,t){return["abs",["-",a,t]]}function p(a,t,e){return ae(["/",["+",a,["var",t]],["var",e]])}function ie(a,t="offset",e="spacing",l="min",n="max"){return["interpolate",["linear"],["*",["clamp",["+",T(p(["band",1],t,e),p(b(1,0),t,e)),T(p(["band",1],t,e),p(b(0,1),t,e))],0,1],k(I,l,n)],...N(a)]}function ne(a="vert",t="sunEl",e="sunAz"){const l=["*",2,["resolution"]],n=["*",["var",a],b(-1,0)],o=["*",["var",a],b(1,0)],i=["/",["-",o,n],l],_=["*",["var",a],b(0,-1)],P=["*",["var",a],b(0,1)],z=["/",["-",P,_],l],w=["atan",["^",["+",["^",i,2],["^",z,2]],.5]],j=["clamp",["atan",["-",0,i],z],-Math.PI,Math.PI],U=["*",Math.PI/180,["var",t]],F=["*",Math.PI/180,["var",e]],h=["+",["*",["sin",U],["cos",w]],["*",["*",["cos",U],["sin",w]],["cos",["-",F,j]]]];return["color",["*",255,h],["*",255,h],["*",255,h]]}function le(a,t="min",e="max"){return["interpolate",["linear"],k(I,t,e),...N(a)]}var x=(a,t)=>{const e=a.__vccOpts||a;for(const[l,n]of t)e[l]=n;return e};const oe={props:{variables:Object,tiffUrl:String},async mounted(){await this.initiateMap()},computed:{renderVariables(){if(this.variables.visualization=="relief")return{vert:this.variables.vert,sunEl:this.variables.sunEl,sunAz:this.variables.sunAz};if(this.variables.visualization=="contours")return{offset:this.variables.offset,spacing:this.variables.spacing,min:this.variables.min,max:this.variables.max};if(this.variables.visualization=="shaded")return{min:this.variables.min,max:this.variables.max}},renderStyle(){if(this.variables.visualization=="relief")return ne("vert","sunEl","sunAz");if(this.variables.visualization=="contours"){const a=S({colormap:this.variables.colorscale,format:"rgba",nshades:16});return ie(a,"offset","spacing","min","max")}else if(this.variables.visualization=="shaded"){const a=S({colormap:this.variables.colorscale,format:"rgba",nshades:16});return le(a,"min","max")}}},watch:{"variables.visualization"(){this.resetDemLayer()},"variables.colorscale"(){this.variables.visualization!=="relief"&&this.resetDemLayer()},renderVariables(a){this.demLayer.updateStyleVariables(a)}},methods:{resetDemSource(){this.demSource=new M({normalize:!1,sources:[{url:this.tiffUrl}]}),this.demSource.setAttributions("European Environment Agency (EAA)"),this.demLayer&&this.demLayer.setSource(this.demSource)},resetDemLayer(){this.demLayer&&this.map.removeLayer(this.demLayer),this.demLayer=new B({source:this.source,style:{variables:this.renderVariables,color:this.renderStyle}}),this.map.addLayer(this.demLayer)},async initiateMap(){const a=await fetch("https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml"),t=new q().read(await a.text()),e="s2cloudless-2020",l=t.Contents.Layer.filter(_=>_.Identifier===e)[0].Abstract,n=R(t,{layer:e,matrixSet:"EPSG:4326"}),o=new K({source:new H(E({attributions:l},n))});this.source=new M({normalize:!1,sources:[{url:this.tiffUrl}]}),this.source.setAttributions("European Environment Agency (EAA)"),this.map=new J({target:this.$refs.map,controls:Q({attribution:!0}),layers:[o],view:new X({projection:"EPSG:4326",center:[0,0],zoom:2})});const i=await this.source.getView();this.map.getView().fit(i.extent),this.resetDemLayer()}}},re={id:"map",ref:"map"};function ue(a,t,e,l,n,o){return d(),v("div",re,null,512)}var ce=x(oe,[["render",ue]]);const de={props:{tiffUrl:String,variables:Object},data(){return{availableColormaps:Object.keys(Y).sort()}}},g=a=>($("data-v-3406481c"),a=a(),ee(),a),ve={class:"input-row"},me=c(" URL "),be=g(()=>s("option",{value:"relief"},"Relief",-1)),_e=g(()=>s("option",{value:"contours"},"Contours",-1)),fe=g(()=>s("option",{value:"shaded"},"Shaded",-1)),pe=[be,_e,fe],he={key:0},ye={class:"input-row"},xe=c(" Vertical Exaggeration "),ge={class:"input-value"},ze={class:"input-row"},we=c(" Sun Elevation "),Ue={class:"input-value"},Le={class:"input-row"},Ae=c(" Sun Azimuth "),Ee={class:"input-value"},Se={key:1},Me=c(" Colorscale "),Ve=["value"],Ce={class:"input-row"},De=c(" Offset "),Ie={class:"input-value"},ke={class:"input-row"},Ne=c(" Spacing "),Te={class:"input-value"},Pe={class:"input-row"},je=c(" Elevation Minimum "),Fe={class:"input-value"},Oe={class:"input-row"},Ge=c(" Elevation Maximum "),We={class:"input-value"},Be={key:2},qe=c(" Colorscale "),Re=["value"],Ke={class:"input-row"},He=c(" Elevation Minimum "),Je={class:"input-value"},Qe={class:"input-row"},Xe=c(" Elevation Maximum "),Ye={class:"input-value"};function Ze(a,t,e,l,n,o){return d(),v(f,null,[s("div",ve,[s("label",null,[me,r(s("input",{"onUpdate:modelValue":t[0]||(t[0]=i=>e.tiffUrl=i),type:"text"},null,512),[[m,e.tiffUrl]])])]),r(s("select",{"onUpdate:modelValue":t[1]||(t[1]=i=>e.variables.visualization=i)},pe,512),[[y,e.variables.visualization]]),e.variables.visualization=="relief"?(d(),v("div",he,[s("div",ye,[s("label",null,[xe,r(s("input",{"onUpdate:modelValue":t[2]||(t[2]=i=>e.variables.vert=i),type:"range",min:"1",max:"5"},null,512),[[m,e.variables.vert,void 0,{number:!0}]])]),s("span",ge,u(e.variables.vert),1)]),s("div",ze,[s("label",null,[we,r(s("input",{"onUpdate:modelValue":t[3]||(t[3]=i=>e.variables.sunEl=i),type:"range",min:"0",max:"90"},null,512),[[m,e.variables.sunEl,void 0,{number:!0}]])]),s("span",Ue,u(e.variables.sunEl),1)]),s("div",Le,[s("label",null,[Ae,r(s("input",{"onUpdate:modelValue":t[4]||(t[4]=i=>e.variables.sunAz=i),type:"range",min:"0",max:"360"},null,512),[[m,e.variables.sunAz,void 0,{number:!0}]])]),s("span",Ee,u(e.variables.sunAz),1)])])):e.variables.visualization=="contours"?(d(),v("div",Se,[s("label",null,[Me,r(s("select",{"onUpdate:modelValue":t[5]||(t[5]=i=>e.variables.colorscale=i)},[(d(!0),v(f,null,V(n.availableColormaps,i=>(d(),v("option",{key:i,value:i},u(i),9,Ve))),128))],512),[[y,e.variables.colorscale]])]),s("div",Ce,[s("label",null,[De,r(s("input",{"onUpdate:modelValue":t[6]||(t[6]=i=>e.variables.offset=i),type:"range",min:"0",max:"200"},null,512),[[m,e.variables.offset,void 0,{number:!0}]])]),s("span",Ie,u(e.variables.offset),1)]),s("div",ke,[s("label",null,[Ne,r(s("input",{"onUpdate:modelValue":t[7]||(t[7]=i=>e.variables.spacing=i),type:"range",min:"0",max:"500"},null,512),[[m,e.variables.spacing,void 0,{number:!0}]])]),s("span",Te,u(e.variables.spacing),1)]),s("div",Pe,[s("label",null,[je,r(s("input",{"onUpdate:modelValue":t[8]||(t[8]=i=>e.variables.min=i),type:"range",min:"0",max:"8800"},null,512),[[m,e.variables.min,void 0,{number:!0}]])]),s("span",Fe,u(e.variables.min),1)]),s("div",Oe,[s("label",null,[Ge,r(s("input",{"onUpdate:modelValue":t[9]||(t[9]=i=>e.variables.max=i),type:"range",min:"0",max:"8800",step:"10"},null,512),[[m,e.variables.max,void 0,{number:!0}]])]),s("span",We,u(e.variables.max),1)])])):e.variables.visualization=="shaded"?(d(),v("div",Be,[s("label",null,[qe,r(s("select",{"onUpdate:modelValue":t[10]||(t[10]=i=>e.variables.colorscale=i)},[(d(!0),v(f,null,V(n.availableColormaps,i=>(d(),v("option",{key:i,value:i},u(i),9,Re))),128))],512),[[y,e.variables.colorscale]])]),s("div",Ke,[s("label",null,[He,r(s("input",{"onUpdate:modelValue":t[11]||(t[11]=i=>e.variables.min=i),type:"range",min:"0",max:"8800"},null,512),[[m,e.variables.min,void 0,{number:!0}]])]),s("span",Je,u(e.variables.min),1)]),s("div",Qe,[s("label",null,[Xe,r(s("input",{"onUpdate:modelValue":t[12]||(t[12]=i=>e.variables.max=i),type:"range",min:"0",max:"8800",step:"10"},null,512),[[m,e.variables.max,void 0,{number:!0}]])]),s("span",Ye,u(e.variables.max),1)])])):Z("",!0)],64)}var $e=x(de,[["render",Ze],["__scopeId","data-v-3406481c"]]);const et={name:"App",components:{Map:ce,DemControl:$e},data(){return{tiffUrl:"./src/assets/Copernicus_DSM_30_N03_00_E016_00_DEM.tif",variables:{visualization:"shaded",colorscale:"jet",min:360,max:700,offset:0,spacing:100,vert:1,sunEl:45,sunAz:45}}}},tt={class:"cell cell-map"},st={class:"cell cell-edit"},at={class:"cell cell-inspect"};function it(a,t,e,l,n,o){const i=C("Map"),_=C("DemControl");return d(),v(f,null,[s("div",tt,[D(i,{variables:n.variables,tiffUrl:n.tiffUrl},null,8,["variables","tiffUrl"])]),s("div",st,[D(_,{variables:n.variables,tiffUrl:n.tiffUrl},null,8,["variables","tiffUrl"])]),s("div",at,[s("div",null,u(n.tiffUrl)+u(n.variables),1)])],64)}var nt=x(et,[["render",it]]);te(nt).mount("#app");