/*! grafana - v4.2.0 - 2017-03-22
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["app/core/time_series"],function(a){"use strict";describe("TimeSeries",function(){var b,c,d,e=["short","ms"];beforeEach(function(){d={alias:"test",datapoints:[[1,2],[null,3],[10,4],[8,5]]}}),describe("when getting flot pairs",function(){it("with connected style, should ignore nulls",function(){c=new a(d),b=c.getFlotPairs("connected",e),expect(b.length).to.be(3)}),it("with null as zero style, should replace nulls with zero",function(){c=new a(d),b=c.getFlotPairs("null as zero",e),expect(b.length).to.be(4),expect(b[1][1]).to.be(0)}),it("if last is null current should pick next to last",function(){c=new a({datapoints:[[10,1],[null,2]]}),c.getFlotPairs("null",e),expect(c.stats.current).to.be(10)}),it("max value should work for negative values",function(){c=new a({datapoints:[[-10,1],[-4,2]]}),c.getFlotPairs("null",e),expect(c.stats.max).to.be(-4)}),it("average value should ignore nulls",function(){c=new a(d),c.getFlotPairs("null",e),expect(c.stats.avg).to.be(6.333333333333333)}),it("the delta value should account for nulls",function(){c=new a({datapoints:[[1,2],[3,3],[null,4],[10,5],[15,6]]}),c.getFlotPairs("null",e),expect(c.stats.delta).to.be(14)}),it("the delta value should account for nulls on first",function(){c=new a({datapoints:[[null,2],[1,3],[10,4],[15,5]]}),c.getFlotPairs("null",e),expect(c.stats.delta).to.be(14)}),it("the delta value should account for nulls on last",function(){c=new a({datapoints:[[1,2],[5,3],[10,4],[null,5]]}),c.getFlotPairs("null",e),expect(c.stats.delta).to.be(9)}),it("the delta value should account for resets",function(){c=new a({datapoints:[[1,2],[5,3],[10,4],[0,5],[10,6]]}),c.getFlotPairs("null",e),expect(c.stats.delta).to.be(19)}),it("the delta value should account for resets on last",function(){c=new a({datapoints:[[1,2],[2,3],[10,4],[8,5]]}),c.getFlotPairs("null",e),expect(c.stats.delta).to.be(17)}),it("the range value should be max - min",function(){c=new a(d),c.getFlotPairs("null",e),expect(c.stats.range).to.be(9)}),it("first value should ingone nulls",function(){c=new a(d),c.getFlotPairs("null",e),expect(c.stats.first).to.be(1),c=new a({datapoints:[[null,2],[1,3],[10,4],[8,5]]}),c.getFlotPairs("null",e),expect(c.stats.first).to.be(1)}),it("with null as zero style, average value should treat nulls as 0",function(){c=new a(d),c.getFlotPairs("null as zero",e),expect(c.stats.avg).to.be(4.75)})}),describe("When checking if ms resolution is needed",function(){describe("msResolution with second resolution timestamps",function(){beforeEach(function(){c=new a({datapoints:[[45,1234567890],[60,1234567899]]})}),it("should set hasMsResolution to false",function(){expect(c.hasMsResolution).to.be(!1)})}),describe("msResolution with millisecond resolution timestamps",function(){beforeEach(function(){c=new a({datapoints:[[55,1236547890001],[90,1234456709e3]]})}),it("should show millisecond resolution tooltip",function(){expect(c.hasMsResolution).to.be(!0)})}),describe("msResolution with millisecond resolution timestamps but with trailing zeroes",function(){beforeEach(function(){c=new a({datapoints:[[45,123456789e4],[60,1234567899e3]]})}),it("should not show millisecond resolution tooltip",function(){expect(c.hasMsResolution).to.be(!1)})})}),describe("can detect if series contains ms precision",function(){var b;beforeEach(function(){b=d}),it("missing datapoint with ms precision",function(){b.datapoints[0]=[1337,123456789e4],c=new a(b),expect(c.isMsResolutionNeeded()).to.be(!1)}),it("contains datapoint with ms precision",function(){b.datapoints[0]=[1337,1236547890001],c=new a(b),expect(c.isMsResolutionNeeded()).to.be(!0)})}),describe("series overrides",function(){var b;beforeEach(function(){b=new a(d)}),describe("fill & points",function(){beforeEach(function(){b.alias="test",b.applySeriesOverrides([{alias:"test",fill:0,points:!0}])}),it("should set fill zero, and enable points",function(){expect(b.lines.fill).to.be(.001),expect(b.points.show).to.be(!0)})}),describe("series option overrides, bars, true & lines false",function(){beforeEach(function(){b.alias="test",b.applySeriesOverrides([{alias:"test",bars:!0,lines:!1}])}),it("should disable lines, and enable bars",function(){expect(b.lines.show).to.be(!1),expect(b.bars.show).to.be(!0)})}),describe("series option overrides, linewidth, stack",function(){beforeEach(function(){b.alias="test",b.applySeriesOverrides([{alias:"test",linewidth:5,stack:!1}])}),it("should disable stack, and set lineWidth",function(){expect(b.stack).to.be(!1),expect(b.lines.lineWidth).to.be(5)})}),describe("series option overrides, fill below to",function(){beforeEach(function(){b.alias="test",b.applySeriesOverrides([{alias:"test",fillBelowTo:"min"}])}),it("should disable line fill and add fillBelowTo",function(){expect(b.fillBelowTo).to.be("min")})}),describe("series option overrides, pointradius, steppedLine",function(){beforeEach(function(){b.alias="test",b.applySeriesOverrides([{alias:"test",pointradius:5,steppedLine:!0}])}),it("should set pointradius, and set steppedLine",function(){expect(b.points.radius).to.be(5),expect(b.lines.steps).to.be(!0)})}),describe("override match on regex",function(){beforeEach(function(){b.alias="test_01",b.applySeriesOverrides([{alias:"/.*01/",lines:!1}])}),it("should match second series",function(){expect(b.lines.show).to.be(!1)})}),describe("override series y-axis, and z-index",function(){beforeEach(function(){b.alias="test",b.applySeriesOverrides([{alias:"test",yaxis:2,zindex:2}])}),it("should set yaxis",function(){expect(b.yaxis).to.be(2)}),it("should set zindex",function(){expect(b.zindex).to.be(2)})})})})});