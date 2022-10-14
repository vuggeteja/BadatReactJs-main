import React, { Component, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { getSellerDetail, postMessage } from "../AppApi";
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
import SendIcon from "@material-ui/icons/Send";
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
import CloseIcon from "@material-ui/icons/Close";
import {
  loginPopUp,
  checkSkip,
  checkLogin,
  installOurApp,
  checkBadatExpiration,
} from "../Util";
import "../AppAsset/CSS/UserDetail.css";
import Footer from "../Component/Footer";
import ProductCard from "../Component/ProductCard";

class UserDetail extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      data: {},
      showAddtoCart: true,
      drawer: false,
      open: false,
      chatBox: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (value) => {
    this.setState({ open: false });
  };

  handleOpenChat = () => {
    this.setState({ chatBox: true });
  };

  handleCloseChat = (value) => {
    this.setState({ chatBox: false });
  };

  componentDidMount = async () => {
    const id = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    const res = await getSellerDetail(id);
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
      //loginPopUp(this.props.history);
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
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
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
                  color="inherit"
                  variant="contained"
                  style={{
                    padding: "5px",
                    marginTop: 10,
                    textTransform: "none",
                  }}
                  onClick={this.handleClickOpen}
                >
                  {" "}
                  Details
                </Button>
                <Button
                  color="inherit"
                  variant="contained"
                  className="btn d-none btn-success ml-2"
                  style={{
                    padding: "5px",
                    marginTop: 10,
                    textTransform: "none",
                  }}
                  onClick={this.handleOpenChat}
                >
                  {" "}
                  Chat
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
              style={{ width: "33%" }}
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

          <div className="productListing">
            {this.state.data && this.state.data.products && (
              <>
                {this.state.data.products.map((item) => (
                  <ProductCard data={item} />
                ))}
              </>
            )}
          </div>
        </div>
        <Footer />
        <SimpleDialog
          open={this.state.open}
          data={this.state.data}
          onClose={this.handleClose}
        />
        {this.state.chatBox ? <Chatpop onClose={this.handleCloseChat} /> : ""}
      </LoadingOverlay>
    );
  }
}

export default UserDetail;

function SimpleDialog(props) {
  const { onClose, open, data } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Seller Policies</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          {data.about_us ? (
            <div>
              <strong>About us</strong>
              <Divider />
              {data.about_us}
            </div>
          ) : (
            ""
          )}
        </Typography>
        <br />
        <Typography gutterBottom>
          {data.started_since ? (
            <>
              <strong>Started since</strong>
              <Divider />
              {data.started_since}
            </>
          ) : (
            ""
          )}
        </Typography>
        <br />
        <Typography gutterBottom>
          {data.return_policy ? (
            <div>
              <strong>Return policy</strong>
              <Divider />
              {data.return_policy}
            </div>
          ) : (
            ""
          )}
        </Typography>
        <br />
        <Typography gutterBottom>
          {data.delivery_policy ? (
            <>
              <strong>Delivery policy</strong>
              <Divider />
              {data.delivery_policy}
            </>
          ) : (
            ""
          )}
        </Typography>
        <br />
        <Typography gutterBottom>
          {data.payment_policy ? (
            <div>
              <strong>Payment policy</strong>
              <Divider />
              {data.payment_policy}
            </div>
          ) : (
            ""
          )}
        </Typography>
        <br />
        <Typography gutterBottom>
          {data.discount_upto ? (
            <>
              <strong>Discount policy</strong>
              <Divider />
              {data.discount_upto}
            </>
          ) : (
            ""
          )}
        </Typography>
        <br />
      </DialogContent>
    </Dialog>
  );
}

const Chatpop = (props) => {
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      // await postMessage();
      alert("Your registration was successfully submitted!");
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  };

  const closeClick = () => {
    props.onClose();
  };

  return (
    <div class="chat-pos">
      <div class="card bg-white mt-5">
        <div className="card-header d-flex justify-content-center align-items-center bg-success text-white h6 rounded-top">
          <span>Chat</span>
          <div className="ml-auto">
            <CloseIcon onClick={closeClick} />
          </div>
        </div>
        <div className="card-body">
          <div class="d-flex flex-row p-3">
            <div class="bg-white mr-2 p-3">
              <span class="text-muted">
                Hello and thankyou for visiting birdlynind.
              </span>
            </div>{" "}
            <img
              src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
              width="30"
              height="30"
            />
          </div>
          <div class="d-flex flex-row p-3">
            {" "}
            <img
              src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
              width="30"
              height="30"
            />
            <div class="chat text-wrap ml-2 p-3">
              asd asd a s d as f a s sd a sf a s d asd a sd
            </div>
          </div>
        </div>
        <div className="card-footer p-0 m-0 bg-white">
          <form onSubmit={onSubmit} class="form-container">
            <div class="input-group my-3 px-2">
              <input
                type="text"
                class="form-control rounded-pill"
                placeholder="Message..."
                aria-describedby="button-addon2"
              />
              <button
                type="submit"
                class="btn btn-success d-flex justify-content-center align-items-center rounded-circle ml-1"
                id="button-addon2"
              >
                <SendIcon fontSize="small" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
