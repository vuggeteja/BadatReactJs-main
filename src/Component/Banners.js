import React, { Component } from "react";
import { getBanner } from "../AppApi";
import "../AppAsset/CSS/Banners.css";

class Banners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerData: [],
      id: null,
    };
  }

  componentDidMount = async () => {
    const tempBannerData = await getBanner(this.props.endPoint, this.props.id);
    this.setState({ bannerData: tempBannerData, id: this.props.id });
  };

  componentDidUpdate = async () => {
    if (this.props.id !== this.state.id) {
      const tempBannerData = await getBanner(
        this.props.endPoint,
        this.props.id
      );
      this.setState({ bannerData: tempBannerData, id: this.props.id });
    }
  };

  render() {
    return (
      <div className="bannerContainer">
        {this.state.bannerData && this.state.bannerData.length > 0
          ? this.state.bannerData.map((res, index) => {
              return (
                <div
                  className="banner"
                  key={index + 1}
                  onClick={() =>
                    window.open(
                      res.banner_url.replace("badhat.club", "badhat.app")
                    )
                  }
                >
                  <img
                    src={res.banner_image}
                    width="100%"
                    height="100%"
                    alt={res.banner_title}
                  />
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default Banners;
