/*! grafana - v4.2.0 - 2017-03-22
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["../../../../../test/lib/common","../../../../../test/specs/helpers","../module"],function(a,b){"use strict";var c,d,e;b&&b.id;return{setters:[function(a){c=a},function(a){d=a},function(a){e=a}],execute:function(){c.describe("SingleStatCtrl",function(){function a(a,d){c.describe(a,function(){b.setup=function(a){c.beforeEach(c.angularMocks.module("grafana.services")),c.beforeEach(c.angularMocks.module("grafana.controllers")),c.beforeEach(c.angularMocks.module(function(a){a.preAssignBindingsEnabled(!0)})),c.beforeEach(b.providePhase()),c.beforeEach(b.createPanelController(e.SingleStatCtrl)),c.beforeEach(function(){a();var c=[{target:"test.cpu1",datapoints:b.datapoints}];b.ctrl.onDataReceived(c),b.data=b.ctrl.data})},d(b)})}var b=new d.default.ControllerTestContext;a("with defaults",function(a){a.setup(function(){a.datapoints=[[10,1],[20,2]]}),c.it("Should use series avg as default main value",function(){c.expect(a.data.value).to.be(15),c.expect(a.data.valueRounded).to.be(15)}),c.it("should set formated falue",function(){c.expect(a.data.valueFormated).to.be("15")})}),a("showing serie name instead of value",function(a){a.setup(function(){a.datapoints=[[10,1],[20,2]],a.ctrl.panel.valueName="name"}),c.it("Should use series avg as default main value",function(){c.expect(a.data.value).to.be(0),c.expect(a.data.valueRounded).to.be(0)}),c.it("should set formated falue",function(){c.expect(a.data.valueFormated).to.be("test.cpu1")})}),a("MainValue should use same number for decimals as displayed when checking thresholds",function(a){a.setup(function(){a.datapoints=[[99.999,1],[99.99999,2]]}),c.it("Should be rounded",function(){c.expect(a.data.value).to.be(99.999495),c.expect(a.data.valueRounded).to.be(100)}),c.it("should set formated falue",function(){c.expect(a.data.valueFormated).to.be("100")})}),a("When value to text mapping is specified",function(a){a.setup(function(){a.datapoints=[[9.9,1]],a.ctrl.panel.valueMaps=[{value:"10",text:"OK"}]}),c.it("value should remain",function(){c.expect(a.data.value).to.be(9.9)}),c.it("round should be rounded up",function(){c.expect(a.data.valueRounded).to.be(10)}),c.it("Should replace value with text",function(){c.expect(a.data.valueFormated).to.be("OK")})}),a("When range to text mapping is specifiedfor first range",function(a){a.setup(function(){a.datapoints=[[41,50]],a.ctrl.panel.mappingType=2,a.ctrl.panel.rangeMaps=[{from:"10",to:"50",text:"OK"},{from:"51",to:"100",text:"NOT OK"}]}),c.it("Should replace value with text OK",function(){c.expect(a.data.valueFormated).to.be("OK")})}),a("When range to text mapping is specified for other ranges",function(a){a.setup(function(){a.datapoints=[[65,75]],a.ctrl.panel.mappingType=2,a.ctrl.panel.rangeMaps=[{from:"10",to:"50",text:"OK"},{from:"51",to:"100",text:"NOT OK"}]}),c.it("Should replace value with text NOT OK",function(){c.expect(a.data.valueFormated).to.be("NOT OK")})})})}}});