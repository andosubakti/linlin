import "./reqsuhuMin.css";
import { useState, useEffect } from "react";

export default function ReqsuhuMin() {
  const [flipflop, setFlipflop] = useState(false);
  const [suhuMin, setSuhuMin] = useState(0);

  useEffect(() => {
    const timerID = setTimeout(() => {
      fetch("http://localhost:8080/min")
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const dataTerakhir = data[data.length - 1];
            if (suhuMin < dataTerakhir.suhumin) {
              setSuhuMin(dataTerakhir.suhumin);
            } else {
              setFlipflop(!flipflop);
            }
          } else {
            setFlipflop(!flipflop);
          }
        });
    }, 3000);

    return () => {
      clearTimeout(timerID);
    };
  }, [suhuMin, flipflop]);

  return (
    <div className="reqsuhuMin">
      <span className="featuredSuhuLatestMin">{suhuMin}</span>{" "}
      <p className="DerajatMin">°C</p>
    </div>
  );
}
