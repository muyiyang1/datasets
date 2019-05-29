'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('antd/es/spin/style');
var _Spin = _interopDefault(require('antd/es/spin'));
require('antd/es/button/style');
var _Button = _interopDefault(require('antd/es/button'));
var React = require('react');
var apputils = require('@jupyterlab/apputils');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* @import '~antd/dist/antd.css'; */\n\n.test {\n    height: 80px;\n}";
styleInject(css);

/**
 * Initialization data for the jupyterlab-extension-demo extension.
 */

var extension = {
  id: 'jupyterlab-extension-demo',
  autoStart: true,
  requires: [apputils.ICommandPalette],
  activate: function activate(app, palette) {
    console.log('JupyterLab extension jupyterlab_xkcd is activated!'); // Create a single widget
    // let widget: Widget = new Widget();
    // widget.id = 'xkcd-jupyterlab';
    // widget.title.label = 'xkcd.com';
    // widget.title.closable = true;

    var div = apputils.ReactWidget.create(React.createElement("div", null, React.createElement(_Button, {
      className: 'test'
    }, "AAAA"), React.createElement(_Button, null, "CCC"), React.createElement(_Button, null, "AAAA"), React.createElement(_Button, null, "BBB"), React.createElement(_Spin, null)));
    div.id = 'antd';
    div.title.label = 'antd';
    div.title.closable = true; // widget.node.append(div);
    // widget.node.appendChild();
    // let img = document.createElement('div');
    // img.innerText = 'dadsada';
    // widget.node.appendChild(img);
    // Fetch info about a random comic
    // fetch('https:////egszlpbmle.execute-api.us-east-1.amazonaws.com/prod').then(response => {
    //   return response.json();
    // }).then(data => {
    //   img.src = data.img;
    //   img.alt = data.title;
    //   img.title = data.alt;
    // });
    // Add an application command

    var command = 'xkcd:open';
    app.commands.addCommand(command, {
      label: 'Random xkcd comic',
      execute: function execute() {
        // app.shell.add(div, 'main');
        if (!div.isAttached) {
          //   // Attach the widget to the main work area if it's not there
          //   app.shell.add(widget, 'main');
          app.shell.add(div, 'main');
        } // Activate the widget


        app.shell.activateById(div.id);
      }
    }); // Add the command to the palette.

    palette.addItem({
      command: command,
      category: 'Tutorial'
    });
  }
};

module.exports = extension;
