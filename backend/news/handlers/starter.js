import { ADMINSTRATORS, ADMIN_HASH, GLOBALS, USERS, USERS_HASH } from "../conn";

let default_admin = "adminstrators~techmastertools~1234567890123",
  default_user = "users~techmastertools~1234567890123";

const create_default_admin = () => {
  if (!ADMINSTRATORS.readone(default_admin)) {
    ADMINSTRATORS.write({
      firstname: "Techmaster",
      lastname: "News",
      image: "techmasternews_admin_photo.jpg",
      email: "admin@techmastertools.net",
      _id: default_admin,
    });
    ADMIN_HASH.write({ admin: default_admin, key: "adminstrator#1" });
  }

  if (!USERS.readone(default_user)) {
    USERS.write({
      _id: default_user,
      firstname: "Techmaster",
      lastname: "News",
      verified: true,
      email: "news@techmastertools.net",
    });
    USERS_HASH.write({ user: default_user, key: "adminstrator#1" });
  }

  !GLOBALS.readone({ global: "rss_query" }) &&
    GLOBALS.write({ global: "rss_query", query: "technology" });
};

export { create_default_admin, default_admin };
