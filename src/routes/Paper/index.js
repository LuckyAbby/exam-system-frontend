import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Spin, Tag, Radio, Divider, Input, Modal, Button, message  } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

const TYPE = [
  '选择题',
  '判断题',
  '问答题',
]

const mapStateToProps = ({
  paper,
  loading,
}) => ({
  paper,
  loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatcher: {
    paper: {
      fetch: payload => dispatch({ type: 'paper/fetch', payload }),
    },
    global: {
      countdown: () => dispatch({ type: 'global/countdown' }),
    },
  },
});

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
    ModalText: '确定要交卷？',
    visible: false,
    confirmLoading: false,
  }
  }

  componentWillMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.props.dispatcher.paper.fetch({ id });
    this.props.dispatcher.global.countdown();
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      // ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      message.success('交卷成功！');
    }, 1000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { paper, loading } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div className={styles.main}>
        <div className={styles.paper}>
          <Spin spinning={loading.effects['paper/fetch']} className={styles.spin}>
            <Divider>{paper.paper.name}</Divider>
            <br />

            {
          paper.paper.questions && paper.paper.questions.map((item, index) => (
            <Card 
              key={item.id} 
              className={styles.card} 
              title={`${index + 1}. ${item.title}`}
              extra={(<Tag color="blue">{TYPE[item.type - 1]}</Tag>)}
            >
              {item.options ? (
                <Radio.Group>
                  {
                    item.options.map(option => (
                      <Radio 
                        key={option.id}  
                        value={option.id}
                        style={radioStyle}
                      >
                        {option.content}
                      </Radio>
                    ))
                  }
                </Radio.Group>
              ) : (
                <div><TextArea rows={10} /></div>
              )}
            </Card>
          ))
        }
          </Spin>
        </div>

        <div style={{ textAlign: 'center', margin: 40 }}>
          <Button type="primary" size="large" onClick={this.showModal} style={{ width: 90 }}>交卷</Button>
          <Modal
            // title="Title"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <h3>{ModalText}</h3>
          </Modal>
        </div>
      </div>
      
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
