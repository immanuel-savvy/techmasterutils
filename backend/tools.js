import { email_message } from "./emails";
import { TOOLS } from "./news/conn";
import { save_image, send_mail } from "./utils";

const update_tool_data = (req, res) => {
  let data = req.body;

  data.image = save_image(data.image, data.tool, "png");

  TOOLS.update({ tool: data.tool }, data);

  res.json({ ok: true, data: { ok: true } });
};

const tools_data = (req, res) => {
  let data = TOOLS.read();

  let data_obj = new Object();

  data.map((datum) => {
    data_obj[datum.tool] = datum;
  });

  res.json({ ok: true, message: "tools data", data: data_obj });
};

const new_message = (req, res) => {
  let { email, fullname, message } = req.body;

  send_mail({
    to: "immanuelsavvy@gmail.com",
    html: email_message({ email, fullname, message }),
    subject: `New contact message from ${fullname}`,
  });

  res.send({
    ok: true,
    message: "Message sent as email",
    data: { sent: true },
  });
};

export { update_tool_data, tools_data, new_message };
