import * as React from 'react';
import { ICommandPalette, ReactWidget, } from '@jupyterlab/apputils';
import Trees from './tree';
import data from './data';
/**
 * Initialization data for the jupyterlab-extension-demo extension.
 */
const extension = {
    id: 'jupyterlab-extension-datasets',
    autoStart: true,
    requires: [ICommandPalette],
    activate: (app, palette) => {
        console.log('JupyterLab extension jupyterlab-extension-datasets is activated!');
        let div = ReactWidget.create(React.createElement("div", { className: 'tree' },
            React.createElement("div", { className: 'treelist' },
                React.createElement(Trees, { data: data }))));
        div.id = 'datasetsTree';
        div.title.label = '数据集';
        app.shell.add(div, 'left', { rank: 200 });
    }
};
export default extension;
