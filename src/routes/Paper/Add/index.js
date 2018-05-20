import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Input, Button, Row, Col, Modal, Table, Card, Tag } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

const TYPE = {
  1: '选择题',
  2: '问答题',
  3: '判断题',
};

const mapStateToProps = ({
  question,
}) => ({
  question,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    question: {
      fetchQuestion: payload => dispatch({ type: 'question/fetch'}, payload),
    },
  },
});

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
    }
  }

  
  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.props.dispatcher.question.fetchQuestion({ exam_id: id });
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log('values', values);
      }
    })
  }
  
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading } = this.state;
    const { question } = this.props;
    const { list } = question;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 4,
        },
      },
    };

    // const questions = [{
    //   id: 1,
    //   name: '试题1',
    //   type: 1,
    //   create_time: '2018-04-30 06:55:31',
    //   score: 1,
    //   exam_id: 1,
    //   key: 1,
    // }, {
    //   id: 2,
    //   name: '试题2',
    //   type: 2,
    //   create_time: '2018-04-30 06:55:31',
    //   score: 2,
    //   exam_id: 1,
    //   key: 2,
    // }, {
    //   id: 3,
    //   name: '试题3',
    //   type: 1,
    //   create_time: '2018-04-30 06:55:31',
    //   score: 1,
    //   exam_id: 1,
    //   key: 3,      
    // }];
    const questionColumns = [{
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
        <div>
          <a href="">详情</a>
        </div>),
    }];

    return (
      <div>
        <h2>编辑试卷</h2>
        <div className={styles.wrapper}>
          <h4>试卷基本信息</h4>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="试卷名称"
            >
              {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入试卷的名称',
            }],
            })(
              <Input type="text" />
            )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="试卷总分"
            >
              {getFieldDecorator('total_score', {
            rules: [{
              required: true, message: '请输入考试的总分',
            }],
          })(
            <Input type="number" />
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="试卷主观题分数"
            >
              {getFieldDecorator('subjective_score', {
            rules: [{
              required: true, message: '请输入主观题分数',
            }],
          })(
            <Input type="number" />
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="试卷客观题分数"
            >
              {getFieldDecorator('objective_score', {
            rules: [{
              required: true, message:' 请输入客观题分数',
            }],
          })(
            <Input type="number" />
          )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="阅卷人帐号"
            >
              {getFieldDecorator('user_id', {
            rules: [{
              required: true, message:'请指定阅卷人帐号',
            }],
          })(
            <Input type="text" />
          )}
            </FormItem>

            <Row>
              <Col span={4}><h4>试题列表</h4></Col>
              <Col span={12}>
                <Button type="primary" onClick={this.showModal}>添加试题</Button>
              </Col>
            </Row>
            
            <div>
              {list.map(item => (
                <Card style={{ marginTop: 20 }} key={item.id}>
                  <h4><Tag color="#87d068">{TYPE[item.type]}</Tag> {item.name}</h4>
                  <p>A. 选项一</p>
                  <p>B. 选项2</p>
                  <p>C. 选3</p>
                  <p>D. 选4</p>
                  <strong>正确答案 A</strong>
                </Card>
              ))}
            </div>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">保存</Button>
            </FormItem>
          </Form>
        </div>

        <Modal
          title="所有试题"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          style={{ top: 20, width: '90%' }}
        >
          <Table 
            dataSource={list} 
            columns={questionColumns} 
            pagination={false}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
               },
            }}
          />
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Add));
