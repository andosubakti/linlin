import "./reqsuhuLatest.css";
import { useState, useEffect } from "react";

export default function ReqsuhuLatest() {
  const [flipflop, setFlipflop] = useState(false);
  const [suhuLatest, setSuhuLatest] = useState(0);

  useEffect(() => {
    const timerID = setTimeout(() => {
      fetch("http://localhost:8080/latest")
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const dataTerakhir = data[data.length - 1];
            setSuhuLatest(dataTerakhir.suhu);
          } else {
            setFlipflop(!flipflop);
          }
        });
    }, 3000);

    return () => {
      clearTimeout(timerID);
    };
  }, [suhuLatest, flipflop]);

  return (
    <div className="reqsuhuLatest">
      <span className="featuredSuhuLatest">{suhuLatest}</span>{" "}
      <p className="Derajat">°C</p>
    </div>
  );
}
