import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@material-ui/core";
import { addToCartApi } from "../AppApi";
import { checkLogin } from "../Util";
import { ROUTE_CART, ROUTE_PRODUCT_DETAIL, ROUTE_LOGIN } from "../Constant";
import { cartItemCountHandle } from "../AppRedux/Action/CartItemCount";
import Swal from "sweetalert2";
import "../AppAsset/CSS/ProductCard.css";
// import Login from "./Login";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
      showModal: false,
      open: false,
      showButton: false,
      button: "cart", // 'order'
    };
  }

  // onLoginHandle = () => {
  //   this.setState({ showModal: true });
  // };

  // onLoginModalCloseHandle = () => {
  //   this.setState({ showModal: false });
  // };

  addToCartHandle = async (userId, id, quantity) => {
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
      this.props.cartItemCount();
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
      this.props.cartItemCount();
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

  onProductClickHandle = (id) => {
    this.props.history.push(`/${ROUTE_PRODUCT_DETAIL}/${id}`);
  };

  handleClose = (value, data) => {
    if (data) {
      if (data === "cart") {
        this.addToCartHandle(
          this.props.data.user_id,
          this.props.data.id,
          this.props.data.moq
        );
      } else {
        this.orderNowHandle(
          this.props.data.user_id,
          this.props.data.id,
          this.props.data.moq
        );
      }
    }
    this.setState({ open: false, showButton: false });
  };

  render() {
    return (
      <div className="productCardContainer" key={this.props.data.id}>
        <div
          className="productCardImage"
          onClick={() => this.onProductClickHandle(this.props.data.id)}
        >
          <img
            src={
              this.props.data &&
              this.props.data.images &&
              this.props.data.images.length > 0 &&
              this.props.data.images[0].thumbnail
                ? this.props.data.images[0].thumbnail
                : "../../default-img.png"
            }
            alt={this.props.data.name}
            width="100%"
            height="100%"
            style={{ borderRadius: "10px", objectFit: "cover" }}
          />
        </div>

        <div
          className="productCardDetail"
          onClick={() => this.onProductClickHandle(this.props.data.id)}
        >
          <div className="productDetailName">{this.props.data.name}</div>
          <div className="productDetailMoq1">
          Wholesale Rate: Rs {this.props.data.price}
          </div>
          {this.props.data &&
          this.props.data.mrp_price &&
          this.props.data.mrp_price > 0 ? (
            <div className="productDetailPrice">
              MRP:Rs {this.props.data.mrp_price}
            </div>
          ) : (
            ""
          )}
          {this.props.data && this.props.data.moq && this.props.data.moq > 0 ? (
            <div className="productDetailPrice">
              MOQ : {this.props.data.moq}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="productCardButton">
          <div className="productCardButtons">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                if (
                  this.props.data &&
                  this.props.data.user &&
                  (this.props.data.user.delivery_policy ||
                    this.props.data.user.discount_upto ||
                    this.props.data.user.payment_policy ||
                    this.props.data.user.return_policy)
                ) {
                  this.setState({
                    open: true,
                    showButton: true,
                    button: "cart",
                  });
                } else {
                  this.setState({ open: false, showButton: false });
                  this.addToCartHandle(
                    this.props.data.user_id,
                    this.props.data.id,
                    this.props.data.moq
                  );
                }
              }}
              style={{
                height: "100%",
                backgroundColor: "rgb(300, 250, 250)",
                color: "black",
              }}
            >
              <span style={{ fontSize: "xx-small" }}>
                <b>Add to cart</b>
              </span>
            </Button>
          </div>
          <div className="productCardButtons">
            <Button
              fullWidth
              variant="contained"
              // color="secondary"
              onClick={() => {
                if (
                  this.props.data &&
                  this.props.data.user &&
                  (this.props.data.user.delivery_policy ||
                    this.props.data.user.discount_upto ||
                    this.props.data.user.payment_policy ||
                    this.props.data.user.return_policy)
                ) {
                  this.setState({
                    open: true,
                    showButton: true,
                    button: "order",
                  });
                } else {
                  this.setState({
                    open: false,
                    showButton: false,
                  });
                  this.orderNowHandle(
                    this.props.data.user_id,
                    this.props.data.id,
                    this.props.data.moq
                  );
                }
              }}
              style={{ height: "100%", backgroundColor: "rgb(255 , 111 , 0)" }}
            >
              <span style={{ fontSize: "xx-small" }}>
                <b>Order Now</b>
              </span>
            </Button>
          </div>
        </div>
        <SimpleDialog
          showButton={this.state.showButton}
          button={this.state.button}
          open={this.state.open}
          data={this.props.data.user ? this.props.data.user : false}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  cartItemCount: () => dispatch(cartItemCountHandle()),
});

export default connect(null, mapDispatchToProps)(withRouter(ProductCard));

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
      maxWidth="sm"
      style={{ width: 360 }}
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
