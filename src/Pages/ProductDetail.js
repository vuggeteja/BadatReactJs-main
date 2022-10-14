import React, { Component } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Helmet } from "react-helmet";
import { getProductDetail, addToCartApi, getQuantity } from "../AppApi";
import {
  checkLogin,
  loginPopUp,
  checkSkip,
  checkBadatExpiration,
} from "../Util";
import Divider from "@material-ui/core/Divider";
import { Drawer, Button, Fab, DialogActions } from "@material-ui/core";
import { ROUTE_CART, ROUTE_USER_DETAIL, ROUTE_LOGIN } from "../Constant";
import Swal from "sweetalert2";
import Carousel from "react-material-ui-carousel";
import DialogContent from "@material-ui/core/DialogContent";
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

import "../AppAsset/CSS/ProductDetail.css";

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      data: [],
      showAddtoCart: true,
      drawer: false,
      open: false,
      quantityType: [],
      showButton: false,
      button: "cart", // 'order'
    };
  }

  componentDidMount = async () => {
    const id = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    const res = await getProductDetail(id);

    this.setState({ load: false, data: res.data.data });
    const result1 = await getQuantity();
    this.setState({ quantityType: result1.data.data });
  };

  addToCartClickHandle = async (id, userId, quantity) => {
    const res = checkLogin();
    if (res === true) {
      const body = {
        product_id: id,
        vendor_id: userId,
        quantity: quantity,
      };
      await addToCartApi(body);
      Swal.fire({
        title: "Item Added to cart",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: "top",
      });
      this.setState({ showAddtoCart: false });
    } else {
      const body = {
        product_id: id,
        vendor_id: userId,
        quantity: quantity,
      };
      this.props.history.push({
        pathname: `/${ROUTE_LOGIN}`,
        state: { itemDetail: body },
      });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true, showButton: false });
  };

  handleClose = (value, data) => {
    if (data) {
      if (data === "cart") {
        this.addToCartClickHandle(
          this.state.data.id,
          this.state.data.user_id,
          this.state.data.moq
        );
      } else {
        this.orderNowHandle(
          this.state.data.id,
          this.state.data.user_id,
          this.state.data.moq
        );
      }
    }
    this.setState({ open: false, showButton: false });
  };

  goToCartClickHandle = async () => {
    this.props.history.push(`/${ROUTE_CART}`);
  };

  orderNowHandle = async (userId, id, quantity) => {
    const res = checkLogin();
    if (res === true) {
      const body = {
        product_id: id,
        vendor_id: userId,
        quantity: quantity,
      };
      await addToCartApi(body);
      Swal.fire({
        title: "Item Added to cart",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: "top",
      });
      this.props.history.push(`/${ROUTE_CART}`);
    } else {
      const body = {
        product_id: id,
        vendor_id: userId,
        quantity: quantity,
      };
      this.props.history.push({
        pathname: `/${ROUTE_LOGIN}`,
        state: { itemDetail: body },
      });
    }
  };

  onDrawerClick = (p) => {
    this.setState({ drawer: p });
  };

  onClickSellerName = (id) => {
    this.props.history.push(`/${ROUTE_USER_DETAIL}/${id}`);
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
          <title>{(this.state.data && this.state.data.name) || "Badhat"}</title>
          <meta name="keywords" content="badhat,badat,Badhat.app" />
          <meta
            name="description"
            content={
              (this.state.data && this.state.data.description) ||
              "Badhat is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers.Badhat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
            }
          />
          <link
            rel="apple-touch-icon"
            href={
              this.state.data &&
              this.state.data.images &&
              this.state.data.images[0]
                ? this.state.data.images[0].thumbnail
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
        <div className="productDetailContainer">
          <div className="productButtonHeaderContainer">
            <div className="productDetailHeader">Product Detail</div>
            <div
              className="productDetailShareButtonContainer"
              onClick={() => this.onDrawerClick(true)}
            >
              Share
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
          <div>
            {this.state.data &&
            this.state.data.category &&
            this.state.data.category.name ? (
              <span>{`${this.state.data.category.name}`}</span>
            ) : null}
            {this.state.data &&
            this.state.data.subcategory &&
            this.state.data.subcategory.name ? (
              <span>{`>${this.state.data.subcategory.name}`}</span>
            ) : null}
            {this.state.data &&
            this.state.data.vertical &&
            this.state.data.vertical.name ? (
              <span>{`>${this.state.data.vertical.name}`}</span>
            ) : null}
          </div>

          <Divider />
          {this.state.data &&
          this.state.data.images &&
          this.state.data.images.length > 0 ? (
            <div>
              <Carousel autoPlay={false}>
                {this.state.data.images.map((item, i) => (
                  <>
                    <img
                      src={item.image}
                      alt={
                        this.state.data &&
                        this.state.data.name &&
                        this.state.data.name
                      }
                      style={{ objectFit: "contain" }}
                      width="100%"
                      height="400px"
                    />
                  </>
                ))}
              </Carousel>
              {this.state.data &&
                this.state.data.user &&
                (this.state.data.user.delivery_policy ||
                  this.state.data.user.discount_upto ||
                  this.state.data.user.payment_policy ||
                  this.state.data.user.return_policy) && (
                  <div style={{ position: "absolute", top: 400, right: 10 }}>
                    <Button
                      color="inherit"
                      variant="contained"
                      style={{ textTransform: "none" }}
                      onClick={this.handleClickOpen}
                    >
                      Policy
                    </Button>
                  </div>
                )}
            </div>
          ) : null}
          <div className="productDetailCardContainer">
            <div className="productDetailCardDetailContainer">
              <div className="productDetailCardName">
                {this.state.data && this.state.data.name
                  ? this.state.data.name
                  : ""}
              </div>
              {this.state && this.state.data && this.state.data.price && (
                <div className="productDetailCardPrice">
                  Wholesale Rate Rs: {this.state.data.price}
                  {this.state.data &&
                    this.state.data.quantity &&
                    this.state.data.product_unit_id &&
                    this.state.quantityType.length > 0 && (
                      <span>
                        {` for ${this.state.data.quantity} ${
                          this.state.quantityType.find(
                            (i) => i.id === this.state.data.product_unit_id
                          ).name
                        }`}
                      </span>
                    )}
                </div>
              )}
              {/* <div className="productDetailCardPrice">
                {this.state.data &&
                  this.state.data.user &&
                  (this.state.data.user.delivery_policy ||
                    this.state.data.user.discount_upto ||
                    this.state.data.user.payment_policy ||
                    this.state.data.user.return_policy) && (
                    <Button
                      color="inherit"
                      variant="contained"
                      style={{ marginLeft: 40, textTransform: "none" }}
                      onClick={this.handleClickOpen}
                    >
                      Policy
                    </Button>
                  )}
              </div> */}
              <div
                className="productDetailCardMoq"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                  marginTop: 5,
                }}
              >
                {this.state &&
                  this.state.data &&
                  this.state.data.mrp_price > 0 && (
                    <span style={{ marginRight: 10, textTransform: "none" }}>
                      {`MRP Rs. ${this.state.data.mrp_price}`}
                    </span>
                  )}
                {`Minimum Order Quantity : ${
                  this.state.data && this.state.data.moq
                    ? this.state.data.moq
                    : ""
                }`}
              </div>
              <div
                className="productDetailCardSeller"
                onClick={() => this.onClickSellerName(this.state.data.user_id)}
              >
                <span>
                  Sold By :{" "}
                  <span style={{ cursor: "pointer", color: "blue" }}>
                    {this.state.data &&
                    this.state.data.user &&
                    this.state.data.user.name
                      ? this.state.data.user.name
                      : ""}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <br />

          {this.state.data && this.state.data.description && (
            <>
              <Divider />
              <div className="productaDetailDescription">
                <div className="productDetailDescriptionHeading">
                  Description
                </div>
                <div className="productDetailDescriptionContent">
                  {this.state.data && this.state.data.description
                    ? this.state.data.description
                    : ""}
                </div>
              </div>
            </>
          )}
          {/* <Divider /> */}
          <div className="productDetailButton">
            <div className="productDetailAddToCartButton">
              <Button
                fullWidth
                variant="outlined"
                style={{
                  height: "100%",
                  backgroundColor: "rgb(300, 250, 250)",
                  color: "black",
                }}
                onClick={
                  this.state.showAddtoCart
                    ? () => {
                        if (
                          this.state.data &&
                          this.state.data.user &&
                          (this.state.data.user.delivery_policy ||
                            this.state.data.user.discount_upto ||
                            this.state.data.user.payment_policy ||
                            this.state.data.user.return_policy)
                        ) {
                          this.setState({
                            open: true,
                            showButton: true,
                            button: "cart",
                          });
                        } else {
                          this.addToCartClickHandle(
                            this.state.data.id,
                            this.state.data.user_id,
                            this.state.data.moq
                          );
                        }
                      }
                    : () =>
                        this.goToCartClickHandle(
                          this.state.data.id,
                          this.state.data.user_id,
                          this.state.data.moq
                        )
                }
              >
                {this.state.showAddtoCart ? "Add to Cart" : "Go to Cart"}
              </Button>
            </div>
            <div className="productDetailOrderNowButton">
              <Button
                fullWidth
                variant="outlined"
                style={{
                  height: "100%",
                  backgroundColor: "rgb(255 , 111 , 0)",
                }}
                onClick={() => {
                  if (
                    this.state.data &&
                    this.state.data.user &&
                    (this.state.data.user.delivery_policy ||
                      this.state.data.user.discount_upto ||
                      this.state.data.user.payment_policy ||
                      this.state.data.user.return_policy)
                  ) {
                    this.setState({
                      open: true,
                      showButton: true,
                      button: "order",
                    });
                  } else {
                    this.orderNowHandle(
                      this.state.data.id,
                      this.state.data.user_id,
                      this.state.data.moq
                    );
                  }
                }}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
        <SimpleDialog
          showButton={this.state.showButton}
          button={this.state.button}
          open={this.state.open}
          data={this.state.data.user ? this.state.data.user : false}
          onClose={this.handleClose}
        />
      </LoadingOverlay>
    );
  }
}

export default ProductDetail;

function SimpleDialog(props) {
  const { onClose, open, data, showButton, button } = props;

  const handleClose = () => {
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
          {data.return_policy !== null ? (
            data.return_policy != "" ? (
              <>
                <strong>Return policy</strong>
                <Divider />
                {data.return_policy}
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Typography>
        <br />
        <Typography gutterBottom>
          {data.delivery_policy !== null ? (
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
          {data.payment_policy !== null ? (
            <>
              <strong>Payment policy</strong>
              <Divider />
              {data.payment_policy}
            </>
          ) : (
            ""
          )}
        </Typography>
        <br />
        <Typography gutterBottom>
          {data.discount_upto !== null ? (
            <div>
              <strong>Discount policy</strong>
              <Divider />
              {data.discount_upto}
            </div>
          ) : (
            ""
          )}
        </Typography>
        <br />
      </DialogContent>
      {showButton && (
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={(e) => onClose(e, button)}
            variant="contained"
            color="primary"
          >
            Continue to Cart
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
