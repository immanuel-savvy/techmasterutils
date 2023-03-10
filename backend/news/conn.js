import GDS from "generalised-datastore";

let gds;

let USERS, USERS_HASH, ADMINSTRATORS, ADMIN_HASH;

const ds_conn = () => {
  gds = new GDS("techmaster").sync();

  USERS = gds.folder("users");
  USERS_HASH = gds.folder("users_hash", "user");
  ADMINSTRATORS = gds.folder("adminstrators");
  ADMIN_HASH = gds.folder("admin_hash", "admin");
};

export default ds_conn;
export { USERS, ADMINSTRATORS, USERS_HASH, ADMIN_HASH, gds };
