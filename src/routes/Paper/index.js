import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Spin, Tag, Radio, Divider } from 'antd';
import styles from './index.less';

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
  },
});

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { match } = this.props;
    
    const { id } = match.params;
    this.props.dispatcher.paper.fetch({ id });
  }

  render() {
    const { paper, loading } = this.props;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
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
                <div>xx</div>
              )}
            </Card>
          ))
        }
          </Spin>
        </div>
      </div>
      
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
