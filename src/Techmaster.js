import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Sidebar, { sections, sections_name } from "./components/sidebar";
import Header from "./components/header";
import Footer from "./components/footer";
import Loadindicator from "./components/loadindicator";
import { get_request } from "./libs/services";
import Tools from "./contexts";

const to_title = (string) => {
  if (!string) return string;

  let str = "";
  string.split(" ").map((s) => {
    if (s) str += " " + s[0].toUpperCase() + s.slice(1);
  });
  return str.trim();
};

class Calculators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active_section: sections_name[0],
    };
  }

  componentDidMount = async () => {
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

    let tools_data = await get_request("tools_data");
    this.setState({ tools_data });
  };

  toggle_sidebar = () => {
    let is_on = document.getElementById("sidebar").style.display === "flex";

    document.getElementById("sidebar").style.display = is_on ? "none" : "flex";
    document.getElementById("x").style.display = is_on ? "none" : "flex";
    document.getElementById("i").style.display = is_on ? "flex" : "none";
  };

  set_active_section = (active_section, sidebar) =>
    this.setState({ active_section }, () => {
      document.title = `${to_title(
        active_section.replace(/_/g, " ")
      )} | Techmaster Tools`;
      sidebar && this.toggle_sidebar();
      window.history.pushState(null, null, active_section);
      window.sessionStorage.setItem("active_section", active_section);
    });

  render() {
    let { active_section, tools_data } = this.state;

    return !tools_data ? (
      <Loadindicator
        no_text
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "yellow",
        }}
      />
    ) : (
      <Tools.Provider value={{ data: tools_data, active_tab: active_section }}>
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
      </Tools.Provider>
    );
  }
}

export default Calculators;
