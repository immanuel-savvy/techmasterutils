import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Sidebar, { sections, sections_name } from "./components/sidebar";
import Header from "./components/header";
import Footer from "./components/footer";

class Calculators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_section: sections_name[0],
    };
  }

  componentDidMount = () => {
    let href = window.location.href.toLowerCase().split("/");
    if (sections_name.includes(href.slice(-1)[0])) {
      href = href.slice(-1)[0];
      this.setState({ active_section: href }, () =>
        window.sessionStorage.setItem("active_section", href)
      );
    } else {
      let active_section = window.sessionStorage.getItem("active_section");
      if (active_section) window.location.href = active_section;
    }
  };

  toggle_sidebar = () => {
    let is_on = document.getElementById("sidebar").style.display === "flex";

    document.getElementById("sidebar").style.display = is_on ? "none" : "flex";
    document.getElementById("x").style.display = is_on ? "none" : "flex";
    document.getElementById("i").style.display = is_on ? "flex" : "none";
  };

  set_active_section = (active_section, sidebar) =>
    this.setState({ active_section }, () => {
      sidebar && this.toggle_sidebar();
      window.location.href = active_section;
      window.sessionStorage.setItem("active_section", active_section);
    });

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

export default Calculators;
