import React from "react";
// import "./libs/bootstrap.min.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const gen_random_int = (max_int, min_int = 0) =>
  min_int + Math.floor(Math.random() * max_int);

let _lalpha = "abcdefghijklmnopqrstuvwxyz",
  _ualpha = _lalpha.toUpperCase(),
  _digits = "0123456789",
  _symbols = "'~!@#$%^&*()_+{}|\":?><`[];'/.,";

class Password_generator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  get_checkbox = (id) => document.getElementById(id).checked;

  clear = () => this.setState({ password: "", copied: false });

  copy_alert = () => {
    clearTimeout(this.clear_copy);
    this.setState({ copied: true });

    this.clear_copy = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  generate = (e) => {
    e.preventDefault();

    let ualpha = this.get_checkbox("ualpha"),
      lalpha = this.get_checkbox("lalpha"),
      digits = this.get_checkbox("digits"),
      symbols = this.get_checkbox("symbols");

    if (!ualpha && !lalpha && !digits && !symbols) {
      digits = true;
      lalpha = true;
    }
    let { length } = this.state;

    let wholeset = "";

    if (lalpha) wholeset += _lalpha;
    if (ualpha) wholeset += _ualpha;
    if (digits) wholeset += _digits;
    if (symbols) wholeset += _symbols;

    let random_value = "";

    for (let i = 0; i < (length || 8); i++)
      random_value += wholeset[gen_random_int(wholeset.length)];

    this.setState({ password: random_value });
  };

  render() {
    let { password, copied } = this.state;

    return (
      <section className="section">
        <div className="top">
          <div className="text">
            <h1>Password Generator/Decryptor</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              impedit recusandae. Sed repellat in et debitis dicta quas
              blanditiis nam.
            </p>
          </div>
          <div
            className="img"
            style={{
              backgroundImage: `url(${require("../images/password.svg")})`,
            }}
          ></div>
        </div>
        <div className="content">
          <form action="" className="pass_form">
            <div className="flex">
              <select
                name=""
                id=""
                onChange={({ target }) => {
                  this.setState({ length: target.value });
                }}
                aria-valuenow="20"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option default selected value="8">
                  8
                </option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
              </select>
              <p>Password length (limit 30)</p>
            </div>
            <div className="flex">
              <label for="lalpha">
                <input type="checkbox" name="" id="lalpha" />
                <p>Lowercase letters [abcdefghijkmnpqrstuvwxyz]</p>
              </label>
            </div>
            <div className="flex">
              <label for="ualpha">
                <input type="checkbox" name="" id="ualpha" />
                <p>Uppercase letters [ABCDEFGHJKLMNPQRSTUVWXYZ]</p>
              </label>
            </div>
            <div className="flex">
              <label for="digits">
                <input type="checkbox" name="" id="digits" />
                <p>Digits [23456789]</p>
              </label>
            </div>
            <div className="flex">
              <label for="symbols">
                <input type="checkbox" name="" id="symbols" />
                <p>Symbols [!#$%&()*+-=?[]{}|~@^_]</p>
              </label>
            </div>

            <span className="fl">
              <button onClick={this.generate} type="submit">
                Generate
              </button>
              <a href="#" className="cancel" onClick={this.clear}>
                Clear <i className="material-icons-outlined">close</i>
              </a>
            </span>

            {password ? (
              <>
                <hr />
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: 10,
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>Your Password:</div>

                  <CopyToClipboard text={password} onCopy={this.copy_alert}>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        verticalAlign: "center",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: 22 }}>
                        &nbsp;&nbsp;{`${password}`} &nbsp;
                      </span>

                      <span>
                        <i
                          style={{ color: "rgb(30, 144, 255, 0.8)" }}
                          className="material-icons-outlined"
                        >
                          copy
                        </i>
                      </span>
                    </div>
                  </CopyToClipboard>

                  {copied ? (
                    <div className="alert alert-info" role="alert">
                      Password copied to clipboard!
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </form>

          <div className="text">
            <p className="title">About passwords</p>
            <p className="sub_txt" id="exp_txt">
              Password - a secret series of characters that enables a user to
              access a file, computer, program or something secured with secret
              code. Remember! The easier a password is for the owner to remember
              generally means it will be easier for an attacker to guess. The
              strength of a password depends on the different types of
              characters, the overall length of the password, and whether the
              password can be found in a dictionary. To avoid brute force attack
              (crack passwords by trying as many possibilities as time and money
              permit) or more efficient in most cases, dictionary attack (and
              lists of common passwords are also typically tested) use long (at
              least 12 characters or more) passwords with letters (mixed
              lowercase and uppercase), punctuation, symbols, and numbers. Don't
              use dictionary words (in any language). Words are vulnerable.
              Avoid words spelled backwards, common misspellings, and
              abbreviations. Words in all languages are vulnerable. Don't use
              sequences or repeated characters, e.g. 12345678, 222222, abcdefg,
              qwerty. Don't use personal information: your name, wife's name,
              birthday, driver's license, passport number or similar info. The
              best way to create a secure and strong password - use our Strong
              Password Generator:)
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Password_generator;
