import { ADMINSTRATORS, ADMIN_HASH, USERS, USERS_HASH } from "../conn";

let default_admin = "adminstrators~techmastertools~1234567890123",
  default_user = "users~techmastertools~1234567890123";

const create_default_admin = () => {
  if (!ADMINSTRATORS.readone(default_admin)) {
    ADMINSTRATORS.write({
      firstname: "Techmaster",
      lastname: "News",
      image: "logo_single.png",
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
};

export { create_default_admin, default_admin };
