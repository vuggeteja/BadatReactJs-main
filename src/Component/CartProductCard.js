import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteOutline";
// import { addToCart } from "../Util";
import { ROUTE_PRODUCT_DETAIL } from "../Constant";
import "../AppAsset/CSS/CartProductCard.css";

class CartProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
    };
  }

  onCartProductCardHandle = (id) => {
    this.props.history.push(`/${ROUTE_PRODUCT_DETAIL}/${id}`);
  };

  render() {
    return (
      <div className="cartProductCardContainer" key={this.props.data.id}>
        <div className="cartProductCardImage">
          <img
            onClick={() =>
              this.onCartProductCardHandle(this.props.data.product_id)
            }
            src={
              this.props.data &&
              this.props.data.product &&
              this.props.data.product.images &&
              this.props.data.product.images.length > 0
                ? this.props.data.product.images[0].thumbnail
                : "../default-img.png"
            }
            alt={this.props.data.product.name}
            width="100%"
            height="100%"
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div
          className="cartProductCardDetail"
          onClick={() =>
            this.onCartProductCardHandle(this.props.data.product_id)
          }
        >
          <div className="cartProductDetailName">
            {this.props.data.product.name}
          </div>
          <div className="cartProductDetailPrice">
            Rs {`${this.props.data.product.price}/item`}
          </div>
          <div className="cartProductDetailQuantity">
            Quantity : {this.props.data.quantity}
          </div>
          <div className="cartProductDetailTotal">
            Total Price :{" "}
            {this.props.data.product.price * this.props.data.quantity}
          </div>
        </div>
        <div className="cartProductCardButton">
          <div
            className="cartProductCardDelete"
            onClick={() => this.props.onDelete(this.props.data.id)}
          >
            <IconButton aria-label="delete" size="large">
              <DeleteRoundedIcon
                fontSize="large"
                style={{ color: "orangered" }}
              />
            </IconButton>
          </div>
          <div className="cartProductCardAddSubSection">
            <div className="cartProductButtonSubQuantityButton">
              <IconButton
                // size="medium"
                style={{ fontSize: "30px" }}
                disabled={
                  this.props.data.quantity <= this.props.data.product.moq
                    ? true
                    : false
                }
                onClick={() => this.props.onSub(this.props.data.id)}
              >
                <IndeterminateCheckBoxRoundedIcon
                  fontSize="inherit"
                  style={{
                    color:
                      this.props.data.quantity <= this.props.data.product.moq
                        ? "grey"
                        : "green",
                  }}
                />
              </IconButton>
            </div>
            <div className="cartProductAddSubQuantity">
              {this.props.data.quantity}
            </div>
            <div className="cartProductButtonAddQuantityButton">
              <IconButton
                // size="medium"

                style={{ fontSize: "30px" }}
                onClick={() =>
                  this.props.onAdd(
                    this.props.data.product_id,
                    this.props.data.vendor_id,
                    this.props.data.quantity
                  )
                }
              >
                <AddBoxRoundedIcon
                  fontSize="inherit"
                  style={{ color: "green" }}
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(CartProductCard);
