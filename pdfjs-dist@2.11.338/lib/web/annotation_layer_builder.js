"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DefaultAnnotationLayerFactory=exports.AnnotationLayerBuilder=void 0;var _pdf=require("../pdf"),_l10n_utils=require("./l10n_utils.js"),_pdf_link_service=require("./pdf_link_service.js");class AnnotationLayerBuilder{constructor({pageDiv:e,pdfPage:t,linkService:i,downloadManager:n,annotationStorage:a=null,imageResourcesPath:s="",renderForms:r=!0,l10n:o=_l10n_utils.NullL10n,enableScripting:l=!1,hasJSActionsPromise:d=null,fieldObjectsPromise:c=null,mouseState:h=null}){this.pageDiv=e,this.pdfPage=t,this.linkService=i,this.downloadManager=n,this.imageResourcesPath=s,this.renderForms=r,this.l10n=o,this.annotationStorage=a,this.enableScripting=l,this._hasJSActionsPromise=d,this._fieldObjectsPromise=c,this._mouseState=h,this.div=null,this._cancelled=!1}async render(e,t="display"){const[i,n=!1,a=null]=await Promise.all([this.pdfPage.getAnnotations({intent:t}),this._hasJSActionsPromise,this._fieldObjectsPromise]);if(this._cancelled||0===i.length)return;const s={viewport:e.clone({dontFlip:!0}),div:this.div,annotations:i,page:this.pdfPage,imageResourcesPath:this.imageResourcesPath,renderForms:this.renderForms,linkService:this.linkService,downloadManager:this.downloadManager,annotationStorage:this.annotationStorage,enableScripting:this.enableScripting,hasJSActions:n,fieldObjects:a,mouseState:this._mouseState};this.div?_pdf.AnnotationLayer.update(s):(this.div=document.createElement("div"),this.div.className="annotationLayer",this.pageDiv.appendChild(this.div),s.div=this.div,_pdf.AnnotationLayer.render(s),this.l10n.translate(this.div))}cancel(){this._cancelled=!0}hide(){this.div&&(this.div.hidden=!0)}}exports.AnnotationLayerBuilder=AnnotationLayerBuilder;class DefaultAnnotationLayerFactory{createAnnotationLayerBuilder(e,t,i=null,n="",a=!0,s=_l10n_utils.NullL10n,r=!1,o=null,l=null,d=null){return new AnnotationLayerBuilder({pageDiv:e,pdfPage:t,imageResourcesPath:n,renderForms:a,linkService:new _pdf_link_service.SimpleLinkService,l10n:s,annotationStorage:i,enableScripting:r,hasJSActionsPromise:o,fieldObjectsPromise:d,mouseState:l})}}exports.DefaultAnnotationLayerFactory=DefaultAnnotationLayerFactory;