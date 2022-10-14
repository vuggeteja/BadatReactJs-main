import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import CallIcon from "@material-ui/icons/Call";
import ChatIcon from "@material-ui/icons/Chat";
import PagesIcon from "@material-ui/icons/Pages";
import Chip from "@material-ui/core/Chip";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { SimpleDialog } from "./OrderDetailsDialog";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 350,
    margin: "10px 10px",
    padding: 10,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 10,
  },
  pos: {
    marginBottom: 12,
  },
  icons: {
    fontSize: 30,
    color: "#000",
  },
  amount: {
    backgroundColor: "#0cbbf022",
    color: "#0cbbf0",
  },
  items: {
    backgroundColor: "#0cf02a22",
    color: "#0cf02a",
  },
  status: {
    backgroundColor: "#dedcd7",
    color: "#666666",
  },
  declinebtn: {
    backgroundColor: "#CF352E22",
    color: "#8b0000",
  },
  acceptbtn: {
    backgroundColor: "#0cf02a22",
    color: "#0cf02a",
  },
  chipGroup: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  cardContentGrp: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  cardTitle: {
    display: "flex",
    flexDirection: "column",
  },
  cardContentMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mobilePop: {
    padding: 10,
  },
  button: {
    fontSize: 12,
    marginBottom: 10,
    textTransform: "capitalize",
  },
});

export default function RecievedOrderCard(props) {
  const classes = useStyles();
  const dateTime = moment(props.value.updated_at).format("DD/MM/YYYY - h:mm a");
  const items = props.value.items.length;
  var totalPrice = 0;
  for (var i = 0; i < items; i++) {
    totalPrice =
      totalPrice + props.value.items[i].price * props.value.items[i].quantity;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigator.clipboard.writeText(props.value.vendor.mobile);
    setOpenSnack(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "mobile-popover" : undefined;

  const [openSnack, setOpenSnack] = React.useState(false);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("empty");

  const orderDetails = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (value) => {
    setOpenDialog(false);
    setSelectedValue(value);
  };

  return (
    <Paper className={classes.root}>
      <CardContent className={classes.cardContentMain}>
        <Box component="div" m={1} className={classes.cardContentGrp}>
          <div
            style={{
              fontSize: 12,
              border: "1px solid gray",
              borderRadius: 10,
              padding: "5px 10px 5px 10px",
            }}
          >
            Placed
          </div>
          <Box component="div" className={classes.cardTitle}>
            <Typography style={{ fontSize: 12 }}>
              Order: #{props.value.id}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {dateTime}
            </Typography>
          </Box>
          <Button
            color="primary"
            style={{
              fontWeight: "bold",
              marginRight: 15,
              fontSize: 12,
              textTransform: "capitalize",
            }}
            onClick={orderDetails}
          >
            Details
          </Button>
        </Box>
        <br />
        <Box component="div" m={1}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              aria-describedby={id}
              onClick={handleClick}
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CallIcon />}
            >
              Call Seller
            </Button>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography className={classes.mobilePop}>
                {props.value.vendor.mobile}
              </Typography>
            </Popover>

            <Button
              aria-describedby={id}
              variant="outlined"
              color="primary"
              className={classes.button}
              startIcon={<ChatIcon />}
            >
              Message Seller
            </Button>
          </ButtonGroup>
        </Box>
        <br />
        <Box component="div" m={1} className={classes.chipGroup}>
          <Chip
            label={`Rs. ${totalPrice}`}
            className={classes.amount}
            onClick={orderDetails}
          />
          <Chip
            label={`Items: ${items}`}
            className={classes.items}
            onClick={orderDetails}
          />
          <Chip
            label={props.value.status}
            className={classes.status}
            onClick={orderDetails}
          />
        </Box>
      </CardContent>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        message={`${props.value.vendor.mobile} copied to clipboard`}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <SimpleDialog
        selectedValue={selectedValue}
        type="none"
        open={openDialog}
        data={props.value}
        date={dateTime}
        onClose={handleCloseDialog}
        itemsCount={items}
        totPrice={totalPrice}
      />
    </Paper>
  );
}
