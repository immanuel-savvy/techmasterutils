import React from "react";
import Loadindicator from "../components/loadindicator";
import { client_domain, post_request } from "../libs/services";

class PDF_to_word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handle_upload = ({ target }) => {
    let file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    this.setState({ uploading: true });

    reader.onloadend = (e) =>
      this.setState({
        pdf: reader.result,
        file_name: file.name,
        uploading: false,
        converting: false,
        result: null,
      });
  };

  download = (e) => {
    e.preventDefault();

    let { result } = this.state;
    if (!result) return;

    window.open(result.url);
  };

  treat_filename = (filename) => {
    filename = filename.split(".");
    filename = filename.slice(0, -1);
    // filename.push("docx");

    return filename.join(".");
  };

  convert = async (e) => {
    e.preventDefault();

    let { pdf, file_name, converting } = this.state;
    if (converting || !pdf) return;
    this.setState({ converting: true });

    let result = await post_request("pdf_to_word", {
      file: pdf,
      filename: file_name.slice(0, file_name.lastIndexOf(".")),
    });

    this.setState({ result, converting: false });
  };

  clear = () => {
    this.setState({ result: null, file_name: "" });
  };

  render() {
    let { result, converting, file_name } = this.state;

    return (
      <section className="section">
        <div className="top">
          <div className="text">
            <h1>PDF to Word converter</h1>
            <p>
              Turn PDFs into editable Doc files with the best PDF to Word
              converter
            </p>
          </div>
          <div>
            <img
              src={`${client_domain}/images/text_files.svg`}
              style={{ width: "100%" }}
              className="img"
            />
          </div>
        </div>
        <div className="content" style={{ marginTop: 40 }}>
          <form action="">
            <label for="">Upload your PDF</label>
            <div className="file_div">
              <div className="txt">
                <p className="p1">UPLOAD FILES</p>
                <h4>or</h4>
                <p className="p2">Drop Your PDF Files Here</p>
              </div>
              <input
                onChange={this.handle_upload}
                type="file"
                className="file"
                accept=".pdf"
                placeholder="CLICK TO ADD"
              />
            </div>

            {file_name ? (
              <span style={{ marginBottom: 10 }}>{file_name}</span>
            ) : null}

            {converting ? (
              <Loadindicator />
            ) : (
              <span className="fl">
                <button onClick={this.convert} type="submit">
                  Convert
                </button>
                <a href="#" onClick={this.clear} className="cancel">
                  Clear <i className="material-icons-outlined">close</i>
                </a>
              </span>
            )}

            {result ? (
              <>
                <span
                  style={{
                    marginTop: 20,
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  {result.file_name}
                </span>
                <span className="fl" style={{ marginTop: 10 }}>
                  <a
                    href={result && result.url}
                    download={this.treat_filename(file_name)}
                    // onClick={this.download}
                    // type="submit"
                  >
                    Download
                  </a>
                </span>
              </>
            ) : null}
          </form>
          <div className="text">
            <p className="title">About PDF to Word converter</p>
            <p className="sub_txt" id="exp_txt">
              Convert PDF files to Word quickly, easily and entirely online.
              Upload your files to our platform, let our PDF to DOC converter do
              its magic and download your newly created document right away. No
              more hassle, convert PDF to editable Word in just a few steps.
              Learn how to convert PDF to Word Document with DocFly by following
              the steps above. The main benefit of converting PDFs to Microsoft
              Word documents is the ability to edit the text directly within the
              file. This is especially helpful if you want to make significant
              changes to your PDF, as most people are comfortable and familiar
              with Microsoft Word. If you're wondering how to change PDF to Word
              for free, it's important to note that quality of the resulting
              Word document is also important, not just the cost. While there
              are several free PDF to Word converters, the majority do not
              sufficiently maintain the original formatting and spacing of the
              file. Our conversion tool delivers a result that looks like your
              original PDF file. We created our PDF to Word free converter tool
              so you no longer need to waste time retyping files in Word. Within
              seconds you can change your PDF to a Docx and make the necessary
              edits. Not only is our PDF to Word converter free, online and
              available whenever you need it, we allow users to convert 2
              additional files per month for free too. So go ahead and convert
              PDF to DOC online for free. We think you will be happy with the
              results!
            </p>
          </div>
        </div>
        <h3>How it works</h3>
        <span>In just 3 quick steps</span>
        <div
          className="content"
          style={{
            marginBottom: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="box">
            <i className="material-icons-outlined">upload_file</i>
            <br />
            <span>Upload</span>
          </span>
          <i className="material-icons-outlined">arrow_forward</i>
          <span className="box">
            <i class="material-icons-outlined">swap_horiz</i>
            <br />
            <span>Convert</span>
          </span>
          <i className="material-icons-outlined">arrow_forward</i>
          <span className="box">
            <i class="material-icons-outlined">download</i>
            <br />
            <span>Download</span>
          </span>
        </div>
      </section>
    );
  }
}

export default PDF_to_word;
