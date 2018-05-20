import React, { Component } from 'react';
import { Button, Table, Card, Form, Input, message } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';

import styles from './index.less';

const FormItem = Form.Item;

const mapStateToProps = ({
  examinee,
  loading,
}) => ({
  examinee,
  loading,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    examinee: {
      fetch: payload => dispatch({ type: 'examinee/fetch', payload }),
      deleteExaminee: (payload, callback) => dispatch({ type: 'examinee/deleteExaminee', payload, callback }),
    },
  },
})

class Examinee extends Component {

  componentWillMount = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    console.log('id', id);
    this.props.dispatcher.examinee.fetch({ exam_id: id});
  }

  delete = (id) => {
    const { match } = this.props;
    const { params } = match;
    // eslint-disable-next-line
    const exam_id = params.id;
    this.props.dispatcher.examinee.deleteExaminee({ id }, () => {
      message.success('删除成功');
      this.props.dispatcher.examinee.fetch({ exam_id });
    })
  }

  renderForm = (id) => {
    return (
      <Form layout="inline">
        <FormItem
          label="考生帐号"
        >
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" onClick={() => this.search()}>查询</Button>
        </FormItem>
        <FormItem>
          <Button icon="plus" type="primary">
            <Link to={`/exam/${id}/examinee/add`}>新增考生信息</Link>
          </Button>
        </FormItem>
      </Form>
    );
  };


  render(){
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { examinee, loading }= this.props;
    const { list } = examinee;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
    }, {
      title: '邮箱',
      dataIndex: 'email',
    }, {
      title: '电话',
      dataIndex: 'tel',
    }, {
      title: '操作',
      render: (text) => (
        <div className={styles.action}>
          <a onClick={() => this.delete(text.id)}>删除</a>
          <a href="">编辑</a>
        </div>
      ),
    }];

    return (
      <div>
        <h2>考生管理</h2>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>{this.renderForm(id)}</div>
            <Table 
              dataSource={list} 
              columns={columns} 
              rowKey='id' 
              pagination={false} 
              loading={loading.effects['examinee/fetch']}
            />
          </div>
        </Card>
      </div> 
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examinee);