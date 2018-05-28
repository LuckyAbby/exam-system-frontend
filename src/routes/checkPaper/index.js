import React, { Component } from 'react';
import { Table, Card } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less';


const mapStateToProps = ({
  checkPaper,
  loading,
}) => ({
  checkPaper,
  loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    checkPaper: {
      fetch: payload => dispatch({ type: 'checkPaper/fetch', payload }),
    },
  },
})

class CheckPaper extends Component {


  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { checkPaper, loading } = this.props;
    // const { list } = checkPaper;
    const columns = [{
      title: '考生名称',
      dataIndex: 'user',
    }, {
      title: '考生帐号',
      dataIndex: 'account',
    }, {
      title: '考试名称',
      dataIndex: 'name',
    }, {
      title :'考试成绩',
      dataIndex :'grade',
      render: (val) => {
        if ( val ) {
          return (<div>val</div>)
        } else {
          return  (<div>暂无</div>)
        }
      },
    }, {
      title: '状态',
      render: (record) => {
        if (record.grade) {
          return (<div>已阅卷</div>)
        }
        return (<div>未阅卷</div>)
      }
    }, {
      title: '操作',
      render: (record) => (
        <div className={styles.action}>
          <Link to={`/exam/${id}/paper/check/${record.id}`}>阅卷</Link>
        </div>),
    }]

    const list = [{
      grade: 80,
      user: '张三',
      account: 421087199509087865,
      name: '2018年开放岗位考试A卷',
    }, {
      grade: null,
      user: '李四',
      name: '2018年开放岗位考试A卷',
      account: 232312199807287865,
    }, {
      grade: null,
      user: '王五',
      account: 563567199609071435,
      name: '2018年开放岗位考试A卷',
    }]
    return (
      <div>
        <h2>阅卷管理</h2>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              {/* {this.renderForm(id)} */}
            </div>
            <Table
              dataSource={list}
              columns={columns}
              rowKey='id'
              pagination={false}
              loading={loading.effects['question/fetch']}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckPaper);