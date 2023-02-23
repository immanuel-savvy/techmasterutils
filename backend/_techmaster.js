import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { domain, remove_file, save_file } from "./utils";
import axios from "axios";

process.on("uncaughtException", function (error) {
  console.log(error.stack);
});

let api_base = "https://3ohk.aoscdn.com";

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/files"));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

app.get("/", (req, res) => res.send("<div><h1>Hi, its Techmaster.</h1></div>"));

app.get("/what_is_my_ip", (req, res) => {
  let ip =
    (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  res.status(200).json({ ok: true, message: "your ip address", data: { ip } });
});

app.post("/upload_to_remote_server", (req, res) => {
  let { file } = req.body;
  let saved_file = save_file(file, ".pdf");
  let input_file_url = `${domain}/${saved_file}`;

  res.json({
    ok: true,
    message: "file uploaded",
    data: { filename: saved_file, url: input_file_url },
  });
});

app.post("/pdf_to_word", async (req, res) => {
  let { file, filename: filename_, url } = req.body;

  let saved_file;
  if (!url) {
    saved_file = save_file(file, ".pdf");
    url = `${domain}/${saved_file}`;
  }

  let { data } = await axios.post(
    `${api_base}/api/tasks/conversion`,
    {
      url,
      format: "docx",
    },
    {
      headers: {
        "X-Api-Key": "wxk5s3og3tlopdeq5qfl",
        "Content-Type": "application/json",
      },
    }
  );

  let task_id = data.data.task_id;

  let task_interval = setInterval(async () => {
    let { data } = await axios.get(
      `https://3ohk.aoscdn.com/api/tasks/${task_id}`,
      {
        headers: {
          "X-Api-Key": "wxk5s3og3tlopdeq5qfl",
        },
      }
    );

    if (data.data.state === 1) {
      clearInterval(task_interval);
      let url = data.data.file;
      try {
        axios
          .get(url, {
            responseType: "arraybuffer",
          })
          .then((result) => {
            let filename = save_file(
              Buffer.from(result.data),
              ".docx",
              filename_
            );
            url = `${domain}/${filename}`;
            console.log(url);
            res.json({ ok: true, message: "converted", data: { url } });

            setTimeout(() => remove_file(filename), 60 * 1000 * 60);
          });
      } catch (e) {}

      saved_file && remove_file(saved_file);
    }
  }, 1000);
});

app.listen(3300, () => {
  console.log("Techmaster Utils Backend started on :3300");
});
