import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CartProductCard from "../Component/CartProductCard";
import LoadingOverlay from "react-loading-overlay";
import { cartItemCountHandle } from "../AppRedux/Action/CartItemCount";
import {
  getCartData,
  deleteCartData,
  placeOrder,
  removeFromCart,
} from "../AppApi";
import { Helmet } from "react-helmet";
import { Button, TextField } from "@material-ui/core";
import { addToCart, checkLogin } from "../Util";
import Swal from "sweetalert2";

import {
  Table,
  TableBody,
  TableCell,
  Dialog,
  DialogTitle,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import "../AppAsset/CSS/Cart.css";
import NoDataFound from "../Component/NoDataFound";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
      data: [],
      temp: true,
      open: false,
      verify: false,
      value: "",
    };
  }

  componentDidMount = async () => {
    const cartData = await getCartData();
    this.setState({ data: cartData, load: false });
  };

  onClickAddQuantity = async (id, userId, quantity) => {
    this.setState({ load: true });
    const body = {
      product_id: id,
      vendor_id: userId,
      quantity: quantity,
    };
    await addToCart(body);
    setTimeout(async () => {
      const cartData = await getCartData();
      this.setState({ data: cartData, load: false });
      Swal.fire({
        title: "Item Added",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
        position: "top",
      });
    }, 1000);

    this.setState({ temp: !this.state.temp });
  };

  onClickSubQuantity = async (id) => {
    this.setState({ load: true });
    const res = await removeFromCart(id);
    if (res) {
      const cartData = await getCartData();
      this.setState({ data: cartData, load: false });
      Swal.fire({
        title: "Item Removed",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
        position: "top",
      });
    }
  };

  onDeleteCartProduct = async (id) => {
    this.setState({ load: true });
    await deleteCartData(id);
    const cartData = await getCartData();
    this.props.cartItemCount();
    this.setState({ data: cartData, load: false });
  };

  placeOrderHandle = () => {
    this.setState({ open: true });
  };

  verifiedClick = async () => {
    const res = await placeOrder();
    if (res) {
      Swal.fire({
        title: "Order Placed Successfully",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
        position: "top",
      });
      const cartData = await getCartData();
      this.props.cartItemCount();
      this.setState({ data: cartData });
    }
  };

  handleClose = (value) => {
    this.setState({ open: false, value: value });
    if (this.state.value === 1) {
      this.verifiedClick();
    }
  };

  render() {
    const totalPriceArray =
      this.state.data && this.state.data.length > 0
        ? this.state.data.map((res) => res.product.price * res.quantity)
        : 0;
    if (!checkLogin()) {
      return <Redirect to="/" />;
    }

    const cartBasedOnSeller = {};
    if (this.state.data && this.state.data.length > 0) {
      this.state.data.forEach((item) => {
        if (!cartBasedOnSeller[item.vendor.id]) {
          cartBasedOnSeller[item.vendor.id] = {
            items: [item],
            vendor: item.vendor,
          };
        } else {
          cartBasedOnSeller[item.vendor_id].items.push(item);
        }
      });
    }

    return (
      <LoadingOverlay active={this.state.load} spinner text="Loading...">
        <Helmet>
          <title>Cart</title>
          <meta name="keywords" content="badhat,badat,badhat.app" />
          <meta
            name="description"
            content="Badhat is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers. Badhat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
          />
          <link
            rel="apple-touch-icon"
            href="https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
          />
        </Helmet>
        <div className="cartContainer">
          <div
            className="cartHeader"
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: "orangered",
            }}
          >
            Your Cart
          </div>
          {/* {this.state.data && this.state.data.length > 0 ? (
            <>
              <div className="cartProductContainer">
                {this.state.data && this.state.data.length > 0
                  ? this.state.data.map((res) => (
                      <CartProductCard
                        key={res.id}
                        data={res}
                        onDelete={this.onDeleteCartProduct}
                        onAdd={this.onClickAddQuantity}
                        onSub={this.onClickSubQuantity}
                      />
                    ))
                  : "no data found"}
              </div>

              <div className="cartDetail">
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: "orangered",
                  }}
                >
                  Order Summary
                </div>
                <TableContainer component={Paper}>
                  <Table className="CartDetailTable" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Price/Item</TableCell>
                        <TableCell align="right">Total Quantity</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.data && this.state.data.length > 0
                        ? this.state.data.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.product.name}
                              </TableCell>
                              <TableCell align="right">
                                {row.product.price}
                              </TableCell>
                              <TableCell align="right">
                                {row.quantity}
                              </TableCell>
                              <TableCell align="right">
                                {row.quantity * row.product.price}
                              </TableCell>
                            </TableRow>
                          ))
                        : "no item in cart"}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div
                  style={{ width: "96%", marginLeft: "2%", marginRight: "2%" }}
                >
                  <span style={{ float: "left" }}>Sub Total : </span>
                  <span style={{ float: "Right" }}>
                    {this.state.data && this.state.data.length > 0
                      ? totalPriceArray.reduce((total, res) => {
                          return total + res;
                        })
                      : "no item in cart"}
                  </span>
                </div>
              </div> 

               <div
                className="cartPlaceOrdersection"
                onClick={this.placeOrderHandle}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ height: "100%" }}
                >
                  Book Order
                </Button>
              </div>
              <SimpleDialog
                selectedValue={this.state.value}
                open={this.state.open}
                onClose={this.handleClose}
              /> 
            </>
          ) : (
            <NoDataFound content="Your Cart Is Empty" />
          )} */}

          <div>
            {Object.keys(cartBasedOnSeller).length > 0 ? (
              <>
                {Object.keys(cartBasedOnSeller).map((id) => {
                  const { items, vendor } = cartBasedOnSeller[id];
                  return (
                    <div
                      style={{
                        border: "1px solid gray",
                        borderRadius: 10,
                        padding: 5,
                        margin: "15px 5px 15px 5px",
                      }}
                    >
                      <div
                        style={{ fontSize: 16, padding: 10, cursor: "pointer" }}
                        onClick={() => {
                          this.props.history.push(`/user/${vendor.id}`);
                        }}
                      >
                        Sold By: {vendor.business_name}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {items.map((res) => (
                          <CartProductCard
                            key={res.id}
                            data={res}
                            onDelete={this.onDeleteCartProduct}
                            onAdd={this.onClickAddQuantity}
                            onSub={this.onClickSubQuantity}
                          />
                        ))}
                      </div>
                      {vendor.minimun_order_size ? (
                        <div
                          style={{
                            fontSize: 12,
                            padding: 10,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div>Minimum Order Size</div>
                            <div>Rs. {vendor.minimun_order_size || 0}</div>
                          </div>
                          {(vendor.minimun_order_size || 0) -
                            items.reduce((acc, obj) => {
                              return acc + obj.product.price * obj.quantity;
                            }, 0) >
                            0 && (
                            <div
                              style={{
                                color: "red",
                                padding: "5px 25px 5px 25px",
                                background: "lightgray",
                                borderRadius: 7,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                this.props.history.push(`/user/${vendor.id}`);
                              }}
                            >
                              <div>Add More</div>
                              <div>
                                Rs.{" "}
                                {(vendor.minimun_order_size || 0) -
                                  items.reduce((acc, obj) => {
                                    return (
                                      acc + obj.product.price * obj.quantity
                                    );
                                  }, 0) >
                                0
                                  ? (vendor.minimun_order_size || 0) -
                                    items.reduce((acc, obj) => {
                                      return (
                                        acc + obj.product.price * obj.quantity
                                      );
                                    }, 0)
                                  : 0}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
                <div
                  className="cartPlaceOrdersection"
                  onClick={this.placeOrderHandle}
                >
                  <Button
                    disabled={
                      Object.keys(cartBasedOnSeller).filter((id) => {
                        const { items, vendor } = cartBasedOnSeller[id];
                        const amount =
                          (vendor.minimun_order_size || 0) -
                          items.reduce((acc, obj) => {
                            return acc + obj.product.price * obj.quantity;
                          }, 0);
                        return amount <= 0;
                      }).length === 0
                    }
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ height: "100%" }}
                  >
                    Book Order
                  </Button>
                </div>
                <SimpleDialog
                  selectedValue={this.state.value}
                  open={this.state.open}
                  onClose={this.handleClose}
                />
              </>
            ) : (
              <NoDataFound content="Your Cart Is Empty" />
            )}
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  cartItemCount: () => dispatch(cartItemCountHandle()),
});

export default connect(null, mapDispatchToProps)(Cart);

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const [valueData, setValueData] = React.useState(0);

  const handleClose = () => {
    if (valueData == randomNr.current.randomNr1 + randomNr.current.randomNr2) {
      onClose(1);
    } else {
      onClose(0);
    }
  };

  const randomNr = React.useRef({
    randomNr1: Math.floor(Math.random() * 10),
    randomNr2: Math.floor(Math.random() * 10),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (valueData == randomNr.current.randomNr1 + randomNr.current.randomNr2) {
      onClose(1);
    } else {
      alert("Captcha verification Failed. Try again!");
      onClose(0);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <form onSubmit={handleSubmit}>
          <label id="ebcaptchatext">
            What is {randomNr.current.randomNr1} + {randomNr.current.randomNr2}?
          </label>
          <br />
          <TextField
            type="number"
            style={{ marginTop: "10px" }}
            onChange={(e) => {
              setValueData(parseInt(e.target.value));
            }}
            id="outlined-basic"
            label="Answer"
            variant="outlined"
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            onClick={handleClose}
            color="primary"
            variant="contained"
          >
            Book Order
          </Button>
        </form>
      </DialogTitle>
    </Dialog>
  );
}
