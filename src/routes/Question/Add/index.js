import React, { Component } from 'react';
import { Form, Radio, Input, Button, message } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const mapStateToProps = ({
  question,
}) => ({
  question,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    question: {
      create: ( payload, callback) => dispatch({ type: 'question/create', payload, callback }),
    },
  },
})

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1, // 题目类型， 1单选 2判断 3问答
    };
  }

  onChangeType = (e) => {
    this.setState({ type: e.target.value });
  }

  handleSubmit = (e) => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;  
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { type } = this.state;
        const data = {
          title:values.title,
          type,
          score: values.score,
          exam_id: id,
        };
        if (type === 1) {
          data.options = [{
            content: values.opt1,
            is_correct: values.correct === 1,
          }, {
            content: values.opt2,
            is_correct: values.correct === 2,
          }, {
            content: values.opt3,
            is_correct: values.correct === 3,
          }, {
            content: values.opt4,
            is_correct: values.correct === 4,
          }]
        } else if (type === 2) {
          data.options = [{
            content: values.opt1,
            is_correct: values.correct === 1,
          }, {
            content: values.opt2,
            is_correct: values.correct === 2,
          }]
        }
        // console.log('data', data);
        // this.props.dispatcher.question.create(data, () => {
        //   message.success('新增试题成功');
        // });
        this.props.dispatcher.question.create(data)
          .then(message.success('新增试题成功'));
      }
    });
  }

  render() {
    const { type } = this.state;
    const { getFieldDecorator } = this.props.form;
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
    
    return (
      <div className={styles.wrapper}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="题目类型"
          >
            <RadioGroup onChange={this.onChangeType} value={type}>
              <Radio value={1}>单选</Radio>
              <Radio value={2}>判断</Radio>
              <Radio value={3}>问答</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="试题分值"
          >
            {getFieldDecorator('score', {
                rules: [{
                  required: true, message: '请输入试题分值',
                }],
              })(
                <Input type="number" />
              )}
          </FormItem>          
          <FormItem
            {...formItemLayout}
            label="标题"
          >
            {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '请输入题目标题',
                }],
              })(
                <TextArea autosize={{minRows: 3, maxRows: 6}} />
              )}
          </FormItem>

          {
            // 单选
          type === 1 && (
            <div>
              <FormItem
                {...formItemLayout}
                label="A"
              >
                {getFieldDecorator('opt1', {
                    rules: [{
                      required: true, message: '请输入选项A',
                    }],
                  })(
                    <Input type="text" />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="B"
              >
                {getFieldDecorator('opt2', {
                    rules: [{
                      required: true, message: '请输入选项B',
                    }],
                  })(
                    <Input type="text" />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="C"
              >
                {getFieldDecorator('opt3', {
                    rules: [{
                      required: true, message: '请输入选项C',
                    }],
                  })(
                    <Input type="text" />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="D"
              >
                {getFieldDecorator('opt4', {
                    rules: [{
                      required: true, message: '请输入选项D',
                    }],
                  })(
                    <Input type="text" />
                  )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="正确选项"
              >
                {getFieldDecorator('correct', {
                    rules: [{
                      required: true, message: '请选择正确选项',
                    }],
                  })(
                    <RadioGroup>
                      <Radio value={1}>A</Radio>
                      <Radio value={2}>B</Radio>
                      <Radio value={3}>C</Radio>
                      <Radio value={4}>D</Radio>
                    </RadioGroup>
                  )}
              </FormItem>


              
            </div>
            )
          }
          {
            // 判断
          type === 2 && (
            <div>
              <FormItem
                {...formItemLayout}
                label="A"
              >
                {getFieldDecorator('opt1', {
                    rules: [{
                      required: true, message: '请输入选项A',
                    }],
                    initialValue: '是',
                  })(
                    <Input type="text" disabled />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="B"
              >
                {getFieldDecorator('opt2', {
                    rules: [{
                      required: true, message: '请输入选项B',
                    }],
                    initialValue: '否',
                  })(
                    <Input type="text" disabled />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="正确选项"
              >
                {getFieldDecorator('correct', {
                    rules: [{
                      required: true, message: '请选择正确选项',
                    }],
                  })(
                    <RadioGroup>
                      <Radio value={1}>A</Radio>
                      <Radio value={2}>B</Radio>
                    </RadioGroup>
                  )}
              </FormItem>
            </div>
            )
          }

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">添加题目</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create()(Add));