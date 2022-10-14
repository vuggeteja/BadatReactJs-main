import React from "react";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import "../AppAsset/CSS/NoDataFound.css";

const NoDataFound = ({ content = "No Data Found" }) => {
  return (
    <div className="NoDataFoundContainer">
      <div className="NoDataFoundIcon">
        <SentimentVeryDissatisfiedIcon
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div className="NoDataFoundContent">{content}</div>
    </div>
  );
};

export default NoDataFound;
