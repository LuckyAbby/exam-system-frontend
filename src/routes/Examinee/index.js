import React, { Component } from 'react';
import { Button, Table, Card } from 'antd';
import { Link } from 'dva/router';

import styles from './index.less';

export default class Examinee extends Component {
  renderForm = () => <div>查询表单条件</div>;

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = [{
      id: '1332423',
      name: 'abby',
      sex: '女',
      email: '123@qq.com',
      tel: 122321,
    }, {
      id: '234234',
      name: 'abby1',
      sex: '女',
      email: '121113@qq.com',
      tel: 12232111,
    }, {
      id: '1332111423',
      name: 'abby2',
      sex: '女',
      email: '12223@qq.com',
      tel: 122321,
    }];
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
      render: () => (
        <div className={styles.action}>
          <a href="">删除</a>
          <a href="">编辑</a>
        </div>
      ),
    }];

    return (
      <div>
        <h2>考生管理</h2>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">
                <Link to={`/exam/${id}/examinee/add`}>新增考生</Link>
              </Button>
            </div>
            <Table dataSource={data} columns={columns} />
          </div>
        </Card>
      </div> 
    )
  }
} 