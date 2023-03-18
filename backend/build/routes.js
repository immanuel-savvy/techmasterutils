"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tools = require("../tools");
var _admin = require("./handlers/admin");
var _articles = require("./handlers/articles");
var _users = require("./handlers/users");
var routes = function routes(app) {
  app.get("/user/:user_id", _users.user);
  app.get("/get_admins", _admin.get_admins);
  app.get("/site_admin", _admin.site_admin);
  app.get("/comments/:article/:skip", _articles.comments);
  app.get("/article_categories", _articles.article_categories);
  app.get("/tools_data", _tools.tools_data);
  app.post("/admin_login", _admin.admin_login);
  app.post("/articles", _articles.articles);
  app.post("/get_articles", _articles.get_articles);
  app.post("/new_article", _articles.new_article);
  app.post("/update_article", _articles.update_article);
  app.post("/update_article_category", _articles.update_article_category);
  app.post("/remove_article_category/:category", _articles.remove_article_category);
  app.post("/remove_article/:article", _articles.remove_article);
  app.post("/article_viewed/:article", _articles.article_viewed);
  app.post("/search_articles", _articles.search_articles);
  app.post("/new_reply", _articles.new_reply);
  app.post("/new_comment", _articles.new_comment);
  app.post("/get_replies", _articles.get_replies);
  app.post("/add_article_category", _articles.add_article_category);
  app.post("/update_admin", _admin.update_admin);
  app.post("/update_admin_password", _admin.update_admin_password);

  // Tools
  app.post("/update_tool_data", _tools.update_tool_data);
};
var _default = routes;
exports.default = _default;