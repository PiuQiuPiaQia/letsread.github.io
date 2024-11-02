"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.OptionKind=exports.compatibilityParams=exports.AppOptions=void 0;const compatibilityParams=Object.create(null);exports.compatibilityParams=compatibilityParams;{const i="undefined"!==typeof navigator&&navigator.userAgent||"",n="undefined"!==typeof navigator&&navigator.platform||"",t="undefined"!==typeof navigator&&navigator.maxTouchPoints||1,e=/Android/.test(i),o=/\b(iPad|iPhone|iPod)(?=;)/.test(i)||"MacIntel"===n&&t>1,d=/CriOS/.test(i);(function(){d&&(compatibilityParams.disableCreateObjectURL=!0)})(),function(){(o||e)&&(compatibilityParams.maxCanvasPixels=5242880)}()}const OptionKind={VIEWER:2,API:4,WORKER:8,PREFERENCE:128};exports.OptionKind=OptionKind;const defaultOptions={annotationMode:{value:2,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},cursorToolOnLoad:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},defaultUrl:{value:"compressed.tracemonkey-pldi-09.pdf",kind:OptionKind.VIEWER},defaultZoomValue:{value:"",kind:OptionKind.VIEWER+OptionKind.PREFERENCE},disableHistory:{value:!1,kind:OptionKind.VIEWER},disablePageLabels:{value:!1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},enablePermissions:{value:!1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},enablePrintAutoRotate:{value:!0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},enableScripting:{value:!0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},externalLinkRel:{value:"noopener noreferrer nofollow",kind:OptionKind.VIEWER},externalLinkTarget:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},historyUpdateUrl:{value:!1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},ignoreDestinationZoom:{value:!1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},imageResourcesPath:{value:"./images/",kind:OptionKind.VIEWER},maxCanvasPixels:{value:16777216,compatibility:compatibilityParams.maxCanvasPixels,kind:OptionKind.VIEWER},pdfBugEnabled:{value:!1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},printResolution:{value:150,kind:OptionKind.VIEWER},renderer:{value:"canvas",kind:OptionKind.VIEWER},sidebarViewOnLoad:{value:-1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},scrollModeOnLoad:{value:-1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},spreadModeOnLoad:{value:-1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},textLayerMode:{value:1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},useOnlyCssZoom:{value:!1,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},viewerCssTheme:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},viewOnLoad:{value:0,kind:OptionKind.VIEWER+OptionKind.PREFERENCE},cMapPacked:{value:!0,kind:OptionKind.API},cMapUrl:{value:"../web/cmaps/",kind:OptionKind.API},disableAutoFetch:{value:!1,kind:OptionKind.API+OptionKind.PREFERENCE},disableFontFace:{value:!1,kind:OptionKind.API+OptionKind.PREFERENCE},disableRange:{value:!1,kind:OptionKind.API+OptionKind.PREFERENCE},disableStream:{value:!1,kind:OptionKind.API+OptionKind.PREFERENCE},docBaseUrl:{value:"",kind:OptionKind.API},enableXfa:{value:!0,kind:OptionKind.API+OptionKind.PREFERENCE},fontExtraProperties:{value:!1,kind:OptionKind.API},isEvalSupported:{value:!0,kind:OptionKind.API},maxImageSize:{value:-1,kind:OptionKind.API},pdfBug:{value:!1,kind:OptionKind.API},standardFontDataUrl:{value:"../web/standard_fonts/",kind:OptionKind.API},verbosity:{value:1,kind:OptionKind.API},workerPort:{value:null,kind:OptionKind.WORKER},workerSrc:{value:"../build/pdf.worker.js",kind:OptionKind.WORKER}};defaultOptions.disablePreferences={value:!1,kind:OptionKind.VIEWER},defaultOptions.locale={value:"undefined"!==typeof navigator?navigator.language:"en-US",kind:OptionKind.VIEWER},defaultOptions.sandboxBundleSrc={value:"../build/pdf.sandbox.js",kind:OptionKind.VIEWER},defaultOptions.renderer.kind+=OptionKind.PREFERENCE;const userOptions=Object.create(null);class AppOptions{constructor(){throw new Error("Cannot initialize AppOptions.")}static get(i){const n=userOptions[i];if(void 0!==n)return n;const t=defaultOptions[i];return void 0!==t?t.compatibility??t.value:void 0}static getAll(i=null){const n=Object.create(null);for(const t in defaultOptions){const e=defaultOptions[t];if(i){if(0===(i&e.kind))continue;if(i===OptionKind.PREFERENCE){const i=e.value,o=typeof i;if("boolean"===o||"string"===o||"number"===o&&Number.isInteger(i)){n[t]=i;continue}throw new Error(`Invalid type for preference: ${t}`)}}const o=userOptions[t];n[t]=void 0!==o?o:e.compatibility??e.value}return n}static set(i,n){userOptions[i]=n}static setAll(i){for(const n in i)userOptions[n]=i[n]}static remove(i){delete userOptions[i]}static _hasUserOptions(){return Object.keys(userOptions).length>0}}exports.AppOptions=AppOptions;