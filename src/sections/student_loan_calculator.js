import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Bar_chart from "../components/bar_chart";
import Line_chart from "../components/line_chart";
import Pie_chart from "../components/pie_chart";

class Student_loan_calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loan_amount: "50000",
      annual_income: "24000",
      annual_increment: "0",
      loan_interest: "1.25",
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
    "monthly_repayment",
    "annual_repayment",
    "interest_this_year",
    "total_paid",
    "total_interest"
  );

  loan_types = {
    1: { threshold: 20195, duration: 24 },
    2: { threshold: 27295, duration: 25 },
    3: { threshold: 25375, duration: 30 },
    4: { threshold: 21000, duration: 30, interest: 6 },
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

    let repayment_percentage = (loan_type_.interest || 9) / 100;

    let initial_repayment = {
      debt: loan_amount,
      salary: annual_income,
      year: this_year,
    };

    if (annual_income < threshold) initial_repayment.annual_repayment = 0;
    else
      initial_repayment.annual_repayment = Math.floor(
        (annual_income - threshold) * repayment_percentage
      );

    initial_repayment.total_paid = initial_repayment.annual_repayment;
    initial_repayment.interest_this_year = Math.floor(
      loan_amount * loan_interest
    );
    initial_repayment.total_interest = initial_repayment.interest_this_year;

    initial_repayment.monthly_repayment = (
      initial_repayment.annual_repayment / 12
    ).toFixed(2);

    let result = new Array(initial_repayment),
      should_break;

    for (let y = year; y < year + duration - 1; y++) {
      if (y < this_year) continue;

      let repayment = new Object();
      let prior_repayment = result.slice(-1)[0];

      repayment.debt =
        prior_repayment.debt -
        prior_repayment.annual_repayment +
        prior_repayment.interest_this_year;
      repayment.year = prior_repayment.year + 1;
      repayment.salary = Math.floor(
        prior_repayment.salary * annual_increment + prior_repayment.salary
      );

      if (repayment.salary < threshold) repayment.annual_repayment = 0;
      else
        repayment.annual_repayment = Math.floor(
          (repayment.salary - threshold) * repayment_percentage
        );

      repayment.total_paid =
        prior_repayment.total_paid + repayment.annual_repayment;
      repayment.interest_this_year = Math.floor(repayment.debt * loan_interest);
      repayment.total_interest =
        prior_repayment.total_interest + repayment.interest_this_year;

      if (repayment.annual_repayment >= repayment.debt) {
        repayment.annual_repayment = repayment.debt;
        should_break = true;
      }

      repayment.monthly_repayment = (repayment.annual_repayment / 12).toFixed(
        2
      );

      result.push(repayment);

      if (should_break) break;
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

  popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Loan Interest</Popover.Header>
      <Popover.Body>
        To find the current interest rate you’ve been charged, log-on to your
        government student loan account where you can view it along with your
        remaining loan balance.
      </Popover.Body>
    </Popover>
  );

  render() {
    let {
      loan_amount,
      annual_income,
      result,
      annual_increment,
      loan_interest,
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
            <h1>Student Loan Repayment Calculator</h1>
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
                <label for="port number">Annual pay rise:</label>
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
                <label for="port number">
                  Loan Interest Rate (%):{" "}
                  <OverlayTrigger placement="right" overlay={this.popover}>
                    <i
                      onMouseOver={() => {}}
                      className="material-icons-outlined"
                    >
                      info
                    </i>
                  </OverlayTrigger>
                </label>
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
                  <div className="select">
                    <select
                      onChange={({ target }) => {
                        this.setState({ loan_type: target.value });
                      }}
                      aria-valuenow="20"
                    >
                      <option value="1">
                        Plan 1 (England & Wales Pre 2012+)
                      </option>
                      <option value="2">Plan 2 (England & Wales 2012+)</option>
                      <option value="4">Postgraduate Loan</option>
                      <option value="3">Plan 4 (Scottish students)</option>
                    </select>
                  </div>
                </div>
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
            <p className="title">About Student Loan Repayment Calculator</p>
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
                      <th key={header}>{header.replace(/_/g, " ")} </th>
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
        {result && result.length ? (
          <Container style={{ marginTop: 40, marginBottom: 40 }}>
            <Row style={{ textAlign: "center" }}>
              <Col md={4} sm={12} lg={3}>
                <Pie_chart
                  title="Repayment - Debt (written-off) Chart"
                  data={{
                    labels: ["Repayments", "Debts"],
                    datasets: [
                      {
                        label: "Amount",
                        data: [
                          result.slice(-1)[0].total_paid,
                          result.slice(-1)[0].debt,
                        ],
                        backgroundColor: [
                          "rgba(54, 162, 235, 0.2)",
                          "rgba(255, 99, 132, 0.2)",
                        ],
                        borderColor: [
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 99, 132, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </Col>
              <Col md={8} sm={12} lg={6}>
                <Line_chart
                  title="Annual Repayment / Interest Growth"
                  data={{
                    labels: result.map((res) => res.year),
                    datasets: [
                      {
                        label: "Annual Repayment",
                        data: result.map((res) => res.annual_repayment),
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                      },
                      {
                        label: "Annual Interest",
                        data: result.map((res) => res.interest_this_year),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                    ],
                  }}
                />
              </Col>
              <Col>
                <Bar_chart
                  title="Salary / Debt growth trend"
                  data={{
                    labels: result.map((res) => res.year),
                    datasets: [
                      {
                        label: "Salary",
                        data: result.map((res) => res.salary),
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                      },
                      {
                        label: "Debt",
                        data: result.map((res) => res.debt),
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                    ],
                  }}
                />
              </Col>
            </Row>
          </Container>
        ) : null}

        <div className="content">
          <p className="mt-4" style={{ textAlign: "justify", fontSize: 14 }}>
            <span
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              Disclaimer:
            </span>{" "}
            Please be advised that this tool should not be considered financial
            advice. The results generated by this tool are not a substitute for
            conducting your research and consulting official sources, such as
            the UK Government website. Keep in mind that this tool makes certain
            assumptions and the results may not be completely accurate. The
            assumptions made by the tool may become outdated if government
            policies change. This tool is not guaranteed to be perfect and its
            use is at your own risk. We cannot be held responsible for any
            negative consequences that may occur. To learn more about UK student
            loans, please visit
            <a
              href="https://www.gov.uk/repaying-your-student-loan"
              target="_blank"
            >
              {" "}
              https://www.gov.uk/repaying-your-student-loan
            </a>
            .
          </p>
        </div>
      </section>
    );
  }
}

export default Student_loan_calculator;
