import React from "react";

class Body_text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { expanded } = this.state;
    let { title, body_text } = this.props;

    return (
      <div className="text sm_screen">
        <p className="title">About {title}</p>
        <p className="sub_txt">
          {body_text.slice(0, this.state.expanded ? -1 : 500)}
          {expanded ? "" : "..."}
        </p>
        <p
          style={{ cursor: "pointer" }}
          class="exp"
          onClick={() => this.setState({ expanded: !expanded })}
        >
          {expanded ? "Show less" : "Expand"}{" "}
          <i class="material-icons-outlined">expand_more</i>
        </p>
      </div>
    );
  }
}

export default Body_text;
