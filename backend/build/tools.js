"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_tool_data = exports.tools_data = exports.tool_data = exports.new_message = void 0;
var _emails = require("./emails");
var _conn = require("./news/conn");
var _utils = require("./utils");
var update_tool_data = function update_tool_data(req, res) {
  var data = req.body;
  data.image = (0, _utils.save_image)(data.image, data.tool, "png");
  data.body_image = (0, _utils.save_image)(data.body_image, "".concat(data.tool, "-").concat(data.title.replace(/[ \/]/g, "_")), "png");
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
var tool_data = function tool_data(req, res) {
  var tool = req.params.tool;
  res.json({
    ok: true,
    data: _conn.TOOLS.readone({
      tool: tool
    })
  });
};
exports.tool_data = tool_data;
var new_message = function new_message(req, res) {
  var _req$body = req.body,
    email = _req$body.email,
    fullname = _req$body.fullname,
    message = _req$body.message;
  (0, _utils.send_mail)({
    to: "immanuelsavvy@gmail.com",
    html: (0, _emails.email_message)({
      email: email,
      fullname: fullname,
      message: message
    }),
    subject: "New contact message from ".concat(fullname)
  });
  res.send({
    ok: true,
    message: "Message sent as email",
    data: {
      sent: true
    }
  });
};
exports.new_message = new_message;