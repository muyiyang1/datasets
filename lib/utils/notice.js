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
    const message = (React.createElement("span", null,
        response.data.message || 'system error',
        React.createElement("span", { style: inintstyles, onClick: () => { view(key, response); } },
            "\u8BE6\u7EC6\u4FE1\u606F",
            React.createElement(Icon, { type: "up-circle" }))));
    notification.error({
        key,
        duration: 0,
        message,
        description: msg.map((item) => {
            return React.createElement("p", { className: styles.pstyle }, item.replace(/^\s+|\s+$/g, ''));
        }),
        className: styles.notice,
    });
};
view = (key, response) => {
    // console.log(1);
    const message = response.data.stackTrace
        ? (React.createElement("span", null,
            response.data.message || 'system error',
            React.createElement("span", { style: inintstyles, onClick: () => { allview(key, response); } },
                "\u8BE6\u7EC6\u4FE1\u606F ",
                React.createElement(Icon, { type: "down-circle" }))))
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
        ? (React.createElement("span", null,
            response.data.message || 'system error',
            React.createElement("span", { style: inintstyles, onClick: () => { allview(key, response); } },
                "\u8BE6\u7EC6\u4FE1\u606F ",
                React.createElement(Icon, { type: "down-circle" }))))
        : (response.data && response.data.message) || 'system error';
    const args = {
        key,
        message,
        duration: 10,
    };
    notification.error(args);
};
