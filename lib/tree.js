import React, { PureComponent } from 'react';
import { Icon, Tree, Tooltip } from 'antd';
import { Input } from 'antd';
import request from './utils/request';
import '../style/index.css';
const { Search } = Input;
const { TreeNode } = Tree;
const DirectoryTree = Tree.DirectoryTree;
// export interface ExploreTreeProps {
//   className?: string;
//   treeData: Array<any>,
//   expendId: Array<any>,
// }
class ExploreTree extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            treeData: []
        };
        this.getTree = () => {
            request.get('/aps/pipes/project/24bc702c-8244-42af-ab68-9c894ce4867c/notebook/module/treelist').then(jsonResponse => {
                this.setState({
                    treeData: jsonResponse
                });
            });
        };
        this.renderTree = (data) => {
            return data && data.length > 0 && data.map((v) => {
                const title = React.createElement("span", { style: { display: 'flex', justifyContent: 'space-between' } },
                    React.createElement(Tooltip, { title: v.name }, v.name),
                    " ",
                    v.childrenCount ? React.createElement("span", null,
                        "(",
                        v.childrenCount,
                        ")") : '');
                if (v.children) {
                    if (v.children.length > 0) {
                        return (React.createElement(TreeNode, { title: title, key: v.id }, this.renderTree(v.children)));
                    }
                    else {
                        return (React.createElement(TreeNode, { title: title, key: v.id }));
                    }
                }
                else {
                    const copy = React.createElement("span", { style: { display: 'flex', justifyContent: 'space-between' } },
                        React.createElement(Tooltip, { title: v.name }, v.name),
                        React.createElement("span", null,
                            React.createElement(Tooltip, { title: "\u590D\u5236\u5F15\u7528\u4EE3\u7801" },
                                React.createElement(Icon, { type: "copy" }))));
                    return (React.createElement(TreeNode, { title: copy, key: v.id }));
                }
            });
        };
        this.search = (e) => {
            request.get('/aps/pipes/project/24bc702c-8244-42af-ab68-9c894ce4867c/notebook/module/treelist', { keyWords: e.target.value }).then(jsonResponse => {
                this.setState({
                    treeData: jsonResponse
                });
            });
        };
    }
    componentDidMount() {
        request.get('/aps/pipes/session/sso').then(jsonResponse => {
            console.log(jsonResponse, '登陆222');
        });
        this.getTree();
    }
    render() {
        const { treeData } = this.state;
        return (React.createElement("div", { className: 'tree' },
            React.createElement("div", { className: "searchWrap" },
                React.createElement(Search, { className: 'search', placeholder: "\u8BF7\u8F93\u5165\u540D\u79F0", onChange: this.search })),
            React.createElement("div", { className: 'treelist' }, treeData.length > 0 && (React.createElement(DirectoryTree, { blockNode: true, showIcon: false, switcherIcon: React.createElement(Icon, { type: "down" }) }, this.renderTree(treeData))))));
    }
}
export default ExploreTree;
