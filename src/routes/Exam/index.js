import React, { PureComponent } from 'react';
import { Card, Table, message } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import styles from './index.less';

const STATE = ['未上线', '已上线', '已下线'];


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
      create: (payload, callback) => dispatch({ type: 'exam/create', payload, callback }),
      deleteExam: (payload, callback) => dispatch({ type: 'exam/deleteExam', payload, callback }),
    },
  },
});

class Exam extends PureComponent {
  state = {
  };

  componentWillMount = () => {
    this.props.dispatcher.exam.fetch();
  }


  delete = (id) => {
    this.props.dispatcher.exam.deleteExam({ id }, () => {
      message.success('删除成功');
      this.props.dispatcher.exam.fetch();
    })
  }


  render() {
    const { exam, loading } = this.props;
    const { exams, examPaper } = exam;
    const columns = [
      {
        title: '考试名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '考试时长(min)',
        key: 'time',
        dataIndex: 'time',
      },
      {
        title: '考试开始时间',
        key: 'start_time',
        dataIndex: 'start_time',
        render(val) {
          return moment(val).format("YYYY/MM/DD HH:mm:ss")
        },
      },
      {
        title: '考试结束时间',
        key: 'end_time',
        dataIndex: 'end_time',
        render(val) {
          return moment(val).format("YYYY/MM/DD HH:mm:ss")
        },
      },
      {
        title: '考试状态',
        key: 'state',
        dataIndex: 'state',
        render(val) {
          return <p>{STATE[val]}</p>;
        },
      },
      {
        title: '操作',
        render: record => {
          // 考试未开始
          if (moment().isBefore(record.start_time)) {
            return (
              <div>考试未开始</div>
            );
          }
          if (moment().isAfter(record.end_time)) {
            return (
              <div>考试已结束</div>
            );
          }
          if (examPaper[record.id]) {
            return (
              <div className={styles.action}>
                <Link to={`/exam/${record.id}`}>开始考试</Link>
              </div>
            );
          }
          return (
            <div>等待分配试卷</div>
          );
        },
      },
    ];


    return (
      <div>
        <Card bordered={false} title="我的考试列表">
          <div className={styles.tableList}>
            <Table 
              dataSource={exams} 
              columns={columns} 
              rowKey='id' 
              pagination={false} 
              loading={loading.effects['exam/fetch']}
            />
          </div>
        </Card>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Exam);