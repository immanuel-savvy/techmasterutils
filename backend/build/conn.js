"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gds = exports.default = exports.USERS_HASH = exports.USERS = exports.TRENDING_ARTICLES = exports.REPLIES = exports.GLOBALS = exports.COMMENTS = exports.ARTICLE_CATEGORIES = exports.ARTICLES = exports.ADMIN_HASH = exports.ADMINSTRATORS = void 0;
var _generalisedDatastore = _interopRequireDefault(require("generalised-datastore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var gds;
exports.gds = gds;
var USERS, USERS_HASH, ADMINSTRATORS, ADMIN_HASH, ARTICLES, COMMENTS, GLOBALS, REPLIES, TRENDING_ARTICLES, ARTICLE_CATEGORIES;
exports.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES;
exports.TRENDING_ARTICLES = TRENDING_ARTICLES;
exports.REPLIES = REPLIES;
exports.GLOBALS = GLOBALS;
exports.COMMENTS = COMMENTS;
exports.ARTICLES = ARTICLES;
exports.ADMIN_HASH = ADMIN_HASH;
exports.ADMINSTRATORS = ADMINSTRATORS;
exports.USERS_HASH = USERS_HASH;
exports.USERS = USERS;
var ds_conn = function ds_conn() {
  exports.gds = gds = new _generalisedDatastore.default("techmaster").sync();
  exports.USERS = USERS = gds.folder("users");
  exports.USERS_HASH = USERS_HASH = gds.folder("users_hash", "user");
  exports.ADMINSTRATORS = ADMINSTRATORS = gds.folder("adminstrators");
  exports.ADMIN_HASH = ADMIN_HASH = gds.folder("admin_hash", "admin");
  exports.ARTICLES = ARTICLES = gds.folder("articles", null, "categories");
  exports.COMMENTS = COMMENTS = gds.folder("comments", "article");
  exports.REPLIES = REPLIES = gds.folder("replies", "comment");
  exports.GLOBALS = GLOBALS = gds.folder("globals", "global");
  exports.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES = gds.folder("article_categories");
  exports.TRENDING_ARTICLES = TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
};
var _default = ds_conn;
exports.default = _default;