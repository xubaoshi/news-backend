webpackJsonp([8],{1809:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1),u=n(r),o=a(183),s=n(o),i=a(1854),d=a(364),c=n(d);t.default={namespace:"showApi",state:{tableList:[],loading:!1},subscriptions:{setup:function(e){var t=e.dispatch;return e.history.listen(function(e){"/showApi"===e.pathname&&t({type:"showApi/loadShowApi"})})}},effects:{loadShowApi:s.default.mark(function e(t,a){var n,r=t.payload,u=a.call,o=a.put;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({type:"showLoading"});case 2:return e.next=4,u(i.query,r);case 4:return n=e.sent,e.next=7,o({type:"loadShowApiSuccess",payload:{data:n}});case 7:return e.next=9,o({type:"hideLoading"});case 9:case"end":return e.stop()}},e,this)})},reducers:{showLoading:function(e){return(0,u.default)({},e,{loading:!0})},hideLoading:function(e){return(0,u.default)({},e,{loading:!1})},loadShowApiSuccess:function(e,t){var a=t.payload.data.data.record;console.log(a);var n=[];return a.forEach(function(e){["list","post","put","delete","show"].forEach(function(t){n.push({url:c.default.devBaseURL+"/api/restql/"+e.template,desc:e.template_name,method:t,data:{}})})}),(0,u.default)({},e,{list:n})}}},e.exports=t.default},1854:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.query=void 0;var r=a(183),u=n(r),o=a(363),s=n(o),i=(t.query=function(){var e=(0,s.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:"/api/restql/web_node",method:"GET",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(88))}});