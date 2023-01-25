import React from "react";

class Port_finder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section class="section4" id="section4">
        <div class="top">
          <div class="text">
            <h1>TCP/UDP Port Finder</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              impedit recusandae. Sed repellat in et debitis dicta quas
              blanditiis nam.
            </p>
          </div>
          <div class="img" style="background-image: url(plug.svg)"></div>
        </div>
        <div class="content">
          <form action="">
            <label for="port number">Port number or name:</label>
            <input type="text" name="" placeholder="" id="" />
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
            <span class="fl">
              <button type="submit">Search</button>
              <a href="" class="cancel">
                Clear <i class="material-icons-outlined">close</i>
              </a>
            </span>
          </form>
          <div class="text">
            <p class="title">About TCP/UDP ports</p>
            <p class="sub_txt" id="exp_txt">
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
      </section>
    );
  }
}

export default Port_finder;
