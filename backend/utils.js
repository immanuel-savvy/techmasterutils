import fs from "fs";

let domain = "http://localhost:3300" || "http://bckend.techmastertools.net";

const convert_to_buffer = (base64_file) => {
  return Buffer.from(base64_file.slice(base64_file.indexOf(",")), "base64");
};

const save_file = (buffer, ext, filename) => {
  filename = filename
    ? `${filename}-${Math.random().toString().slice(-3)}${ext}`
    : `${Math.random().toString().slice(2)}${ext}`;

  fs.writeFileSync(
    `${__dirname}/files/${filename}`,
    typeof buffer === "string" ? convert_to_buffer(buffer) : buffer
  );

  return filename;
};

const remove_file = (file) => {
  if (!file) return;

  try {
    let file_path = __dirname + `/files/${file}`;
    fs.unlinkSync(file_path);
  } catch (e) {}
};

export { convert_to_buffer, save_file, remove_file, domain };
