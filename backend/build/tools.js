"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_tool_data = exports.tools_data = void 0;
var _conn = require("./news/conn");
var _utils = require("./utils");
var update_tool_data = function update_tool_data(req, res) {
  var data = req.body;
  data.image = (0, _utils.save_image)(data.image, data.tool, "png");
  _conn.TOOLS.update({
    tool: data.tool
  }, data);
  res.json({
    ok: true,
    data: {
      ok: true
    }
  });
};
exports.update_tool_data = update_tool_data;
var tools_data = function tools_data(req, res) {
  var data = _conn.TOOLS.read();
  var data_obj = new Object();
  data.map(function (datum) {
    data_obj[datum.tool] = datum;
  });
  res.json({
    ok: true,
    message: "tools data",
    data: data_obj
  });
};
exports.tools_data = tools_data;