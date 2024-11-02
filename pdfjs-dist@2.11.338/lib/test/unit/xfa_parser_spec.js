"use strict";var _xfa_object=require("../../core/xfa/xfa_object.js"),_bind=require("../../core/xfa/bind.js"),_som=require("../../core/xfa/som.js"),_parser=require("../../core/xfa/parser.js");describe("XFAParser",(function(){describe("Parse XFA",(function(){it("should parse a xfa document and create an object to represent it",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/" uuid="1234" invalid="foo">\n  <config xmlns="http://www.xfa.org/schema/xci/3.1/">\n    <present>\n      <pdf name="hello">\n        <adobeExtensionLevel>\n          7\n        </adobeExtensionLevel>\n      </pdf>\n      <invalid><a>foobar</a></invalid>\n    </present>\n    <acrobat>\n      <submitUrl>http://a.b.c</submitUrl>\n      <acrobat7>\n        <dynamicRender>\n          forbidden\n        </dynamicRender>\n      </acrobat7>\n      <autoSave>enabled</autoSave>      \n      <submitUrl>\n                 http://d.e.f\n      </submitUrl>\n      <submitUrl>http://g.h.i</submitUrl>\n      <validate>foobar</validate>\n    </acrobat>\n  </config>\n  <template baseProfile="full" xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <extras>\n      <float>1.23</float>\n      <boolean>1</boolean>\n      <integer>314</integer>\n      <float>2.71</float>\n    </extras>\n    <subform>\n      <proto>\n        <area x="hello" y="-3.14in" relevant="-foo +bar" />\n        <color value="111, 222, 123" />\n        <color value="111, abc, 123" />\n        <medium imagingBBox="1,2in,3.4cm,5.67px" />\n        <medium imagingBBox="1,2in,-3cm,4px" />\n      </proto>\n    </subform>\n  </template>\n</xdp:xdp>\n      ',t={id:"",name:"",use:"",usehref:""},n={id:"",long:0,orientation:"portrait",short:0,stock:"",trayIn:"auto",trayOut:"auto",use:"",usehref:""},a={cSpace:"SRGB",id:"",use:"",usehref:""},o=(new _parser.XFAParser).parse(e),s={uuid:"1234",timeStamp:"",template:{baseProfile:"full",extras:{...t,float:[{...t,$content:1.23},{...t,$content:2.71}],boolean:{...t,$content:1},integer:{...t,$content:314}},subform:{access:"open",allowMacro:0,anchorType:"topLeft",colSpan:1,columnWidths:[0],h:"",hAlign:"left",id:"",layout:"position",locale:"",maxH:0,maxW:0,mergeMode:"consumeData",minH:0,minW:0,name:"",presence:"visible",relevant:[],restoreState:"manual",scope:"name",use:"",usehref:"",w:"",x:0,y:0,proto:{area:{...t,colSpan:1,x:0,y:-226.08,relevant:[{excluded:!0,viewname:"foo"},{excluded:!1,viewname:"bar"}]},color:[{...a,value:{r:111,g:222,b:123}},{...a,value:{r:111,g:0,b:123}}],medium:[{...n,imagingBBox:{x:1,y:144,width:96.3779527559055,height:5.67}},{...n,imagingBBox:{x:-1,y:-1,width:-1,height:-1}}]}}},config:{acrobat:{acrobat7:{dynamicRender:{$content:"forbidden"}},autoSave:{$content:"enabled"},validate:{$content:"preSubmit"},submitUrl:[{$content:"http://a.b.c"},{$content:"http://d.e.f"},{$content:"http://g.h.i"}]},present:{pdf:{name:"hello",adobeExtensionLevel:{$content:7}}}}};expect(o[_xfa_object.$dump]()).toEqual(s)})),it("should parse a xfa document and check namespaces",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <config xmlns:foo="http:/www.foo.com" xmlns="http://www.xfa.org/schema/xci/3.1/">\n    <present xmlns="http://www.mozilla.org">\n      <pdf name="hello">\n        <adobeExtensionLevel>\n          7\n        </adobeExtensionLevel>\n      </pdf>\n    </present>\n    <acrobat>\n      <foo:submitUrl>http://a.b.c</foo:submitUrl>\n      <submitUrl>http://c.b.a</submitUrl>\n    </acrobat>\n  </config>\n  <template baseProfile="full" xmlns="http://www.allizom.org">\n    <extras>\n      <float>1.23</float>\n    </extras>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n={uuid:"",timeStamp:"",config:{acrobat:{submitUrl:{$content:"http://c.b.a"}}}};expect(t[_xfa_object.$dump]()).toEqual(n)})),it("should parse a xfa document and parse CDATA when needed",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform>\n      <field>\n        <extras>\n          <exData contentType="text/html" name="foo">\n            <![CDATA[<body xmlns="http://www.w3.org/1999/xhtml">\n              <span>hello</span></body>]]>\n          </exData>\n        </extra>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=(0,_som.searchNode)(t,t,"foo")[0],a=n[_xfa_object.$dump]().$content[_xfa_object.$dump](),o={$name:"body",attributes:{},children:[{$content:"hello",$name:"span",attributes:{},children:[]}]};expect(a).toEqual(o)})),it("should parse a xfa document and apply some prototypes",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform>\n      <proto>\n        <font id="id1" typeface="Foo" size="123pt" weight="bold" posture="italic">\n          <fill>\n            <color value="1,2,3"/>\n          </fill>\n        </font>\n      </proto>\n      <field>\n        <font use="#id1"/>\n      </field>\n      <field>\n        <font use="#id1" size="456pt" weight="bold" posture="normal">\n          <fill>\n            <color value="4,5,6"/>\n          </fill>\n          <extras id="id2"/>\n        </font>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e)[_xfa_object.$dump]();let n=t.template.subform.field[0].font;expect(n.typeface).toEqual("Foo"),expect(n.overline).toEqual(0),expect(n.size).toEqual(123),expect(n.weight).toEqual("bold"),expect(n.posture).toEqual("italic"),expect(n.fill.color.value).toEqual({r:1,g:2,b:3}),expect(n.extras).toEqual(void 0),n=t.template.subform.field[1].font,expect(n.typeface).toEqual("Foo"),expect(n.overline).toEqual(0),expect(n.size).toEqual(456),expect(n.weight).toEqual("bold"),expect(n.posture).toEqual("normal"),expect(n.fill.color.value).toEqual({r:4,g:5,b:6}),expect(n.extras.id).toEqual("id2")})),it("should parse a xfa document and apply some prototypes through usehref",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform>\n      <proto>\n        <draw name="foo">\n          <font typeface="Foo" size="123pt" weight="bold" posture="italic">\n            <fill>\n              <color value="1,2,3"/>\n            </fill>\n          </font>\n        </draw>\n      </proto>\n      <field>\n        <font usehref=".#som($template.#subform.foo.#font)"/>\n      </field>\n      <field>\n        <font usehref=".#som($template.#subform.foo.#font)" size="456pt" weight="bold" posture="normal">\n          <fill>\n            <color value="4,5,6"/>\n          </fill>\n          <extras id="id2"/>\n        </font>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e)[_xfa_object.$dump]();let n=t.template.subform.field[0].font;expect(n.typeface).toEqual("Foo"),expect(n.overline).toEqual(0),expect(n.size).toEqual(123),expect(n.weight).toEqual("bold"),expect(n.posture).toEqual("italic"),expect(n.fill.color.value).toEqual({r:1,g:2,b:3}),expect(n.extras).toEqual(void 0),n=t.template.subform.field[1].font,expect(n.typeface).toEqual("Foo"),expect(n.overline).toEqual(0),expect(n.size).toEqual(456),expect(n.weight).toEqual("bold"),expect(n.posture).toEqual("normal"),expect(n.fill.color.value).toEqual({r:4,g:5,b:6}),expect(n.extras.id).toEqual("id2")})),it("should parse a xfa document with xhtml",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <extras>\n      <text>\n        <body xmlns="http://www.w3.org/1999/xhtml">\n          <p style="foo: bar; text-indent:0.5in; line-height:11px;bar:foo;tab-stop: left 0.5in">\n            The first line of this paragraph is indented a half-inch.<br/>\n            Successive lines are not indented.<br/>\n            This is the last line of the paragraph.<br/>\n          </p>\n        </body>\n      </text>\n    </extras>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e)[_xfa_object.$dump](),n=t.template.extras.text.$content[_xfa_object.$getChildren]()[0];expect(n.style).toEqual("text-indent:0.5in;line-height:11px;tab-stop:left 0.5in"),expect(n[_xfa_object.$text]()).toEqual([" The first line of this paragraph is indented a half-inch.\n"," Successive lines are not indented.\n"," This is the last line of the paragraph.\n \n"].join(""))})),it("should parse a xfa document and apply some prototypes with cycle",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform>\n      <proto>\n        <subform id="id1">\n          <subform use="#id1"/>\n        </subform>\n      </proto>\n    </subform>\n    <subform use="#id1"/>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e)[_xfa_object.$dump](),n=t.template.subform[1];expect(n.id).toEqual("id1"),expect(n.subform.id).toEqual("id1")})),it("should parse a xfa document and apply some nested prototypes",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform>\n      <proto>\n        <color id="RED" value="7, 8, 9"/>\n        <font id="HELV" typeface="helvetica" size="31pt" weight="normal" posture="italic"> </font>\n        <font id="HELV-RED" use="#HELV">\n          <fill>\n            <color use="#RED"/>\n          </fill>\n        </font>\n      </proto>\n      <field>\n        <font use="#HELV-RED"/>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e)[_xfa_object.$dump](),n=t.template.subform.field.font;expect(n.typeface).toEqual("helvetica"),expect(n.overline).toEqual(0),expect(n.size).toEqual(31),expect(n.weight).toEqual("normal"),expect(n.posture).toEqual("italic"),expect(n.fill.color.value).toEqual({r:7,g:8,b:9})})),it("should parse a xfa document and apply a prototype with content",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform>\n      <proto>\n        <text id="TEXT">default TEXT</text>\n      </proto>\n      <field>\n        <value>\n          <text use="#TEXT"></text>\n        </value>\n      </field>\n      <field>\n        <value>\n          <text use="#TEXT">Overriding text</text>\n        </value>\n      </field>\n    </subform>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e)[_xfa_object.$dump]();let n=t.template.subform.field[0];expect(n.value.text.$content).toEqual("default TEXT"),n=t.template.subform.field[1],expect(n.value.text.$content).toEqual("Overriding text")}))})),describe("Search in XFA",(function(){it("should search some nodes in a template object",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n    <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n      <subform name="Receipt" id="l">\n        <subform id="m">\n          <field name="Description" id="a">  </field>\n          <field name="Units" id="b">  </field>\n          <field name="Unit_Price" id="c">  </field>\n          <field name="Total_Price" id="d">  </field>\n        </subform>\n        <subform id="n">\n          <field name="Description" id="e">  </field>\n          <field name="Units" id="f">  </field>\n          <field name="Unit_Price" id="g">  </field>\n          <field name="Total_Price" id="h">  </field>\n        </subform>\n        <subform name="foo" id="o">\n          <field name="Description" id="p">  </field>\n          <field name="Units" id="q">  </field>\n          <field name="Unit_Price" id="r">  </field>\n          <field name="Total_Price" id="s">  </field>\n        </subform>\n        <field name="Sub_Total" id="i">  </field>\n        <field name="Tax" id="j">  </field>\n        <field name="Total_Price" id="k">  </field>\n      </subform>\n    </template>\n</xdp:xdp>\n        ',t=(new _parser.XFAParser).parse(e);let n=t[_xfa_object.$getChildrenByName]("subform",!0);expect(n.map((e=>e.id))).toEqual(["l","m","n","o"]),n=t[_xfa_object.$getChildrenByName]("Total_Price",!0),expect(n.map((e=>e.id))).toEqual(["d","h","s","k"]),n=t.template[_xfa_object.$getChildrenByName]("Receipt",!1);const a=n[0];n=a[_xfa_object.$getChildrenByName]("Total_Price",!1),expect(n.map((e=>e.id))).toEqual(["d","h","k"]),expect(a[_xfa_object.$getChildrenByClass]("name")).toEqual("Receipt");const o=a[_xfa_object.$getChildrenByClass]("subform");expect(o.children.map((e=>e.id))).toEqual(["m","n","o"])})),it("should search some nodes in a template object using SOM",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n    <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n      <subform name="Receipt" id="l">\n        <subform id="m">\n          <field name="Description" id="a">  </field>\n          <field name="Units" id="b">  </field>\n          <field name="Unit_Price" id="c">  </field>\n          <field name="Total_Price" id="d">  </field>\n        </subform>\n        <subform id="n">\n          <field name="Description" id="e">  </field>\n          <field name="Units" id="f">  </field>\n          <field name="Unit_Price" id="g">  </field>\n          <field name="Total_Price" id="h">  </field>\n        </subform>\n        <subform name="foo" id="o">\n          <field name="Description" id="p">  </field>\n          <field name="Units" id="q">  </field>\n          <field name="Unit_Price" id="r">  </field>\n          <field name="Total_Price" id="s">  </field>\n        </subform>\n        <field name="Sub_Total" id="i">  </field>\n        <field name="Tax" id="j">  </field>\n        <field name="Total_Price" id="k">  </field>\n      </subform>\n    </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e);expect((0,_som.searchNode)(t,null,"$template..Description.id")[0][_xfa_object.$text]()).toBe("a"),expect((0,_som.searchNode)(t,null,"$template..Description.id")[0][_xfa_object.$text]()).toBe("a"),expect((0,_som.searchNode)(t,null,"$template..Description[0].id")[0][_xfa_object.$text]()).toBe("a"),expect((0,_som.searchNode)(t,null,"$template..Description[1].id")[0][_xfa_object.$text]()).toBe("e"),expect((0,_som.searchNode)(t,null,"$template..Description[2].id")[0][_xfa_object.$text]()).toBe("p"),expect((0,_som.searchNode)(t,null,"$template.Receipt.id")[0][_xfa_object.$text]()).toBe("l"),expect((0,_som.searchNode)(t,null,"$template.Receipt.Description[1].id")[0][_xfa_object.$text]()).toBe("e"),expect((0,_som.searchNode)(t,null,"$template.Receipt.Description[2]")).toBe(null),expect((0,_som.searchNode)(t,null,"$template.Receipt.foo.Description.id")[0][_xfa_object.$text]()).toBe("p"),expect((0,_som.searchNode)(t,null,"$template.#subform.Sub_Total.id")[0][_xfa_object.$text]()).toBe("i"),expect((0,_som.searchNode)(t,null,"$template.#subform.Units.id")[0][_xfa_object.$text]()).toBe("b"),expect((0,_som.searchNode)(t,null,"$template.#subform.Units.parent.id")[0][_xfa_object.$text]()).toBe("m")})),it("should search some nodes in a datasets object",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <Receipt>\n        <Page>1</Page>\n        <Detail PartNo="GS001">\n          <Description>Giant Slingshot</Description>\n          <Units>1</Units>\n          <Unit_Price>250.00</Unit_Price>\n          <Total_Price>250.00</Total_Price>\n        </Detail>\n        <Page>2</Page>\n        <Detail PartNo="RRB-LB">\n          <Description>Road Runner Bait, large bag</Description>\n          <Units>5</Units>\n          <Unit_Price>12.00</Unit_Price>\n          <Total_Price>60.00</Total_Price>\n        </Detail>\n        <Sub_Total>310.00</Sub_Total>\n        <Tax>24.80</Tax>\n        <Total_Price>334.80</Total_Price>\n      </Receipt>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=t.datasets.data;let a=n[_xfa_object.$getChildrenByName]("Description",!0);expect(a.map((e=>e[_xfa_object.$text]()))).toEqual(["Giant Slingshot","Road Runner Bait, large bag"]),a=n[_xfa_object.$getChildrenByName]("Total_Price",!0),expect(a.map((e=>e[_xfa_object.$text]()))).toEqual(["250.00","60.00","334.80"])})),it("should search some nodes using SOM from a non-root node",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <Receipt>\n        <Page>1</Page>\n        <Detail PartNo="GS001">\n          <Description>Giant Slingshot</Description>\n          <Units>1</Units>\n          <Unit_Price>250.00</Unit_Price>\n          <Total_Price>250.00</Total_Price>\n        </Detail>\n        <Page>2</Page>\n        <Detail PartNo="RRB-LB">\n          <Description>Road Runner Bait, large bag</Description>\n          <Units>5</Units>\n          <Unit_Price>12.00</Unit_Price>\n          <Total_Price>60.00</Total_Price>\n        </Detail>\n        <Sub_Total>310.00</Sub_Total>\n        <Tax>24.80</Tax>\n        <Total_Price>334.80</Total_Price>\n      </Receipt>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),[n]=t.datasets.data[_xfa_object.$getChildren]("Receipt");expect((0,_som.searchNode)(t,n,"Detail[*].Total_Price").map((e=>e[_xfa_object.$text]()))).toEqual(["250.00","60.00"]);const[a]=(0,_som.searchNode)(t,n,"Detail[1].Units");expect(a[_xfa_object.$text]()).toBe("5");let[o]=(0,_som.searchNode)(t,a,"Total_Price");expect(o[_xfa_object.$text]()).toBe("60.00"),o=(0,_som.searchNode)(t,a,"Total_Pric"),expect(o).toEqual(null)})),it("should search some nodes in a datasets object using SOM",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <Receipt Detail="Acme">\n        <Detail>foo</Detail>\n        <Detail>bar</Detail>\n     </Receipt>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e);expect((0,_som.searchNode)(t,null,"$data.Receipt.Detail")[0][_xfa_object.$text]()).toBe("Acme"),expect((0,_som.searchNode)(t,null,"$data.Receipt.Detail[0]")[0][_xfa_object.$text]()).toBe("Acme"),expect((0,_som.searchNode)(t,null,"$data.Receipt.Detail[1]")[0][_xfa_object.$text]()).toBe("foo"),expect((0,_som.searchNode)(t,null,"$data.Receipt.Detail[2]")[0][_xfa_object.$text]()).toBe("bar")}))})),describe("Bind data into form",(function(){it("should make a basic binding",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="A">\n      <subform name="B">\n        <field name="C">\n        </field>\n        <field name="D">\n        </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <A>\n        <C>xyz</C>\n      </A>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"A.B.C.value.text")[0][_xfa_object.$dump]().$content).toBe("xyz")})),it("should make a basic binding and create a non-existing node",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="A" mergeMode="matchTemplate">\n      <subform name="B">\n        <field name="C">\n        </field>\n        <field name="D">\n          <value>\n            <text>foobar</text>\n          </value>\n        </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <A>\n      </A>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t),a=n.bind(),o=n.getData();expect((0,_som.searchNode)(a,a,"A.B.D.value.text")[0][_xfa_object.$dump]().$content).toBe("foobar");const s={$name:"A",attributes:{},children:[{$name:"B",attributes:{},children:[{$name:"C",attributes:{},children:[]},{$name:"D",attributes:{},children:[]}]}]};expect((0,_som.searchNode)(o,o,"A")[0][_xfa_object.$dump]()).toEqual(s)})),it("should make a basic binding and create a non-existing node with namespaceId equal to -1",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="A">\n      <subform name="B">\n        <field name="C">\n        </field>\n        <field name="D">\n          <value>\n            <text>foobar</text>\n          </value>\n        </field>\n      </subform>\n    </subform>\n  </template>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t),a=n.bind(),o=n.getData();expect((0,_som.searchNode)(a,a,"A.B.D.value.text")[0][_xfa_object.$dump]().$content).toBe("foobar");const s={$name:"A",$ns:-1,attributes:{},children:[{$name:"B",$ns:-1,attributes:{},children:[{$name:"C",$ns:-1,attributes:{},children:[]},{$name:"D",$ns:-1,attributes:{},children:[]}]}]};expect((0,_som.searchNode)(o,o,"A")[0][_xfa_object.$dump](!0)).toEqual(s)})),it("should make another basic binding",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="registration">\n      <field name="first"> </field>\n      <field name="last">  </field>\n      <field name="apt">  </field>\n      <field name="street">  </field>\n      <field name="city">  </field>\n      <field name="country">  </field>\n      <field name="postalcode"/>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <registration>\n        <first>Jack</first>\n        <last>Spratt</last>\n        <apt/>\n        <street>99 Candlestick Lane</street>\n        <city>London</city>\n        <country>UK</country>\n        <postalcode>SW1</postalcode>\n      </registration>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"registration.first..text")[0][_xfa_object.$dump]().$content).toBe("Jack"),expect((0,_som.searchNode)(n,n,"registration.last..text")[0][_xfa_object.$dump]().$content).toBe("Spratt"),expect((0,_som.searchNode)(n,n,"registration.apt..text")[0][_xfa_object.$dump]().$content).toBe(void 0),expect((0,_som.searchNode)(n,n,"registration.street..text")[0][_xfa_object.$dump]().$content).toBe("99 Candlestick Lane"),expect((0,_som.searchNode)(n,n,"registration.city..text")[0][_xfa_object.$dump]().$content).toBe("London"),expect((0,_som.searchNode)(n,n,"registration.country..text")[0][_xfa_object.$dump]().$content).toBe("UK"),expect((0,_som.searchNode)(n,n,"registration.postalcode..text")[0][_xfa_object.$dump]().$content).toBe("SW1")})),it("should make basic binding with extra subform",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="registration">\n      <field name="first"> </field>\n      <field name="last">  </field>\n      <subform name="address">\n        <field name="apt">  </field>\n        <field name="street">  </field>\n        <field name="city">  </field>\n        <field name="country">  </field>\n        <field name="postalcode">  </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <registration>\n        <first>Jack</first>\n        <last>Spratt</last>\n        <apt/>\n        <street>99 Candlestick Lane</street>\n        <city>London</city>\n        <country>UK</country>\n        <postalcode>SW1</postalcode>\n      </registration>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"registration..first..text")[0][_xfa_object.$dump]().$content).toBe("Jack"),expect((0,_som.searchNode)(n,n,"registration..last..text")[0][_xfa_object.$dump]().$content).toBe("Spratt"),expect((0,_som.searchNode)(n,n,"registration..apt..text")[0][_xfa_object.$dump]().$content).toBe(void 0),expect((0,_som.searchNode)(n,n,"registration..street..text")[0][_xfa_object.$dump]().$content).toBe("99 Candlestick Lane"),expect((0,_som.searchNode)(n,n,"registration..city..text")[0][_xfa_object.$dump]().$content).toBe("London"),expect((0,_som.searchNode)(n,n,"registration..country..text")[0][_xfa_object.$dump]().$content).toBe("UK"),expect((0,_som.searchNode)(n,n,"registration..postalcode..text")[0][_xfa_object.$dump]().$content).toBe("SW1")})),it("should make basic binding with extra subform",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="registration" mergeMode="consumeData">\n      <subform name="address">\n        <field name="first"/>\n        <field name="last"/>\n        <field name="apt"/>\n        <field name="street"/>\n        <field name="city"/>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <registration>\n        <first>Jack</first>\n        <last>Spratt</last>\n        <address>\n          <apt>7</apt>\n          <street>99 Candlestick Lane</street>\n          <city>London</city>\n        </address>\n      </registration>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"registration..first..text")[0][_xfa_object.$dump]().$content).toBe("Jack"),expect((0,_som.searchNode)(n,n,"registration..last..text")[0][_xfa_object.$dump]().$content).toBe("Spratt"),expect((0,_som.searchNode)(n,n,"registration..apt..text")[0][_xfa_object.$dump]().$content).toBe("7"),expect((0,_som.searchNode)(n,n,"registration..street..text")[0][_xfa_object.$dump]().$content).toBe("99 Candlestick Lane"),expect((0,_som.searchNode)(n,n,"registration..city..text")[0][_xfa_object.$dump]().$content).toBe("London")})),it("should make basic binding with same names in different parts",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="application" mergeMode="consumeData">\n      <subform name="sponsor">\n        <field name="lastname">  </field>\n        \x3c!-- sponsor\'s last name --\x3e\n      </subform>\n      <field name="lastname">  </field>\n      \x3c!-- applicant\'s last name --\x3e\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <application>\n        <lastname>Abott</lastname>\n        <sponsor>\n          <lastname>Costello</lastname>\n        </sponsor>\n      </application>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"application.sponsor.lastname..text")[0][_xfa_object.$dump]().$content).toBe("Costello"),expect((0,_som.searchNode)(n,n,"application.lastname..text")[0][_xfa_object.$dump]().$content).toBe("Abott")})),it("should make binding and create nodes in data",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="root" mergeMode="matchTemplate">\n      <subform name="A">\n        <field name="a"/>\n        <field name="b"/>\n        <subform name="B">\n          <field name="c"/>\n          <field name="d"/>\n          <subform name="C">\n            <field name="e"/>\n            <field name="f"/>\n          </subform>\n        </subform>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <root>\n        <A>\n          <b>1</b>\n        </A>\n      </root>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t),a=n.bind(),o=n.getData();expect((0,_som.searchNode)(a,a,"root..b..text")[0][_xfa_object.$dump]().$content).toBe("1"),expect((0,_som.searchNode)(o,o,"root.A.a")[0][_xfa_object.$dump]().$name).toBe("a"),expect((0,_som.searchNode)(o,o,"root.A.B.c")[0][_xfa_object.$dump]().$name).toBe("c"),expect((0,_som.searchNode)(o,o,"root.A.B.d")[0][_xfa_object.$dump]().$name).toBe("d"),expect((0,_som.searchNode)(o,o,"root.A.B.C.e")[0][_xfa_object.$dump]().$name).toBe("e"),expect((0,_som.searchNode)(o,o,"root.A.B.C.f")[0][_xfa_object.$dump]().$name).toBe("f")})),it("should make binding and set properties",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="Id">\n      <field name="LastName">\n        <setProperty ref="$data.Main.Style.NameFont" target="font.typeface"/>\n        <setProperty ref="$data.Main.Style.NameSize" target="font.size"/>\n        <setProperty ref="$data.Main.Help.LastName" target="assist.toolTip"/>\n        <font></font>\n        <assist>\n          <toolTip>\n          </toolTip>\n        </assist>\n      </field>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <Id>\n        <LastName>foo</LastName>\n      </Id>\n      <Main>\n        <Style>\n          <NameFont>myfont</NameFont>\n          <NameSize>123.4pt</NameSize>\n        </Style>\n        <Help>\n          <LastName>Give the name!</LastName>\n        </Help>\n      </Main>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"Id.LastName..text")[0][_xfa_object.$dump]().$content).toBe("foo"),expect((0,_som.searchNode)(n,n,"Id.LastName.font.typeface")[0][_xfa_object.$text]()).toBe("myfont"),expect((0,_som.searchNode)(n,n,"Id.LastName.font.size")[0][_xfa_object.$text]()).toEqual(123.4),expect((0,_som.searchNode)(n,n,"Id.LastName.assist.toolTip")[0][_xfa_object.$dump]().$content).toBe("Give the name!")})),it("should make binding and bind items",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="main">\n      <field name="CardName">\n        <bindItems ref="$data.main.ccs.cc[*]" labelRef="uiname" valueRef="token"/>\n        <ui>\n          <choiceList/>\n        </ui>\n      </field>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <main>\n        <ccs>\n          <cc uiname="Visa" token="VISA"/>\n          <cc uiname="Mastercard" token="MC"/>\n          <cc uiname="American Express" token="AMEX"/>\n        </ccs>\n        <CardName>MC</CardName>\n      </main>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"subform.CardName.items[*].text[*]").map((e=>e[_xfa_object.$text]()))).toEqual(["Visa","Mastercard","American Express","VISA","MC","AMEX"])})),it("should make binding and bind items with a ref",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="main">\n      <field name="CardName">\n        <bind match="dataRef" ref="$data.main.value"/>\n        <bindItems ref="$data.main.ccs.cc[*]" labelRef="uiname" valueRef="token"/>\n        <ui>\n          <choiceList/>\n        </ui>\n      </field>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <main>\n        <value>VISA</value>\n        <ccs>\n          <cc uiname="Visa" token="VISA"/>\n          <cc uiname="Mastercard" token="MC"/>\n          <cc uiname="American Express" token="AMEX"/>\n        </ccs>\n        <CardName>MC</CardName>\n      </main>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"subform.CardName.value.text").map((e=>e[_xfa_object.$text]()))).toEqual(["VISA"]),expect((0,_som.searchNode)(n,n,"subform.CardName.items[*].text[*]").map((e=>e[_xfa_object.$text]()))).toEqual(["Visa","Mastercard","American Express","VISA","MC","AMEX"])})),it("should make binding with occurrences in consumeData mode",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="root" mergeMode="consumeData">\n      <subform name="section" id="section1">\n        <occur min="0" max="-1"/>\n        <bind match="dataRef" ref="$.section[*]"/>\n        <field name="line-item"/>\n      </subform>\n      <subform name="section" id="section2">\n        <occur min="0" max="-1"/>\n        <bind match="dataRef" ref="$.section[*]"/>\n        <field name="line-item"/>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <root>\n        <section>\n          <line-item>item1</line-item>\n        </section>\n        <section>\n          <line-item>item2</line-item>\n        </section>\n      </root>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"root.section[*].id").map((e=>e[_xfa_object.$text]()))).toEqual(["section1","section1"]),expect((0,_som.searchNode)(n,n,"root.section[*].line-item..text").map((e=>e[_xfa_object.$text]()))).toEqual(["item1","item2"])})),it("should make binding with occurrences in matchTemplate mode",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="root" mergeMode="matchTemplate">\n      <subform name="section" id="section1">\n        <occur min="0" max="-1"/>\n        <bind match="dataRef" ref="$.section[*]"/>\n        <field name="line-item"/>\n      </subform>\n      <subform name="section" id="section2">\n        <occur min="0" max="-1"/>\n        <bind match="dataRef" ref="$.section[*]"/>\n        <field name="line-item"/>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <root>\n        <section>\n          <line-item>item1</line-item>\n        </section>\n        <section>\n          <line-item>item2</line-item>\n        </section>\n      </root>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"root.section[*].id").map((e=>e[_xfa_object.$text]()))).toEqual(["section1","section1","section2","section2"]),expect((0,_som.searchNode)(n,n,"root.section[*].line-item..text").map((e=>e[_xfa_object.$text]()))).toEqual(["item1","item2","item1","item2"])})),it("should make binding and create nodes in data with some bind tag",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="root" mergeMode="matchTemplate">\n      <subform name="A">\n        <occur max="-1"/>\n        <bind ref="$.root.foo[*]" match="dataRef"/>\n      </subform>\n      <subform name="B">\n        <occur max="2"/>\n        <bind ref="$.root.bar[2]" match="dataRef"/>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <root>\n      </root>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t);n.bind();const a=n.getData(),o={$name:"root",children:[{$name:"root",children:[{$name:"foo",children:[],attributes:{}},{$name:"bar",children:[],attributes:{}},{$name:"bar",children:[],attributes:{}},{$name:"bar",children:[],attributes:{}}],attributes:{}}],attributes:{}};expect((0,_som.searchNode)(a,a,"root")[0][_xfa_object.$dump]()).toEqual(o)})),it("should make a binding with a bindItems",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="A" mergeMode="matchTemplate">\n      <subform name="B">\n        <field name="C">\n          <ui>\n            <choicelist/>\n          </ui>\n          <bindItems ref="xfa.datasets.foo.bar[*]" labelRef="$" valueRef="oof"/>\n        </field>\n      </subform>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <foo>\n      <bar oof="a">1</bar>\n      <bar oof="b">2</bar>\n      <bar oof="c">3</bar>\n      <bar oof="d">4</bar>\n      <bar oof="e">5</bar>\n    </foo>\n    <xfa:data>\n      <A><B></B></A>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n      ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"A.B.C.items[0].text[*]").map((e=>e[_xfa_object.$dump]().$content))).toEqual(["1","2","3","4","5"]),expect((0,_som.searchNode)(n,n,"A.B.C.items[1].text[*]").map((e=>e[_xfa_object.$dump]().$content))).toEqual(["a","b","c","d","e"])}))})),it("should make a binding with a element in an area",(function(){const e='\n<?xml version="1.0"?>\n<xdp:xdp xmlns:xdp="http://ns.adobe.com/xdp/">\n  <template xmlns="http://www.xfa.org/schema/xfa-template/3.3">\n    <subform name="A" mergeMode="matchTemplate">\n      <area>\n        <field name="B"/>\n      </area>\n    </subform>\n  </template>\n  <xfa:datasets xmlns:xfa="http://www.xfa.org/schema/xfa-data/1.0/">\n    <xfa:data>\n      <A><B>foobar</B></A>\n    </xfa:data>\n  </xfa:datasets>\n</xdp:xdp>\n    ',t=(new _parser.XFAParser).parse(e),n=new _bind.Binder(t).bind();expect((0,_som.searchNode)(n,n,"A..B..text")[0][_xfa_object.$dump]().$content).toBe("foobar")}))}));