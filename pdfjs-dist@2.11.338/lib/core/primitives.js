"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearPrimitiveCaches=clearPrimitiveCaches,exports.isCmd=isCmd,exports.isDict=isDict,exports.isName=isName,exports.isRef=isRef,exports.isRefsEqual=isRefsEqual,exports.isStream=isStream,exports.RefSetCache=exports.RefSet=exports.Ref=exports.Name=exports.EOF=exports.Dict=exports.Cmd=void 0;var _util=require("../shared/util.js"),_base_stream=require("./base_stream.js");const EOF=Symbol("EOF");exports.EOF=EOF;const Name=function(){let t=Object.create(null);class e{constructor(t){this.name=t}static get(s){const i=t[s];return i||(t[s]=new e(s))}static _clearCache(){t=Object.create(null)}}return e}();exports.Name=Name;const Cmd=function(){let t=Object.create(null);class e{constructor(t){this.cmd=t}static get(s){const i=t[s];return i||(t[s]=new e(s))}static _clearCache(){t=Object.create(null)}}return e}();exports.Cmd=Cmd;const nonSerializable=function(){return nonSerializable};class Dict{constructor(t=null){this._map=Object.create(null),this.xref=t,this.objId=null,this.suppressEncryption=!1,this.__nonSerializable__=nonSerializable}assignXref(t){this.xref=t}get size(){return Object.keys(this._map).length}get(t,e,s){let i=this._map[t];return void 0===i&&void 0!==e&&(i=this._map[e],void 0===i&&void 0!==s&&(i=this._map[s])),i instanceof Ref&&this.xref?this.xref.fetch(i,this.suppressEncryption):i}async getAsync(t,e,s){let i=this._map[t];return void 0===i&&void 0!==e&&(i=this._map[e],void 0===i&&void 0!==s&&(i=this._map[s])),i instanceof Ref&&this.xref?this.xref.fetchAsync(i,this.suppressEncryption):i}getArray(t,e,s){let i=this._map[t];if(void 0===i&&void 0!==e&&(i=this._map[e],void 0===i&&void 0!==s&&(i=this._map[s])),i instanceof Ref&&this.xref&&(i=this.xref.fetch(i,this.suppressEncryption)),Array.isArray(i)){i=i.slice();for(let t=0,e=i.length;t<e;t++)i[t]instanceof Ref&&this.xref&&(i[t]=this.xref.fetch(i[t],this.suppressEncryption))}return i}getRaw(t){return this._map[t]}getKeys(){return Object.keys(this._map)}getRawValues(){return Object.values(this._map)}set(t,e){this._map[t]=e}has(t){return void 0!==this._map[t]}forEach(t){for(const e in this._map)t(e,this.get(e))}static get empty(){const t=new Dict(null);return t.set=(t,e)=>{(0,_util.unreachable)("Should not call `set` on the empty dictionary.")},(0,_util.shadow)(this,"empty",t)}static merge({xref:t,dictArray:e,mergeSubDicts:s=!1}){const i=new Dict(t),r=new Map;for(const n of e)if(n instanceof Dict)for(const[t,e]of Object.entries(n._map)){let i=r.get(t);if(void 0===i)i=[],r.set(t,i);else if(!s||!(e instanceof Dict))continue;i.push(e)}for(const[n,a]of r){if(1===a.length||!(a[0]instanceof Dict)){i._map[n]=a[0];continue}const e=new Dict(t);for(const t of a)for(const[s,i]of Object.entries(t._map))void 0===e._map[s]&&(e._map[s]=i);e.size>0&&(i._map[n]=e)}return r.clear(),i.size>0?i:Dict.empty}}exports.Dict=Dict;const Ref=function(){let t=Object.create(null);class e{constructor(t,e){this.num=t,this.gen=e}toString(){return 0===this.gen?`${this.num}R`:`${this.num}R${this.gen}`}static get(s,i){const r=0===i?`${s}R`:`${s}R${i}`,n=t[r];return n||(t[r]=new e(s,i))}static _clearCache(){t=Object.create(null)}}return e}();exports.Ref=Ref;class RefSet{constructor(t=null){this._set=new Set(t&&t._set)}has(t){return this._set.has(t.toString())}put(t){this._set.add(t.toString())}remove(t){this._set.delete(t.toString())}forEach(t){for(const e of this._set.values())t(e)}clear(){this._set.clear()}}exports.RefSet=RefSet;class RefSetCache{constructor(){this._map=new Map}get size(){return this._map.size}get(t){return this._map.get(t.toString())}has(t){return this._map.has(t.toString())}put(t,e){this._map.set(t.toString(),e)}putAlias(t,e){this._map.set(t.toString(),this.get(e))}forEach(t){for(const e of this._map.values())t(e)}clear(){this._map.clear()}}function isName(t,e){return t instanceof Name&&(void 0===e||t.name===e)}function isCmd(t,e){return t instanceof Cmd&&(void 0===e||t.cmd===e)}function isDict(t,e){return t instanceof Dict&&(void 0===e||isName(t.get("Type"),e))}function isRef(t){return t instanceof Ref}function isRefsEqual(t,e){return t.num===e.num&&t.gen===e.gen}function isStream(t){return t instanceof _base_stream.BaseStream}function clearPrimitiveCaches(){Cmd._clearCache(),Name._clearCache(),Ref._clearCache()}exports.RefSetCache=RefSetCache;