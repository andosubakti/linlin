import { useState, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import "./analytics.css";
import { loadData, saveData } from "../../dataLatest";

export default function Analytics() {
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

  return (
    <div className="analytics">
      <Chart data={data} tittle="Temperature Trends" grid dataKey="suhu" />
    </div>
  );
}
