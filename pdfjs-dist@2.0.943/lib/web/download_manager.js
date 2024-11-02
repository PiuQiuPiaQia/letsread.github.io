"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DownloadManager=void 0;var _createClass=function(){function e(e,a){for(var o=0;o<a.length;o++){var t=a[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(a,o,t){return o&&e(a.prototype,o),t&&e(a,t),a}}(),_pdf=require("../pdf");function _classCallCheck(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}var DISABLE_CREATE_OBJECT_URL=_pdf.apiCompatibilityParams.disableCreateObjectURL||!1;function _download(e,a){var o=document.createElement("a");if(!o.click)throw new Error('DownloadManager: "a.click()" is not supported.');o.href=e,o.target="_parent","download"in o&&(o.download=a),(document.body||document.documentElement).appendChild(o),o.click(),o.remove()}var DownloadManager=function(){function e(a){var o=a.disableCreateObjectURL,t=void 0===o?DISABLE_CREATE_OBJECT_URL:o;_classCallCheck(this,e),this.disableCreateObjectURL=t}return _createClass(e,[{key:"downloadUrl",value:function(e,a){(0,_pdf.createValidAbsoluteUrl)(e,"http://example.com")&&_download(e+"#pdfjs.action=download",a)}},{key:"downloadData",value:function(e,a,o){if(navigator.msSaveBlob)return navigator.msSaveBlob(new Blob([e],{type:o}),a);var t=(0,_pdf.createObjectURL)(e,o,this.disableCreateObjectURL);_download(t,a)}},{key:"download",value:function(e,a,o){if(navigator.msSaveBlob)navigator.msSaveBlob(e,o)||this.downloadUrl(a,o);else if(this.disableCreateObjectURL)this.downloadUrl(a,o);else{var t=_pdf.URL.createObjectURL(e);_download(t,o)}}}]),e}();exports.DownloadManager=DownloadManager;