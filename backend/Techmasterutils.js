import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { domain, remove_file, save_file } from "./utils";
import {
  WordsApi,
  SaveOptionsData,
  SaveAsOnlineRequest,
} from "asposewordscloud";
import { createReadStream, writeFileSync } from "fs";
import GoogleNewRss from "google-news-rss";
import { shuffle } from "underscore";
import routes from "./news/routes";
import ds_conn, { GLOBALS } from "./news/conn";
import { create_default_admin } from "./news/handlers/starter";

let google_news = new GoogleNewRss();

process.on("uncaughtException", function (error) {
  console.log(error.stack);
});

let client_id = "92b2c375-5d2e-459c-9540-e05c8104db02",
  client_secret = "1c5d3a5ba8a654614a0e850517a3d7e1";

const words_api = new WordsApi(client_id, client_secret);

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/files"));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(bodyParser.json({ limit: "500mb" }));

app.get("/", (req, res) => res.send("<div><h1>Hi, its Techmaster.</h1></div>"));

routes(app);

app.get("/google_rss_feed", (req, res) => {
  let { query } = req;
  query = query.query;

  let g_rss = GLOBALS.readone({ global: "rss_query" });
  query = (query && query.replace(/,/g, " ").trim()) || (g_rss && g_rss.query);

  google_news
    .search(query || "Technology", 5)
    .then((feed) => {
      feed = shuffle(feed);

      res.json({
        ok: true,
        message: "google rss feed",
        data: feed.slice(0, 5),
      });
    })
    .catch((e) => {
      console.log(e);
      res.end();
    });
});

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

  let saved_file, filename;
  if (!url) {
    saved_file = save_file(file, ".pdf");
    url = `${domain}/${saved_file}`;
  }

  let save_request = new SaveAsOnlineRequest({
    document: createReadStream(`./files/${saved_file}`),
    saveOptionsData: new SaveOptionsData({
      saveFormat: "docx",
      fileName: `${saved_file}.docx`,
    }),
  });

  words_api
    .saveAsOnline(save_request)
    .then((result) => {
      result.body.document.forEach((val) => {
        filename = `${saved_file.slice(0, saved_file.lastIndexOf("."))}.docx`;
        writeFileSync(`./files/${filename}`, val);
        res.json({
          ok: true,
          message: "document converted successfully",
          data: { url: `${domain}/${filename}` },
        });
      });
    })
    .catch((e) => console.log(e));

  setTimeout(() => {
    remove_file(saved_file);
    remove_file(filename);
  }, 60 * 60 * 1000);
});

app.listen(3300, () => {
  ds_conn();
  create_default_admin();

  console.log("Techmaster Utils Backend started on :3300");
});
