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
import { connect } from 'dva'
import Cookie from '../../utils/js.cookie'
import { attachmentURL, uploadURL, tempUploadURL } from '../../utils/config'
import { request } from '../../utils'

const FormItem = Form.Item
class TableView extends Component {
  static contextTypes = {
    router: PropTypes.object
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
        hasInt: true
      })
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'banner/loadTable',
      payload: { nid: 1 }
    })
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'banner/resetState'
    })
  }

  onSubmit(e) {
    const { fileList } = this.state
    e.preventDefault()
    if (fileList.length !== 3) {
      message.error('请上传3张图片！')
      return
    }
    const fileNames = fileList
      .map(item => {
        return item.fileName || item.response.file
      })
      .join(',')
    this.props.dispatch({
      type: 'banner/saveTable',
      payload: {
        images: fileNames,
        callback: data => {
          if (data && data.success) {
            message.success('保存成功')
            request({
              url: '/api/file/change',
              method: 'post',
              data: { fileName: fileNames }
            })
          } else {
            message.error('保存失败')
          }
        }
      }
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = ({ fileList }) => {
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
          <Button type="primary" onClick={this.onSubmit.bind(this)}>
            确认
          </Button>
        </div>

        <Form>
          <FormItem {...formItemLayout} label="banner">
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
                  {fileList.length >= 3 ? null : uploadButton}
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

export default connect(({ banner }) => {
  return {
    images: banner.images ? banner.images.images : ''
  }
})(Form.create()(TableView))
