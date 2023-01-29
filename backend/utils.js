import fs from "fs";

const convert_to_buffer = (base64_file) => {
  return Buffer.from(base64_file.slice(base64_file.indexOf(",")), "base64");
};

const save_file = (buffer, ext) => {
  let filename = `${Math.random().toString().slice(2)}${ext}`;

  fs.writeFileSync(`${__dirname}/files/${filename}`, convert_to_buffer(buffer));

  return filename;
};

const remove_file = (file) => {
  if (!file) return;

  try {
    let file_path = __dirname + `/files/${file}`;
    fs.unlinkSync(file_path);
  } catch (e) {}
};

export { convert_to_buffer, save_file, remove_file };
