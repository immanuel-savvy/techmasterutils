import { get_admins } from "./handlers/admin";
import { user } from "./handlers/users";

const routes = (app) => {
  app.get("/user/:user_id", user);
  app.get("/get_admins", get_admins);
};

export default routes;
