import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const mapStateToProps = ({
  exam,
}) => ({
  exam,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    exam: {
      fetch: payload => dispatch({ type: 'exam/getOne', payload }),
      update: (payload, callback) => dispatch({ type: 'exam/update', payload, callback }),
      fetchAll: payload => dispatch({ type: 'exam/fetch', payload}),
    },
  },
})

class Config extends Component {

  componentWillMount = () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;  
    this.props.dispatcher.exam.fetch({ id });
  }

  handleSubmit = (e) => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;  
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        // eslint-disable-next-line
        console.log('value:', value);
        const data = {
          id,
          name: value.name,
          time: value.time,
          // start_time: value.exam_time[0].toDate(),
          // end_time: value.exam_time[1].toDate(),
        };
        this.props.dispatcher.exam.update(data, () => {
          message.success('修改成功');
          this.props.dispatcher.exam.fetch({ id });
          this.props.dispatcher.exam.fetchAll();
        });
      }
    })
  }
  render() {
    const { exam } = this.props;
    const config = exam.config || {};
    console.log('config', config);
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
            initialValue: config.name,
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
            initialValue: config.time,
          })(
            <Input type="number" />
          )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="考试时间"
          >
            {getFieldDecorator('exam_time', {
            rules: [{
              required: true, message: '请输入考试时间',
            }],
            initialValue: [moment(config.start_time), moment(config.end_time)],
          })(
            <RangePicker
              format="YYYY-MM-DD HH:mm"
              showTime={{ format: 'HH:mm' }}
              placeholder={['开始时间', '结束时间']}
              // defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            />
          )}
          </FormItem>
          {/* <FormItem
            {...formItemLayout}
            label="考试结束时间"
          >
            {getFieldDecorator('end_time', {
            rules: [{
              required: true, message: '请输入考试结束时间',
            }],
            // initialValue: config.end_time,
          })(
            <DatePicker />
          )}
          </FormItem> */}
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

// export default Form.create()(Config);
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Config));