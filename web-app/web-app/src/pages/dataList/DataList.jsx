import { useState, useEffect } from "react";
import "./dataList.css";
import { DataGrid } from "@material-ui/data-grid";
import { loadData, saveData } from "../../dataLatest";

export default function DataList() {
  // Data itu array, tapi reactive
  const [data, setData] = useState(loadData());

  useEffect(() => {
    const timerID = setTimeout(() => {
      fetch("http://localhost:8080/latest")
        .then((response) => response.json())
        .then((newData) => {
          const combinedData = data.concat(newData);
          saveData(combinedData);
          setData(combinedData);
        })
        .catch((error) => alert(error));
    }, 3000);

    return () => {
      clearTimeout(timerID);
    };
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "timestamp",
      headerName: "Timestamp",
      width: 150,
      //   editable: true,
    },
    {
      field: "suhu",
      headerName: "Suhu",
      width: 150,
      type: "number",
      //   editable: true,
    },
  ];

  return (
    <div className="dataList">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={9}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
