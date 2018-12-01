import React, { Component, PropTypes } from 'react'
import {
  Input,
  Form,
  Button,
  Upload,
  Icon,
  message,
  Switch,
  Modal,
  Cascader
} from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Cookie from '../../utils/js.cookie'
import { attachmentURL, uploadURL, tempUploadURL } from '../../utils/config'

const FormItem = Form.Item
class TableView extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static defaultProps = {
    name: '',
    shopname: '',
    status: 1,
    selectedCity: [],
    citys: []
  }

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
    const { hasInt, fileList } = this.state
    if (!hasInt && nextProps.images) {
      nextProps.images &&
        nextProps.images.split(',').forEach(item => {
          fileList.push({
            uid: item,
            name: item,
            fileName: item,
            status: 'done',
            url: `${uploadURL}/${item}`
          })
        })

      this.setState({
        fileList,
        hasInt: true,
        selectedCity: nextProps.selectedCity
      })
    }
  }

  onSubmit(e) {
    const { fileList, selectedCity } = this.state
    const { citys } = this.props
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (fileList.length === 0) {
        message.error('请上传图片！')
        return
      }
      const fileNames = fileList
        .map(item => {
          return item.fileName || item.response.file
        })
        .join(',')
      const provinceid = selectedCity[0]
      const cityid = selectedCity[1]
      const province = citys.find(item => item.value == provinceid)
      const city = province.children.find(item => item.value == cityid)
      values['provincename'] = province.label
      values['cityname'] = city.label
      values['provinceid'] = provinceid
      values['cityid'] = cityid
      // values.time = Date.parse(new Date()) / 1000;
      values['fileName'] = fileNames
      this.props.onSubmit(values)
    })
  }

  goBack() {
    this.props.dispatch(routerRedux.push({ pathname: '/shopUser' }))
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = ({ fileList }) => {
    // if (fileList && fileList.length > 0 && fileList[0].status === 'done') {
    //   fileList.forEach(file => {
    //     file['url'] = tempUploadURL + '/' + file.response.file
    //     file['fileName'] = file.response.file
    //   })
    // }
    this.setState({ fileList })
  }

  // 上传前校验
  beforeUpload = file => {
    const isFormat =
      file.type === 'image/jpg' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/png'
    if (!isFormat) {
      message.error('图片格式不对!')
    }
    const isLt10M = file.size / 1024 / 1024 < 2
    if (!isLt10M) {
      message.error('上传的图片不能大于2M!')
    }
    return isFormat && isLt10M
  }

  handleCityChange = value => {
    this.setState({
      selectedCity: value
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { previewVisible, previewImage, fileList } = this.state
    const { citys } = this.props
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 12 }
    }
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <div className="content-inner">
        <div
          style={{
            borderBottom: '1px solid #ddd',
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
          <FormItem {...formItemLayout} label="姓名">
            {getFieldDecorator('name', {
              initialValue: this.props.name || undefined,
              rules: [
                {
                  required: true,
                  message: '请输入姓名'
                }
              ]
            })(<Input placeholder="请输入姓名" maxLength="10" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="地区">
            {getFieldDecorator('area', {
              initialValue: this.props.area || undefined
            })(<Input placeholder="请输入地区" maxLength="50" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="城市">
            {getFieldDecorator('selectedCity', {
              initialValue: this.props.selectedCity || undefined,
              rules: [
                {
                  required: true,
                  message: '请选择城市'
                }
              ]
            })(
              <Cascader
                options={citys}
                onChange={this.handleCityChange}
                placeholder="请选择城市"
                maxLength="50"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="分店名称">
            {getFieldDecorator('shopname', {
              initialValue: this.props.shopname || undefined,
              rules: [
                {
                  required: true,
                  message: '请输入分店名称'
                }
              ]
            })(<Input placeholder="请输入分店名称" maxLength="50" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('status', {
              valuePropName: 'checked',
              initialValue: !!this.props.status
            })(<Switch checkedChildren={'开'} unCheckedChildren={'关'} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="图片">
            {getFieldDecorator('images', {
              initialValue: ['11'],
              rules: [
                {
                  required: true
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
                  headers={{ Authorization: Cookie.get('SESSION_TOKEN') }}
                  beforeUpload={this.beforeUpload}
                >
                  {uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={previewImage}
                  />
                </Modal>
              </div>
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default connect(({ tableManager }) => {
  return {}
})(Form.create()(TableView))
