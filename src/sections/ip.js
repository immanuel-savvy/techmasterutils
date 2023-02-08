import React from "react";
import { Table } from "react-bootstrap";
import Loadindicator from "../components/loadindicator";
import { get_request } from "../libs/services";

const commalise_figures = (figure) => {
  if (typeof figure !== "number") return figure;

  figure = figure.toString();
  if (figure.length <= 3) return figure;

  let ff = "",
    i;
  for (i = 0; i < figure.length; i += 3)
    ff = `${figure.slice(figure.length - i - 3, figure.length - i)},${ff}`;

  if (i < figure.length) ff = `${figure.slice(0, i)}${ff}`;
  else if (i > figure.length) {
    ff = `${figure.slice(0, figure.length % 3)}${ff}`;
  }
  if (ff.startsWith(",")) ff = ff.slice(1);

  return ff.slice(0, -1);
};

class IP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      masks: new Array(
        "255.255.255.255",
        "255.255.255.254",
        "255.255.255.252",
        "255.255.255.248",
        "255.255.255.240",
        "255.255.255.224",
        "255.255.255.192",
        "255.255.255.128",
        "255.255.255.0",
        "255.255.254.0",
        "255.255.252.0",
        "255.255.248.0",
        "255.255.240.0",
        "255.255.224.0",
        "255.255.192.0",
        "255.255.128.0",
        "255.255.0.0",
        "255.254.0.0",
        "255.252.0.0",
        "255.248.0.0",
        "255.240.0.0",
        "255.224.0.0",
        "255.192.0.0",
        "255.128.0.0",
        "255.0.0.0",
        "254.0.0.0",
        "252.0.0.0",
        "248.0.0.0",
        "240.0.0.0",
        "224.0.0.0",
        "192.0.0.0",
        "128.0.0.0",
        "0.0.0.0"
      ),
      v6mask: Array.from(Array(128).keys()),
    };
  }

  componentDidMount = async () => {
    let your_ip = await get_request("what_is_my_ip");
    this.setState({ your_ip }, this.calculate);
  };

  set_ip = (ip) => {
    if (ip.includes(":")) {
      this.setState({ ip, is_v6: true });
    } else this.setState({ ip, is_v6: false });
  };

  calculate_v6 = () => {
    let { ip, mask } = this.state;
    mask = parseInt(mask);

    let result = new Object({
      ip,
    });
    ip = ip.split(":");

    if (ip.length < 8) {
      if (ip.includes("")) {
        let zeros = new Array(8 - ip.length);
        zeros = zeros.map((z) => "0000");
        ip.splice(ip.indexOf(""), 0, ...zeros);
        ip = ip.map((p) => p || "");
      }
    }

    ip = ip.map((p) => p.padStart(4, "0"));
    result.full_address = ip.join(":");
    let binary = ip.map((p) => {
      return parseInt(p, 16).toString(2).padStart(16, "0");
    });
    result.binary = binary.join(":");
    binary = binary.join("");

    let net = new Array();
    let network_address = binary.slice(0, mask);

    while (true) {
      if (network_address.length >= 16) {
        net.push(network_address.slice(0, 16));
        network_address = network_address.slice(16);
      } else {
        network_address.length && net.push(network_address);
        break;
      }
    }
    net = ip.slice(0, net.length);
    let net_upper_bound = new Array(...net);

    let x = net_upper_bound.slice(-1)[0];
    if (x.endsWith("0")) {
      let i = 0;
      while (i < x.length) {
        if (x[i] === "0") {
          x = x.slice(0, i);
          break;
        }
        i++;
      }
      x = x.padEnd(4, "f");
      net_upper_bound.pop();
      net_upper_bound.push(x);
    }
    while (net.length < 8) {
      net.push("0000");
      net_upper_bound.push("ffff");
    }

    result.network_address = net.join(":");
    result.address_range = `${result.network_address} - ${net_upper_bound.join(
      ":"
    )}`;

    let assignable_hosts = binary.slice(mask);
    assignable_hosts = assignable_hosts.split("").map((a) => "1");

    result.assignable_hosts = commalise_figures(
      parseInt(assignable_hosts.join(""), 2)
    );
    result.prefix_length = mask;

    this.setState(
      { result, result_header: Object.keys(result) },
      this.scroll_to_top
    );
  };

  calculate = async (e) => {
    e && e.preventDefault();

    let { ip, your_ip, is_v6, calculating, mask } = this.state;
    if (calculating) return;

    if (is_v6) return this.calculate_v6();

    if (!ip) ip = your_ip && your_ip.ip;

    if (!ip) return;
    this.setState({ calculating: true });
    mask = mask || "32";
    if (mask.startsWith("/")) mask = mask.slice(1);

    let result = await get_request(
      `https://networkcalc.com/api/ip/${ip}/${mask}?binary=true`,
      true
    );

    if (result)
      result.address.assignable_hosts = commalise_figures(
        Number(result.address.assignable_hosts)
      );

    result = result && result.address;
    let result_header = result && Object.keys(result);
    this.setState(
      { result, result_header, calculating: false },
      this.scroll_to_top
    );
  };

  scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

  clear = (e) => {
    e.preventDefault();
    this.setState(
      { calculating: false, result: null, result_header: null },
      this.scroll_to_top
    );
  };

  render() {
    let {
      your_ip,
      result,
      is_v6,
      v6mask,
      result_header,
      calculating,
      ip,
      masks,
    } = this.state;

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
        {result ? <h3 style={{ marginTop: 50 }}>Subnet Information</h3> : null}
        {calculating ? (
          <Loadindicator
            style={{ marginTop: 50 }}
            text="fetching subnet details"
          />
        ) : result ? (
          <div
            className="content"
            id="result"
            style={{
              overflow: "scroll",
              marginBottom: 50,
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
        <div style={{ marginTop: 25 }} className="content">
          <form action="">
            <label for="IP address">IP address</label>
            <input
              type="text"
              value={ip || (your_ip && your_ip.ip)}
              name="IP address"
              onChange={({ target }) => this.set_ip(target.value)}
              placeholder={(your_ip && your_ip.ip) || "(e.g. 192.168.1.1)"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 5, width: "100%" }}>
                <label for="port number">
                  {is_v6 ? "Prefix length" : "Subnet Mask"}
                </label>
                <div className="flex">
                  <div className="select">
                    <select
                      id="selection"
                      defaultValue={is_v6 ? "64" : "32"}
                      onChange={({ target }) => {
                        this.setState({ mask: target.value });
                      }}
                      aria-valuenow="20"
                    >
                      {is_v6
                        ? v6mask.map((msk) => (
                            <option key={msk} value={msk}>
                              /{msk}
                            </option>
                          ))
                        : masks.map((msk, index) => (
                            <option key={msk} value={32 - index}>
                              {msk} /{32 - index}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
              </span>
            </div>
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
          </div>
        </div>
      </section>
    );
  }
}

export default IP;
export { commalise_figures };
