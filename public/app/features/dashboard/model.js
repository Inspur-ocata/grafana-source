/*! grafana - v4.2.0 - 2017-03-22
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

System.register(["angular","moment","lodash","jquery","app/core/core","./row/row_model","app/core/utils/sort_by_keys"],function(a,b){"use strict";var c,d,e,f,g,h,i,j;b&&b.id;return{setters:[function(a){c=a},function(a){d=a},function(a){e=a},function(a){f=a},function(a){g=a},function(a){h=a},function(a){i=a}],execute:function(){j=function(){function a(a,b){if(a||(a={}),this.events=new g.Emitter,this.id=a.id||null,this.revision=a.revision,this.title=a.title||"No Title",this.autoUpdate=a.autoUpdate,this.description=a.description,this.tags=a.tags||[],this.style=a.style||"dark",this.timezone=a.timezone||"",this.editable=a.editable!==!1,this.graphTooltip=a.graphTooltip||0,this.hideControls=a.hideControls||!1,this.time=a.time||{from:"now-6h",to:"now"},this.timepicker=a.timepicker||{},this.templating=this.ensureListExist(a.templating),this.annotations=this.ensureListExist(a.annotations),this.refresh=a.refresh,this.snapshot=a.snapshot,this.schemaVersion=a.schemaVersion||0,this.version=a.version||0,this.links=a.links||[],this.gnetId=a.gnetId||null,this.rows=[],a.rows)for(var c=0,d=a.rows;c<d.length;c++){var e=d[c];this.rows.push(new h.DashboardRow(e))}this.updateSchema(a),this.initMeta(b)}return a.prototype.initMeta=function(a){a=a||{},a.canShare=a.canShare!==!1,a.canSave=a.canSave!==!1,a.canStar=a.canStar!==!1,a.canEdit=a.canEdit!==!1,this.editable||(a.canEdit=!1,a.canDelete=!1,a.canSave=!1),this.meta=a},a.prototype.getSaveModelClone=function(){var a=this.events,b=this.meta,c=this.rows,d=this.templating.list;delete this.events,delete this.meta,this.rows=e.default.map(c,function(a){return a.getSaveModel()}),this.templating.list=e.default.map(d,function(a){return a.getSaveModel?a.getSaveModel():a});var g=f.default.extend(!0,{},this);return g=i.default(g),this.events=a,this.meta=b,this.rows=c,this.templating.list=d,g},a.prototype.addEmptyRow=function(){this.rows.push(new h.DashboardRow({isNew:!0}))},a.prototype.ensureListExist=function(a){return a||(a={}),a.list||(a.list=[]),a},a.prototype.getNextPanelId=function(){var a,b,c,d,e=0;for(a=0;a<this.rows.length;a++)for(c=this.rows[a],b=0;b<c.panels.length;b++)d=c.panels[b],d.id>e&&(e=d.id);return e+1},a.prototype.forEachPanel=function(a){var b,c,d;for(b=0;b<this.rows.length;b++)for(d=this.rows[b],c=0;c<d.panels.length;c++)a(d.panels[c],c,d,b)},a.prototype.getPanelById=function(a){for(var b=0;b<this.rows.length;b++)for(var c=this.rows[b],d=0;d<c.panels.length;d++){var e=c.panels[d];if(e.id===a)return e}return null},a.prototype.addPanel=function(a,b){a.id=this.getNextPanelId(),b.addPanel(a)},a.prototype.removeRow=function(a,b){var c=this,d=e.default.indexOf(this.rows,a);return!a.panels.length||b?(this.rows.splice(d,1),void a.destroy()):void g.appEvents.emit("confirm-modal",{title:"Remove Row",text:"Are you sure you want to remove this row?",icon:"fa-trash",yesText:"Delete",onConfirm:function(){c.rows.splice(d,1),a.destroy()}})},a.prototype.toggleEditMode=function(){return this.meta.canEdit?(this.editMode=!this.editMode,this.updateSubmenuVisibility(),void this.events.emit("edit-mode-changed",this.editMode)):void console.log("Not allowed to edit dashboard")},a.prototype.setPanelFocus=function(a){this.meta.focusPanelId=a},a.prototype.updateSubmenuVisibility=function(){if(this.editMode)return void(this.meta.submenuEnabled=!0);var a=e.default.filter(this.templating.list,function(a){return 2!==a.hide});this.meta.submenuEnabled=a.length>0||this.annotations.list.length>0||this.links.length>0},a.prototype.getPanelInfoById=function(a){var b={};return e.default.each(this.rows,function(c){e.default.each(c.panels,function(d,e){d.id===a&&(b.panel=d,b.row=c,b.index=e)})}),b.panel?b:null},a.prototype.duplicatePanel=function(a,b){var d=c.default.copy(a);return d.id=this.getNextPanelId(),delete d.repeat,delete d.repeatIteration,delete d.repeatPanelId,delete d.scopedVars,delete d.alert,b.addPanel(d),d},a.prototype.formatDate=function(a,b){return a=d.default.isMoment(a)?a:d.default(a),b=b||"YYYY-MM-DD HH:mm:ss",this.timezone=this.getTimezone(),"browser"===this.timezone?d.default(a).format(b):d.default.utc(a).format(b)},a.prototype.destroy=function(){this.events.removeAllListeners();for(var a=0,b=this.rows;a<b.length;a++){var c=b[a];c.destroy()}},a.prototype.cycleGraphTooltip=function(){this.graphTooltip=(this.graphTooltip+1)%3},a.prototype.sharedTooltipModeEnabled=function(){return this.graphTooltip>0},a.prototype.sharedCrosshairModeOnly=function(){return 1===this.graphTooltip},a.prototype.getRelativeTime=function(a){return a=d.default.isMoment(a)?a:d.default(a),"browser"===this.timezone?d.default(a).fromNow():d.default.utc(a).fromNow()},a.prototype.getNextQueryLetter=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZ";return e.default.find(b,function(b){return e.default.every(a.targets,function(a){return a.refId!==b})})},a.prototype.isTimezoneUtc=function(){return"utc"===this.getTimezone()},a.prototype.getTimezone=function(){return this.timezone?this.timezone:g.contextSrv.user.timezone},a.prototype.updateSchema=function(a){var b,c,d,f=this.schemaVersion,g=[];if(this.schemaVersion=14,f!==this.schemaVersion){if(f<2&&(a.services&&a.services.filter&&(this.time=a.services.filter.time,this.templating.list=a.services.filter.list||[]),g.push(function(a){"graphite"===a.type&&(a.type="graph"),"graph"===a.type&&(e.default.isBoolean(a.legend)&&(a.legend={show:a.legend}),a.grid&&(a.grid.min&&(a.grid.leftMin=a.grid.min,delete a.grid.min),a.grid.max&&(a.grid.leftMax=a.grid.max,delete a.grid.max)),a.y_format&&(a.y_formats[0]=a.y_format,delete a.y_format),a.y2_format&&(a.y_formats[1]=a.y2_format,delete a.y2_format))})),f<3){var h=this.getNextPanelId();g.push(function(a){a.id||(a.id=h,h+=1)})}if(f<4&&g.push(function(a){"graph"===a.type&&(e.default.each(a.aliasYAxis,function(b,c){a.seriesOverrides=[{alias:c,yaxis:b}]}),delete a.aliasYAxis)}),f<6){var i=e.default.find(a.pulldowns,{type:"annotations"});for(i&&(this.annotations={list:i.annotations||[]}),b=0;b<this.templating.list.length;b++){var j=this.templating.list[b];void 0===j.datasource&&(j.datasource=null),"filter"===j.type&&(j.type="query"),void 0===j.type&&(j.type="query"),void 0===j.allFormat&&(j.allFormat="glob")}}if(f<7&&(a.nav&&a.nav.length&&(this.timepicker=a.nav[0]),g.push(function(a){e.default.each(a.targets,function(b){b.refId||(b.refId=this.getNextQueryLetter(a))}.bind(this))})),f<8&&g.push(function(a){e.default.each(a.targets,function(a){a.fields&&a.tags&&a.groupBy&&(a.rawQuery?(delete a.fields,delete a.fill):(a.select=e.default.map(a.fields,function(a){var b=[];return b.push({type:"field",params:[a.name]}),b.push({type:a.func,params:[]}),a.mathExpr&&b.push({type:"math",params:[a.mathExpr]}),a.asExpr&&b.push({type:"alias",params:[a.asExpr]}),b}),delete a.fields,e.default.each(a.groupBy,function(a){"time"===a.type&&a.interval&&(a.params=[a.interval],delete a.interval),"tag"===a.type&&a.key&&(a.params=[a.key],delete a.key)}),a.fill&&(a.groupBy.push({type:"fill",params:[a.fill]}),delete a.fill)))})}),f<9&&g.push(function(a){if(("singlestat"===a.type||""===a.thresholds)&&a.thresholds){var b=a.thresholds.split(",");b.length>=3&&(b.shift(),a.thresholds=b.join(","))}}),f<10&&g.push(function(a){"table"===a.type&&e.default.each(a.styles,function(a){if(a.thresholds&&a.thresholds.length>=3){var b=a.thresholds;b.shift(),a.thresholds=b}})}),f<12&&e.default.each(this.templating.list,function(a){a.refresh&&(a.refresh=1),a.refresh||(a.refresh=0),a.hideVariable?a.hide=2:a.hideLabel&&(a.hide=1)}),f<12&&g.push(function(a){"graph"===a.type&&a.grid&&(a.yaxes||(a.yaxes=[{show:a["y-axis"],min:a.grid.leftMin,max:a.grid.leftMax,logBase:a.grid.leftLogBase,format:a.y_formats[0],label:a.leftYAxisLabel},{show:a["y-axis"],min:a.grid.rightMin,max:a.grid.rightMax,logBase:a.grid.rightLogBase,format:a.y_formats[1],label:a.rightYAxisLabel}],a.xaxis={show:a["x-axis"]},delete a.grid.leftMin,delete a.grid.leftMax,delete a.grid.leftLogBase,delete a.grid.rightMin,delete a.grid.rightMax,delete a.grid.rightLogBase,delete a.y_formats,delete a.leftYAxisLabel,delete a.rightYAxisLabel,delete a["y-axis"],delete a["x-axis"]))}),f<13&&g.push(function(a){if("graph"===a.type&&a.grid){a.thresholds=[];var b={},c={};null!==a.grid.threshold1&&(b.value=a.grid.threshold1,a.grid.thresholdLine?(b.line=!0,b.lineColor=a.grid.threshold1Color,b.colorMode="custom"):(b.fill=!0,b.fillColor=a.grid.threshold1Color,b.colorMode="custom")),null!==a.grid.threshold2&&(c.value=a.grid.threshold2,a.grid.thresholdLine?(c.line=!0,c.lineColor=a.grid.threshold2Color,c.colorMode="custom"):(c.fill=!0,c.fillColor=a.grid.threshold2Color,c.colorMode="custom")),e.default.isNumber(b.value)&&(e.default.isNumber(c.value)?b.value>c.value?(b.op=c.op="lt",a.thresholds.push(b),a.thresholds.push(c)):(b.op=c.op="gt",a.thresholds.push(b),a.thresholds.push(c)):(b.op="gt",a.thresholds.push(b))),delete a.grid.threshold1,delete a.grid.threshold1Color,delete a.grid.threshold2,delete a.grid.threshold2Color,delete a.grid.thresholdLine}}),f<14&&(this.graphTooltip=a.sharedCrosshair?1:0),0!==g.length)for(b=0;b<this.rows.length;b++){var k=this.rows[b];for(c=0;c<k.panels.length;c++)for(d=0;d<g.length;d++)g[d].call(this,k.panels[c])}}},a}(),a("DashboardModel",j)}}});