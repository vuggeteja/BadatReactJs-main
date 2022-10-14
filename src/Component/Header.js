import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Badge,
  Paper,
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ListItemText from "@material-ui/core/ListItemText";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Popover from "@material-ui/core/Popover";
import DehazeIcon from "@material-ui/icons/Dehaze";
// import ClearIcon from "@material-ui/icons/Clear";
import { cartItemCountHandle } from "../AppRedux/Action/CartItemCount";
// import SystemUpdateOutlinedIcon from "@material-ui/icons/SystemUpdateOutlined";
// import { Button } from "@material-ui/core";
import Logo from "../AppAsset/Badhat App Icon.jpg";
import { ROUTE_CART, ROUTE_ALL_PRODUCT, ROUTE_LOGIN } from "../Constant";
import "../AppAsset/CSS/Header.css";
import { getAppState, getMyProducts, markAsRead } from "../AppApi";
import { installOurApp, handleLogout, checkLogin } from "../Util";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "4px 15px",
    display: "flex",
    borderRadius: "25px",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(-1),
    flex: 1,
  },
  iconButton: {
    padding: 0,
    marginRight: -15,
    [theme.breakpoints.up("sm")]: {
      padding: 0,
      marginRight: -5,
    },
  },
  divider: {
    height: 28,
    margin: 0,
  },
  //
  grow: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
    flexDirection: "column",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 10,
    marginLeft: -10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "35%",
    },
  },
  //   input: {
  //     marginLeft: theme.spacing(1),
  //     flex: 1,
  //   },
  // iconButton: {
  //   padding: 10,
  // },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "flex",
  },
  sellButton: {
    marginLeft: "5%",
    marginRight: "1%",
  },
  loginButton: {
    marginLeft: "-5%",
    marginRight: "0px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "5px",
      marginRight: "2px",
    },
  },
  homelabel: {
    fontSize: "10px",
    paddingTop: "5px",
    fontWeight: "500",
  },
  myOrderButton: {
    display: "flex",
    marginLeft: "5%",
    marginRight: "-10px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "5px",
      marginRight: "2px",
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Header = ({ history, cartCount, login, cartItemCount }) => {
  const [search, setSearch] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    async function fetchData() {
      const login = await checkLogin();
      if (login) {
        getCartCount();
        const data = await getAppState();
        setNotificationCount(
          data.data.data.notification ? data.data.data.notification : 0
        );
      }
    }
    fetchData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickNotify = (event) => {
    history.push(`/notification`);
  };

  const getCartCount = () => {
    cartItemCount();
  };

  const onClickCartHandle = () => {
    history.push(`/${ROUTE_CART}`);
  };

  const onSaleClickHandle = () => {
    installOurApp(`Want to sell on Badhat at wholesale prices or in bulk? 
    Download Badhat app by clicking below`);
  };

  const onClickSearchHandle = () => {
    const tempString = `search=${search}&`;
    setSearch("");
    history.push(`/${ROUTE_ALL_PRODUCT}/${tempString}`);
  };

  const onChangeHandle = (e) => {
    setSearch(e.target.value);
  };
  const classes = useStyles();
  // const mobileMenuId = "primary-search-account-menu-mobile";

  const onLoginClickHandle = () => {
    history.push({
      pathname: `/${ROUTE_LOGIN}`,
      state: { fromLoginButton: true },
    });
  };

  const onMyProfileClickHandle = () => {
    handleClose();
    history.push("/profile");
  };

  const onMyProductsClickHandle = () => {
    handleClose();
    history.push("/products");
  };

  const onMyOrderClickHandle = () => {
    history.push("/order");
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClickHandle = () => {
    setAnchorEl(null);
    handleLogout();
    history.push(`/`);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const innerFunction = async () => {
      const { data } = await getMyProducts();
      if (data && data.data) {
        setProducts(data.data);
      }
    };
    innerFunction();
  }, []);

  return (
    <div className="HeaderContainer overflow-hidden">
      <Toolbar>
        <IconButton
          className="headerIconbtns"
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={() => history.push("/")}
        >
          <div
            style={{
              display: "flex",
              marginRight: 7,
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Avatar alt="logo" src={Logo} />
            <div style={{ marginTop: "-12px" }}>
              <span style={{ fontSize: "x-small" }}>Home</span>
            </div>
          </div>
        </IconButton>
        <Typography className={classes.title} variant="h5" noWrap>
          Badhat
        </Typography>
        <div className={classes.search}>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search Product"
              value={search}
              // defaultValue={search}
              // inputProps={{ "aria-label": "search" }}
              onChange={onChangeHandle}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              className={classes.iconButton}
              aria-label="search"
              onClick={onClickSearchHandle}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className={classes.grow} />
        {checkLogin() ? null : (
          <div
            className={classes.sellButton}
            onClick={() => onLoginClickHandle()}
          >
            <IconButton aria-label="sell">
              <span
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  fontSize: "large",
                  color: "black",
                  backgroundColor: "rgb(140, 223, 99)",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                Sell
              </span>
            </IconButton>
          </div>
        )}
        {checkLogin() ? null : (
          <div
            className={classes.loginButton}
            onClick={() => onLoginClickHandle()}
          >
            <IconButton aria-label="login">
              <span
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "black",
                  fontSize: "large",
                  backgroundColor: "rgb(140, 223, 99)",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                Login
              </span>
            </IconButton>
          </div>
        )}
        {!checkLogin() ? null : (
          <div className={classes.myOrderButton}>
            <IconButton
              aria-label="show new notifications"
              className="headerIconbtns"
              onClick={handleClickNotify}
            >
              <Badge badgeContent={notificationCount} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              className="headerIconbtns"
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <DehazeIcon />
                <div style={{ marginTop: "-15px" }}>
                  <span style={{ fontSize: "x-small" }}>More</span>
                </div>
              </div>
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                key="myProfile"
                onClick={() => onMyProfileClickHandle()}
              >
                My Profile
              </MenuItem>
              <MenuItem key="myOrder" onClick={() => onMyOrderClickHandle()}>
                Order Bookings
              </MenuItem>
              {products.length > 0 && (
                <MenuItem
                  key="myProducts"
                  onClick={() => onMyProductsClickHandle()}
                >
                  My Products
                </MenuItem>
              )}
              <MenuItem key="logOut" onClick={() => onLogoutClickHandle()}>
                Logout
              </MenuItem>
            </Menu>
            <div
              style={{ marginRight: 20 }}
              className={classes.sectionDesktop}
              onClick={() => onClickCartHandle()}
            >
              <IconButton aria-label="cart" className="headerIconbtns">
                {cartCount ? (
                  <StyledBadge badgeContent={cartCount} color="primary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                ) : (
                  <ShoppingCartIcon />
                )}
              </IconButton>
            </div>
          </div>
        )}
      </Toolbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartCount: state.CartItemCount.count,
    login: state.CartItemCount.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  cartItemCount: () => dispatch(cartItemCountHandle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
