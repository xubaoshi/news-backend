webpackJsonp([10],{1815:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(785),o=n(l),i=a(122),r=n(i),d=a(365),s=n(d),p=a(1),u=n(p),c=a(781),h=n(c),g=a(237),f=n(g),b=a(3),y=n(b),m=a(6),v=n(m),w=a(5),M=n(w),k=a(4),T=n(k);a(786),a(149),a(366),a(782);var R=a(0),C=n(R),x=a(238),K=(a(62),a(8)),E=(n(K),a(151)),S=[{title:"序号",dataIndex:"id"},{title:"模块",dataIndex:"template"},{title:"模块名称",dataIndex:"template_name"},{title:"状态",dataIndex:"status"},{title:"操作",width:150}],_={display:"inline-block",padding:"0 10px",cursor:"pointer"},z=function(e){function t(e,a){(0,y.default)(this,t);var n=(0,M.default)(this,(t.__proto__||(0,f.default)(t)).call(this,e,a)),l=S.length;return S[l-1].render=function(e,t,a){return C.default.createElement("div",null,C.default.createElement("span",{onClick:n.toTableManagerForm.bind(n,t.id),style:_},"编辑"))},S[l-2].render=function(e,t){return C.default.createElement(h.default,{checked:!!e,onChange:n.changeTableManagerState.bind(n,t),checkedChildren:"开",unCheckedChildren:"关"})},n}return(0,T.default)(t,e),(0,v.default)(t,[{key:"componentDidMount",value:function(){this.loadTableData()}},{key:"loadTableData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.props.dispatch({type:"tableManager/loadTableManager",payload:{page:e,pageSize:t}})}},{key:"tableChange",value:function(e){this.loadTableData(e.current,e.pageSize)}},{key:"selectRow",value:function(e){this.props.dispatch({type:"tableManager/selectedRowKeys",payload:{selectedRowKeys:e}})}},{key:"toTableManagerForm",value:function(e){e?this.props.dispatch(E.routerRedux.push({pathname:"/tableManager/edit/"+e})):this.props.dispatch(E.routerRedux.push({pathname:"/tableManager/create"}))}},{key:"changeTableManagerState",value:function(e){console.log("switchChange",e);var t=e.status?0:1;this.props.dispatch({type:"tableManager/updateTableManager",payload:(0,u.default)({},e,{status:t,page:this.props.pagination.current,pageSize:this.props.pagination.pageSize})})}},{key:"deleteTableManager",value:function(){var e=this;this.props.selectedRowKeys.length>0?s.default.confirm({title:"确定要删除所选数据?",content:"点击确定，数据则被删除",onOk:function(){var t=[];e.props.list.forEach(function(a,n){-1!==e.props.selectedRowKeys.indexOf(a.id)&&t.push(a.template)}),e.props.dispatch({type:"tableManager/removeTableManager",payload:{selectedRowKeys:e.props.selectedRowKeys,templateArr:t}})}}):s.default.warning({title:"未选中任何数据",content:"请选择要删除的数据"})}},{key:"render",value:function(){var e={selectedRowKeys:this.props.selectedRowKeys,onChange:this.selectRow.bind(this)},t=(0,u.default)({showTotal:function(e){return"共"+e+"条数据"},showSizeChanger:!0,showQuickJumper:!0},this.props.pagination);return C.default.createElement("div",{className:"content-inner"},C.default.createElement("div",{style:{paddingBottom:10,marginBottom:20,borderBottom:"1px solid #ddd"}},C.default.createElement(r.default,{onClick:this.toTableManagerForm.bind(this,0),style:{marginRight:10}},"新增"),C.default.createElement(r.default,{onClick:this.deleteTableManager.bind(this)},"删除")),C.default.createElement(o.default,{columns:S,rowSelection:e,pagination:t,dataSource:this.props.list,rowKey:"id",loading:this.props.loading,bordered:!0,onChange:this.tableChange.bind(this)}))}}]),t}(R.Component);z.contextTypes={router:R.PropTypes.object},t.default=(0,x.connect)(function(e){var t=e.tableManager;return{list:t.list,loading:t.loading,total:t.total,selectedRowKeys:t.selectedRowKeys,pagination:t.pagination}})(z),e.exports=t.default}});