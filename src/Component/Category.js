import React, { Component } from "react";
import { BROWSE_CATEGORY, ENDPOINT_GET_HOME_BANNER } from "../Constant";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import { fetchCategoryData } from "../AppRedux/Action/CategoryAction";
import CategoryCard from "./CategoryCard";
import "../AppAsset/CSS/Category.css";
import Banners from "./Banners";
let list;
class Category extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      data: [],
      reload: true,
    };
  }

  componentDidMount = async () => {
    await this.props.onCategoryFetch();
    list =this.props.categoryData;
    this.setState({ load: false, data: this.props.categoryData });
// if(this.state.reload  && this.state.data){
//   window.location.reload();
//   this.setState({
//     reload:false,
//   })
// }
  };

  render() {
    return (
      <LoadingOverlay active={this.state.load} spinner text="Loading...">
        <div className="categoryContainer">
          <div className="categoryTitle">{BROWSE_CATEGORY}</div>
          <div className="categoryCardContainer">
            {this.props.categoryData && this.props.categoryData.length ? (
              <CategoryCard data={this.props.categoryData} />
            ) : (
              "No data found"
            )}
          </div>
          <Banners endPoint={ENDPOINT_GET_HOME_BANNER} id={null} />
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryData: state.CategoryReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCategoryFetch: () => dispatch(fetchCategoryData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
