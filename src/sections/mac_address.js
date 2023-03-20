import React from "react";
import Tools from "../contexts";
import { client_domain } from "../libs/services";

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
          let { sub_text, title, body_text } = data[active_tab];

          return (
            <section class="section">
              <div class="top">
                <div class="text">
                  <h1>{title}</h1>
                  <p>{sub_text}</p>
                </div>
                <div>
                  <img
                    src={`${client_domain}/images/port.webp`}
                    style={{ width: "100%" }}
                    className="img"
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
                <div class="text">
                  <p class="title">About {title}</p>
                  <p className="sub_txt">
                    {body_text.slice(0, this.state.expanded ? -1 : 500)}
                  </p>
                  <p
                    style={{ cursor: "pointer" }}
                    class="exp"
                    onClick={() =>
                      this.setState({ expanded: !this.state.expanded })
                    }
                  >
                    Expand <i class="material-icons-outlined">expand_more</i>
                  </p>
                </div>
              </div>
            </section>
          );
        }}
      </Tools.Consumer>
    );
  }
}

export default Mac_address;
