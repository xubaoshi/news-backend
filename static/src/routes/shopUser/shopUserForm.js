import React, { Component, PropTypes } from 'react'
import { connect } from 'dva'
import TableView from './TableView'
import { routerRedux } from 'dva/router'
import moment from 'moment'
import { request } from '../../utils'

import { message } from 'antd'

const Const = {
  module: 'shopUser'
}

class TableForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    const id = match.params && match.params.id

    if (id) {
      dispatch({ type: 'shopUserForm/loadTable', payload: { id, ...Const } })
    }
    dispatch({ type: 'shopUserForm/loadCitys', payload: {} })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'shopUserForm/resetState'
    })
  }

  goBack() {
    this.props.dispatch(routerRedux.push({ pathname: '/shopUser' }))
  }

  onSubmit(values) {
    const hide = message.loading('正在保存...', 0)
    const { dispatch, match } = this.props
    const id = match.params && match.params.id

    dispatch({
      type: 'shopUserForm/saveTable',
      payload: {
        ...this.props,
        nid: id ? id : undefined,
        name: values.name,
        shopname: values.shopname,
        provinceid: values.provinceid,
        cityid: values.cityid,
        provincename: values.provincename,
        cityname: values.cityname,
        status: values.status,
        images: values.fileName,
        area: values.area,
        time: moment(values.time).valueOf(),
        ...Const,
        callback: data => {
          hide()

          if (data && data.success) {
            message.success('保存成功')
            request({
              url: '/api/file/change',
              method: 'post',
              data: { fileName: values.fileName }
            })
            this.goBack()
          } else {
            message.error('保存失败')
          }
        }
      }
    })
  }

  render() {
    const props = this.props
    return (
      <TableView
        name={props.name}
        images={props.images}
        status={props.status}
        shopname={props.shopname}
        area={props.area}
        citys={props.citys}
        selectedCity={
          props.provinceid
            ? [
                props.provinceid ? props.provinceid.toString() : undefined,
                props.cityid ? props.cityid.toString() : undefined
              ]
            : undefined
        }
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

export default connect(({ shopUserForm, app }) => {
  return {
    ...shopUserForm
    // uid: app.user.uid,
    // name: app.user.name
  }
})(TableForm)
