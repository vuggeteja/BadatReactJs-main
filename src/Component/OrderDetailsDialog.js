import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { declineOrder, acceptOrder, getOrderById } from "../AppApi";

const useStyles = makeStyles({
  declinebtn: {
    backgroundColor: "#CF352EBA",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#CF352E",
      color: "#fff",
    },
  },
  acceptbtn: {
    backgroundColor: "#0bf036cf",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0bf036",
      color: "#fff",
    },
  },
});

export const SimpleDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const [orderDetails, setOrderDetails] = useState();
  useEffect(() => {
    async function fetchData() {
      const res = await getOrderById(props.data.id);
      setOrderDetails(res);
    }
    fetchData();
  }, []);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle id="simple-dialog-title">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          Order Details
          <IconButton onClick={handleClose}>
            <CloseIcon color="primary" />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      {props.data.status == "Placed" ? (
        <CardButtons type={props.type} data_id={props.data.id} />
      ) : (
        ""
      )}
      <Divider style={{ height: 3 }} />
      <List>
        <ListItem button>
          <ListItemText>
            <Typography style={{ fontWeight: "bold" }}>
              {" "}
              Order Number{" "}
            </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>#{props.data.id}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Typography style={{ fontWeight: "bold" }}> Total Item </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>{props.itemsCount}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={handleClose}>
          <ListItemText>
            <Typography style={{ fontWeight: "bold" }}>
              {" "}
              Order Amount{" "}
            </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>{props.totPrice}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Typography style={{ fontWeight: "bold" }}> Date </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>{props.date}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button style={{ marginBottom: 10 }}>
          <ListItemText>
            <Typography style={{ fontWeight: "bold" }}> Status </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>{props.data.status}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider style={{ height: 3 }} />
        <ListItem button>
          <ListItemText>
            <Typography style={{ fontWeight: "bold" }}> Buyer </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>
              {orderDetails
                ? `${orderDetails.user.name} | ${orderDetails.user.business_name}`
                : ""}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button>
          <ListItemText>
            <Typography style={{ fontWeight: "bold" }}> Seller </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            {orderDetails ? (
              <Typography>
                {orderDetails.items[0].product.user.name} |{" "}
                {orderDetails.items[0].product.user.business_name}
              </Typography>
            ) : (
              ""
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button style={{ marginBottom: 10, height: 95 }}>
          <ListItemText>
            <Typography style={{ fontWeight: "bold" }}>
              {" "}
              Buyer Address{" "}
            </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography>
              {" "}
              {orderDetails
                ? `${orderDetails.user.address}\n${orderDetails.user.city} , ${orderDetails.user.district}\n${orderDetails.user.state} , ${orderDetails.user.pincode}`
                : ""}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider style={{ height: 3 }} />
        {orderDetails ? (
          orderDetails.items.map((item) => (
            <ItemList item={item} key={item.id} />
          ))
        ) : (
          <CircularProgress />
        )}
      </List>
      <List style={{ padding: 20, marginBottom: 10 }}>
        <Typography style={{ color: "red", fontWeight: "bold" }}>
          {" "}
          Note:{" "}
        </Typography>
        <ListItem>
          1. All payment & Delivery terms will be discussed between buyers and
          sellers
        </ListItem>
        <ListItem>2. Badhat helps in connecting & booking orders only</ListItem>
        <ListItem>
          3. Badhat does not offer any kind of assurance on products
        </ListItem>
      </List>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const ItemList = (props) => {
  const history = useHistory();
  const productPage = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <ListItem
      button
      onClick={() => {
        productPage(props.item.product.id);
      }}
    >
      <ListItemText>
        <Typography style={{ fontWeight: "bold" }}>
          {" "}
          {props.item.product
            ? `${props.item.product.name} - Rs ${props.item.price} per quantity`
            : "Item not found"}{" "}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <Typography>{props.item.quantity}</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export const CardButtons = (props) => {
  const classes = useStyles();
  const [reload, setreload] = useState(false);

  useEffect(() => {}, [reload]);

  const declineOrderClick = async () => {
    const res = await declineOrder(props.data_id);
    window.location.reload();
    setreload(true);
  };
  const acceptOrderClick = async () => {
    const res = await acceptOrder(props.data_id);
    window.location.reload();
    setreload(true);
  };
  return (
    <CardActions
      style={{ display: "flex" }}
      //className={props.type === "none" ? "d-none" : "d-block"}
    >
      <Button
        style={{ width: 160 }}
        size="medium"
        className={classes.declinebtn}
        onClick={declineOrderClick}
      >
        Decline
      </Button>
      <Button
        style={{ width: 160 }}
        size="medium"
        className={classes.acceptbtn}
        onClick={acceptOrderClick}
      >
        Accept
      </Button>
    </CardActions>
  );
};
