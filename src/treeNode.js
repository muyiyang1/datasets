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
      return (
        <div>
          <div className={styles.treeNode}><div><Icon type="right" />{title}</div><div>{rightInfo}</div></div>
          <div className={styles.treeNodeChildren}>
            {children}
          </div>
        </div>
        
      );
    } else {
      return (
        <div className={styles.treeNode}><div>{title}</div><div>{rightInfo}</div></div>
      );
    }
  }
}
export default TreeNode;