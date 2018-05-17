import React, { PureComponent } from 'react';
import { Card, Button, Form, Modal, Input, Table, DatePicker } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import { Link } from 'dva/router';
import styles from './index.less';

const FormItem = Form.Item;
const state = ['未上线', '已上线', '已下线'];


const mapStateToProps = ({
  exam,
  loading,
}) => ({
  exam,
  loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    exam: {
      fetch: payload => dispatch({ type: 'exam/fetch', payload }),
      create: payload => dispatch({ type: 'exam/create', payload }),
    },
  },
});

class Exam extends PureComponent {
  state = {
    modalVisible: false,
  };

  componentWillMount = () => {
    this.props.dispatcher.exam.fetch();
  }
  

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  okHandle = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      // form.resetFields();
      console.log(values);
      const sendData = _.pick(values, [
        'name',
        'time',
      ]);
      sendData.state = 0;
      sendData.start_time = '2018-04-30 06:55:31';
      sendData.end_time = '2018-04-30 06:55:31';
      console.log('sendData', sendData);
      // this.props.dispatcher.exam.create(sendData);
    });
  }

  search = () => {
    const value = this.props.form.getFieldsValue()
    console.log('value', value);
  }

  // renderForm = () => <div>查询条件表单</div>;

  renderForm = () => {
    return (
      <Form layout="inline">
        <FormItem
          label="考试名称"
        >
          {this.props.form.getFieldDecorator('searchName', {})
        (<Input type="text" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" onClick={() => this.search()}>查询</Button>
        </FormItem>
        <FormItem>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>新建</Button>
        </FormItem>
      </Form>
    );
  }

  render() {
    const { modalVisible } = this.state;
    const { exam, loading } = this.props;
    const { list } = exam;
    const columns = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id',
        render: val => <Link to={`/exam/${val}`}>{`201800  ${val}`}</Link>,
      },
      {
        title: '考试名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '考试时长',
        key: 'time',
        dataIndex: 'time',
      },
      {
        title: '考试开始时间',
        key: 'start_time',
        dataIndex: 'start_time',
      },
      {
        title: '考试结束时间',
        key: 'end_time',
        dataIndex: 'end_time',
      },
      {
        title: '考试状态',
        key: 'state',
        dataIndex: 'state',
        render(val) {
          return <p>{state[val]}</p>;
        },
      },
      {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time',
      },
      {
        title: '操作',
        render: text => {
          if (text.state === 0) {
            return (
              <div className={styles.action}>
                <a href="">删除</a>
                <a href="">编辑</a>
                <a href="">上线</a>
              </div>
            );
          } else if (text.state === 1) {
            return (
              <div className={styles.action}>
                <a href="">删除</a>
                <a href="">编辑</a>
                <a href="">下线</a>
              </div>
            );
          } else {
            return (
              <div className={styles.action}>
                <a href="">删除</a>
                <a href="">编辑</a>
                <a href="">重新上线</a>
              </div>
            );
          }
        },
      },
    ];

 
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 15 },
      },
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {/* <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div> */}
            <Table 
              dataSource={list} 
              columns={columns} 
              rowKey='id' 
              pagination={false} 
              loading={loading.effects['exam/fetch']}
            />
          </div>
        </Card>
        <Modal 
          visible={modalVisible}
          onCancel={() => this.handleModalVisible()}
          onOk={this.okHandle}
          maskClosable={false}
          destroyOnClose
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="考试名称"
            >
              {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入考试名称',
            }],
          })(
            <Input type="text" />
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="考试时长"
            >
              {getFieldDecorator('time', {
            rules: [{
              required: true, message: '请输入考试时长',
            }],
          })(
            <Input type="number" />
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="考试开始时间"
            >
              {getFieldDecorator('start_time', {
            rules: [{
              required: true, message: '请输入考试的开始时间',
            }],
          })(
            <DatePicker />
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="考试结束时间"
            >
              {getFieldDecorator('end_time', {
            rules: [{
              required: true, message: '请输入考试结束时间',
            }],
          })(
            <DatePicker />
          )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Exam));