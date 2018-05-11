import React, { Component } from 'react';
import { Button, Table, Card } from 'antd';

import styles from './index.less';

export default class Paper extends Component {
  renderForm = () => <div>查询表单条件</div>;

  render() {
    const data = [];
    const columns = [];
    return (
      <div>
        <h2>试卷管理</h2>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <Table dataSource={data} columns={columns} />
          </div>
        </Card>
      </div>
    );
  }
}
