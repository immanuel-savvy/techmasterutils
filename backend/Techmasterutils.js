import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { remove_file, save_file } from "./utils";
import { PDFNet } from "@pdftron/pdfnet-node";
import { domain } from "../src/libs/services";

process.on("uncaughtException", function (error) {
  console.log(error.stack);
});

let main = async (input, output) => {
  try {
    await PDFNet.addResourceSearchPath("./");

    if (!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
      return;
    }

    await PDFNet.Convert.fileToWord(input, output);
  } catch (e) {}
};

const app = express();
app.use(cors());
console.log(__dirname);
app.use(express.static(__dirname + "/files"));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

app.get("/", (req, res) => res.send("<div><h1>Hi, its Techmaster.</h1></div>"));

app.post("/pdf_to_word", (req, res) => {
  let { file } = req.body;

  let saved_file = save_file(file, ".pdf");
  let input_file_path = `./files/${saved_file}`;
  let out_filename = `${saved_file.slice(0, saved_file.indexOf("."))}.docx`;
  let output_file_path = `./files/${out_filename}`;

  try {
    PDFNet.runWithCleanup(
      () => main(input_file_path, output_file_path),
      "demo:1674987060797:7d5a1d8903000000002893e91db12901081a7713aa7f43e4b54cfdace1"
    )
      .catch((e) => {})
      .then((r) => {
        remove_file(saved_file);
        res.json({
          ok: true,
          data: {
            file_name: out_filename,
            url: `${domain}${output_file_path.slice(7)}`,
          },
        });

        setTimeout(() => remove_file(out_filename), 10 * 1000 * 60);
      });
  } catch (e) {}
});

app.listen(3300, () => {
  console.log("Techmaster Utils Backend started on :3300");
});
