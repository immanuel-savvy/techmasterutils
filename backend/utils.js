import fs from "fs";
import { generate_random_string } from "generalised-datastore/utils/functions";

let domain = "http://localhost:3300" || "https://bckend.techmastertools.net";

let prefix = "techmasternews";

const convert_to_buffer = (base64_file) => {
  return Buffer.from(base64_file.slice(base64_file.indexOf(",")), "base64");
};

const save_image = (base64_image, image_name) => {
  if (!base64_image || (base64_image && !base64_image.startsWith("data")))
    return base64_image;

  image_name = `${prefix}_${image_name || Date.now()}${
    image_name ? "" : generate_random_string(6, "alpha")
  }.jpg`;
  let image_path = __dirname + `/files/images/${image_name}`;
  fs.writeFileSync(
    image_path,
    Buffer.from(base64_image.slice(base64_image.indexOf(",")), "base64")
  );

  return image_name;
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

const remove_image = (image) => {
  if (image === "user_image_placeholder.png" || !image) return;

  try {
    let image_path = __dirname + `/files/images/${image}`;
    fs.unlinkSync(image_path);
  } catch (e) {}
};

export {
  convert_to_buffer,
  save_file,
  save_image,
  remove_image,
  remove_file,
  domain,
};
