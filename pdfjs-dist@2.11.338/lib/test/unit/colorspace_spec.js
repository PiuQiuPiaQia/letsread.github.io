"use strict";var _primitives=require("../../core/primitives.js"),_stream=require("../../core/stream.js"),_colorspace=require("../../core/colorspace.js"),_image_utils=require("../../core/image_utils.js"),_function=require("../../core/function.js"),_test_utils=require("./test_utils.js");describe("colorspace",(function(){describe("ColorSpace.isDefaultDecode",(function(){it("should be true if decode is not an array",(function(){expect(_colorspace.ColorSpace.isDefaultDecode("string",0)).toBeTruthy()})),it("should be true if length of decode array is not correct",(function(){expect(_colorspace.ColorSpace.isDefaultDecode([0],1)).toBeTruthy(),expect(_colorspace.ColorSpace.isDefaultDecode([0,1,0],1)).toBeTruthy()})),it("should be true if decode map matches the default decode map",(function(){expect(_colorspace.ColorSpace.isDefaultDecode([],0)).toBeTruthy(),expect(_colorspace.ColorSpace.isDefaultDecode([0,0],1)).toBeFalsy(),expect(_colorspace.ColorSpace.isDefaultDecode([0,1],1)).toBeTruthy(),expect(_colorspace.ColorSpace.isDefaultDecode([0,1,0,1,0,1],3)).toBeTruthy(),expect(_colorspace.ColorSpace.isDefaultDecode([0,1,0,1,1,1],3)).toBeFalsy(),expect(_colorspace.ColorSpace.isDefaultDecode([0,1,0,1,0,1,0,1],4)).toBeTruthy(),expect(_colorspace.ColorSpace.isDefaultDecode([1,0,0,1,0,1,0,1],4)).toBeFalsy()}))})),describe("ColorSpace caching",(function(){let e=null;beforeAll((function(){e=new _image_utils.LocalColorSpaceCache})),afterAll((function(){e=null})),it("caching by Name",(function(){const t=new _test_utils.XRefMock,a=new _function.PDFFunctionFactory({xref:t}),c=_colorspace.ColorSpace.parse({cs:_primitives.Name.get("Pattern"),xref:t,resources:null,pdfFunctionFactory:a,localColorSpaceCache:e});expect(c.name).toEqual("Pattern");const o=_colorspace.ColorSpace.parse({cs:_primitives.Name.get("Pattern"),xref:t,resources:null,pdfFunctionFactory:a,localColorSpaceCache:e});expect(o.name).toEqual("Pattern");const i=_colorspace.ColorSpace.parse({cs:_primitives.Name.get("Pattern"),xref:t,resources:null,pdfFunctionFactory:a,localColorSpaceCache:new _image_utils.LocalColorSpaceCache});expect(i.name).toEqual("Pattern");const r=_colorspace.ColorSpace.parse({cs:_primitives.Name.get("RGB"),xref:t,resources:null,pdfFunctionFactory:a,localColorSpaceCache:e});expect(r.name).toEqual("DeviceRGB"),expect(c).toBe(o),expect(c).not.toBe(i),expect(c).not.toBe(r)})),it("caching by Ref",(function(){const t=new _primitives.Dict;t.set("WhitePoint",[1,1,1]),t.set("BlackPoint",[0,0,0]),t.set("Gamma",2);const a=new _primitives.Dict;a.set("WhitePoint",[1,1,1]),a.set("BlackPoint",[0,0,0]),a.set("Gamma",[1,1,1]),a.set("Matrix",[1,0,0,0,1,0,0,0,1]);const c=new _test_utils.XRefMock([{ref:_primitives.Ref.get(50,0),data:[_primitives.Name.get("CalGray"),t]},{ref:_primitives.Ref.get(100,0),data:[_primitives.Name.get("CalRGB"),a]}]),o=new _function.PDFFunctionFactory({xref:c}),i=_colorspace.ColorSpace.parse({cs:_primitives.Ref.get(50,0),xref:c,resources:null,pdfFunctionFactory:o,localColorSpaceCache:e});expect(i.name).toEqual("CalGray");const r=_colorspace.ColorSpace.parse({cs:_primitives.Ref.get(50,0),xref:c,resources:null,pdfFunctionFactory:o,localColorSpaceCache:e});expect(r.name).toEqual("CalGray");const n=_colorspace.ColorSpace.parse({cs:_primitives.Ref.get(50,0),xref:c,resources:null,pdfFunctionFactory:o,localColorSpaceCache:new _image_utils.LocalColorSpaceCache});expect(n.name).toEqual("CalGray");const s=_colorspace.ColorSpace.parse({cs:_primitives.Ref.get(100,0),xref:c,resources:null,pdfFunctionFactory:o,localColorSpaceCache:e});expect(s.name).toEqual("CalRGB"),expect(i).toBe(r),expect(i).not.toBe(n),expect(i).not.toBe(s)}))})),describe("DeviceGrayCS",(function(){it("should handle the case when cs is a Name object",(function(){const e=_primitives.Name.get("DeviceGray"),t=new _test_utils.XRefMock([{ref:_primitives.Ref.get(10,0),data:new _primitives.Dict}]),a=new _primitives.Dict,c=new _function.PDFFunctionFactory({xref:t}),o=_colorspace.ColorSpace.parse({cs:e,xref:t,resources:a,pdfFunctionFactory:c,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),i=new Uint8Array([27,125,250,131]),r=new Uint8ClampedArray(48),n=new Uint8ClampedArray([27,27,27,27,27,27,125,125,125,125,125,125,27,27,27,27,27,27,125,125,125,125,125,125,250,250,250,250,250,250,131,131,131,131,131,131,250,250,250,250,250,250,131,131,131,131,131,131]);o.fillRgb(r,2,2,4,4,4,8,i,0),expect(o.getRgb(new Float32Array([.1]),0)).toEqual(new Uint8ClampedArray([26,26,26])),expect(o.getOutputLength(2,0)).toEqual(6),expect(o.isPassthrough(8)).toBeFalsy(),expect(r).toEqual(n)})),it("should handle the case when cs is an indirect object",(function(){const e=_primitives.Ref.get(10,0),t=new _test_utils.XRefMock([{ref:e,data:_primitives.Name.get("DeviceGray")}]),a=new _primitives.Dict,c=new _function.PDFFunctionFactory({xref:t}),o=_colorspace.ColorSpace.parse({cs:e,xref:t,resources:a,pdfFunctionFactory:c,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),i=new Uint8Array([27,125,250,131]),r=new Uint8ClampedArray(27),n=new Uint8ClampedArray([27,27,27,27,27,27,125,125,125,27,27,27,27,27,27,125,125,125,250,250,250,250,250,250,131,131,131]);o.fillRgb(r,2,2,3,3,3,8,i,0),expect(o.getRgb(new Float32Array([.2]),0)).toEqual(new Uint8ClampedArray([51,51,51])),expect(o.getOutputLength(3,1)).toEqual(12),expect(o.isPassthrough(8)).toBeFalsy(),expect(r).toEqual(n)}))})),describe("DeviceRgbCS",(function(){it("should handle the case when cs is a Name object",(function(){const e=_primitives.Name.get("DeviceRGB"),t=new _test_utils.XRefMock([{ref:_primitives.Ref.get(10,0),data:new _primitives.Dict}]),a=new _primitives.Dict,c=new _function.PDFFunctionFactory({xref:t}),o=_colorspace.ColorSpace.parse({cs:e,xref:t,resources:a,pdfFunctionFactory:c,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),i=new Uint8Array([27,125,250,131,139,140,111,25,198,21,147,255]),r=new Uint8ClampedArray(48),n=new Uint8ClampedArray([27,125,250,27,125,250,131,139,140,131,139,140,27,125,250,27,125,250,131,139,140,131,139,140,111,25,198,111,25,198,21,147,255,21,147,255,111,25,198,111,25,198,21,147,255,21,147,255]);o.fillRgb(r,2,2,4,4,4,8,i,0),expect(o.getRgb(new Float32Array([.1,.2,.3]),0)).toEqual(new Uint8ClampedArray([26,51,77])),expect(o.getOutputLength(4,0)).toEqual(4),expect(o.isPassthrough(8)).toBeTruthy(),expect(r).toEqual(n)})),it("should handle the case when cs is an indirect object",(function(){const e=_primitives.Ref.get(10,0),t=new _test_utils.XRefMock([{ref:e,data:_primitives.Name.get("DeviceRGB")}]),a=new _primitives.Dict,c=new _function.PDFFunctionFactory({xref:t}),o=_colorspace.ColorSpace.parse({cs:e,xref:t,resources:a,pdfFunctionFactory:c,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),i=new Uint8Array([27,125,250,131,139,140,111,25,198,21,147,255]),r=new Uint8ClampedArray(27),n=new Uint8ClampedArray([27,125,250,27,125,250,131,139,140,27,125,250,27,125,250,131,139,140,111,25,198,111,25,198,21,147,255]);o.fillRgb(r,2,2,3,3,3,8,i,0),expect(o.getRgb(new Float32Array([.1,.2,.3]),0)).toEqual(new Uint8ClampedArray([26,51,77])),expect(o.getOutputLength(4,1)).toEqual(5),expect(o.isPassthrough(8)).toBeTruthy(),expect(r).toEqual(n)}))})),describe("DeviceCmykCS",(function(){it("should handle the case when cs is a Name object",(function(){const e=_primitives.Name.get("DeviceCMYK"),t=new _test_utils.XRefMock([{ref:_primitives.Ref.get(10,0),data:new _primitives.Dict}]),a=new _primitives.Dict,c=new _function.PDFFunctionFactory({xref:t}),o=_colorspace.ColorSpace.parse({cs:e,xref:t,resources:a,pdfFunctionFactory:c,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),i=new Uint8Array([27,125,250,128,131,139,140,45,111,25,198,78,21,147,255,69]),r=new Uint8ClampedArray(48),n=new Uint8ClampedArray([135,81,18,135,81,18,114,102,97,114,102,97,135,81,18,135,81,18,114,102,97,114,102,97,112,144,75,112,144,75,188,98,27,188,98,27,112,144,75,112,144,75,188,98,27,188,98,27]);o.fillRgb(r,2,2,4,4,4,8,i,0),expect(o.getRgb(new Float32Array([.1,.2,.3,1]),0)).toEqual(new Uint8ClampedArray([32,28,21])),expect(o.getOutputLength(4,0)).toEqual(3),expect(o.isPassthrough(8)).toBeFalsy(),expect(r).toEqual(n)})),it("should handle the case when cs is an indirect object",(function(){const e=_primitives.Ref.get(10,0),t=new _test_utils.XRefMock([{ref:e,data:_primitives.Name.get("DeviceCMYK")}]),a=new _primitives.Dict,c=new _function.PDFFunctionFactory({xref:t}),o=_colorspace.ColorSpace.parse({cs:e,xref:t,resources:a,pdfFunctionFactory:c,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),i=new Uint8Array([27,125,250,128,131,139,140,45,111,25,198,78,21,147,255,69]),r=new Uint8ClampedArray(27),n=new Uint8ClampedArray([135,81,18,135,81,18,114,102,97,135,81,18,135,81,18,114,102,97,112,144,75,112,144,75,188,98,27]);o.fillRgb(r,2,2,3,3,3,8,i,0),expect(o.getRgb(new Float32Array([.1,.2,.3,1]),0)).toEqual(new Uint8ClampedArray([32,28,21])),expect(o.getOutputLength(4,1)).toEqual(4),expect(o.isPassthrough(8)).toBeFalsy(),expect(r).toEqual(n)}))})),describe("CalGrayCS",(function(){it("should handle the case when cs is an array",(function(){const e=new _primitives.Dict;e.set("WhitePoint",[1,1,1]),e.set("BlackPoint",[0,0,0]),e.set("Gamma",2);const t=[_primitives.Name.get("CalGray"),e],a=new _test_utils.XRefMock([{ref:_primitives.Ref.get(10,0),data:new _primitives.Dict}]),c=new _primitives.Dict,o=new _function.PDFFunctionFactory({xref:a}),i=_colorspace.ColorSpace.parse({cs:t,xref:a,resources:c,pdfFunctionFactory:o,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),r=new Uint8Array([27,125,250,131]),n=new Uint8ClampedArray(48),s=new Uint8ClampedArray([25,25,25,25,25,25,143,143,143,143,143,143,25,25,25,25,25,25,143,143,143,143,143,143,251,251,251,251,251,251,149,149,149,149,149,149,251,251,251,251,251,251,149,149,149,149,149,149]);i.fillRgb(n,2,2,4,4,4,8,r,0),expect(i.getRgb(new Float32Array([1]),0)).toEqual(new Uint8ClampedArray([255,255,255])),expect(i.getOutputLength(4,0)).toEqual(12),expect(i.isPassthrough(8)).toBeFalsy(),expect(n).toEqual(s)}))})),describe("CalRGBCS",(function(){it("should handle the case when cs is an array",(function(){const e=new _primitives.Dict;e.set("WhitePoint",[1,1,1]),e.set("BlackPoint",[0,0,0]),e.set("Gamma",[1,1,1]),e.set("Matrix",[1,0,0,0,1,0,0,0,1]);const t=[_primitives.Name.get("CalRGB"),e],a=new _test_utils.XRefMock([{ref:_primitives.Ref.get(10,0),data:new _primitives.Dict}]),c=new _primitives.Dict,o=new _function.PDFFunctionFactory({xref:a}),i=_colorspace.ColorSpace.parse({cs:t,xref:a,resources:c,pdfFunctionFactory:o,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),r=new Uint8Array([27,125,250,131,139,140,111,25,198,21,147,255]),n=new Uint8ClampedArray(27),s=new Uint8ClampedArray([0,238,255,0,238,255,185,196,195,0,238,255,0,238,255,185,196,195,235,0,243,235,0,243,0,255,255]);i.fillRgb(n,2,2,3,3,3,8,r,0),expect(i.getRgb(new Float32Array([.1,.2,.3]),0)).toEqual(new Uint8ClampedArray([0,147,151])),expect(i.getOutputLength(4,0)).toEqual(4),expect(i.isPassthrough(8)).toBeFalsy(),expect(n).toEqual(s)}))})),describe("LabCS",(function(){it("should handle the case when cs is an array",(function(){const e=new _primitives.Dict;e.set("WhitePoint",[1,1,1]),e.set("BlackPoint",[0,0,0]),e.set("Range",[-100,100,-100,100]);const t=[_primitives.Name.get("Lab"),e],a=new _test_utils.XRefMock([{ref:_primitives.Ref.get(10,0),data:new _primitives.Dict}]),c=new _primitives.Dict,o=new _function.PDFFunctionFactory({xref:a}),i=_colorspace.ColorSpace.parse({cs:t,xref:a,resources:c,pdfFunctionFactory:o,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),r=new Uint8Array([27,25,50,31,19,40,11,25,98,21,47,55]),n=new Uint8ClampedArray(27),s=new Uint8ClampedArray([0,49,101,0,49,101,0,53,117,0,49,101,0,49,101,0,53,117,0,41,40,0,41,40,0,43,90]);i.fillRgb(n,2,2,3,3,3,8,r,0),expect(i.getRgb([55,25,35],0)).toEqual(new Uint8ClampedArray([188,100,61])),expect(i.getOutputLength(4,0)).toEqual(4),expect(i.isPassthrough(8)).toBeFalsy(),expect(i.isDefaultDecode([0,1])).toBeTruthy(),expect(n).toEqual(s)}))})),describe("IndexedCS",(function(){it("should handle the case when cs is an array",(function(){const e=new _stream.Stream(new Uint8Array([23,155,35,147,69,93,255,109,70])),t=[_primitives.Name.get("Indexed"),_primitives.Name.get("DeviceRGB"),2,e],a=new _test_utils.XRefMock([{ref:_primitives.Ref.get(10,0),data:new _primitives.Dict}]),c=new _primitives.Dict,o=new _function.PDFFunctionFactory({xref:a}),i=_colorspace.ColorSpace.parse({cs:t,xref:a,resources:c,pdfFunctionFactory:o,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),r=new Uint8Array([2,2,0,1]),n=new Uint8ClampedArray(27),s=new Uint8ClampedArray([255,109,70,255,109,70,255,109,70,255,109,70,255,109,70,255,109,70,23,155,35,23,155,35,147,69,93]);i.fillRgb(n,2,2,3,3,3,8,r,0),expect(i.getRgb([2],0)).toEqual(new Uint8ClampedArray([255,109,70])),expect(i.isPassthrough(8)).toBeFalsy(),expect(i.isDefaultDecode([0,1],1)).toBeTruthy(),expect(n).toEqual(s)}))})),describe("AlternateCS",(function(){it("should handle the case when cs is an array",(function(){const e=new _primitives.Dict;e.set("FunctionType",4),e.set("Domain",[0,1]),e.set("Range",[0,1,0,1,0,1,0,1]),e.set("Length",58);let t=new _stream.StringStream("{ dup 0.84 mul exch 0.00 exch dup 0.44 mul exch 0.21 mul }");t=new _stream.Stream(t.bytes,0,58,e);const a=_primitives.Ref.get(10,0),c=[_primitives.Name.get("Separation"),_primitives.Name.get("LogoGreen"),_primitives.Name.get("DeviceCMYK"),a],o=new _test_utils.XRefMock([{ref:a,data:t}]),i=new _primitives.Dict,r=new _function.PDFFunctionFactory({xref:o}),n=_colorspace.ColorSpace.parse({cs:c,xref:o,resources:i,pdfFunctionFactory:r,localColorSpaceCache:new _image_utils.LocalColorSpaceCache}),s=new Uint8Array([27,25,50,31]),l=new Uint8ClampedArray(27),p=new Uint8ClampedArray([226,242,241,226,242,241,229,244,242,226,242,241,226,242,241,229,244,242,203,232,229,203,232,229,222,241,238]);n.fillRgb(l,2,2,3,3,3,8,s,0),expect(n.getRgb([.1],0)).toEqual(new Uint8ClampedArray([228,243,242])),expect(n.isPassthrough(8)).toBeFalsy(),expect(n.isDefaultDecode([0,1])).toBeTruthy(),expect(l).toEqual(p)}))}))}));