import "./App.css";
import React from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import IP from "./sections/ip";
import Footer from "./components/footer";

class Techmaster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="body">
        <Sidebar />
        <Header />

        <main>
          <IP />
        </main>

        <Footer />
      </div>
    );
  }
}

export default Techmaster;
