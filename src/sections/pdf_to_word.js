import React from "react";

class PDF_to_word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section class="section3" id="section3">
        <div class="top">
          <div class="text">
            <h1>PDF to Word converter</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              impedit recusandae. Sed repellat in et debitis dicta quas
              blanditiis nam.
            </p>
          </div>
          <div
            class="img"
            style={{
              backgroundImage: `url(${require("../images/text_files.svg")})`,
            }}
          ></div>
        </div>
        <div class="content">
          <form action="">
            <label for="">Upload your PDF</label>
            <div class="file_div">
              <div class="txt">
                <p class="p1">UPLOAD FILES</p>
                <h4>or</h4>
                <p class="p2">Drop Your Files Here</p>
              </div>
              <input type="file" class="file" placeholder="CLICK TO ADD" />
            </div>

            <span class="fl">
              <button type="submit">Convert</button>
              <a href="" class="cancel">
                Clear <i class="material-icons-outlined">close</i>
              </a>
            </span>
          </form>
          <div class="text">
            <p class="title">About PDF to Word converter</p>
            <p class="sub_txt" id="exp_txt">
              convert PDF files to Word quickly, easily and entirely online.
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
      </section>
    );
  }
}

export default PDF_to_word;
