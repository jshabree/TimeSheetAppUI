import React, { Component, useState } from "react";
import moment from "moment";
import { Card } from "antd";
import "./Details.css";

export default function Details(props) {
  const TimeSheetDetails = props.details;
  let title, totalBill, workHour, TimeOff, hourClaim, days;
  let dayArr = [];
  let week = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  console.log("TimeSheetDetails.....", TimeSheetDetails);
  if (TimeSheetDetails.employeeID !== undefined) {
    hourClaim = TimeSheetDetails.workingDetails.daySheet.map((val) => (
      <td>{val.totalHour}</td>
    ));

    TimeOff = TimeSheetDetails.workingDetails.daySheet.map((val) => (
      <td>{val.timeOffHour}</td>
    ));
    totalBill = TimeSheetDetails.workingDetails.daySheet.map((val) => (
      <td>{val.billableHours}</td>
    ));
    workHour = TimeSheetDetails.workingDetails.daySheet.map((val) => (
      <td>{val.workHours}</td>
    ));
    days = week.map((item) => <th>{item}</th>);
    title = `Timesheet Details: 
     ${
       moment(Number.parseInt(TimeSheetDetails.selectWeek))
         .startOf("week")
         .add(1, "days")

         .format("DD/MMM/YYYY")
       // .startOf("week")
       // .format("DD-MMM")
     }
      -  
    ${moment(Number.parseInt(TimeSheetDetails.selectWeek))
      .startOf("week")
      .add(7, "days")
      .format("DD/MMM/YYYY")}`;

    let dt = moment(Number.parseInt(TimeSheetDetails.selectWeek));
    let day1 = dt.startOf("week").format("DD-MMM");
    for (let i = 0; i < 7; i++) {
      dayArr.push(dt.add(1, "days").format("DD-MMM"));
    }
  }

  return (
    <div>
      {TimeSheetDetails.employeeID !== undefined ? (
        <React.Fragment>
          <Card title={title}>
            <p>
              <b>Status:</b> {TimeSheetDetails.status}
            </p>
            <p>
              <b>Total week hours: </b>
              {TimeSheetDetails.workingDetails.totalWeekHours}
            </p>
            <p>
              <b>Total week work hours: </b>
              {TimeSheetDetails.workingDetails.totalWeekWorkHours}
            </p>
            <p>
              <b>Total week billable hours: </b>
              {TimeSheetDetails.workingDetails.totalWeekBillableHours}
            </p>
            <p>
              <b>Total week time-off hours: </b>
              {TimeSheetDetails.workingDetails.totalWeekTimeOffHours}
            </p>
            <p>
              <b>Comments: </b>
              {TimeSheetDetails.workingDetails.comments === ""
                ? "None"
                : TimeSheetDetails.workingDetails.comments}
            </p>
            <table className="DisplayTable">
              <tbody>
                <tr>
                  <th />
                  {days}
                </tr>
                <tr>
                  <td>Week</td>
                  {dayArr.map((item) => (
                    <td>{item}</td>
                  ))}
                </tr>
                <tr>
                  <td>Hour claim</td>
                  {hourClaim}
                </tr>
                <tr>
                  <td>Time off</td>
                  {TimeOff}
                </tr>
                <tr>
                  <td>Total Bill</td>
                  {totalBill}
                </tr>
                <tr>
                  <td>Total hours</td>
                  {workHour}
                </tr>
              </tbody>
            </table>
          </Card>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
}
