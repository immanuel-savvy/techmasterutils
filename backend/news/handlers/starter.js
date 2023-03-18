import {
  ADMINSTRATORS,
  ADMIN_HASH,
  GLOBALS,
  TOOLS,
  USERS,
  USERS_HASH,
} from "../conn";

let default_admin = "adminstrators~techmastertools~1234567890123",
  default_user = "users~techmastertools~1234567890123";

const create_default_admin = () => {
  if (!ADMINSTRATORS.readone(default_admin)) {
    ADMINSTRATORS.write({
      firstname: "Techmaster",
      lastname: "News",
      image: "techmasternews_admin_photo.jpg",
      email: "admin@techmastertools.net",
      _id: default_admin,
    });
    ADMIN_HASH.write({ admin: default_admin, key: "adminstrator#1" });
  }

  if (!USERS.readone(default_user)) {
    USERS.write({
      _id: default_user,
      firstname: "Techmaster",
      lastname: "News",
      verified: true,
      email: "news@techmastertools.net",
    });
    USERS_HASH.write({ user: default_user, key: "adminstrator#1" });
  }

  !GLOBALS.readone({ global: "rss_query" }) &&
    GLOBALS.write({ global: "rss_query", query: "technology" });

  let tools_data = new Object({
    port_finder: {
      body_text: `TCP port uses the Transmission Control Protocol. TCP is one of the
        main protocols in TCP/IP networks. TCP is a connection-oriented
        protocol, it requires handshaking to set up end-to-end
        communications. Only when a connection is set up user's data can
        be sent bi-directionally over the connection. Attention! TCP
        guarantees delivery of data packets in the same order in which
        they were sent. Guaranteed communication over TCP port is the main
        difference between TCP and UDP. UDP port would not have guaranteed
        communication as TCP. UDP provides an unreliable service and
        datagrams may arrive duplicated, out of order, or missing without
        notice. UDP thinks that error checking and correction is not
        necessary or performed in the application, avoiding the overhead
        of such processing at the network interface level. UDP (User
        Datagram Protocol) is a minimal message-oriented Transport Layer
        protocol (protocol is documented in IETF RFC 768). Application
        examples that often use UDP: voice over IP (VoIP), streaming media
        and real-time multiplayer games. Many web applications use UDP,
        e.g. the Domain Name System (DNS), the Routing Information
        Protocol (RIP), the Dynamic Host Configuration Protocol (DHCP),
        the Simple Network Management Protocol (SNMP). TCP vs UDP - TCP:
        reliable, ordered, heavyweight, streaming; UDP - unreliable, not
        ordered, lightweight, datagrams.Your IP addressYour are from
        Switzerland146.70.99.199`,
      sub_text: `Internet free online TCP UDP ports lookup and search. Enter port
        number or service name and get all info about current udp tcp port
        or ports.`,
      title: "TCP/UDP Port Finder",
    },
    student_loan_calculator: {
      body_text: ` A student loan is a type of loan designed to help students
      pay for post-secondary education and the associated fees,
      such as tuition, books and supplies, and living expenses. It
      may differ from other types of loans in the fact that the
      interest rate may be substantially lower and the repayment
      schedule may be deferred while the student is still in
      school. It also differs in many countries in the strict laws
      regulating renegotiating and bankruptcy.`,
      sub_text: `This student loan repayment calculator shows your repayments
      based on your current salary and your student loan's
      repayment threshold.`,
      title: "Student Loan Repayment Calculator",
    },
    password_generator: {
      body_text: `Password - a secret series of characters that enables a user to
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
      Password Generator:)`,
      sub_text: `Techmaster Utils password generator creates random passwords based
      on parameters set by you. Parameters include password length,
      character combination et cetera.`,
      title: "Password Generator/Decryptor",
    },
    ip: {
      body_text: `Enter IP address and netmask (decimal separated by dots (e.g.
        255.255.255.0), CIDR (e.g. 29) and the IPv4 subnet calculator will
        calculate the broadcast, network, Cisco wildcard mask, host range
        and quantity of hosts. Online and for free. The wildcard is the
        inverse netmask used for access control lists (ACL's) in Cisco
        routers. This free online IPv4 subnet calculator also can be used
        as a teaching tool and presents the subnetting results as
        easy-to-understand binary values. We can see two things: all host
        bits are zeroes in a network address, in a broadcast address they
        are all set. First bits determine the class of your network from A
        to E. A, B and C are commonly used. Each class has a range of
        valid IP addresses. Address Range of Class A - 1.0.0.1 to
        126.255.255.254 (supports 16 million hosts on each of 127
        networks). Class B - 128.1.0.1 to 191.255.255.254 (65,000 hosts on
        each of 16,000 networks). Class C - 192.0.1.1 to 223.255.254.254
        (254 hosts on each of 2 million networks). Class D - 224.0.0.0 to
        239.255.255.255 (address range reserved for multicast groups).
        Class E - 240.0.0.0 to 254.255.255.254 (reserved for future use,
        research and development purposes).Your IP addressYour are from
        Switzerland146.70.99.240`,
      sub_text: `Subnet calculator performs network calculations using IP address.
      Mask bits, determines the resulting broadcast address, subnet, and
      more.`,
      title: "IPv4 / IPv6 Subnet Calculator",
    },
    mac_address: {
      body_text: `MAC address - Media Access Control address. MAC addresses -
      hardware addresses that uniquely identifies each node of a
      network. It is assigned by the vendor or manufacturer and saved to
      the device memory. According to the OSI model it is a second-level
      address. In IEEE 802 networks Data Link Control (DLC) layer is
      divided into two sub-layers: the Logical Link Control (LLC) layer
      and the Media Access Control (MAC) layer. First 3 bytes (or 24
      bits) of MAC addresses are known as the Organizationally Unique
      Identifier (OUI) and usually encodes the manufacturer. MAC
      addresses usually are written in the six groups of two hexadecimal
      digits separated by colons (:) or hyphens (-), e.g.
      e8:04:62:90:07:62, 00-1E-37-18-50 DB. It is also used in another
      form (e.g. vendor Cisco) - the three groups of four hexadecimal
      digits separated by dots (.), e.g. 0016.4d2e.7d10. How you can
      identify MAC address and check MAC adress? Windows(XP,7,Vista,8):
      In the command prompt (CMD), type in getmac (or getmac /v /fo list
      for full info). Linux/Unix: type ifconfig -a. You must be root
      user or have appropriate permissions. Mac OS X: launch the
      Terminal and type ifconfig. Cisco: in the CLI type e.g. show arp.`,
      sub_text: `MAC Address lookup tool finds your computer ethernet card
      manufacturer or vendor name.`,
      title: "MAC Address Finder",
    },
  });

  if (!TOOLS.readone()) {
    let tools = Array.from(Object.keys(tools_data));
    tools.map((tool) => TOOLS.write({ ...tools_data[tool], tool }));
  }
};

export { create_default_admin, default_admin };
