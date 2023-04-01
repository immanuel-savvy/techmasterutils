import React from "react";
import ReactMarkdown from "react-markdown";

const Ptag = ({ children }) => {
  return <p className="sub_txt">{children}</p>;
};

const Atag = ({ children, href }) => {
  return (
    <a
      target="_blank"
      href={href}
      style={{
        color: "#111",
        textDecoration: "underline",
      }}
    >
      {children}
    </a>
  );
};

class Body_text extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { expanded } = this.state;
    let { title, body_text, tool } = this.props;

    return (
      <div className="text sm_screen">
        <p className="title">About {tool === "contact" ? "" : title}</p>
        <ReactMarkdown components={{ p: Ptag, a: Atag }}>
          {body_text.slice(0, this.state.expanded ? -1 : 500) +
            (expanded ? "" : "...")}
        </ReactMarkdown>
        <p className="sub_txt"></p>
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
export { Ptag, Atag };
