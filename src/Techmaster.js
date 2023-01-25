import "./App.css";
import React from "react";
import Sidebar, { sections, sections_name } from "./components/sidebar";
import Header from "./components/header";
import Footer from "./components/footer";

class Techmaster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_section: sections_name[0],
    };
  }

  toggle_sidebar = () => {
    let is_on = document.getElementById("sidebar").style.display === "flex";

    document.getElementById("sidebar").style.display = is_on ? "none" : "flex";
    document.getElementById("x").style.display = is_on ? "none" : "flex";
    document.getElementById("i").style.display = is_on ? "flex" : "none";
  };

  set_active_section = (active_section, sidebar) =>
    this.setState({ active_section }, sidebar && this.toggle_sidebar);

  render() {
    let { active_section } = this.state;

    return (
      <div id="body">
        <Sidebar
          set_active_section={this.set_active_section}
          toggle_sidebar={this.toggle_sidebar}
        />
        <Header
          toggle_sidebar={this.toggle_sidebar}
          set_active_section={this.set_active_section}
        />

        <main>{sections[active_section].component}</main>

        <Footer set_active_section={this.set_active_section} />
      </div>
    );
  }
}

export default Techmaster;
