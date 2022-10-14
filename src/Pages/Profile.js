import React, { Component, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { getMyDetail } from "../AppApi";
import { Chip, Drawer, Divider, Fab, Button } from "@material-ui/core";
import Product from "../Component/Product";
import { Helmet } from "react-helmet";
import {
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  PinterestIcon,
  InstapaperIcon,
  InstapaperShareButton,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  EmailShareButton,
  LinkedinIcon,
  EmailIcon,
} from "react-share";
import DialogContent from "@material-ui/core/DialogContent";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ChatIcon from "@material-ui/icons/Chat";
import ShareIcon from "@material-ui/icons/Share";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import {
  loginPopUp,
  checkSkip,
  checkLogin,
  installOurApp,
  checkBadatExpiration,
} from "../Util";
import "../AppAsset/CSS/UserDetail.css";
import Footer from "../Component/Footer";

class UserDetail extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      data: {},
      showAddtoCart: true,
      drawer: false,
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    window.location.href = "/profile/edit";
  };

  handleClose = (value) => {
    this.setState({ open: false });
  };

  componentDidMount = async () => {
    const res = await getMyDetail();
    this.setState({ load: false, data: res });
  };

  onDrawerClick = (p) => {
    this.setState({ drawer: p });
  };

  onLikeChatClick = () => {
    installOurApp(
      "To like or chat with seller download the app, Download Badhat app click below"
    );
  };

  render() {
    if (
      (!checkLogin() && !checkSkip()) ||
      (!checkLogin() && !checkBadatExpiration())
    ) {
      loginPopUp(this.props.history);
    }
    return (
      <LoadingOverlay active={this.state.load} spinner text="Loading...">
        <Helmet>
          <title>
            {`${this.state.data.business_name} by ${this.state.data.name}` ||
              "Badhat"}
          </title>
          <meta name="keywords" content="badhat,badat,Badhat.app" />
          <meta
            name="description"
            content={
              `${this.state.data.business_type} OF ${this.state.data.business_category} from ${this.state.data.district}, ${this.state.data.state}` ||
              "Badhat is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers.Badhat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
            }
          />
          <link
            rel="apple-touch-icon"
            href={
              this.state.data.image
                ? this.state.data.image
                : "https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
            }
          />
        </Helmet>
        <Fab
          variant="extended"
          size="small"
          // color="red"
          aria-label="add"
          style={{
            zIndex: "5",
            margin: 0,
            top: 300,
            right: -8,
            left: "auto",
            position: "fixed",
            height: 25,
            fontSize: "small",
            textAlign: "left",
            paddingLeft: 4,
            backgroundColor: "rgb(255, 171, 36)",
            textTransform: "capitalize",
          }}
          onClick={() =>
            window.open(
              "https://play.google.com/store/apps/details?id=com.badhat.app"
            )
          }
        >
          Open App
        </Fab>
        <div className="userDetailContainer">
          <div className="userDetailCard">
            <div className="userDetailCardImageContainer">
              <img
                src={this.state.data.image}
                alt={this.state.data.business_name}
                width="100%"
                height="100%"
              />
            </div>
            <div className="userDetailCardDetailContainer">
              <div className="userDetailCategory">
                <Chip
                  label={this.state.data.business_type}
                  size="small"
                  style={{ color: "blue" }}
                />{" "}
                <Chip
                  label={this.state.data.business_category}
                  size="small"
                  style={{ color: "orangered" }}
                />
              </div>
              <div className="userDetailShopName">
                {this.state.data.business_name}
              </div>
              <div className="userDetailName">
                <span>
                  <PersonIcon viewBox="0,-5,24,24" />
                  {this.state.data.name}
                </span>
              </div>
              <div className="userDetailDistrict">
                <span>
                  <LocationOnIcon viewBox="0,-2,24,24" />
                  {`${this.state.data.district},${this.state.data.state}`}
                </span>
              </div>
              <div className="userDetailPolicy">
                <Button
                  color="primary"
                  variant="contained"
                  style={{ padding: "5px" }}
                  onClick={this.handleClickOpen}
                >
                  {" "}
                  EDIT
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className="userDetailshare">
            <div
              style={{ width: "33%" }}
              onClick={() => this.onLikeChatClick()}
            >
              <ThumbUpAltIcon />
              <br />
              Like
            </div>
            <div
              style={{ width: "33%" }}
              onClick={() => this.onDrawerClick(true)}
            >
              <ShareIcon />
              <br />
              Share
            </div>
            <div
              style={{ width: "33%", display: "none" }}
              onClick={() => this.onLikeChatClick()}
            >
              <ChatIcon />
              <br />
              Chat
            </div>
          </div>
          <Divider />
          <>
            <Drawer
              anchor="bottom"
              open={this.state.drawer}
              onClose={() => this.onDrawerClick(false)}
            >
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: "5px",
                }}
              >
                <div className="ProductDetailShareButton">
                  <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon />
                  </WhatsappShareButton>
                </div>
                <div className="ProductDetailShareButton">
                  <FacebookShareButton url={window.location.href}>
                    <FacebookIcon />
                  </FacebookShareButton>
                </div>
                <div className="ProductDetailShareButton">
                  <TelegramShareButton url={window.location.href}>
                    <TelegramIcon />
                  </TelegramShareButton>
                </div>
                <div className="ProductDetailShareButton">
                  <TwitterShareButton url={window.location.href}>
                    <TwitterIcon />
                  </TwitterShareButton>
                </div>
                <div className="ProductDetailShareButton">
                  <PinterestShareButton url={window.location.href}>
                    <PinterestIcon />
                  </PinterestShareButton>
                </div>
                <div className="ProductDetailShareButton">
                  <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon />
                  </LinkedinShareButton>
                </div>
                <div className="ProductDetailShareButton">
                  <EmailShareButton url={window.location.href}>
                    <EmailIcon />
                  </EmailShareButton>
                </div>
                <div className="ProductDetailShareButton">
                  <InstapaperShareButton url={window.location.href}>
                    <InstapaperIcon />
                  </InstapaperShareButton>
                </div>
              </div>
            </Drawer>
          </>
          <Product
            showFilter
            productData={
              this.state.data && this.state.data.products
                ? this.state.data.products
                : []
            }
          />
        </div>
        <Footer />
      </LoadingOverlay>
    );
  }
}

export default UserDetail;
