import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Input, Button, message,  Row, Col } from 'antd';

import styles from './index.less';

const FormItem = Form.Item;


const mapStateToProps = ({
  paper,
}) => ({
  paper,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    paper: {
      fetchOne: payload => dispatch({ type: 'paper/getOne', payload }),
    },
  },
});

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  
  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    const { id, paper_id: paperId } = params;
    if (paperId === ':paper_id') {
      message.warning('请选择试卷后再编辑')
      this.props.dispatch(routerRedux.push(`/exam/${id}/paper/list`));
    }
    this.props.dispatcher.paper.fetchOne({ id });
  }
  

  render() {
    const { match } = this.props;
    const { params } = match;
    const { paper_id: paperId } = params;
    const { getFieldDecorator } = this.props.form;
    const { questions } = this.state;
    const { paper } = this.props;
    console.log('paper', paper);
    const { paperDetail } = paper;
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
      <div>
        <h2>编辑试卷 {paperId}</h2>
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
            initialValue: paperDetail.name,
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
            initialValue: paperDetail.total_score,
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
            initialValue: paperDetail.subjective_score,
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
            initialValue: paperDetail.objective_score,
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
            initialValue: paperDetail.user,
          })(
            <Input type="text" />
          )}
            </FormItem>

            <Row>
              <Col span={4}><h4>试题列表</h4></Col>
              <Col span={12}>
                <Button type="primary">添加试题</Button>
              </Col>
            </Row>
            
            <div>
              {questions.map(item => (
                <div>{item}</div>
              ))}
            </div>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">保存</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Edit));
