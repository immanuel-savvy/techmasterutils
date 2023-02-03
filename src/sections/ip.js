import React from "react";
import { Table } from "react-bootstrap";
import Loadindicator from "../components/loadindicator";
import { get_request } from "../libs/services";

class IP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let your_ip = await get_request("what_is_my_ip");
    this.setState({ your_ip }, this.calculate);
  };

  calculate = async (e) => {
    e && e.preventDefault();

    let { ip, your_ip, calculating, mask } = this.state;
    if (calculating) return;

    if (!ip) ip = your_ip && your_ip.ip;

    if (!ip) return;
    this.setState({ calculating: true });
    mask = mask || "32";
    if (mask.startsWith("/")) mask = mask.slice(1);

    let result = await get_request(
      `https://networkcalc.com/api/ip/${ip}/${mask}?binary=true`,
      true
    );

    result = result && result.address;
    let result_header = result && Object.keys(result);
    this.setState({ result, result_header, calculating: false }, () =>
      window.scrollTo({ top: 600, behavior: "smooth" })
    );
  };

  clear = (e) => {
    e.preventDefault();
    this.setState(
      { calculating: false, result: null, result_header: null },
      () => window.scrollTo({ top: 0, behavior: "smooth" })
    );
  };

  render() {
    let { your_ip, result, result_header, calculating, ip, mask } = this.state;

    return (
      <section className="section">
        <div className="top">
          <div className="text">
            <h1>IPv4 / IPv6 Subnet Calculator</h1>
            <p>
              Subnet calculator performs network calculations using IP address.
              Mask bits, determines the resulting broadcast address, subnet, and
              more.
            </p>
          </div>
          <div className="img"></div>
        </div>
        <div className="content">
          <form action="">
            <label for="IP address">IP address</label>
            <input
              type="text"
              name="IP address"
              onChange={({ target }) => this.setState({ ip: target.value })}
              placeholder={(your_ip && your_ip.ip) || "(e.g. 192.168.1.1)"}
              value={ip}
              id=""
            />
            <label for="Netmask">
              Netmask <span>(subnet mask, CIDR or wildcard)</span>
            </label>
            <input
              value={mask}
              onChange={({ target }) => this.setState({ mask: target.value })}
              type="text"
              name="Netmask"
              placeholder="/32"
              id=""
            />
            <label for="">
              Your IP Address* <span>{(your_ip && your_ip.ip) || "..."}</span>
            </label>
            <span className="fl">
              <button onClick={this.calculate}>
                {calculating ? "Calculating..." : "Calculate"}
              </button>
              <a href="#" className="cancel" onClick={this.clear}>
                Clear <i className="material-icons-outlined">close</i>
              </a>
            </span>
          </form>
          <div className="text">
            <p className="title">About IPv4 Subnet Calculator</p>
            <p className="sub_txt" id="exp_txt">
              Enter IP address and netmask (decimal separated by dots (e.g.
              255.255.255.0), CIDR (e.g. 29) and the IPv4 subnet calculator will
              calculate the broadcast, network, Cisco wildcard mask, host range
              and quantity of hosts. Online and for free. The wildcard is the
              inverse netmask used for access control lists (ACL's) in Cisco
              routers. This free online IPv4 subnet calculator also can be used
              as a teaching tool and presents the subnetting results as
              easy-to-understand binary values. We can see two things: all host
              bits are zeroes in a network address, in a broadcast address they
              are all set. First bits determine the class of your network from A
              to E. A, B and C are commonly used. Each class has a range of
              valid IP addresses. Address Range of Class A - 1.0.0.1 to
              126.255.255.254 (supports 16 million hosts on each of 127
              networks). Class B - 128.1.0.1 to 191.255.255.254 (65,000 hosts on
              each of 16,000 networks). Class C - 192.0.1.1 to 223.255.254.254
              (254 hosts on each of 2 million networks). Class D - 224.0.0.0 to
              239.255.255.255 (address range reserved for multicast groups).
              Class E - 240.0.0.0 to 254.255.255.254 (reserved for future use,
              research and development purposes).Your IP addressYour are from
              Switzerland146.70.99.240
            </p>
            {/* <p className="exp" onclick="exp()">
              Expand <i className="material-icons-outlined">expand_more</i>
            </p> */}
          </div>
        </div>

        {result ? <h3>Subnet Information</h3> : null}
        {calculating ? (
          <Loadindicator
            style={{ marginBottom: 50 }}
            text="fetching subnet details"
          />
        ) : result ? (
          <div
            className="content"
            id="result"
            style={{
              overflow: "scroll",
              marginBottom: 40,
            }}
          >
            <Table style={{ width: "100%" }} striped bordered hover responsive>
              <tbody style={{ width: "100%" }}>
                {result_header.map((header, index) => {
                  return header === "binary" ? null : (
                    <tr key={index}>
                      <th style={{ width: "45vw" }}>
                        {header.replace(/_/g, " ")}
                      </th>
                      <td style={{ width: "55vw" }}>{result[header]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <></>
        )}
      </section>
    );
  }
}

export default IP;
