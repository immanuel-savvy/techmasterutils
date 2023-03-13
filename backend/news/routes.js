import {
  admin_login,
  get_admins,
  site_admin,
  update_admin,
  update_admin_password,
} from "./handlers/admin";
import {
  add_article_category,
  articles,
  article_categories,
  article_viewed,
  comments,
  get_articles,
  get_replies,
  new_article,
  new_comment,
  new_reply,
  remove_article,
  remove_article_category,
  search_articles,
  update_article,
  update_article_category,
} from "./handlers/articles";
import { user } from "./handlers/users";

const routes = (app) => {
  app.get("/user/:user_id", user);
  app.get("/get_admins", get_admins);
  app.get("/site_admin", site_admin);
  app.get("/comments/:article/:skip", comments);
  app.get("/article_categories", article_categories);

  app.post("/admin_login", admin_login);

  app.post("/articles", articles);
  app.post("/get_articles", get_articles);
  app.post("/new_article", new_article);
  app.post("/update_article", update_article);
  app.post("/update_article_category", update_article_category);
  app.post("/remove_article_category/:category", remove_article_category);
  app.post("/remove_article/:article", remove_article);
  app.post("/article_viewed/:article", article_viewed);
  app.post("/search_articles", search_articles);
  app.post("/new_reply", new_reply);
  app.post("/new_comment", new_comment);
  app.post("/get_replies", get_replies);
  app.post("/add_article_category", add_article_category);

  app.post("/update_admin", update_admin);
  app.post("/update_admin_password", update_admin_password);
};

export default routes;
