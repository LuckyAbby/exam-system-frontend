import React, { Component } from 'react';
import { Form, Radio, Input, Button } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

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
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { type } = this.state;
        console.log(type);
        
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

export default  Form.create()(Add);