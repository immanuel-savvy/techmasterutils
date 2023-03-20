import { TOOLS } from "./news/conn";
import { save_image } from "./utils";

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

export { update_tool_data, tools_data };
