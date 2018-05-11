import React, { Component } from 'react';
import { Button, Modal, Input, Table, Card, Form, Radio, InputNumber } from 'antd';
import { Link } from 'dva/router'; 
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import request from '../../utils/request';
import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const TYPE = {
  1: '选择题',
  2: '问答题',
  3: '判断题',
};

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      request('/api/question', {
        method: 'POST',
        body: {
          name: fieldsValue.name,
        },
      });
    });
  };
  return (
    <Modal
      title="新建试题"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form onSubmit={this.handleSubmit}>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="试题题目">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入试题名称' }],
          })(<Input placeholder="请输入试题名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="试题类型">
          {form.getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择试题类型' }],
          })(
            <RadioGroup>
              <Radio value={1}>选择题</Radio>
              <Radio value={2}>判断题</Radio>
              <Radio value={3}>问答题</Radio>
              <Radio value={4}>主观题</Radio>
            </RadioGroup>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="试题分数">
          {form.getFieldDecorator('score', {
            rules: [{ required: true, message: '请输入试题的分值' }],
          })(<InputNumber placeholder="" />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

export default class Question extends Component {
  state = {
    modalVisible: false,
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  renderForm = () => (
    <div>查询表单条件</div>
  );

  render() {
    const { modalVisible } = this.state;
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
    }, {
      id: 1,
      name: '试题2',
      type: 2,
      create_time: '2018-04-30 06:55:31',
      score: 2,
      exam_id: 1,
    }, {
      id: 1,
      name: '试题3',
      type: 1,
      create_time: '2018-04-30 06:55:31',
      score: 1,
      exam_id: 1,
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

    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
    };

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
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </div>
    )
  }
}
