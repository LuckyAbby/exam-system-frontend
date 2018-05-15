import React, { Component } from 'react';
import { Button, Table, Card } from 'antd';
import { Link } from 'dva/router'; 

import styles from './index.less';

export default class Paper extends Component {
  renderForm = () => <div>查询表单条件</div>;

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = [{
      id: 1,
      name: '试卷1',
      total_score: 100,
      create_time: '2018-04-30 06:55:31',
      subjective_score: 70,
      objective_score: 80,
      exam_id: 1,
    }, {
      id: 1,
      name: '试题2',
      total_score: 2,
      create_time: '2018-04-30 06:55:31',
      subjective_score: 80,
      objective_score: 80,
      exam_id: 1,
    }, {
      id: 1,
      name: '试题3',
      total_score: 1,
      create_time: '2018-04-30 06:55:31',
      subjective_score: 90,
      objective_score: 80,
      exam_id: 1,
    }];
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
          <a href="">删除</a>
          <Link to={`/exam/${record.exam_id}/paper/edit/${record.id}`}>编辑</Link>
        </div>),
    }];

    return (
      <div>
        <h2>试卷管理</h2>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">
                <Link to={`/exam/${id}/paper/add`}>新建试卷</Link>
              </Button>
            </div>
            <Table dataSource={data} columns={columns} />
          </div>
        </Card>
      </div>
    );
  }
}
