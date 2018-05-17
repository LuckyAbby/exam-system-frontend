import React, { PureComponent } from 'react';
import { Card, Button, Form, Modal, Input, Table } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import request from '../../utils/request';
import styles from './index.less';

const FormItem = Form.Item;
const state = ['未上线', '已上线', '已下线'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      request('/api/exam', {
        method: 'POST',
        body: {
          name: fieldsValue.name,
        },
      });
    });
  };
  return (
    <Modal
      title="新建考试"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <form action="/api/exam" method="post">
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="考试名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入考试名称' }],
          })(<Input placeholder="请输入考试名称" />)}
        </FormItem>
      </form>
    </Modal>
  );
});

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

  renderForm = () => <div>查询条件表单</div>;

  render() {
    const { modalVisible } = this.state;
    const { exam, loading } = this.props;
    const { list } = exam;
    const columns = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id',
        render: val => <Link to={`/exam/${val}`}>{val}</Link>,
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

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <Table 
              dataSource={list} 
              columns={columns} 
              rowKey='id' 
              pagination={false} 
              loading={loading.effects['exam/fetch']}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Exam);