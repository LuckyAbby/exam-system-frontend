import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import QuestionForm  from './../../../components/QuestionForm';

const mapStateToProps = ({ question, loading }) => ({
  question,
  loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    question: {
      getOne: payload => dispatch({ type: 'question/getOne', payload }),
      update: payload => dispatch({ type: 'question/update', payload }),
    },
  },
});

class Edit extends Component {
  
  componentWillMount() {
    const { match } = this.props;
    const { params } = match;
    const { id, question_id: questionId } = params;
    if (questionId === ':question_id') {
      message.warning('请选择试题后再编辑')
      this.props.dispatch(routerRedux.push(`/exam/${id}/question/list`));
    } else {
      this.props.dispatcher.question.getOne({ id: questionId });
    }
  }

  handleSubmit = (err, values) => {
    if (!err) {
      const { match } = this.props;
      const { params } = match;
      const { question_id: id } = params;  
      this.props.dispatcher.question.update({ ...values, id })
      .then(message.success('编辑试题成功'));
    }
  }
  
  render() {
    const { loading, question, match } = this.props;
    const { params } = match;
    const { id } = params;  
    return (
      <div>
        <QuestionForm
          onSubmit={this.handleSubmit}
          defaultValues={question.info}
          loading={loading.effects['question/update']}
          // 题目类型， 1单选 2判断 3问答
          type={question.info && question.info.type ? question.info.type : 1}
          onChangeType={() => {}}
          examId={id}          
          buttonText='保存'
        />
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Edit);
