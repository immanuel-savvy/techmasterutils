import React from "react";
import ReactMarkdown from "react-markdown";
import Body_text from "../components/body_text";
import Preview_image from "../components/preview_image";
import Tools from "../contexts";
import { client_domain, domain } from "../libs/services";
import { Atag, Ptag } from "./student_loan_calculator";

class Mac_address extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  find_vendor = async (e) => {
    e.preventDefault();

    let { mac, searching } = this.state;
    if (!mac || searching) return;
    this.setState({ searching: true });

    let ftch = await fetch(
      `https://api.macaddress.io/v1?apiKey=at_uumU9MitqbKY4lJHZYtDDyhs6TdOA&output=json&search=${mac}`
    );

    let result = await ftch.json();

    this.setState({ result, searching: false });
  };

  clear = () => this.setState({ result: "" });

  render() {
    let { mac, result, searching, expanded } = this.state;

    return (
      <Tools.Consumer>
        {({ data, active_tab }) => {
          let {
            sub_text,
            title,
            image,
            body_image,
            body_image_hash,
            image_hash,
            body_text,
          } = data[active_tab];

          return (
            <section class="section">
              <div class="top">
                <div class="text">
                  <h3>{title}</h3>

                  <ReactMarkdown components={{ p: Ptag, a: Atag }}>
                    {sub_text}
                  </ReactMarkdown>
                </div>
                <div>
                  <Preview_image
                    image={image || `${active_tab}.png`}
                    image_hash={image_hash}
                    class_name="img"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div className="content" style={{ marginTop: 40 }}>
                <form action="">
                  <label for="MAC-Address">MAC Address</label>
                  <input
                    type="text"
                    value={mac}
                    onChange={({ target }) =>
                      this.setState({ mac: target.value })
                    }
                    placeholder="(e.g. b4:b6:76:69:78:32)"
                    id=""
                  />
                  <label for="">
                    <span> Or first 6-characters - b4:b6:76</span>
                  </label>

                  <span>
                    {result ? (
                      result.error ? (
                        result.error
                      ) : (
                        <span>
                          <label>Vendor Details</label>
                          <label for="">
                            <span> Company Name - </span>{" "}
                            {result.vendorDetails.companyName}
                          </label>
                          <label for="">
                            <span> Company Address - </span>{" "}
                            {result.vendorDetails.companyAddress || "-"}
                          </label>
                          <label for="">
                            <span> Country Code - </span>{" "}
                            {result.vendorDetails.countryCode || "-"}
                          </label>
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </span>

                  <span class="fl">
                    <button onClick={this.find_vendor} type="submit">
                      {searching ? "Searching..." : "Find Vendor"}
                    </button>
                    <a onClick={this.clear} href="#" class="cancel">
                      Clear <i class="material-icons-outlined">close</i>
                    </a>
                  </span>
                </form>

                <Body_text
                  title={title}
                  image={body_image}
                  image_hash={body_image_hash}
                  body_text={body_text}
                />
              </div>
            </section>
          );
        }}
      </Tools.Consumer>
    );
  }
}

export default Mac_address;
