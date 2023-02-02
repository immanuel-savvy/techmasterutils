import React from "react";
import IP from "../sections/ip";
import Mac_address from "../sections/mac_address";
import Password_generator from "../sections/password_generator";
import PDF_to_word from "../sections/pdf_to_word";
import Port_finder from "../sections/port_finder";
import Student_loan_calculator from "../sections/student_loan_calculator";

const sections = new Object({
  student_loan_calculator: {
    component: <Student_loan_calculator />,
    title: "Student Loan Repayment",
  },
  pdf_to_word: { component: <PDF_to_word />, title: "PDF to Word Converter" },
  password_generator: {
    component: <Password_generator />,
    title: "Password Generator",
  },
  ip: { component: <IP />, title: "IPV4 / IPV6 Subnet Calculator" },
  mac_address: { component: <Mac_address />, title: "MAC Address Finder" },
  port_finder: { component: <Port_finder />, title: "TCP / UDP Port Finder" },
});

const sections_name = Object.keys(sections);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.sections = Object.keys(sections);

    this.state = {
      active_section: this.sections[0],
    };
  }

  render() {
    let { set_active_section, toggle_sidebar } = this.props;

    return (
      <div className="sidebar" id="sidebar">
        <div className="content">
          <nav>
            <span className="logo">
              <img src={require(`../images/o5.png`)} alt="" />
              <a href="">Techmaster Utils</a>
            </span>
            <i
              className="material-icons-outlined x"
              id="x"
              onClick={toggle_sidebar}
            >
              close
            </i>
          </nav>
          {this.sections.map((section) => {
            return (
              <a
                className="a section_selector"
                key={section}
                onClick={() => set_active_section(section, true)}
              >
                {sections[section].title}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Sidebar;
export { sections, sections_name };
