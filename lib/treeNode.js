import * as React from 'react';
import { Icon } from 'antd';
import styles from '../style/index.css';
// export interface TreeNodePorps {
//     className?: string;
//     title?: string,
//     rightInfo?: string | React.ReactNode,
//     children?: any,
// }
class TreeNode extends React.PureComponent {
    render() {
        const { children, title, rightInfo } = this.props;
        if (children) {
            return (React.createElement("div", null,
                React.createElement("div", { className: styles.treeNode },
                    React.createElement("div", null,
                        React.createElement(Icon, { type: "right" }),
                        title),
                    React.createElement("div", null, rightInfo)),
                React.createElement("div", { className: styles.treeNodeChildren }, children)));
        }
        else {
            return (React.createElement("div", { className: styles.treeNode },
                React.createElement("div", null, title),
                React.createElement("div", null, rightInfo)));
        }
    }
}
export default TreeNode;
