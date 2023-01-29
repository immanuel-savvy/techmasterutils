import React from "react";

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
    let { mac, result, searching } = this.state;

    return (
      <section class="section">
        <div class="top">
          <div class="text">
            <h1>MAC Address Finder</h1>
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
            <label for="MAC-Address">MAC Address</label>
            <input
              type="text"
              value={mac}
              onChange={({ target }) => this.setState({ mac: target.value })}
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
            <p class="title">About MAC Address Finder</p>
            <p class="sub_txt" id="exp_txt">
              MAC address - Media Access Control address. MAC addresses -
              hardware addresses that uniquely identifies each node of a
              network. It is assigned by the vendor or manufacturer and saved to
              the device memory. According to the OSI model it is a second-level
              address. In IEEE 802 networks Data Link Control (DLC) layer is
              divided into two sub-layers: the Logical Link Control (LLC) layer
              and the Media Access Control (MAC) layer. First 3 bytes (or 24
              bits) of MAC addresses are known as the Organizationally Unique
              Identifier (OUI) and usually encodes the manufacturer. MAC
              addresses usually are written in the six groups of two hexadecimal
              digits separated by colons (:) or hyphens (-), e.g.
              e8:04:62:90:07:62, 00-1E-37-18-50 DB. It is also used in another
              form (e.g. vendor Cisco) - the three groups of four hexadecimal
              digits separated by dots (.), e.g. 0016.4d2e.7d10. How you can
              identify MAC address and check MAC adress? Windows(XP,7,Vista,8):
              In the command prompt (CMD), type in getmac (or getmac /v /fo list
              for full info). Linux/Unix: type ifconfig -a. You must be root
              user or have appropriate permissions. Mac OS X: launch the
              Terminal and type ifconfig. Cisco: in the CLI type e.g. show arp.
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

export default Mac_address;
