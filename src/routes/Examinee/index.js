import React, { Component } from 'react';
import { Button, Table, Card, Form, Input, message, Modal } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';

import styles from './index.less';

const FormItem = Form.Item;
const SEX = ['男', '女']

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
      create: (payload, callback) => dispatch({type: 'examinee/create', payload, callback}),
    },
  },
})

class Examinee extends Component {

  state = {
    modalVisible: false,
  }

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

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  okHandle = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      console.log('values', values);
      const { match } = this.props;
      const { params } = match;
      // eslint-disable-next-line
      const exam_id = params.id;
      const data = {
        account: values.account,
        exam_id,
      };
      this.props.dispatcher.examinee.create(data, () => {
        message.success('新增考生成功');
        this.handleModalVisible(false);
        this.props.dispatcher.examinee.fetch({ exam_id });
      });
    })
  }

  renderForm = () => {
    return (
      <Form layout="inline">
        {/* <FormItem
          label="考生帐号"
        >
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" onClick={() => this.search()}>查询</Button>
        </FormItem> */}
        <FormItem>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新增考生信息
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
    const { modalVisible } = this.state;
    const columns = [{
      title: '考生帐号',
      dataIndex: 'account',
    }, {
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
      render: (val) => (SEX[val]),
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
          {/* <a href="">编辑</a> */}
        </div>
      ),
    }];

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
        <Modal
          title="添加考生"
          visible={modalVisible}
          onCancel={() => this.handleModalVisible()}
          onOk={this.okHandle}
          maskClosable={false}
          destroyOnClose
          confirmLoading={loading.effects['exam/create']}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="考生帐号"
            >
              {getFieldDecorator('account', {
            rules: [{
              required: true, message: '请输入考生帐号',
            }],
          })(
            <Input type="text" />
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="考生名称"
            >
              {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入考生名称',
            }],
          })(
            <Input type="text" />
          )}
            </FormItem>
          </Form>
        </Modal>
      </div> 
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Examinee));