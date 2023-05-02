import React from "react";
import { Table } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Body_text from "../components/body_text";
import Loadindicator from "../components/loadindicator";
import Preview_image from "../components/preview_image";
import Tools from "../contexts";
import { client_domain, domain, get_request } from "../libs/services";
import { Atag, Ptag } from "./student_loan_calculator";

const commalise_figures = (figure) => {
  if (typeof figure !== "number") return figure;
  if (figure >= 1e21) return figure.toLocaleString("fullwide");

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
      v6mask: Array.from(Array(129).keys()),
    };
  }

  componentDidMount = async () => {
    let your_ip = await get_request("what_is_my_ip");
    this.setState({ your_ip });
  };

  set_ip = (ip) => this.setState(ip.includes(":") ? { ipv6: ip } : { ip });

  calculate_v6 = (e) => {
    e && e.preventDefault();

    let { ipv6, v6_mask } = this.state;
    if (!ipv6) ipv6 = "fa60::8e71:0021:cb6e:e31c";
    let ip = ipv6;

    let mask = v6_mask || "64";
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
    if (x && x.endsWith("0")) {
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
      { result6: result, result_header6: Object.keys(result) },
      this.scroll_to_top
    );
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

    if (result && result.address)
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

  clear = (e, v6) => {
    e.preventDefault();

    this.setState(
      v6
        ? { result6: null, result_header6: null }
        : { calculating: false, result: null, result_header: null },
      this.scroll_to_top
    );
  };

  render_result = (result, result_header) => {
    return (
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
                    {(header === "ip" ? header.toUpperCase() : header).replace(
                      /_/g,
                      " "
                    )}
                  </th>
                  <td style={{ width: "55vw" }}>{result[header]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  render() {
    let {
      your_ip,
      result,
      ipv6,
      v6mask,
      calculating,
      ip,
      result6,
      result_header6,
      result_header,
      masks,
    } = this.state;

    return (
      <Tools.Consumer>
        {({ data, active_tab }) => {
          let {
            title,
            sub_text,
            image,
            body_image,
            body_image_hash,
            image_hash,
            body_text,
          } = data[active_tab];

          return (
            <section className="section">
              <div className="top">
                <div className="text">
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
              {result ? (
                <h3 style={{ marginTop: 50 }}>IPv4 Subnet Information</h3>
              ) : null}
              {calculating ? (
                <Loadindicator
                  style={{ marginTop: 50 }}
                  text="fetching subnet details"
                />
              ) : result ? (
                this.render_result(result, result_header)
              ) : (
                <></>
              )}

              {result6 ? (
                <h3 style={{ marginTop: 50 }}>IPv6 Subnet Information</h3>
              ) : null}
              {result6 ? this.render_result(result6, result_header6) : null}

              <div style={{ marginTop: 25 }} className="content">
                <form action="">
                  <div
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.3) 5px 14px 12px",
                      width: "100%",
                      padding: 14,
                      borderRadius: 20,
                    }}
                  >
                    <h4
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      IPv4
                    </h4>
                    <label for="IP address">IP address</label>
                    <input
                      type="text"
                      value={ip}
                      name="IP address"
                      onChange={({ target }) => this.set_ip(target.value)}
                      placeholder="(e.g. 192.168.1.1)"
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
                        <label for="port number">Subnet Mask</label>
                        <div className="flex">
                          <div className="select">
                            <select
                              id="selection"
                              defaultValue={"32"}
                              onChange={({ target }) => {
                                this.setState({ mask: target.value });
                              }}
                              aria-valuenow="20"
                            >
                              {masks.map((msk, index) => (
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
                      Your IP Address*{" "}
                      <span>{(your_ip && your_ip.ip) || "..."}</span>
                    </label>
                    <span className="fl">
                      <button onClick={this.calculate}>
                        {calculating ? "Calculating..." : "Calculate"}
                      </button>
                      <a href="#" className="cancel" onClick={this.clear}>
                        Clear <i className="material-icons-outlined">close</i>
                      </a>
                    </span>
                  </div>
                  <hr />

                  <div
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.3) 5px 14px 12px",
                      width: "100%",
                      padding: 14,
                      borderRadius: 20,
                    }}
                  >
                    <h4 style={{ textAlign: "center", width: "100%" }}>IPv6</h4>
                    <label for="IP address">IP address</label>
                    <input
                      type="text"
                      value={ipv6}
                      name="IPv6 address"
                      onChange={({ target }) => this.set_ip(target.value)}
                      placeholder={"fa60::8e71:0021:cb6e:e31c"}
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
                        <label for="port number">Prefix length</label>
                        <div className="flex">
                          <div className="select">
                            <select
                              id="selection"
                              defaultValue={"64"}
                              onChange={({ target }) => {
                                this.setState({ v6_mask: target.value });
                              }}
                              aria-valuenow="20"
                            >
                              {v6mask.map((msk) => (
                                <option key={msk} value={msk.toString()}>
                                  /{msk}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </span>
                    </div>

                    <span className="fl">
                      <button onClick={this.calculate_v6}>Calculate</button>
                      <a
                        href="#"
                        className="cancel"
                        onClick={(e) => this.clear(e, 6)}
                      >
                        Clear <i className="material-icons-outlined">close</i>
                      </a>
                    </span>
                  </div>
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

export default IP;
export { commalise_figures };
