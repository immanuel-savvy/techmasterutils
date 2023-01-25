import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <nav>
          <span class="logo">
            <img src={require(`../images/o5.png`)} alt="" />
            <a href="">Techmaster Utils</a>
          </span>
          <span class="nav2">
            <a onclick="section1on()" id="sc_1">
              IPv4 subnet calculator
            </a>
            <a onclick="section2on()" id="sc_2">
              Password Generator/Decryptor
            </a>
            <a onclick="section3on()" id="sc_3">
              PDF to Word Converter
            </a>
            <a onclick="section4on()" id="sc_4">
              TCP/UDP Port Finder
            </a>
          </span>
          <i class="material-icons-outlined i" id="i" onclick="sidebarOn();">
            menu
          </i>
        </nav>
      </header>
    );
  }
}

export default Header;
