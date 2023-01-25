import React from "react";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="sidebar" id="sidebar">
        <div class="content">
          <nav>
            <span class="logo">
              <img src={require(`../images/o5.png`)} alt="" />
              <a href="">Techmaster Utils</a>
            </span>
            <i class="material-icons-outlined x" id="x" onclick="sidebarOff();">
              close
            </i>
          </nav>
          <a class=" a" onclick="section1on(); sidebarOff();">
            IPv4 subnet calculator
          </a>
          <a class="a" onclick="section2on(); sidebarOff();">
            Password Generator/Decryptor
          </a>
          <a class="a" onclick="section3on(); sidebarOff();">
            PDF to Word Converter
          </a>
          <a class="a" onclick="section4on(); sidebarOff();">
            TCP/UDP Port Finder
          </a>
        </div>
      </div>
    );
  }
}

export default Sidebar;
