import React, { Component } from 'react';

import { Form, Input, Button, DatePicker, Card } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

class Config extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log('value:', value);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 10 },
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
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
      </div>
    )
  }
}

export default Form.create()(Config);