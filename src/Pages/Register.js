import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, MenuItem, Button } from "@material-ui/core";
import {
  getCategory,
  registerUser,
  addToCartApi,
  getState,
  getDistrict,
} from "../AppApi";
import { ROUTE_CART } from "../Constant";
import "../AppAsset/CSS/Login.css";
import { cartItemCountHandle } from "../AppRedux/Action/CartItemCount";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { storeToken, storeId, checkLogin } from "../Util";
import { Redirect } from "react-router-dom";
import Footer from "../Component/Footer";

const yearsData = [];

for (let i = 1900; i < 2021; i++) {
  yearsData.push(i);
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: false,
      mobile:
        this.props &&
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.mobile,
      mobileerror: false,
      user: "",
      userError: "",
      bussinessDomain: "",
      bussinessDomainError: false,
      pincode: "",
      pincodeError: false,
      state: "",
      stateError: false,
      district: "",
      districtError: false,
      streetAddress: "",
      streetAddressError: false,
      cityAddress: "",
      cityAddressError: false,
      errorMessage: "",
      bussinessDomainData: [],
      stateData: [],
      districtData: [],
      load: true,
      shopNameError: false,
      shopName: "",
      showDistrict: false,
      about_us: "",
      delivery_policy: "",
      started_since: "",
      discount_upto: "",
      return_policy: "",
      payment_policy: "",
    };
  }

  componentDidMount = async () => {
    const tempCategoryData = await getCategory();
    const tempState = await getState();
    this.setState({
      bussinessDomainData: tempCategoryData.data.data || [],
      load: false,
      stateData: tempState,
    });
  };

  onClickSubmitOtp = async () => {
    const param = {
      name: this.state.name,
      business_name: this.state.shopName,
      mobile: this.state.mobile,
      state: this.state.state,
      district: this.state.district,
      business_type: this.state.user,
      business_category: this.state.bussinessDomain,
      pincode: this.state.pincode,
      about_us: this.state.about_us,
      delivery_policy: this.state.delivery_policy,
      discount_upto: this.state.discount_upto,
      return_policy: this.state.return_policy,
      started_since: this.state.started_since,
      payment_policy: this.state.payment_policy,
      minimum_order_size: this.state.minimum_order_size,
    };
    if (this.validation()) {
      const registerTemp = await registerUser(param);
      if (registerTemp) {
        storeToken(this.props.location.state.token);
        if (this.props.location.state && this.props.location.state.itemDetail) {
          const addToCartres = await addToCartApi(
            this.props.location.state.itemDetail
          );
          if (addToCartres) {
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
            Swal.fire({
              title: "Something Went wrong",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
              position: "top",
            });
          }
        } else if (
          this.props.location.state &&
          this.props.location.state.fromLoginButton
        ) {
          this.props.cartItemCount();
          this.props.history.go(-2);
        } else {
          this.props.cartItemCount();
          this.props.history.push(`/`);
        }
      } else {
        Swal.fire({
          title: "Something Went wrong",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top",
        });
      }
    }
  };

  onChangeHandle = async (e) => {
    const data = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(data);

    if (e.target.name === "state") {
      const tempDistrictData = await getDistrict(e.target.value);
      this.setState({ districtData: tempDistrictData, showDistrict: true });
    }
  };

  validation = () => {
    this.setState({
      nameError: false,
      // mobileerror: false,
      userError: false,
      bussinessDomainError: false,
      streetAddressError: false,
      cityAddressError: false,
      pincodeError: false,
      stateError: false,
      districtError: false,
      shopNameError: false,
      errorMessage: "",
    });

    if (this.state.name === "") {
      this.setState({
        nameError: true,
        errorMessage: "This field is required",
      });
      return false;
    }
    // else if (
    //   this.state.mobile === "" ||
    //   this.state.mobile.length < 10 ||
    //   this.state.mobile.length > 10
    // ) {
    //   this.setState({
    //     mobileerror: true,
    //     errorMessage:
    //       this.state.mobile === ""
    //         ? "This field is required"
    //         : "Invalid Mobile Number (10 digit number required)",
    //   });
    //   return false;
    // }
    else if (this.state.shopName === "") {
      this.setState({
        shopNameError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (this.state.user === "") {
      this.setState({
        userError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (this.state.bussinessDomain === "") {
      this.setState({
        bussinessDomainError: true,
        errorMessage: "This field is required",
      });
      return false;
    }
    //else if (this.state.streetAddress === "") {
    //this.setState({
    //  streetAddressError: true,
    //  errorMessage: "This field is required",
    //});
    //return false;
    //}
    //else if (this.state.cityAddress === "") {
    //this.setState({
    //  cityAddressError: true,
    //  errorMessage: "This field is required",
    //});
    //return false;
    //}
    else if (
      this.state.pincode === "" ||
      this.state.pincode.length < 6 ||
      this.state.pincode.length > 6
    ) {
      this.setState({
        pincodeError: true,
        errorMessage:
          this.state.pincode === ""
            ? "This field is required"
            : "Invalid Pin code",
      });
      return false;
    } else if (this.state.state === "") {
      this.setState({
        stateError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (this.state.district === "") {
      this.setState({
        districtError: true,
        errorMessage: "This field is required",
      });
      return false;
    }
    return true;
  };

  render() {
    // if (checkLogin()) {
    //   console.log("-----------14141414")
    //   return <Redirect to="/" />;
    // }

    return (
      <>
        <Helmet>
          <title>{"Badhat"}</title>
          <meta name="keywords" content="badhat,badat,Badhat.app" />
          <meta
            name="description"
            content="Badhat is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers.Badhat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
          />
          <link
            rel="apple-touch-icon"
            href="https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
          />
        </Helmet>
        <div className="loginContainer">
          <div className="loginFormContainer">
            <div style={{ textAlign: "center" }}>
              <strong>Enter details to complete your profile</strong>
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.name}
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                onChange={this.onChangeHandle}
              />
              {this.state.nameError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.mobile}
                name="mobile"
                label="Mobile Number"
                variant="outlined"
                type="number"
                disabled
                // onChange={this.onChangeHandle}
              />
              {/* {this.state.mobileerror ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null} */}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.shopName}
                name="shopName"
                type="text"
                label="Shop/Business Name"
                variant="outlined"
                onChange={this.onChangeHandle}
              />
              {this.state.shopNameError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            
            
            <div className="loginFormField">
              <TextField
                fullWidth
                style={{ display: "none" }}
                defaultValue={this.state.streetAddress}
                name="streetAddress"
                label="Shop/House No. & Street Name"
                variant="outlined"
                onChange={this.onChangeHandle}
              />
              {this.state.streetAddressError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                style={{ display: "none" }}
                defaultValue={this.state.cityAddress}
                name="cityAddress"
                label="City/Town/Village Area"
                variant="outlined"
                onChange={this.onChangeHandle}
              />
              {this.state.cityAddressError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.pincode}
                name="pincode"
                label="Pincode"
                InputProps={{
                  inputProps: {
                    max: 999999,
                    min: 100000,
                  },
                }}
                variant="outlined"
                type="number"
                onChange={this.onChangeHandle}
              />
              {this.state.pincodeError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            
            {this.state.showDistrict ? (
              <div className="loginFormField">
                <TextField
                  fullWidth
                  required
                  select
                  defaultValue={this.state.district}
                  name="district"
                  label="District"
                  variant="outlined"
                  onChange={this.onChangeHandle}
                >
                  {this.state.districtData && this.state.districtData.length > 0
                    ? this.state.districtData.map((res) => (
                        <MenuItem key={res} value={res}>
                          {res}
                        </MenuItem>
                      ))
                    : null}
                </TextField>
                {this.state.districtError ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "x-small",
                      fontWeight: "700",
                    }}
                  >
                    {this.state.errorMessage}
                  </span>
                ) : null}
              </div>
            ) : null}
            

            {!["Retail", "OnlineSeller", "Reseller"].includes(
              this.state.user
            ) &&
              this.state.user && (
                <>
                  <div className="loginFormField">
                    <TextField
                      fullWidth
                      defaultValue={this.state.payment_policy}
                      multiline
                      rows={3}
                      name="payment_policy"
                      type="text"
                      label="Payment policy"
                      variant="outlined"
                      onChange={this.onChangeHandle}
                    />
                  </div>
                  <div className="loginFormField">
                    <TextField
                      fullWidth
                      defaultValue={this.state.return_policy}
                      multiline
                      rows={3}
                      name="return_policy"
                      type="text"
                      label="Return policy"
                      variant="outlined"
                      onChange={this.onChangeHandle}
                    />
                  </div>
                  <div className="loginFormField">
                    <TextField
                      fullWidth
                      defaultValue={this.state.delivery_policy}
                      multiline
                      rows={3}
                      name="delivery_policy"
                      type="text"
                      label="Delivery Time and Charges"
                      variant="outlined"
                      onChange={this.onChangeHandle}
                    />
                  </div>
                  <div className="loginFormField">
                    <TextField
                      fullWidth
                      defaultValue={this.state.discount_upto}
                      multiline
                      rows={3}
                      name="discount_upto"
                      type="text"
                      label="Discount policy"
                      variant="outlined"
                      onChange={this.onChangeHandle}
                    />
                  </div>
                </>
              )}

            <div className="loginFormField">
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "50%",
                  marginLeft: "25%",
                  marginRight: "25%",
                }}
                onClick={this.onClickSubmitOtp}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  cartItemCount: () => dispatch(cartItemCountHandle()),
});

export default connect(null, mapDispatchToProps)(Register);
