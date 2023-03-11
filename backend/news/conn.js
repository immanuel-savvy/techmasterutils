import GDS from "generalised-datastore";

let gds;

let USERS,
  USERS_HASH,
  ADMINSTRATORS,
  ADMIN_HASH,
  ARTICLES,
  COMMENTS,
  GLOBALS,
  REPLIES,
  TRENDING_ARTICLES,
  ARTICLE_CATEGORIES;

const ds_conn = () => {
  gds = new GDS("techmaster").sync();

  USERS = gds.folder("users");
  USERS_HASH = gds.folder("users_hash", "user");
  ADMINSTRATORS = gds.folder("adminstrators");
  ADMIN_HASH = gds.folder("admin_hash", "admin");
  ARTICLES = gds.folder("articles");
  COMMENTS = gds.folder("comments", "article");
  REPLIES = gds.folder("replies", "comment");
  GLOBALS = gds.folder("globals", "global");
  ARTICLE_CATEGORIES = gds.folder("article_categories");
  TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
};

export default ds_conn;
export {
  USERS,
  ADMINSTRATORS,
  USERS_HASH,
  ADMIN_HASH,
  ARTICLES,
  COMMENTS,
  REPLIES,
  GLOBALS,
  TRENDING_ARTICLES,
  ARTICLE_CATEGORIES,
  gds,
};
