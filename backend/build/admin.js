"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_admin_password = exports.update_admin = exports.site_admin = exports.get_admins = exports.domain_name = exports.create_admin = exports.client_domain = exports.admin_login = void 0;
var _utils = require("../../utils");
var _conn = require("../conn");
var _starter = require("./starter");
var domain_name = "https://bckend.techmastertools.net";
exports.domain_name = domain_name;
var client_domain = "https://news.techmastertools.net";
exports.client_domain = client_domain;
var admin_login = function admin_login(req, res) {
  var _req$body = req.body,
    email = _req$body.email,
    password = _req$body.password;
  var admin = _conn.ADMINSTRATORS.readone({
    email: email
  });
  if (admin) {
    var hash = _conn.ADMIN_HASH.readone({
      admin: admin._id
    });
    res.json(hash.key === password ? {
      ok: true,
      message: "admin logged-in",
      data: {
        admin: admin
      }
    } : {
      ok: false,
      data: {
        message: "incorrect password"
      }
    });
  } else res.json({
    ok: false,
    data: {
      message: "admin not found"
    }
  });
};
exports.admin_login = admin_login;
var get_admins = function get_admins(req, res) {
  var admins = _conn.ADMINSTRATORS.read();
  res.json({
    ok: true,
    message: "adminstrators fetched",
    data: admins
  });
};
exports.get_admins = get_admins;
var create_admin = function create_admin(req, res) {
  var _req$body2 = req.body,
    email = _req$body2.email,
    password = _req$body2.password,
    firstname = _req$body2.firstname,
    lastname = _req$body2.lastname;
  var admin = {
    email: email,
    firstname: firstname,
    lastname: lastname
  };
  var result = _conn.ADMINSTRATORS.write(admin);
  admin._id = result._id;
  admin.created = result.created;
  _conn.ADMIN_HASH.write({
    admin: admin._id,
    key: password
  });
  res.json({
    ok: true,
    message: "admin created",
    data: admin
  });
};
exports.create_admin = create_admin;
var update_admin = function update_admin(req, res) {
  var data = req.body;
  data.rss_keywords && _conn.GLOBALS.update({
    global: "rss_query"
  }, {
    query: data.rss_keywords
  });
  data.admin_image = (0, _utils.save_image)(data.admin_image, "admin_photo");
  data.image = (0, _utils.save_image)(data.image, "banner");
  data = _conn.ADMINSTRATORS.update(_starter.default_admin, data);
  if (data) res.json({
    ok: true,
    message: "admin updated",
    data: {
      _id: _starter.default_admin,
      image: data.image,
      admin_image: data.admin_image,
      bio: data.bio,
      name: data.name,
      updated: data.updated
    }
  });else res.json({
    ok: false,
    data: {
      message: "Cannot find admin"
    }
  });
};
exports.update_admin = update_admin;
var site_admin = function site_admin(req, res) {
  return res.json({
    ok: true,
    message: "site admin",
    data: _conn.ADMINSTRATORS.readone(_starter.default_admin)
  });
};
exports.site_admin = site_admin;
var update_admin_password = function update_admin_password(req, res) {
  var _req$body3 = req.body,
    old_password = _req$body3.old_password,
    password = _req$body3.password;
  if (!old_password || !password) return res.json({
    ok: false,
    data: {
      message: "Passwords cannot be empty"
    }
  });
  var admin_hash = _conn.ADMIN_HASH.readone({
    admin: _starter.default_admin
  });
  if (admin_hash.key !== old_password) return res.json({
    ok: false,
    data: {
      message: "Old Password Incorrect"
    }
  });
  _conn.ADMIN_HASH.update({
    _id: admin_hash._id,
    admin: _starter.default_admin
  }, {
    key: password
  });
  res.json({
    ok: true,
    data: {
      ok: true,
      message: "Admin Password updated successfully!"
    }
  });
};
exports.update_admin_password = update_admin_password;