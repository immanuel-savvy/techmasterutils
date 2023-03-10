import React from "react";
import "../libs/vendors/themify-icons/css/themify-icons.css";
import "../libs/css/news.css";

import News_nav from "../components/news_nav";
import News_nav_2 from "../components/news_nav_2";

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <News_nav />
        <News_nav_2 />
      </>
    );
  }
}

export default News;
