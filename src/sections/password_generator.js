import React from "react";

class Password_generator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section class="section">
        <div class="top">
          <div class="text">
            <h1>Password Generator/Decryptor</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              impedit recusandae. Sed repellat in et debitis dicta quas
              blanditiis nam.
            </p>
          </div>
          <div
            class="img"
            style={{
              backgroundImage: `url(${require("../images/password.svg")})`,
            }}
          ></div>
        </div>
        <div class="content">
          <form action="" class="pass_form">
            <div class="flex">
              <select name="" id="" aria-valuenow="20">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
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
            <div class="flex">
              <input type="checkbox" name="" id="" />
              <p>Lowercase letters [abcdefghijkmnpqrstuvwxyz]</p>
            </div>
            <div class="flex">
              <input type="checkbox" name="" id="" />
              <p>Uppercase letters [ABCDEFGHJKLMNPQRSTUVWXYZ]</p>
            </div>
            <div class="flex">
              <input type="checkbox" name="" id="" />
              <p>Digits [23456789]</p>
            </div>
            <div class="flex">
              <input type="checkbox" name="" id="" />
              <p>Symbols [!#$%&()*+-=?[]{}|~@^_]</p>
            </div>
            <div class="flex">
              <input type="checkbox" name="" id="" />
              <p>Include similar looking characters [0OoIl1]</p>
            </div>
            <div class="flex">
              <input type="checkbox" name="" id="" />
              <p>Phonetic pronunciation</p>
            </div>
            <div class="flex">
              <input type="checkbox" name="" id="" />
              <p>MD5 password encryption</p>
            </div>
            <div class="flex">
              <input type="checkbox" name="" id="" />
              <p>Cisco Type 5 password encryption</p>
            </div>

            <span class="fl">
              <button type="submit">Generate</button>
              <a href="" class="cancel">
                Clear <i class="material-icons-outlined">close</i>
              </a>
            </span>
          </form>
          <div class="text">
            <p class="title">About passwords</p>
            <p class="sub_txt" id="exp_txt">
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
