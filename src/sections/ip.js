import React from "react";

class IP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section class="section1" id="section1">
        <div class="top">
          <div class="text">
            <h1>IPv4 Subnet Calculator</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              impedit recusandae. Sed repellat in et debitis dicta quas
              blanditiis nam.
            </p>
          </div>
          <div class="img"></div>
        </div>
        <div class="content">
          <form action="">
            <label for="IP address">IP address</label>
            <input
              type="text"
              name="IP address"
              placeholder="(e.g. 192.168.1.1)"
              id=""
            />
            <label for="Netmask">
              Netmask <span>(subnet mask, CIDR or wildcard)</span>
            </label>
            <input type="text" name="Netmask" placeholder="" id="" />
            <label for="">
              Your IP Address* <span>146.70.99.199</span>
            </label>
            <span class="fl">
              <button type="submit">Calculate</button>
              <a href="" class="cancel">
                Clear <i class="material-icons-outlined">close</i>
              </a>
            </span>
          </form>
          <div class="text">
            <p class="title">About IPv4 Subnet Calculator</p>
            <p class="sub_txt" id="exp_txt">
              Enter IP address and netmask (decimal separated by dots (e.g.
              255.255.255.0), CIDR (e.g. 29) or a Cisco wildcard (e.g. 0.0.0.31)
              and the IPv4 subnet calculator will calculate the broadcast,
              network, Cisco wildcard mask, host range and quantity of hosts.
              Online and for free. The wildcard is the inverse netmask used for
              access control lists (ACL's) in Cisco routers. This free online
              IPv4 subnet calculator also can be used as a teaching tool and
              presents the subnetting results as easy-to-understand binary
              values. We can see two things: all host bits are zeroes in a
              network address, in a broadcast address they are all set. First
              bits determine the class of your network from A to E. A, B and C
              are commonly used. Each class has a range of valid IP addresses.
              Address Range of Class A - 1.0.0.1 to 126.255.255.254 (supports 16
              million hosts on each of 127 networks). Class B - 128.1.0.1 to
              191.255.255.254 (65,000 hosts on each of 16,000 networks). Class C
              - 192.0.1.1 to 223.255.254.254 (254 hosts on each of 2 million
              networks). Class D - 224.0.0.0 to 239.255.255.255 (address range
              reserved for multicast groups). Class E - 240.0.0.0 to
              254.255.255.254 (reserved for future use, research and development
              purposes).Your IP addressYour are from Switzerland146.70.99.240
            </p>
            {/* <p class="exp" onclick="exp()">
              Expand <i class="material-icons-outlined">expand_more</i>
            </p> */}
          </div>
        </div>
      </section>
    );
  }
}

export default IP;
