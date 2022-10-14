import React, { Component } from "react";
import Category from "../Component/Category";
import {
  loginPopUp,
  checkSkip,
  checkLogin,
  checkBadatExpiration,
} from "../Util";
import { Helmet } from "react-helmet";
import Footer from "../Component/Footer";
import Logo from "../AppAsset/Badhat App Icon.jpg";
import Fab from "@material-ui/core/Fab";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Link } from 'react-router-dom';
import "../AppAsset/CSS/common.css";

class Homepage extends Component {
  render() {
    if (
      (!checkLogin() && !checkSkip()) ||
      (!checkLogin() && !checkBadatExpiration())
    ) {
      //loginPopUp(this.props.history);
    }
    return (
      <>
        <Helmet>
          <title>Badhat</title>
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
        <Fab
          variant="extended"
          size="small"
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
        {checkLogin()?
      <Snackbar
        className="Snackbar-br"
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        open={true}
        key={"bottom right"}
      >
        <Link to="/products/new" className="linkStyle">
          <Button variant="contained" className="addprdBTN" color="primary" startIcon={<AddIcon />}>
            Save Product
          </Button>
        </Link>
      </Snackbar>
      :""}

        <Category />

        <Footer />
      </>
    );
  }
}

export default Homepage;
