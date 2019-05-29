"use strict";

var _path = require("path");

var _fs = require("fs");

var _doc = require("./doc");

xdescribe('umi-library doc build', () => {
  process.env.COMPRESS = 'none';

  require('test-build-result')({
    root: (0, _path.join)(__dirname, './fixtures/doc'),

    build({
      cwd
    }) {
      return (0, _doc.devOrBuild)({
        cwd,
        cmd: 'build',
        params: [],
        docConfig: {}
      }).then(() => {
        const absDirPath = (0, _path.join)(cwd, '.docz/dist');

        if ((0, _fs.existsSync)(absDirPath)) {
          (0, _fs.renameSync)(absDirPath, (0, _path.join)(cwd, 'dist'));
        } else {
          throw new Error(`.docz/dist not exists`);
        }
      });
    }

  });
});