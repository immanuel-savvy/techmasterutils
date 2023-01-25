import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <footer>
        <nav>
          <span class="logo">
            <img src={require(`../images/o5.png`)} alt="" />
            <a href="">Techmaster Utils</a>
          </span>
        </nav>
        <span class="sp2">
          <a class="a" onclick="section1on();">
            IPv4 subnet calculator
          </a>
          <a class="a" onclick="section2on();">
            Password Generator/Decryptor
          </a>
          <a class="a" onclick="section3on();">
            PDF to Word Converter
          </a>
          <a class="a" onclick="section4on();">
            TCP/UDP Port Finder
          </a>
        </span>
      </footer>
    );
  }
}

export default Footer;
