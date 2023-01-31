import React from "react";
import { Row, Table } from "react-bootstrap";

class Student_loan_calculator extends React.Component {
  constructor(props) {
    super(props);

    let years = new Array(),
      this_year = new Date().getFullYear();
    for (let i = 1; i < 15; i++) years.push(this_year - i);

    this.state = {
      loan_amount: "50000",
      annual_income: "24000",
      annual_increment: "2.5",
      loan_interest: "1.25",
      years,
      loan_type: "1",
    };
  }

  componentDidMount = () => {
    this.calculate();
  };

  sort_columns = new Array(
    "#",
    "year",
    "salary",
    "debt",
    "int._rate (%)",
    "monthly_payment",
    "paid_this_year",
    "interest_this_year",
    "total_paid",
    "total_interest"
  );

  loan_types = {
    1: { threshold: 20195, duration: 24 },
    2: { threshold: 27295, duration: 25 },
    3: { threshold: 25375, duration: 30 },
  };

  calculate = (e) => {
    e && e.preventDefault();

    let {
      loan_amount,
      loan_type,
      annual_income,
      year,
      annual_increment,
      loan_interest,
    } = this.state;

    loan_amount = Number(loan_amount);
    annual_income = Number(annual_income);
    annual_increment = Number(annual_increment);
    loan_interest = Number(loan_interest);

    let this_year = new Date().getFullYear();
    year = Number(year) || this_year;

    let loan_type_ = this.loan_types[loan_type];
    let threshold = loan_type_.threshold,
      duration = loan_type_.duration;

    annual_increment /= 100;
    loan_interest /= 100;

    let repayment_percentage = 9 / 100;

    let initial_repayment = {
      debt: loan_amount,
      salary: annual_income,
      year: this_year,
    };

    if (annual_income < threshold) initial_repayment.paid_this_year = 0;
    else
      initial_repayment.paid_this_year = Math.floor(
        (annual_income - threshold) * repayment_percentage
      );

    initial_repayment.total_paid = initial_repayment.paid_this_year;
    initial_repayment.interest_this_year = Math.floor(
      loan_amount * loan_interest
    );
    initial_repayment.total_interest = initial_repayment.interest_this_year;

    initial_repayment.monthly_payment = (
      initial_repayment.paid_this_year / 12
    ).toFixed(2);

    let result = new Array(initial_repayment);

    for (let y = year; y < year + duration - 1; y++) {
      if (y < this_year) continue;

      let repayment = new Object();
      let prior_repayment = result.slice(-1)[0];

      repayment.debt =
        prior_repayment.debt -
        prior_repayment.paid_this_year +
        prior_repayment.interest_this_year;
      repayment.year = prior_repayment.year + 1;
      repayment.salary = Math.floor(
        prior_repayment.salary * annual_increment + prior_repayment.salary
      );

      if (repayment.salary < threshold) repayment.paid_this_year = 0;
      else
        repayment.paid_this_year = Math.floor(
          (repayment.salary - threshold) * repayment_percentage
        );

      repayment.total_paid =
        prior_repayment.total_paid + repayment.paid_this_year;
      repayment.interest_this_year = Math.floor(repayment.debt * loan_interest);
      repayment.total_interest =
        prior_repayment.total_interest + repayment.interest_this_year;

      repayment.monthly_payment = (repayment.paid_this_year / 12).toFixed(2);
      result.push(repayment);
    }

    this.setState(
      { result },
      () => e && window.scrollTo({ top: 600, behavior: "smooth" })
    );
  };

  clear = (e) => {
    e.preventDefault();

    this.setState({ result: new Array() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    let {
      loan_amount,
      annual_income,
      result,
      annual_increment,
      loan_interest,
      years,
    } = this.state;

    let headers;
    if (result && result.length) {
      headers = new Array("#", ...Object.keys(result[0]));
      headers.push("int._rate (%)");

      headers = headers.sort(
        (h1, h2) =>
          this.sort_columns.indexOf(h1) - this.sort_columns.indexOf(h2)
      );
    }
    return (
      <section className="section">
        <div className="top">
          <div className="text">
            <h1>Student Loan Calculator</h1>
            <p>
              This student loan repayment calculator shows your repayments based
              on your current salary and your student loan's repayment
              threshold.
            </p>
          </div>
          <div
            className="img"
            style={{ backgroundImage: `url(${require("../images/plug.svg")})` }}
          ></div>
        </div>
        <div className="content">
          <form action="">
            <label for="port number">Loan Amount:</label>
            <input
              type="number"
              name=""
              value={loan_amount}
              placeholder=""
              onChange={({ target }) =>
                this.setState({ loan_amount: target.value })
              }
            />
            <label for="port number">Annual Income:</label>
            <input
              type="number"
              name=""
              value={annual_income}
              placeholder=""
              onChange={({ target }) =>
                this.setState({ annual_income: target.value })
              }
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 5, width: "100%" }}>
                <label for="port number">Annual % Increment:</label>
                <input
                  type="number"
                  name=""
                  value={annual_increment}
                  placeholder=""
                  onChange={({ target }) =>
                    this.setState({ annual_increment: target.value })
                  }
                />
              </span>
              <span style={{ marginLeft: 5, width: "100%" }}>
                <label for="port number">Loan Interest Rate (%):</label>
                <input
                  type="number"
                  name=""
                  value={loan_interest}
                  placeholder=""
                  onChange={({ target }) =>
                    this.setState({ loan_interest: target.value })
                  }
                />
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: 5, width: "100%" }}>
                <label for="port number">Loan Type:</label>
                <div className="flex">
                  <select
                    onChange={({ target }) => {
                      this.setState({ loan_type: target.value });
                    }}
                    aria-valuenow="20"
                  >
                    <option value="1">Type 1</option>
                    <option value="2">Type 2</option>
                    <option value="3">Scotish Loan</option>
                  </select>
                </div>
              </span>
              <span style={{ marginLeft: 5, width: "100%" }}>
                <label for="port number">Year of graduation:</label>

                <select
                  onChange={({ target }) => {
                    this.setState({ year: Number(target.value) });
                  }}
                  aria-valuenow="20"
                >
                  {years.map((year) => (
                    <option value={`${year}`}>{year}</option>
                  ))}
                </select>
              </span>
            </div>

            <br />

            <span className="fl">
              <button onClick={this.calculate}>Calculate</button>
              <a href="#" className="cancel" onClick={this.clear}>
                Clear <i className="material-icons-outlined">close</i>
              </a>
            </span>
          </form>
          <div className="text sm_screen">
            <p className="title">About Student Loan Calculator</p>
            <p className="sub_txt" id="exp_txt">
              A student loan is a type of loan designed to help students pay for
              post-secondary education and the associated fees, such as tuition,
              books and supplies, and living expenses. It may differ from other
              types of loans in the fact that the interest rate may be
              substantially lower and the repayment schedule may be deferred
              while the student is still in school. It also differs in many
              countries in the strict laws regulating renegotiating and
              bankruptcy.
            </p>
          </div>
        </div>

        {!result ? null : (
          <div
            className="content"
            id="result"
            style={{
              marginTop: 24,
              justifyContent: "center",
              overflow: "scroll",
            }}
          >
            {result.length ? (
              <Table
                style={{ width: "100%", textAlign: "center" }}
                className="result_table"
                striped
                bordered
                hover
                responsive
              >
                <thead>
                  <tr>
                    {headers.map((header) => (
                      <th key={header}>{header.replace(/_/g, " ")}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {result.map((res, index) => (
                    <tr key={index}>
                      {headers.map((header) => (
                        <td key={header}>
                          {!new Array("year", "int._rate (%)", "#").includes(
                            header
                          ) ? (
                            <span>&pound;</span>
                          ) : (
                            <></>
                          )}
                          {header === "int._rate (%)"
                            ? loan_interest
                            : header === "#"
                            ? index + 1
                            : `${res[header]}`}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <></>
            )}
          </div>
        )}
      </section>
    );
  }
}

export default Student_loan_calculator;
