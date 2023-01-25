import React from "react";
import { sections, sections_name } from "./sidebar";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { set_active_section } = this.props;

    return (
      <footer>
        <nav>
          <span class="logo">
            <img src={require(`../images/o5.png`)} alt="" />
            <a href="">Techmaster Utils</a>
          </span>
        </nav>
        <span class="sp2">
          {sections_name.map((section) => {
            return (
              <a
                class="a section_selector"
                key={section}
                onClick={() => set_active_section(section)}
              >
                {sections[section].title}
              </a>
            );
          })}
        </span>
      </footer>
    );
  }
}

export default Footer;
