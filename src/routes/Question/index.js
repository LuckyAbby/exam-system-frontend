import React, { Component } from 'react';
import { Button,  Table, Card } from 'antd';
import { Link } from 'dva/router'; 
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.less';


const TYPE = {
  1: '选择题',
  2: '问答题',
  3: '判断题',
};


export default class Question extends Component {
  state = {
  };


  renderForm = () => (
    <div>查询表单条件</div>
  );

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = [{
      id: 1,
      name: '试题1',
      type: 1,
      create_time: '2018-04-30 06:55:31',
      score: 1,
      exam_id: 1,
      key: 1,
    }, {
      id: 1,
      name: '试题2',
      type: 2,
      create_time: '2018-04-30 06:55:31',
      score: 2,
      exam_id: 1,
      key: 2,
    }, {
      id: 1,
      name: '试题3',
      type: 1,
      create_time: '2018-04-30 06:55:31',
      score: 1,
      exam_id: 1,
      key: 3,      
    }];
    const columns = [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: '试题名称',
      dataIndex: 'name',
    }, {
      title: '试题类型',
      dataIndex: 'type',
      render: (val) => (<p>{TYPE[val]}</p>),
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
    }, {
      title: '分数',
      dataIndex: 'score',
    }, {
      title: '考试id',
      dataIndex: 'exam_id',
    }, {
      title: '操作',
      render: () => (
        <div className={styles.action}>
          <a href="">删除</a>
          <a href="">编辑</a>
        </div>),
    }];

    return (
      <div>
        <h2>试题管理</h2>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">
                <Link to={`/exam/${id}/question/add`}>新建试题</Link>
              </Button>
            </div>
            <Table dataSource={data} columns={columns} />
          </div>
        </Card>
      </div>
    )
  }
}
