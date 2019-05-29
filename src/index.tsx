import * as React from 'react';
import {
  // JupyterLab,
  JupyterFrontEndPlugin,
  JupyterFrontEnd,
} from '@jupyterlab/application';
import {
  ICommandPalette,
  ReactWidget,
} from '@jupyterlab/apputils';
import Trees from './tree';
import data from './data';



/**
 * Initialization data for the jupyterlab-extension-demo extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-extension-datasets',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab-extension-datasets is activated!');
    let div = ReactWidget.create(
      <div className='tree'>
        <div className='treelist'>
          <Trees data={data} />
        </div>
      </div>
    );
    div.id = 'datasetsTree';
    div.title.label = '数据集';
    app.shell.add(div, 'left', { rank: 200 });
  }
};

export default extension;
