"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.XfaLayer=void 0;var _util=require("../shared/util.js"),_xfa_text=require("./xfa_text.js");class XfaLayer{static setupStorage(e,t,a,n,i){const r=n.getValue(t,{value:null});switch(a.name){case"textarea":if(null!==r.value&&(e.textContent=r.value),"print"===i)break;e.addEventListener("input",(e=>{n.setValue(t,{value:e.target.value})}));break;case"input":if("radio"===a.attributes.type||"checkbox"===a.attributes.type){if(r.value===a.attributes.xfaOn?e.setAttribute("checked",!0):r.value===a.attributes.xfaOff&&e.removeAttribute("checked"),"print"===i)break;e.addEventListener("change",(e=>{n.setValue(t,{value:e.target.checked?e.target.getAttribute("xfaOn"):e.target.getAttribute("xfaOff")})}))}else{if(null!==r.value&&e.setAttribute("value",r.value),"print"===i)break;e.addEventListener("input",(e=>{n.setValue(t,{value:e.target.value})}))}break;case"select":if(null!==r.value)for(const e of a.children)e.attributes.value===r.value&&(e.attributes.selected=!0);e.addEventListener("input",(e=>{const a=e.target.options,i=-1===a.selectedIndex?"":a[a.selectedIndex].value;n.setValue(t,{value:i})}));break}}static setAttributes({html:e,element:t,storage:a=null,intent:n,linkService:i}){const{attributes:r}=t,s=e instanceof HTMLAnchorElement;"radio"===r.type&&(r.name=`${r.name}-${n}`);for(const[l,u]of Object.entries(r))if(null!==u&&void 0!==u&&"dataId"!==l)if("style"!==l)if("textContent"===l)e.textContent=u;else if("class"===l)e.setAttribute(l,u.join(" "));else{if(s&&("href"===l||"newWindow"===l))continue;e.setAttribute(l,u)}else Object.assign(e.style,u);s&&(i.addLinkAttributes||(0,_util.warn)("XfaLayer.setAttribute - missing `addLinkAttributes`-method on the `linkService`-instance."),i.addLinkAttributes?.(e,r.href,r.newWindow)),a&&r.dataId&&this.setupStorage(e,r.dataId,t,a)}static render(e){const t=e.annotationStorage,a=e.linkService,n=e.xfa,i=e.intent||"display",r=document.createElement(n.name);n.attributes&&this.setAttributes({html:r,element:n,intent:i,linkService:a});const s=[[n,-1,r]],l=e.div;l.appendChild(r);const u=`matrix(${e.viewport.transform.join(",")})`;l.style.transform=u,l.setAttribute("class","xfaLayer xfaFont");const o=[];while(s.length>0){const[e,n,r]=s[s.length-1];if(n+1===e.children.length){s.pop();continue}const l=e.children[++s[s.length-1][1]];if(null===l)continue;const{name:u}=l;if("#text"===u){const e=document.createTextNode(l.value);o.push(e),r.appendChild(e);continue}let c;if(c=l?.attributes?.xmlns?document.createElementNS(l.attributes.xmlns,u):document.createElement(u),r.appendChild(c),l.attributes&&this.setAttributes({html:c,element:l,storage:t,intent:i,linkService:a}),l.children&&l.children.length>0)s.push([l,-1,c]);else if(l.value){const e=document.createTextNode(l.value);_xfa_text.XfaText.shouldBuildText(u)&&o.push(e),c.appendChild(e)}}for(const c of l.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"))c.setAttribute("readOnly",!0);return{textDivs:o}}static update(e){const t=`matrix(${e.viewport.transform.join(",")})`;e.div.style.transform=t,e.div.hidden=!1}}exports.XfaLayer=XfaLayer;