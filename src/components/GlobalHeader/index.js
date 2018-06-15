import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Dropdown, Avatar } from 'antd';
import _ from 'lodash';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import styles from './index.less';

function foo(str){
    const s =`0${str}`;
    return s.substring(s.length-2,s.length);
}

 function secondToDate(data) {
    const h = Math.floor(data / 3600);
    const m = Math.floor((data / 60 % 60));
    const s = Math.floor((data % 60));
    const result = `${foo(h)  } : ${  foo(m)  } : ${  foo(s)  }`;
    return result;
}

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  @Debounce(600)
  /* eslint-disable-next-line */  
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser = {},
      collapsed,
      onMenuClick,
      title,
      smsCount,
    } = this.props;
    
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.header}>
        {
          title 
          ? (
            <span className={styles.titleWrapper}>
              <Link to="/" className={styles.title} key="logo">
                <Icon type="home" /> &nbsp;&nbsp;{title}
              </Link>
            </span>
            )
          : (
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          )
        }
        {
          _.isNumber(smsCount) && smsCount >= 0 && (
            <div className={styles.countdown}>
              {secondToDate(smsCount)}
            </div>
          )
        }
        
        
        <div className={styles.right}>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar}>{currentUser.name}</Avatar>
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
