import "./featuredInfo.css";
import ReqsuhuMax from "../../components/reqsuhuMax/ReqsuhuMax";
import ReqsuhuMin from "../../components/reqsuhuMin/ReqsuhuMin";
import ReqsuhuLatest from "../../components/reqsuhuLatest/ReqsuhuLatest";

export default function featuredInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTittle">Real-time Temp</span>
        <ReqsuhuLatest />
      </div>
      <div className="featuredItem">
        <span className="featuredTittle">Temperature Minimum</span>
        <ReqsuhuMin />
      </div>
      <div className="featuredItem">
        <span className="featuredTittle">Temperature Maximum</span>
        <ReqsuhuMax />
      </div>
    </div>
  );
}
