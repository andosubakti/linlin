import { useState, useEffect } from "react";
import "./reqsuhuMax.css";

export default function ReqsuhuMax() {
  const [flipflop, setFlipflop] = useState(false);
  const [suhuMax, setSuhuMax] = useState(0);

  useEffect(() => {
    const timerID = setTimeout(() => {
      fetch("http://localhost:8080/max")
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const dataTerakhir = data[data.length - 1];
            if (suhuMax < dataTerakhir.suhumax) {
              setSuhuMax(dataTerakhir.suhumax);
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
  }, [suhuMax, flipflop]);

  return (
    <div className="reqsuhuMax">
      <span className="featuredSuhuLatestMax">{suhuMax}</span>{" "}
      <p className="DerajatMax">°C</p>
    </div>
  );
}
