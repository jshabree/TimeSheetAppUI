import React, { useState } from "react";
import { FcCancel, FcOk } from "react-icons/fc";
import moment from "moment";
import { Menu, List, Button, Layout, Row, Col, Card, Badge } from "antd";

export default function TimesheetUser(props) {
  const [item, setItem] = useState(props.item);

  let handleApprove = (item) => {
    props.handleApproveT(item);
  };
  let handleReject = (item) => {
    props.handleRejectT(item);
  };
  return (
    <div>
      <Card className="cardView" title={item.firstName + " " + item.lastName}>
        <Row>
          <Col span={9}>
            <p>
              <b>Employee email: </b>
              {item.email}
            </p>

            <p>
              <b>Project Name: </b>
              {item.projectName}
            </p>
            <p>
              <b>Client Name: </b>
              {item.endClient}
            </p>
            <p>
              <b>Vendor name: </b>
              {item.vendorName}
            </p>
          </Col>
          <Col span={9}>
            <p>
              <b>Total week hours: </b>
              {item.workingDetails.totalWeekHours}
            </p>

            <p>
              <b>Total week work hours: </b>
              {item.workingDetails.totalWeekWorkHours}
            </p>

            <p>
              <b>Total week billable hours: </b>
              {item.workingDetails.totalWeekBillableHours}
            </p>

            <p>
              <b>Total week time-off hours: </b>
              {item.workingDetails.totalWeekTimeOffHours}
            </p>
            <p>
              <b>Comments: </b>
              {item.workingDetails.comments === ""
                ? "None"
                : item.workingDetails.comments}
            </p>
          </Col>
          <Col span={6}>
            <p>
              <b>
                {moment(Number.parseInt(item.selectWeek))
                  .startOf("week")
                  .add(1, "days")
                  .format("DD/MMM/YYYY")
                // .startOf("week")
                // .format("DD-MMM")
                }
                {"  -  "}
                {moment(Number.parseInt(item.selectWeek))
                  .startOf("week")
                  .add(7, "days")
                  .format("DD/MMM/YYYY")}
              </b>
            </p>
            {item.filedetails.map((item) => (
              <p> {item.name}</p>
            ))}
            {item.status === "submitted" ? (
              <React.Fragment>
                <FcOk
                  className="iconSize"
                  onClick={() => handleApprove(item)}
                />
                <FcCancel
                  className="iconSize"
                  onClick={() => handleReject(item)}
                />
              </React.Fragment>
            ) : item.status === "approved" ? (
              <React.Fragment>
                <img
                  src="https://img.icons8.com/offices/40/000000/approval.png"
                  alt="approved"
                  className="moveImgRight"
                />
                <p style={{ color: "#6fcc76" }}>Approved</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <img
                  src="https://img.icons8.com/office/40/000000/cancel.png"
                  alt="rejected"
                  className="moveImgRight"
                />
                <a
                  href="https://icons8.com/icon/41816/approval"
                  style={{ display: "none" }}
                >
                  Approval icon by Icons8
                </a>
                <p style={{ color: "#ce5656" }}>Rejected</p>
              </React.Fragment>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
