"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save_image = exports.save_file = exports.remove_image = exports.remove_file = exports.domain = exports.convert_to_buffer = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var domain = "http://localhost:3300" || "https://bckend.techmastertools.net";
exports.domain = domain;
var convert_to_buffer = function convert_to_buffer(base64_file) {
  return Buffer.from(base64_file.slice(base64_file.indexOf(",")), "base64");
};
exports.convert_to_buffer = convert_to_buffer;
var save_image = function save_image(base64_image, image_name) {
  if (!base64_image || base64_image && !base64_image.startsWith("data")) return base64_image;
  image_name = "".concat(prefix, "_").concat(image_name || Date.now()).concat(image_name ? "" : generate_random_string(6, "alpha"), ".jpg");
  var image_path = __dirname + "files/images/".concat(image_name);
  _fs.default.writeFileSync(image_path, Buffer.from(base64_image.slice(base64_image.indexOf(",")), "base64"));
  return image_name;
};
exports.save_image = save_image;
var save_file = function save_file(buffer, ext, filename) {
  filename = filename ? "".concat(filename, "-").concat(Math.random().toString().slice(-3)).concat(ext) : "".concat(Math.random().toString().slice(2)).concat(ext);
  _fs.default.writeFileSync("".concat(__dirname, "/files/").concat(filename), typeof buffer === "string" ? convert_to_buffer(buffer) : buffer);
  return filename;
};
exports.save_file = save_file;
var remove_file = function remove_file(file) {
  if (!file) return;
  try {
    var file_path = __dirname + "/files/".concat(file);
    _fs.default.unlinkSync(file_path);
  } catch (e) {}
};
exports.remove_file = remove_file;
var remove_image = function remove_image(image) {
  if (image === "user_image_placeholder.png" || !image) return;
  try {
    var image_path = __dirname + "/files/images/".concat(image);
    _fs.default.unlinkSync(image_path);
  } catch (e) {}
};
exports.remove_image = remove_image;