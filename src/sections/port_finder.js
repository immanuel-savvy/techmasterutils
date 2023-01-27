import React from "react";
import Table from "react-bootstrap/Table";

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
  };

  render() {
    let { value, headers, result } = this.state;

    return (
      <section className="section">
        <div className="top">
          <div className="text">
            <h1>TCP/UDP Port Finder</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              impedit recusandae. Sed repellat in et debitis dicta quas
              blanditiis nam.
            </p>
          </div>
          <div
            className="img"
            style={{ backgroundImage: `url(${require("../images/plug.svg")})` }}
          ></div>
        </div>
        <div className="content">
          <form action="">
            <label for="port number">Port number or name:</label>
            <input
              type="text"
              name=""
              value={value}
              placeholder=""
              id=""
              onChange={({ target }) => this.setState({ value: target.value })}
            />
            <label for="">
              <span>
                Enter port number (e.g. 21), service (e.g. ssh, ftp) or threat
                (e.g. nimda)
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
            <p className="title">About TCP/UDP ports</p>
            <p className="sub_txt" id="exp_txt">
              TCP port uses the Transmission Control Protocol. TCP is one of the
              main protocols in TCP/IP networks. TCP is a connection-oriented
              protocol, it requires handshaking to set up end-to-end
              communications. Only when a connection is set up user's data can
              be sent bi-directionally over the connection. Attention! TCP
              guarantees delivery of data packets in the same order in which
              they were sent. Guaranteed communication over TCP port is the main
              difference between TCP and UDP. UDP port would not have guaranteed
              communication as TCP. UDP provides an unreliable service and
              datagrams may arrive duplicated, out of order, or missing without
              notice. UDP thinks that error checking and correction is not
              necessary or performed in the application, avoiding the overhead
              of such processing at the network interface level. UDP (User
              Datagram Protocol) is a minimal message-oriented Transport Layer
              protocol (protocol is documented in IETF RFC 768). Application
              examples that often use UDP: voice over IP (VoIP), streaming media
              and real-time multiplayer games. Many web applications use UDP,
              e.g. the Domain Name System (DNS), the Routing Information
              Protocol (RIP), the Dynamic Host Configuration Protocol (DHCP),
              the Simple Network Management Protocol (SNMP). TCP vs UDP - TCP:
              reliable, ordered, heavyweight, streaming; UDP - unreliable, not
              ordered, lightweight, datagrams.Your IP addressYour are from
              Switzerland146.70.99.199
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
  }
}

export default Port_finder;
