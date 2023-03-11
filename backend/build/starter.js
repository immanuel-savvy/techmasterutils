"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create_default_admin = void 0;
var _conn = require("../conn");
var default_admin = "adminstrators~techmastertools~1234567890123",
  default_user = "users~techmastertools~1234567890123";
var create_default_admin = function create_default_admin() {
  if (!_conn.ADMINSTRATORS.readone(default_admin)) {
    _conn.ADMINSTRATORS.write({
      firstname: "Techmaster",
      lastname: "News",
      image: "logo_single.png",
      email: "admin@techmastertools.net",
      _id: default_admin
    });
    _conn.ADMIN_HASH.write({
      admin: default_admin,
      key: "adminstrator#1"
    });
  }
  if (!_conn.USERS.readone(default_user)) {
    _conn.USERS.write({
      _id: default_user,
      firstname: "Techmaster",
      lastname: "News",
      verified: true,
      email: "news@techmastertools.net"
    });
    _conn.USERS_HASH.write({
      user: default_user,
      key: "adminstrator#1"
    });
  }
};
exports.create_default_admin = create_default_admin;