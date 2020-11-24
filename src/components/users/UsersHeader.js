import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { selectUser, removeStatusReducer } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import db from "../../firebase";

function UsersHeader() {
  const [csvData, setCsvData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const csvData = db.collection("users").onSnapshot((snapshot) => {
      setCsvData(snapshot.docs?.map((doc) => doc.data()));
    });
    return csvData;
  }, []);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const user = useSelector(selectUser);
  const fileName =
    user.userInfo?.first_name + " " + new Date().toLocaleDateString();

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const removeButton = () => {
    dispatch(removeStatusReducer(true));
  };

  return (
    <div className="usersHeader">
      <h2 className="usersHeader__title">Users</h2>
      <div className="usersHeader__links">
        <Link to="/users/add-new-user">
          <button className="users__button">New</button>
        </Link>

        <button className="users__button" onClick={removeButton}>
          Remove
        </button>

        <button
          className="users__button users__buttonExcel"
          onClick={(e) => {
            exportToCSV(csvData, fileName);
            dispatch(removeStatusReducer(false));
          }}
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
}

export default UsersHeader;
