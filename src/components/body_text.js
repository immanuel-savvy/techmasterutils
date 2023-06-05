import React from "react";
import ReactMarkdown from "react-markdown";
import Preview_image from "./preview_image";

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
    let { title, body_text, tool, image, image_hash } = this.props;

    return (
      <div className="text sm_screen">
        <p className="title">About {tool === "contact" ? "" : title}</p>
        <div style={{ width: "100%", marginBottom: 20 }}>
          <Preview_image
            image={image || `techmasternews_1678576327445uwwqcq.jpg`}
            image_hash={image_hash}
            class_name="img rounded"
            style={{ width: "100%" }}
          />
        </div>

        <ReactMarkdown components={{ p: Ptag, a: Atag }}>
          {body_text.slice(0, this.state.expanded ? -1 : 500) +
            (expanded ? "" : body_text.length <= 500 ? "" : "...")}
        </ReactMarkdown>
        <p className="sub_txt"></p>
        {body_text.length <= 500 ? null : (
          <p
            style={{ cursor: "pointer" }}
            class="exp"
            onClick={() => this.setState({ expanded: !expanded })}
          >
            {expanded ? "Show less" : "Expand"}{" "}
            <i class="material-icons-outlined">
              {expanded ? "expand_less" : "expand_more"}
            </i>
          </p>
        )}
      </div>
    );
  }
}

export default Body_text;
export { Ptag, Atag };
