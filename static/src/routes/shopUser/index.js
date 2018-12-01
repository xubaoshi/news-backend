import React, { Component, PropTypes } from 'react'
import { connect } from 'dva'
import { Table, Button, Modal, Switch, Popover, Form, Cascader } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import styles from './index.less'
const FormItem = Form.Item
const columns = [
  { title: '序号', dataIndex: 'nid' },
  { title: '姓名', dataIndex: 'name' },
  { title: '所属分店', dataIndex: 'shopname' },
  { title: '所属城市', dataIndex: 'cityname' },
  { title: '状态', dataIndex: 'status' },
  {
    title: '添加时间',
    dataIndex: 'time',
    render: (text, row) => {
      return moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  { title: '操作', width: 150 }
]

const linkStyle = {
  display: 'inline-block',
  padding: '0 10px',
  cursor: 'pointer'
}

class TableManager extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    this.state = { cityid: null }

    const len = columns.length
    columns[len - 1].render = (text, record, index) => {
      return (
        <div>
          <span
            onClick={this.toTableManagerForm.bind(this, record.nid)}
            style={linkStyle}
          >
            编辑
          </span>
        </div>
      )
    }
    columns[len - 3].render = (text, record) => {
      return (
        <Switch
          checked={record.status === 1}
          onChange={this.changeTableManagerState.bind(this, record)}
          checkedChildren={'开'}
          unCheckedChildren={'关'}
        />
      )
    }
  }

  componentDidMount() {
    this.loadTableData()
    this.props.dispatch({ type: 'shopUserForm/loadCitys', payload: {} })
  }

  loadTableData(page = 1, pageSize = 10, cityid) {
    this.props.dispatch({
      type: 'shopUser/loadShopUser',
      payload: { page, pageSize, cityid }
    })
  }

  tableChange(pagination) {
    const cityid = this.state.cityid
    this.loadTableData(pagination.current, pagination.pageSize, cityid)
  }

  selectRow(selectedRowKeys) {
    this.props.dispatch({
      type: 'shopUser/selectedRowKeys',
      payload: { selectedRowKeys }
    })
  }

  toTableManagerForm(id) {
    if (id) {
      this.props.dispatch(
        routerRedux.push({ pathname: `/shopUser/edit/${id}` })
      )
    } else {
      this.props.dispatch(routerRedux.push({ pathname: '/shopUser/create' }))
    }
  }

  changeTableManagerState(record) {
    console.log('switchChange', record)
    const status = record.status === 1 ? 0 : 1
    this.props.dispatch({
      type: 'shopUser/updateShopUser',
      payload: {
        ...record,
        status,
        page: this.props.pagination.current,
        pageSize: this.props.pagination.pageSize,
        cityid: this.state.cityid
      }
    })
  }

  deleteTableManager() {
    if (this.props.selectedRowKeys.length > 0) {
      Modal.confirm({
        title: '确定要删除所选数据?',
        content: '点击确定，数据则被删除',
        onOk: () => {
          let templateArr = []
          this.props.list.forEach((v, index) => {
            if (this.props.selectedRowKeys.indexOf(v.nid) !== -1) {
              templateArr.push(v.template)
            }
          })
          this.props
            .dispatch({
              type: 'shopUser/removeShopUser',
              payload: {
                selectedRowKeys: this.props.selectedRowKeys,
                templateArr
              }
            })
            .then(() => {
              this.loadTableData(1, 10, this.state.cityid)
            })
        }
      })
    } else {
      Modal.warning({
        title: '未选中任何数据',
        content: '请选择要删除的数据'
      })
    }
  }

  handleCityChange(value, selectedOptions) {
    if (value.length > 0) {
      this.setState({ cityid: value[1] })
      this.loadTableData(1, 10, value[1])
    } else {
      this.setState({ cityid: null })
      this.loadTableData(1, 10)
    }
  }

  render() {
    const { citys } = this.props
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 }
    }
    const rowSelection = {
      selectedRowKeys: this.props.selectedRowKeys,
      onChange: this.selectRow.bind(this)
    }

    const pagination = {
      showTotal: total => `共${total}条数据`,
      showSizeChanger: true,
      showQuickJumper: true,
      ...this.props.pagination
    }

    return (
      <div className="content-inner">
        <Form>
          <FormItem {...formItemLayout} label="城市">
            <Cascader
              options={citys}
              onChange={value => {
                this.handleCityChange(value)
              }}
              placeholder="请选择城市"
              maxLength="50"
            />
          </FormItem>
        </Form>

        <div
          style={{
            paddingBottom: 10,
            marginBottom: 20,
            borderBottom: '1px solid #ddd'
          }}
        >
          <Button
            onClick={this.toTableManagerForm.bind(this, 0)}
            style={{ marginRight: 10 }}
          >
            新增
          </Button>
          <Button onClick={this.deleteTableManager.bind(this)}>删除</Button>
        </div>

        <Table
          columns={columns}
          rowSelection={rowSelection}
          pagination={pagination}
          dataSource={this.props.list}
          rowKey="nid"
          loading={this.props.loading}
          bordered
          onChange={this.tableChange.bind(this)}
        />
      </div>
    )
  }
}

export default connect(({ shopUser, shopUserForm }) => {
  return {
    list: shopUser.list,
    loading: shopUser.loading,
    total: shopUser.total,
    selectedRowKeys: shopUser.selectedRowKeys,
    pagination: shopUser.pagination,
    citys: shopUserForm && shopUserForm.citys ? shopUserForm.citys : []
  }
})(Form.create()(TableManager))
