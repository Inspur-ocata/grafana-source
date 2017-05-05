/*! grafana - v4.2.0 - 2017-03-22
 * Copyright (c) 2017 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash"],function(a,b){"use strict";var c=a.module("grafana.controllers");c.controller("ShareSnapshotCtrl",["$scope","$rootScope","$location","backendSrv","$timeout","timeSrv",function(a,c,d,e,f,g){a.snapshot={name:a.dashboard.title,expires:0,timeoutSeconds:4},a.step=1,a.expireOptions=[{text:"1 Hour",value:3600},{text:"1 Day",value:86400},{text:"7 Days",value:604800},{text:"Never",value:0}],a.accessOptions=[{text:"Anyone with the link",value:1},{text:"Organization users",value:2},{text:"Public on the web",value:3}],a.init=function(){e.get("/api/snapshot/shared-options").then(function(b){a.externalUrl=b.externalSnapshotURL,a.sharingButtonText=b.externalSnapshotName,a.externalEnabled=b.externalEnabled})},a.apiUrl="/api/snapshots",a.createSnapshot=function(b){a.dashboard.snapshot={timestamp:new Date},b||(a.dashboard.snapshot.originalUrl=d.absUrl()),a.loading=!0,a.snapshot.external=b,c.$broadcast("refresh"),f(function(){a.saveSnapshot(b)},1e3*a.snapshot.timeoutSeconds)},a.saveSnapshot=function(b){var c=a.dashboard.getSaveModelClone();a.scrubDashboard(c);var f={dashboard:c,name:c.title,expires:a.snapshot.expires},g=b?a.externalUrl+a.apiUrl:a.apiUrl;e.post(g,f).then(function(c){if(a.loading=!1,b)a.deleteUrl=c.deleteUrl,a.snapshotUrl=c.url,a.saveExternalSnapshotRef(f,c);else{var e=d.url(),g=d.absUrl();"/"!==e&&(g=g.replace(e,"")+"/"),a.snapshotUrl=g+"dashboard/snapshot/"+c.key,a.deleteUrl=g+"api/snapshots-delete/"+c.deleteKey}a.step=2},function(){a.loading=!1})},a.scrubDashboard=function(c){if(c.title=a.snapshot.name,c.time=g.timeRange(),c.forEachPanel(function(a){a.targets=[],a.links=[],a.datasource=null}),c.annotations.list=b.chain(c.annotations.list).filter(function(a){return a.enable}).map(function(a){return{name:a.name,enable:a.enable,snapshotData:a.snapshotData}}).value(),b.each(c.templating.list,function(a){a.query="",a.options=a.current,a.refresh=!1}),a.modeSharePanel){var d=c.getPanelById(a.panel.id);d.span=12,c.rows=[{height:"500px",span:12,panels:[d]}]}delete a.dashboard.snapshot,a.dashboard.forEachPanel(function(a){delete a.snapshotData}),b.each(a.dashboard.annotations.list,function(a){delete a.snapshotData})},a.deleteSnapshot=function(){e.get(a.deleteUrl).then(function(){a.step=3})},a.saveExternalSnapshotRef=function(a,b){a.external=!0,a.key=b.key,a.deleteKey=b.deleteKey,e.post("/api/snapshots/",a)}}])});