import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

//not using this component
export default function checkedlist(props) {
  const [plainOptions, setplainOptions] = useState([]);
  const [checkedList, setcheckedList] = useState([]);
  const [indeterminate, setindeterminate] = useState(true);
  const [checkAll, setcheckAll] = useState(false);

  useEffect(() => {
    const plainOptions = props.TimesheetEmployeeList;
    const defaultCheckedList = props.TimesheetEmployeeList;
    setcheckedList(defaultCheckedList);
    setplainOptions(plainOptions);
  }, [props]);

  let onCheckAllChange = (e) => {
    setcheckedList(e.target.checked ? plainOptions : []);
    setindeterminate(false);
    setcheckAll(e.target.checked);
  };

  let onChange = (checkedListd) => {
    let changedVal = checkedListd;
    console.log("checkedList", checkedListd);
    setcheckedList(checkedListd);
    setindeterminate(
      !!checkedListd.length && checkedListd.length < plainOptions.length
    );
    setcheckAll(checkedListd.length === plainOptions.length);
    // props.checkedList(changedVal);
  };
  return (
    <div>
      <div className="site-checkbox-all-wrapper">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
      </div>
      <br />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </div>
  );
}
