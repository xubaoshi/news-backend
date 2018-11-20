import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import TableView from "./TableView";
import { routerRedux } from "dva/router";
import moment from "moment";
import { request } from "../../utils";

import { message } from "antd";

const Const = {
	module: "shopUser"
};

class TableForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		const { dispatch, match } = this.props;
		const id = match.params && match.params.id;

		if (id) {
			dispatch({ type: "newsForm/loadTable", payload: { id, ...Const } });
		}
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: "newsForm/resetState"
		});
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/news" }));
	}
	
	onSubmit(values) {
		const hide = message.loading("正在保存...", 0);
		const { dispatch, match } = this.props;
		const id = match.params && match.params.id;

		dispatch({
			type: "newsForm/saveTable",
			payload: {
				...this.props,
				nid: id ? id : undefined,
				title: values.title,
				con: values.con,
				status: values.status,
				time: moment(values.time).valueOf(),
				images: values.fileName,
				...Const,
				callback: data => {
					hide();

					if (data && data.success) {
						message.success("保存成功");
						request({
							url: '/api/file/change',
							method: "post",
							data: {fileName:values.fileName}
						});
						this.goBack();
					} else {
						message.error("保存失败");
					}
				}
			}
		});
	}

	render() {
		const props = this.props;
		return (
			<TableView
				con={props.con}
				images={props.images}
				status={props.status}
				title={props.title}
				time={props.time}
				onSubmit={this.onSubmit.bind(this)}
			/>
		);
	}
}

export default connect(({ newsForm, app }) => {
	return {
		...newsForm,
		uid: app.user.uid,
		name: app.user.name
	};
})(TableForm);
