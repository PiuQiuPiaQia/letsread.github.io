"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TEST_PDFS_PATH=exports.buildGetDocumentParams=exports.XRefMock=exports.NodeCMapReaderFactory=exports.NodeFileReaderFactory=void 0;var _createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var a=r[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(r,t,a){return t&&e(r.prototype,t),a&&e(r,a),r}}(),_util=require("../../shared/util"),_is_node=require("../../shared/is_node"),_is_node2=_interopRequireDefault(_is_node),_primitives=require("../../core/primitives");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var NodeFileReaderFactory=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"fetch",value:function(e){var r=require("fs"),t=r.readFileSync(e.path);return new Uint8Array(t)}}]),e}(),TEST_PDFS_PATH={dom:"../pdfs/",node:"./test/pdfs/"};function buildGetDocumentParams(e,r){var t=Object.create(null);for(var a in(0,_is_node2.default)()?t.url=TEST_PDFS_PATH.node+e:t.url=new URL(TEST_PDFS_PATH.dom+e,window.location).href,r)t[a]=r[a];return t}var NodeCMapReaderFactory=function(){function e(r){var t=r.baseUrl,a=void 0===t?null:t,o=r.isCompressed,n=void 0!==o&&o;_classCallCheck(this,e),this.baseUrl=a,this.isCompressed=n}return _createClass(e,[{key:"fetch",value:function(e){var r=this,t=e.name;return this.baseUrl?t?new Promise((function(e,a){var o=r.baseUrl+t+(r.isCompressed?".bcmap":""),n=require("fs");n.readFile(o,(function(t,n){!t&&n?e({cMapData:new Uint8Array(n),compressionType:r.isCompressed?_util.CMapCompressionType.BINARY:_util.CMapCompressionType.NONE}):a(new Error("Unable to load "+(r.isCompressed?"binary ":"")+"CMap at: "+o))}))})):Promise.reject(new Error("CMap name must be specified.")):Promise.reject(new Error('The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.'))}}]),e}(),XRefMock=function(){function e(r){for(var t in _classCallCheck(this,e),this._map=Object.create(null),r){var a=r[t];this._map[a.ref.toString()]=a.data}}return _createClass(e,[{key:"fetch",value:function(e){return this._map[e.toString()]}},{key:"fetchAsync",value:function(e){return Promise.resolve(this.fetch(e))}},{key:"fetchIfRef",value:function(e){return(0,_primitives.isRef)(e)?this.fetch(e):e}},{key:"fetchIfRefAsync",value:function(e){return Promise.resolve(this.fetchIfRef(e))}}]),e}();exports.NodeFileReaderFactory=NodeFileReaderFactory,exports.NodeCMapReaderFactory=NodeCMapReaderFactory,exports.XRefMock=XRefMock,exports.buildGetDocumentParams=buildGetDocumentParams,exports.TEST_PDFS_PATH=TEST_PDFS_PATH;