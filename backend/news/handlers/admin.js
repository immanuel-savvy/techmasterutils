import { save_image } from "../../utils";
import { ADMINSTRATORS, ADMIN_HASH, GLOBALS } from "../conn";
import { default_admin } from "./starter";

const domain_name = "https://bckend.techmastertools.net";

const client_domain = "https://news.techmastertools.net";

const admin_login = (req, res) => {
  let { email, password } = req.body;

  let admin = ADMINSTRATORS.readone({ email });
  if (admin) {
    let hash = ADMIN_HASH.readone({ admin: admin._id });

    res.json(
      hash.key === password
        ? { ok: true, message: "admin logged-in", data: { admin } }
        : { ok: false, data: { message: "incorrect password" } }
    );
  } else res.json({ ok: false, data: { message: "admin not found" } });
};

const get_admins = (req, res) => {
  let admins = ADMINSTRATORS.read();
  res.json({ ok: true, message: "adminstrators fetched", data: admins });
};

const create_admin = (req, res) => {
  let { email, password, firstname, lastname } = req.body;

  let admin = { email, firstname, lastname };

  let result = ADMINSTRATORS.write(admin);
  admin._id = result._id;
  admin.created = result.created;

  ADMIN_HASH.write({ admin: admin._id, key: password });

  res.json({ ok: true, message: "admin created", data: admin });
};

const update_admin = (req, res) => {
  let data = req.body;

  data.rss_keywords &&
    GLOBALS.update({ global: "rss_query" }, { query: data.rss_keywords });

  data.admin_image = save_image(data.admin_image, "admin_photo");
  data.image = save_image(data.image, "banner");

  data = ADMINSTRATORS.update(default_admin, data);
  if (data)
    res.json({
      ok: true,
      message: "admin updated",
      data: {
        _id: default_admin,
        image: data.image,
        admin_image: data.admin_image,
        bio: data.bio,
        name: data.name,
        updated: data.updated,
      },
    });
  else res.json({ ok: false, data: { message: "Cannot find admin" } });
};

const site_admin = (req, res) =>
  res.json({
    ok: true,
    message: "site admin",
    data: ADMINSTRATORS.readone(default_admin),
  });

const update_admin_password = (req, res) => {
  let { old_password, password } = req.body;

  if (!old_password || !password)
    return res.json({
      ok: false,
      data: { message: "Passwords cannot be empty" },
    });

  let admin_hash = ADMIN_HASH.readone({ admin: default_admin });
  if (admin_hash.key !== old_password)
    return res.json({ ok: false, data: { message: "Old Password Incorrect" } });

  ADMIN_HASH.update(
    { _id: admin_hash._id, admin: default_admin },
    { key: password }
  );

  res.json({
    ok: true,
    data: { ok: true, message: "Admin Password updated successfully!" },
  });
};

export {
  admin_login,
  create_admin,
  get_admins,
  update_admin,
  client_domain,
  domain_name,
  site_admin,
  update_admin_password,
};
