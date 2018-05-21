import React, { Component } from 'react';
import { Button, Table, Card, Form, Input, message } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';

const FormItem = Form.Item;
const TYPE = {
  1: '选择题',
  2: '判断题',
  3: '问答题',
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
    this.props.dispatcher.question.fetch({ exam_id: id });
  }

  delete = (id) => {
    const { match } = this.props;
    const { params } = match;
    // eslint-disable-next-line
    const exam_id = params.id;
    this.props.dispatcher.question.deleteQuestion({ id }, () => {
      message.success('删除成功');
      this.props.dispatcher.question.fetch({ exam_id });
    });
  }

  renderForm = (id) => {
    return (
      <Form layout="inline">
        <FormItem
          label="试题名称"
        >
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" onClick={() => this.search()}>查询</Button>
        </FormItem>
        <FormItem>
          <Button icon="plus" type="primary">
            <Link to={`/exam/${id}/question/add`}>新建试题</Link>
          </Button>
        </FormItem>
      </Form>
    );
  };

  render() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { question, loading } = this.props;
    const { list } = question;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: '试题名称',
      dataIndex: 'title',
    }, {
      title: '试题类型',
      dataIndex: 'type',
      render: (val) => (<p>{TYPE[val]}</p>),
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (val) => (moment().format('YYYY-MM-DD h:mm:ss', val)),
    }, {
      title: '分数',
      dataIndex: 'score',
    }, {
      title: '考试id',
      dataIndex: 'exam_id',
      render: (val) => (`201800${val}`),
    }, {
      title: '操作',
      render: (text) => (
        <div className={styles.action}>
          <a onClick={() => this.delete(text.id)}>删除</a>
          <Link to={`/exam/${id}/question/add`}>编辑</Link>
        </div>),
    }];

    return (
      <div>
        <h2>试题管理</h2>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              {this.renderForm(id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Question);
