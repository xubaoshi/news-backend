import React, { Component, PropTypes } from 'react'
import { connect } from 'dva'
import { Table, Button, Modal, Switch, Popover } from 'antd'
import moment from 'moment'
import { routerRedux } from 'dva/router'
import styles from './index.less'

const columns = [
  { title: '序号', dataIndex: 'nid' },
  { title: '姓名', dataIndex: 'name' },
  { title: '店名', dataIndex: 'shopName' },
  { title: '城市', dataIndex: 'cityName' },
  {
    title: '添加时间',
    dataIndex: 'createTime',
    render: (text, row) => {
      return moment(parseInt(text)).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
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
  }

  componentDidMount() {
    this.loadTableData()
  }

  loadTableData(page = 1, pageSize = 10) {
    this.props.dispatch({
      type: 'news/loadNews',
      payload: { page, pageSize }
    })
  }

  tableChange(pagination) {
    this.loadTableData(pagination.current, pagination.pageSize)
  }

  selectRow(selectedRowKeys) {
    this.props.dispatch({
      type: 'news/selectedRowKeys',
      payload: { selectedRowKeys }
    })
  }

  toTableManagerForm(id) {
    if (id) {
      this.props.dispatch(routerRedux.push({ pathname: `/news/edit/${id}` }))
    } else {
      this.props.dispatch(routerRedux.push({ pathname: '/news/create' }))
    }
  }

  changeTableManagerState(record) {
    console.log('switchChange', record)
    const status = record.status === 1 ? 0 : 1
    this.props.dispatch({
      type: 'news/updateNew',
      payload: {
        ...record,
        status,
        page: this.props.pagination.current,
        pageSize: this.props.pagination.pageSize
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
          this.props.dispatch({
            type: 'news/removeNew',
            payload: {
              selectedRowKeys: this.props.selectedRowKeys,
              templateArr
            }
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

  render() {
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

export default connect(({ news }) => {
  return {
    list: news.list,
    loading: news.loading,
    total: news.total,
    selectedRowKeys: news.selectedRowKeys,
    pagination: news.pagination
  }
})(TableManager)
