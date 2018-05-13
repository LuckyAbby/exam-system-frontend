import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
// import styles from './index.less';

const FormItem = Form.Item;
// const RadioGroup = Radio.Group;

class Add extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log('value', value);
      }
    })
  }
  render() {
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
      warpperCol: {
        xs: {
          span: 13,
          offset: 8,
        },
        sm: {
          span: 12,
          offset: 8,
        },
      },
    };

    return(
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
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">添加试卷</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Add);