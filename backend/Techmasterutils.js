import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { domain, remove_file, save_file } from "./utils";
import { PDFNet } from "@pdftron/pdfnet-node";

process.on("uncaughtException", function (error) {
  console.log(error.stack);
});

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

/* PDFNet */

const pdf_key =
  "demo:1674987060797:7d5a1d8903000000002893e91db12901081a7713aa7f43e4b54cfdace1";

let main = async (input, output) => {
  try {
    await PDFNet.addResourceSearchPath("./");

    if (!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
      console.log("hello");
      return;
    }

    await PDFNet.Convert.fileToWord(input, output);
  } catch (e) {}
};

app.post("/pdf_to_word", (req, res) => {
  let { file } = req.body;

  // Save file
  let saved_file = save_file(file, ".pdf");

  // Cleanup input and output file paths
  let input_file_path = `./files/${saved_file}`,
    out_filename = `${saved_file.slice(0, saved_file.indexOf("."))}.docx`,
    output_file_path = `./files/${out_filename}`;

  try {
    // Start PDFNet
    PDFNet.runWithCleanup(
      () => main(input_file_path, output_file_path.replace(/ /g, "_")),
      pdf_key
    )
      .then((r) => {
        // Remove saved PDF file after conversion
        remove_file(saved_file);

        // Return url to converted Word document
        res.json({
          ok: true,
          data: {
            file_name: out_filename,
            url: `${domain}${output_file_path.slice(7)}`,
          },
        });

        // Remove converted Word document after an hour.
        setTimeout(() => remove_file(out_filename), 10 * 1000 * 60);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
});

app.listen(3300, () => {
  console.log("Techmaster Utils Backend started on :3300");
});
