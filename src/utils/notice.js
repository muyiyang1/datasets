import { notification, Icon } from 'antd';
import React from 'react';
import { UUID } from './utils';
import '../../style/index.css';


let allview = null;
let view = null;
const inintstyles = {
  color: '#1890ff',
  cursor: 'pointer',
  display: 'inline-block',
  marginLeft: '8px',
};
allview = (key, response) => {
  const msg = response.data.stackTrace && response.data.stackTrace.split('\n');
  const message = (
    <span>{response.data.message || 'system error'}
      <span style={inintstyles} onClick={() => { view(key, response); }}>详细信息
        <Icon type="up-circle" />
      </span>
    </span>
  );
  notification.error({
    key,
    duration: 0,
    message,
    description: msg.map((item) => {
      return <p className={styles.pstyle}>{item.replace(/^\s+|\s+$/g, '')}</p>;
    }),
    className: styles.notice,
  });
};

view = (key, response) => {
  // console.log(1);

  const message = response.data.stackTrace
    ? (
      <span>{response.data.message || 'system error'}
        <span style={inintstyles} onClick={() => { allview(key, response); }}>详细信息 <Icon type="down-circle" /></span>
      </span>
    )
    : response.data.message || 'system error';
  const args = {
    key,
    message,
    duration: 0,
  };
  notification.error(args);
};


export const ZetNotification = (response) => {
  const key = UUID();

  const message = response.data && response.data.stackTrace
    ? (
      <span>{response.data.message || 'system error'}
        <span style={inintstyles} onClick={() => { allview(key, response); }}>详细信息 <Icon type="down-circle" /></span>
      </span>
    )
    : (response.data && response.data.message) || 'system error';
  const args = {
    key,
    message,
    duration: 10,

  };
  notification.error(args);
};
