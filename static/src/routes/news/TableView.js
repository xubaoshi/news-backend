import React, { Component, PropTypes } from "react";
import {
	Input,
	Form,
	Button,
	Upload,
	Icon,
	message,
	DatePicker,
	Switch,
	Modal,
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import Cookie from "../../utils/js.cookie";
import { attachmentURL, uploadURL, tempUploadURL } from "../../utils/config";

const FormItem = Form.Item;
class TableView extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	static defaultProps = {
		template: "",
		con: "",
		template_name: "",
		status: 1,
		time: ""
	};

	constructor(props) {
		super(props)
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
			hasInt: false
		}
	}

	componentWillReceiveProps(nextProps) {
		const {hasInt,fileList} = this.state
		if (!hasInt && nextProps.images) {
			fileList.push({
				uid: -1,
				name: nextProps.images,
				fileName: nextProps.images,
				status: 'done',
				url: `${uploadURL}/${nextProps.images}`,
			})
			this.setState({
				fileList,
				hasInt: true,
			})
		}
	}

	onSubmit(e) {
		const {fileList} = this.state
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			if (fileList.length === 0) {
				message.error('请上传图片！');
				return;
			}
			// values.time = Date.parse(new Date()) / 1000;
			values['fileName'] = fileList[0].fileName;
			this.props.onSubmit(values);
		});
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/news" }));
	}

	handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
	}
	
	handleChange = ({ fileList }) => {
		if (fileList && fileList.length > 0 && fileList[0].status === 'done') {
			fileList.forEach(file => {
				file['url'] = tempUploadURL + '/' + file.response.file;
				file['fileName'] = file.response.file;
			})
		}
		this.setState({ fileList })
	}

	// 上传前校验
  beforeUpload = (file) => {
    const isFormat = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isFormat) {
      message.error('图片格式不对!')
    }
    const isLt10M = file.size / 1024 / 1024 < 1
    if (!isLt10M) {
      message.error('上传的图片不能大于1M!')
    }
    return isFormat && isLt10M
  }


	render() {
		const { getFieldDecorator } = this.props.form;
		const { previewVisible, previewImage, fileList } = this.state;
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		};
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

		return (
			<div className="content-inner">
				<div
					style={{
						borderBottom: "1px solid #ddd",
						marginBottom: 20,
						paddingBottom: 10
					}}
				>
					<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>
						返回
					</Button>
					<Button type="primary" onClick={this.onSubmit.bind(this)}>
						确认
					</Button>
				</div>

				<Form>
					<FormItem {...formItemLayout} label="新闻标题">
						{getFieldDecorator("title", {
							initialValue: this.props.title || undefined,
							rules: [
								{
									required: true,
									message: "请输入新闻标题"
								}
							]
						})(<Input placeholder="请输入新闻标题" maxLength='50' />)}
					</FormItem>
					<FormItem {...formItemLayout} label="状态">
						{getFieldDecorator("status", {
							valuePropName: "checked",
							initialValue: !!this.props.status
						})(<Switch checkedChildren={"开"} unCheckedChildren={"关"} />)}
					</FormItem>
					<FormItem {...formItemLayout} label="数据内容">
						{getFieldDecorator("con", {
							initialValue: this.props.con || undefined,
							rules: [
								{
									required: true,
									message: "请输入新闻内容"
								}
							]
						})(
							<Input
								type="textarea"
								placeholder="请输入新闻内容"
								maxLength='1000'
								autosize={{ minRows: 5 }}
							/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="时间">
						{getFieldDecorator("time", {
							initialValue: this.props.time ? moment(new Date(parseInt(this.props.time))) :undefined,
							rules: [
								{
									required: true,
									message: "请选择时间"
								}
							]
						})(
							<DatePicker/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="图片">
					{getFieldDecorator("images", {
							initialValue: ['11'],
							rules: [
								{
									required: true,
								}
							]
						})(
							<div>
								<Upload
								action={attachmentURL}
								listType="picture-card"
								fileList={fileList}
								onPreview={this.handlePreview}
								onChange={this.handleChange}
								headers={{Authorization: Cookie.get("SESSION_TOKEN")}}
								beforeUpload={this.beforeUpload}
							>
								{fileList.length >= 1 ? null : uploadButton}
							</Upload>
							<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
								<img alt="example" style={{ width: '100%' }} src={previewImage} />
							</Modal>
							</div>
						)}
					</FormItem>
				</Form>
			</div>
		);
	}
}

export default connect(({ tableManager }) => {
	return {};
})(Form.create()(TableView));
