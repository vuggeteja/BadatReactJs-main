import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { getCategory } from "../AppApi";
import "../AppAsset/CSS/SliderCategory.css";

class SliderCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
      data: [],
    };
  }

  componentDidMount = async () => {
    const res = await getCategory();
    this.setState({ load: false, data: res.data.data });
  };

  // onClickHandle = (id) => {
  //   console.log("id", id);
  // };

  render() {
    if (this.state.load) {
      return "Loading...";
    }
    return (
      <div
        className="sliderContainer"
        style={{ width: "100%", height: "100%" }}
      >
        {this.state.data && this.state.data.length > 0
          ? this.state.data.map((res) => (
              <div
                className="sliderCategoryCard"
                key={res.id}
                onClick={() => this.props.onClickCategoryHandle(res.id)}
              >
                <Paper className="sliderCategoryPaper" elevation={5}>
                    <img src={res.icon} alt="" style={{height:"100%",float:"left", maxHeight: 60}} />
                  <div className="sliderCardCategoryName" style={{float:"right"}}>{res.name}</div>
                </Paper>
              </div>
            ))
          : "no data found"}
      </div>
    );
  }
}
export default SliderCategory;
