import React, { Component } from 'react';
import { connect } from 'dva';
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
      create: payload => dispatch({ type: 'question/create', payload }),      
    },
  },
});

class Add extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      type: 1, // 题目类型， 1单选 2判断 3问答
    };
  }

  onChangeType = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {
    if (!err) {
      this.props.dispatcher.question.create(values)
        .then(message.success('新增试题成功'));
    }
  }
  
  render() {
    const { loading } = this.props;
    const { type } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;  
    return (
      <div>
        <QuestionForm
          onSubmit={this.handleSubmit}
          loading={loading.effects['question/create']}
          // 题目类型， 1单选 2判断 3问答
          type={type}
          onChangeType={this.onChangeType}
          examId={id}
        />
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Add);
