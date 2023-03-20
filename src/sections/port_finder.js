import React from "react";
import Table from "react-bootstrap/Table";
import Body_text from "../components/body_text";
import Preview_image from "../components/preview_image";
import Tools from "../contexts";
import { domain } from "../libs/services";

class Port_finder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: new Array(),
    };
  }

  componentDidMount = () => {
    this.service_et_ports = require("../libs/service_port_.json");

    this.setState({ headers: Object.keys(this.service_et_ports[0]) });
  };

  search = (e) => {
    e.preventDefault();

    let { value } = this.state,
      is_number;

    value = value.trim();
    if ("0123456789".includes(value[0])) is_number = true;

    let result = new Array();

    for (let s = 0; s < this.service_et_ports.length; s++) {
      let serice_port = this.service_et_ports[s];

      if (
        String(serice_port[is_number ? "Port Number" : "Service Name"]) ===
        value
      )
        result.push(serice_port);
    }

    this.setState({ result });
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  clear = (e) => {
    e.preventDefault();

    this.setState({ result: new Array() });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    let { value, headers, result } = this.state;

    return (
      <Tools.Consumer>
        {({ data, active_tab }) => {
          let { title, sub_text, body_text, image, image_hash } =
            data[active_tab];

          return (
            <section className="section">
              <div className="top">
                <div className="text">
                  <h1>{title}</h1>
                  <p>{sub_text}</p>
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
                  <label for="port number">Port number or name:</label>
                  <input
                    type="text"
                    name=""
                    value={value}
                    placeholder=""
                    id=""
                    onChange={({ target }) =>
                      this.setState({ value: target.value })
                    }
                  />
                  <label for="">
                    <span>
                      Enter port number (e.g. 21), service (e.g. ssh, ftp) or
                      threat (e.g. nimda)
                    </span>
                  </label>
                  <br />
                  <label for="">
                    <span>Database updated - March 30, 2016</span>
                  </label>
                  <span className="fl">
                    <button onClick={this.search}>Search</button>
                    <a href="#" className="cancel" onClick={this.clear}>
                      Clear <i className="material-icons-outlined">close</i>
                    </a>
                  </span>
                </form>
                <Body_text title={title} body_text={body_text} />
              </div>

              <div
                className="content"
                id="result"
                style={{
                  overflow: "scroll",
                }}
              >
                {result.length ? (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        {headers.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {result.map((res, index) => {
                        return (
                          <tr key={index}>
                            {headers.map((header) => (
                              <td key={header}>{res[header]}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <></>
                )}
              </div>
            </section>
          );
        }}
      </Tools.Consumer>
    );
  }
}

export default Port_finder;
