"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default_admin = exports.create_default_admin = void 0;
var _conn = require("../conn");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var default_admin = "adminstrators~techmastertools~1234567890123",
  default_user = "users~techmastertools~1234567890123";
exports.default_admin = default_admin;
var create_default_admin = function create_default_admin() {
  if (!_conn.ADMINSTRATORS.readone(default_admin)) {
    _conn.ADMINSTRATORS.write({
      firstname: "Techmaster",
      lastname: "News",
      image: "techmasternews_admin_photo.jpg",
      email: "admin@techmastertools.net",
      _id: default_admin
    });
    _conn.ADMIN_HASH.write({
      admin: default_admin,
      key: "adminstrator#1"
    });
  }
  if (!_conn.USERS.readone(default_user)) {
    _conn.USERS.write({
      _id: default_user,
      firstname: "Techmaster",
      lastname: "News",
      verified: true,
      email: "news@techmastertools.net"
    });
    _conn.USERS_HASH.write({
      user: default_user,
      key: "adminstrator#1"
    });
  }
  !_conn.GLOBALS.readone({
    global: "rss_query"
  }) && _conn.GLOBALS.write({
    global: "rss_query",
    query: "technology"
  });
  var tools_data = new Object({
    port_finder: {
      body_text: "TCP port uses the Transmission Control Protocol. TCP is one of the\n        main protocols in TCP/IP networks. TCP is a connection-oriented\n        protocol, it requires handshaking to set up end-to-end\n        communications. Only when a connection is set up user's data can\n        be sent bi-directionally over the connection. Attention! TCP\n        guarantees delivery of data packets in the same order in which\n        they were sent. Guaranteed communication over TCP port is the main\n        difference between TCP and UDP. UDP port would not have guaranteed\n        communication as TCP. UDP provides an unreliable service and\n        datagrams may arrive duplicated, out of order, or missing without\n        notice. UDP thinks that error checking and correction is not\n        necessary or performed in the application, avoiding the overhead\n        of such processing at the network interface level. UDP (User\n        Datagram Protocol) is a minimal message-oriented Transport Layer\n        protocol (protocol is documented in IETF RFC 768). Application\n        examples that often use UDP: voice over IP (VoIP), streaming media\n        and real-time multiplayer games. Many web applications use UDP,\n        e.g. the Domain Name System (DNS), the Routing Information\n        Protocol (RIP), the Dynamic Host Configuration Protocol (DHCP),\n        the Simple Network Management Protocol (SNMP). TCP vs UDP - TCP:\n        reliable, ordered, heavyweight, streaming; UDP - unreliable, not\n        ordered, lightweight, datagrams.Your IP addressYour are from\n        Switzerland146.70.99.199",
      sub_text: "Internet free online TCP UDP ports lookup and search. Enter port\n        number or service name and get all info about current udp tcp port\n        or ports.",
      title: "TCP/UDP Port Finder"
    },
    student_loan_calculator: {
      body_text: " A student loan is a type of loan designed to help students\n      pay for post-secondary education and the associated fees,\n      such as tuition, books and supplies, and living expenses. It\n      may differ from other types of loans in the fact that the\n      interest rate may be substantially lower and the repayment\n      schedule may be deferred while the student is still in\n      school. It also differs in many countries in the strict laws\n      regulating renegotiating and bankruptcy.",
      sub_text: "This student loan repayment calculator shows your repayments\n      based on your current salary and your student loan's\n      repayment threshold.",
      title: "Student Loan Repayment Calculator"
    },
    password_generator: {
      body_text: "Password - a secret series of characters that enables a user to\n      access a file, computer, program or something secured with secret\n      code. Remember! The easier a password is for the owner to remember\n      generally means it will be easier for an attacker to guess. The\n      strength of a password depends on the different types of\n      characters, the overall length of the password, and whether the\n      password can be found in a dictionary. To avoid brute force attack\n      (crack passwords by trying as many possibilities as time and money\n      permit) or more efficient in most cases, dictionary attack (and\n      lists of common passwords are also typically tested) use long (at\n      least 12 characters or more) passwords with letters (mixed\n      lowercase and uppercase), punctuation, symbols, and numbers. Don't\n      use dictionary words (in any language). Words are vulnerable.\n      Avoid words spelled backwards, common misspellings, and\n      abbreviations. Words in all languages are vulnerable. Don't use\n      sequences or repeated characters, e.g. 12345678, 222222, abcdefg,\n      qwerty. Don't use personal information: your name, wife's name,\n      birthday, driver's license, passport number or similar info. The\n      best way to create a secure and strong password - use our Strong\n      Password Generator:)",
      sub_text: "Techmaster Utils password generator creates random passwords based\n      on parameters set by you. Parameters include password length,\n      character combination et cetera.",
      title: "Password Generator/Decryptor"
    },
    ip: {
      body_text: "Enter IP address and netmask (decimal separated by dots (e.g.\n        255.255.255.0), CIDR (e.g. 29) and the IPv4 subnet calculator will\n        calculate the broadcast, network, Cisco wildcard mask, host range\n        and quantity of hosts. Online and for free. The wildcard is the\n        inverse netmask used for access control lists (ACL's) in Cisco\n        routers. This free online IPv4 subnet calculator also can be used\n        as a teaching tool and presents the subnetting results as\n        easy-to-understand binary values. We can see two things: all host\n        bits are zeroes in a network address, in a broadcast address they\n        are all set. First bits determine the class of your network from A\n        to E. A, B and C are commonly used. Each class has a range of\n        valid IP addresses. Address Range of Class A - 1.0.0.1 to\n        126.255.255.254 (supports 16 million hosts on each of 127\n        networks). Class B - 128.1.0.1 to 191.255.255.254 (65,000 hosts on\n        each of 16,000 networks). Class C - 192.0.1.1 to 223.255.254.254\n        (254 hosts on each of 2 million networks). Class D - 224.0.0.0 to\n        239.255.255.255 (address range reserved for multicast groups).\n        Class E - 240.0.0.0 to 254.255.255.254 (reserved for future use,\n        research and development purposes).Your IP addressYour are from\n        Switzerland146.70.99.240",
      sub_text: "Subnet calculator performs network calculations using IP address.\n      Mask bits, determines the resulting broadcast address, subnet, and\n      more.",
      title: "IPv4 / IPv6 Subnet Calculator"
    },
    mac_address: {
      body_text: "MAC address - Media Access Control address. MAC addresses -\n      hardware addresses that uniquely identifies each node of a\n      network. It is assigned by the vendor or manufacturer and saved to\n      the device memory. According to the OSI model it is a second-level\n      address. In IEEE 802 networks Data Link Control (DLC) layer is\n      divided into two sub-layers: the Logical Link Control (LLC) layer\n      and the Media Access Control (MAC) layer. First 3 bytes (or 24\n      bits) of MAC addresses are known as the Organizationally Unique\n      Identifier (OUI) and usually encodes the manufacturer. MAC\n      addresses usually are written in the six groups of two hexadecimal\n      digits separated by colons (:) or hyphens (-), e.g.\n      e8:04:62:90:07:62, 00-1E-37-18-50 DB. It is also used in another\n      form (e.g. vendor Cisco) - the three groups of four hexadecimal\n      digits separated by dots (.), e.g. 0016.4d2e.7d10. How you can\n      identify MAC address and check MAC adress? Windows(XP,7,Vista,8):\n      In the command prompt (CMD), type in getmac (or getmac /v /fo list\n      for full info). Linux/Unix: type ifconfig -a. You must be root\n      user or have appropriate permissions. Mac OS X: launch the\n      Terminal and type ifconfig. Cisco: in the CLI type e.g. show arp.",
      sub_text: "MAC Address lookup tool finds your computer ethernet card\n      manufacturer or vendor name.",
      title: "MAC Address Finder"
    },
    contact: {
      body_text: "Dolor fugiat qui duis ea Lorem excepteur eiusmod. Reprehenderit dolor labore consequat laborum minim sint minim non Lorem velit cillum velit magna. Minim id commodo elit commodo non. Enim consectetur commodo eiusmod nulla nisi anim proident esse id et consectetur elit fugiat.",
      sub_text: "Fill out your information and an TechMaster Tools representative will reach out to you. Have a simple question?",
      title: "Contact Us"
    }
  });
  if (!_conn.TOOLS.readone()) {
    var tools = Array.from(Object.keys(tools_data));
    tools.map(function (tool) {
      return _conn.TOOLS.write(_objectSpread(_objectSpread({}, tools_data[tool]), {}, {
        tool: tool
      }));
    });
  }
};
exports.create_default_admin = create_default_admin;