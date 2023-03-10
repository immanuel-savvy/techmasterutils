import {
  WordsApi,
  SaveOptionsData,
  SaveAsOnlineRequest,
} from "asposewordscloud";
import { createReadStream, writeFileSync } from "fs";

let client_id = "92b2c375-5d2e-459c-9540-e05c8104db02",
  client_secret = "1c5d3a5ba8a654614a0e850517a3d7e1";

const words_api = new WordsApi(client_id, client_secret);

let request_document = createReadStream("./files/002653569267120126.pdf");

let request_save_options_data = new SaveOptionsData({
  saveFormat: "docx",
  fileName: "file.docx",
});

const save_request = new SaveAsOnlineRequest({
  document: request_document,
  saveOptionsData: request_save_options_data,
});

let run = () => {
  words_api
    .saveAsOnline(save_request)
    .then((result) => {
      result.body.document.forEach((val) =>
        writeFileSync("./files/word.docx", val)
      );
    })
    .catch((e) => console.log(e));
};
