import React from "react";
import Table from "react-bootstrap/Table";
import Tools from "../contexts";
import { client_domain } from "../libs/services";

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
          let { title, sub_text, body_text, image } = data[active_tab];

          return (
            <section className="section">
              <div className="top">
                <div className="text">
                  <h1>{title}</h1>
                  <p>{sub_text}</p>
                </div>
                <div>
                  <img
                    src={`${client_domain}/${image || "images/port.webp"}`}
                    style={{ width: "100%" }}
                    className="img"
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
                <div className="text">
                  <p className="title">About {title}</p>
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
