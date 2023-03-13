import React from "react";
import { sections, sections_name } from "./sidebar";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { set_active_section, toggle_sidebar } = this.props;

    return (
      <header>
        <nav>
          <span className="logo">
            {/* <img src={require(`../images/o5.png`)} alt="" /> */}
            <a href="#">Techmaster Tools</a>
          </span>
          <span className="nav2">
            {sections_name.map((section) => {
              return (
                <a
                  key={section}
                  onClick={() => set_active_section(section)}
                  id="sc_1"
                >
                  {sections[section].title}
                </a>
              );
            })}
            <a
              href="https://news.techmastertools.net"
              target="_blank"
              id="sc_1"
            >
              News
            </a>
          </span>
          <i
            className="material-icons-outlined i"
            id="i"
            onClick={toggle_sidebar}
          >
            menu
          </i>
        </nav>
      </header>
    );
  }
}

export default Header;
