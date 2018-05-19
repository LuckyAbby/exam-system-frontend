import React, { Component } from 'react';
import { Button, Table, Card, Form, Input } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less';

const FormItem = Form.Item;
const TYPE = {
  1: '选择题',
  2: '问答题',
  3: '判断题',
};

const mapStateToProps = ({
  question,
  loading,
}) => ({
  question,
  loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    question: {
      fetch: payload => dispatch({ type: 'question/fetch', payload}),
      create: (payload, callback) => dispatch({ type: 'question/create', payload, callback }),
      deleteQuestion: ( payload, callback) => dispatch({ type: 'question/deleteQuestion', payload, callback}),
    },
  },
})

class Question extends Component {
  state = {
  };

  componentWillMount = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    console.log('id', id);
    this.props.dispatcher.question.fetch({ exam_id: id });
  }

  renderForm = () => {
    return (
      <Form layout="inline">
        <FormItem
          label="试题名称"
        >
          {this.props.form.getFieldDecorator('searchName', {})
        (<Input type="text" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" onClick={() => this.search()}>查询</Button>
        </FormItem>
        {/* <FormItem>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>新建</Button>
        </FormItem> */}
      </Form>
    );
  };

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { question, loading } = this.props;
    // const { list } = question;
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
            {/* <div className={styles.tableListForm}>
            {this.renderForm()}
            </div> */}
            {/* <Form layout="inline">
              <FormItem
                label="试题名称"
              >
                {this.props.form.getFieldDecorator('searchName', {})
              (<Input type="text" />)}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" onClick={() => this.search()}>查询</Button>
              </FormItem>
            </Form> */}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">
                <Link to={`/exam/${id}/question/add`}>新建试题</Link>
              </Button>
            </div>
            <Table
              // dataSource={list} 
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

export default connect(mapStateToProps, mapDispatchToProps)(Question);
