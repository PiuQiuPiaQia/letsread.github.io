"use strict";var _test_utils=require("./test_utils.js"),_primitives=require("../../core/primitives.js"),_document=require("../../core/document.js"),_stream=require("../../core/stream.js");describe("document",(function(){describe("Page",(function(){it("should create correct objId/fontId using the idFactory",(function(){const e=(0,_test_utils.createIdFactory)(0),t=(0,_test_utils.createIdFactory)(1);expect(e.createObjId()).toEqual("p0_1"),expect(e.createObjId()).toEqual("p0_2"),expect(e.createFontId()).toEqual("f1"),expect(e.createFontId()).toEqual("f2"),expect(e.getDocId()).toEqual("g_d0"),expect(t.createObjId()).toEqual("p1_1"),expect(t.createObjId()).toEqual("p1_2"),expect(t.createFontId()).toEqual("f1"),expect(t.createFontId()).toEqual("f2"),expect(t.getDocId()).toEqual("g_d0"),expect(e.createObjId()).toEqual("p0_3"),expect(e.createObjId()).toEqual("p0_4"),expect(e.createFontId()).toEqual("f3"),expect(e.createFontId()).toEqual("f4"),expect(e.getDocId()).toEqual("g_d0")}))})),describe("PDFDocument",(function(){const e=new _stream.StringStream("Dummy_PDF_data");function t(t,i=new _test_utils.XRefMock){const s={acroForm:t},a={get docId(){return"d0"},ensureDoc(e,t){return a.ensure(r,e,t)},ensureCatalog(e,t){return a.ensure(s,e,t)},async ensure(e,t,i){const s=e[t];return"function"===typeof s?s.apply(e,i):s}},r=new _document.PDFDocument(a,e);return r.xref=i,r.catalog=s,r}it("should get form info when no form data is present",(function(){const e=t(null);expect(e.formInfo).toEqual({hasAcroForm:!1,hasSignatures:!1,hasXfa:!1,hasFields:!1})})),it("should get form info when XFA is present",(function(){const e=new _primitives.Dict;e.set("XFA",[]);let i=t(e);expect(i.formInfo).toEqual({hasAcroForm:!1,hasSignatures:!1,hasXfa:!1,hasFields:!1}),e.set("XFA",["foo","bar"]),i=t(e),expect(i.formInfo).toEqual({hasAcroForm:!1,hasSignatures:!1,hasXfa:!0,hasFields:!1}),e.set("XFA",new _stream.StringStream("")),i=t(e),expect(i.formInfo).toEqual({hasAcroForm:!1,hasSignatures:!1,hasXfa:!1,hasFields:!1}),e.set("XFA",new _stream.StringStream("non-empty")),i=t(e),expect(i.formInfo).toEqual({hasAcroForm:!1,hasSignatures:!1,hasXfa:!0,hasFields:!1})})),it("should get form info when AcroForm is present",(function(){const e=new _primitives.Dict;e.set("Fields",[]);let i=t(e);expect(i.formInfo).toEqual({hasAcroForm:!1,hasSignatures:!1,hasXfa:!1,hasFields:!1}),e.set("Fields",["foo","bar"]),i=t(e),expect(i.formInfo).toEqual({hasAcroForm:!0,hasSignatures:!1,hasXfa:!1,hasFields:!0}),e.set("Fields",["foo","bar"]),e.set("SigFlags",2),i=t(e),expect(i.formInfo).toEqual({hasAcroForm:!0,hasSignatures:!1,hasXfa:!1,hasFields:!0});const s=new _primitives.Dict;s.set("FT",_primitives.Name.get("Sig")),s.set("Rect",[0,0,0,0]);const a=_primitives.Ref.get(11,0),r=new _primitives.Dict;r.set("Kids",[a]);const o=_primitives.Ref.get(10,0),c=new _test_utils.XRefMock([{ref:a,data:s},{ref:o,data:r}]);e.set("Fields",[o]),e.set("SigFlags",3),i=t(e,c),expect(i.formInfo).toEqual({hasAcroForm:!1,hasSignatures:!0,hasXfa:!1,hasFields:!0})})),it("should get calculation order array or null",(function(){const e=new _primitives.Dict;let i=t(e);expect(i.calculationOrderIds).toEqual(null),e.set("CO",[_primitives.Ref.get(1,0),_primitives.Ref.get(2,0),_primitives.Ref.get(3,0)]),i=t(e),expect(i.calculationOrderIds).toEqual(["1R","2R","3R"]),e.set("CO",[]),i=t(e),expect(i.calculationOrderIds).toEqual(null),e.set("CO",["1","2"]),i=t(e),expect(i.calculationOrderIds).toEqual(null),e.set("CO",["1",_primitives.Ref.get(1,0),"2"]),i=t(e),expect(i.calculationOrderIds).toEqual(["1R"])})),it("should get field objects array or null",(async function(){const e=new _primitives.Dict;let i=t(e),s=await i.fieldObjects;expect(s).toEqual(null),e.set("Fields",[]),i=t(e),s=await i.fieldObjects,expect(s).toEqual(null);const a=_primitives.Ref.get(314,0),r=_primitives.Ref.get(159,0),o=_primitives.Ref.get(265,0),c=_primitives.Ref.get(266,0),n=_primitives.Ref.get(358,0),l=Object.create(null);for(const t of["parent","kid1","kid2","kid11"]){const e=new _primitives.Dict;e.set("Type",_primitives.Name.get("Annot")),e.set("Subtype",_primitives.Name.get("Widget")),e.set("FT",_primitives.Name.get("Btn")),e.set("T",t),l[t]=e}l.kid1.set("Kids",[r]),l.parent.set("Kids",[a,o,c]);const u=new _test_utils.XRefMock([{ref:n,data:l.parent},{ref:a,data:l.kid1},{ref:r,data:l.kid11},{ref:o,data:l.kid2},{ref:c,data:l.kid2}]);e.set("Fields",[n]),i=t(e,u),s=await i.fieldObjects;for(const[t,d]of Object.entries(s))s[t]=d.map((e=>e.id));expect(s["parent.kid1"]).toEqual(["314R"]),expect(s["parent.kid1.kid11"]).toEqual(["159R"]),expect(s["parent.kid2"]).toEqual(["265R","266R"]),expect(s.parent).toEqual(["358R"])})),it("should check if fields have any actions",(async function(){const e=new _primitives.Dict;let i=t(e),s=await i.hasJSActions;expect(s).toEqual(!1),e.set("Fields",[]),i=t(e),s=await i.hasJSActions,expect(s).toEqual(!1);const a=_primitives.Ref.get(314,0),r=_primitives.Ref.get(159,0),o=_primitives.Ref.get(265,0),c=_primitives.Ref.get(358,0),n=Object.create(null);for(const t of["parent","kid1","kid2","kid11"]){const e=new _primitives.Dict;e.set("Type",_primitives.Name.get("Annot")),e.set("Subtype",_primitives.Name.get("Widget")),e.set("FT",_primitives.Name.get("Btn")),e.set("T",t),n[t]=e}n.kid1.set("Kids",[r]),n.parent.set("Kids",[a,o]);const l=new _test_utils.XRefMock([{ref:c,data:n.parent},{ref:a,data:n.kid1},{ref:r,data:n.kid11},{ref:o,data:n.kid2}]);e.set("Fields",[c]),i=t(e,l),s=await i.hasJSActions,expect(s).toEqual(!1);const u=_primitives.Name.get("JavaScript"),d=new _primitives.Dict,p=new _primitives.Dict;p.set("JS","hello()"),p.set("S",u),d.set("E",p),n.kid2.set("AA",d),i=t(e,l),s=await i.hasJSActions,expect(s).toEqual(!0)}))}))}));