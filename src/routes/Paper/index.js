import React, { Component } from 'react';
import { Button, Table, Card, Form, Input, message } from 'antd';
import { Link } from 'dva/router'; 
import { connect } from 'dva';

import styles from './index.less';

const FormItem = Form.Item;

const mapStateToProps = ({
  paper,
  loading,
}) => ({
  paper,
  loading,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    paper: {
      fetch: payload => dispatch({ type: 'paper/fetch', payload }),
      create: (payload, callback) => dispatch({ type: 'paper/create', payload, callback }),
      deletePaper: (payload, callback) => dispatch({ type: 'paper/deletePaper', payload, callback }),
    },
  },
})

class Paper extends Component {

  componentWillMount = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.props.dispatcher.paper.fetch({ exam_id: id});
  };

  delete = (id) => {
    const { match } = this.props;
    const { params } = match;
    // eslint-disable-next-line
    const exam_id = params.id;
    this.props.dispatcher.paper.deletePaper({ id }, () => {
      message.success('删除成功');
      this.props.dispatcher.paper.fetch({ exam_id });
    });
  }

  renderForm = (id) => {
    return (
      <Form layout="inline">
        <FormItem
          label="试卷名称"
        >
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" onClick={() => this.search()}>查询</Button>
        </FormItem>
        <FormItem>
          <Button icon="plus" type="primary">
            <Link to={`/exam/${id}/paper/add`}>新建试卷</Link>
          </Button>
        </FormItem>
      </Form>
    );
  };

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { paper, loading } = this.props;
    const { list } = paper;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: '试题名称',
      dataIndex: 'name',
    }, {
      title: '总分',
      dataIndex: 'total_score',
    }, {
      title: '客观题分数',
      dataIndex: 'objective_score',
    }, {
      title: '主观题分数',
      dataIndex: 'subjective_score',
    }, {
      title: '考试id',
      dataIndex: 'exam_id',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
    },{
      title: '操作',
      render: (record) => (
        <div className={styles.action}>
          <a onClick={() => this.delete(record.id)}>删除</a>
          <Link to={`/exam/${record.exam_id}/paper/edit/${record.id}`}>编辑</Link>
        </div>),
    }];

    return (
      <div>
        <h2>试卷管理</h2>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>{this.renderForm(id)}</div>
            <Table 
              dataSource={list} 
              columns={columns} 
              rowKey='id' 
              pagination={false} 
              loading={loading.effects['paper/fetch']}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paper);