import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { delProduct } from "../AppApi";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";


const useStyles = makeStyles((theme) => ({
  root: {
  	minWidth: 270,
    maxWidth: 345,
    margin: "20px 10px"
  },
  media: {
    height: 140,
  },
  subitem: {
  	display: "flex",
  	flexDirection: "column"
  },
  CardAction:{
  	display: "flex",
  	justifyContent: "space-evenly"
  },
  linkStyle: {
  	textDecoration: 'none'
  },
  catColor: {
  	color: "#43a047"
  },
  delBtn: {
  	color: "#dd2c00",
  	float: "right"
  },
  shareBtnAlign: {
  	display: "flex",
  	justifyContent: "space-between"
  },
  shareBtnCover: {
  	backgroundColor: "#e3d3d3",
  	alignSelf: "flex-end",
  	marginLeft: "20px",
    borderRadius: "20px"
  	//padding: "2px 8px",
  	//height: "min-content",
  },
  shareBtn: {
  	marginRight: "5px"
  },
  mdlPaper: {
    position: 'absolute',
    color: "#ffffff",
    // width: 400,
    backgroundColor: "#424242",
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mdlAlign: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  socialBtns: {
    margin: "0px 10px"
  }
}));

export default function MyProductCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDeleteClick = async () => {
  	const res = await delProduct(props.product.id);
  	window.location.reload();
  }

  //const url = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/product/"+props.product.id
  const url = window.location.protocol+"//"+window.location.hostname+"/product/"+props.product.id;

  const body = (
    <div className={classes.mdlPaper}>
      <h2 id="simple-modal-title">{`Share - ${props.product.name}`}</h2>
      <div>
        <FacebookShareButton
          className={classes.socialBtns}
          url={url}
          quote={`Checkout this product in badhat`}>
          <FacebookIcon size={32} round={true}/>
        </FacebookShareButton>

        <TwitterShareButton
          className={classes.socialBtns}
          url={url}
          hashtags={["badhat"]}
          title={`Checkout this product in badhat`}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <EmailShareButton
          className={classes.socialBtns}
          subject={`Check out the product in badhat`}
          body={`${url}`}>
          <EmailIcon size={32} round={true}/>
        </EmailShareButton>

        <LinkedinShareButton
          className={classes.socialBtns}
          url={url}
          summary={props.product.name}
          title={`Checkout this product in badhat`}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>

        <TelegramShareButton
          className={classes.socialBtns}
          url={url}
          title={`Checkout this product in badhat`}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>

        <RedditShareButton
          className={classes.socialBtns}
          url={url}
          title={`Checkout this product in badhat`}>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>

        <WhatsappShareButton
          className={classes.socialBtns}
          url={url}
          separator=" || "
          title={`Checkout this product in badhat`}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );

  return (
  <div>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
        //   image={props.product.images.[0]?props.product.images.[0].thumbnail:"./default-img.jpg"}
          title={props.product.name}
        />
        <CardContent>
    	    	<Typography gutterBottom variant="h5" component="h2">
	        	    {props.product.name}
          		</Typography>
        	<div className={classes.shareBtnAlign}>
          <div className={classes.subitem}>
	        	<Typography variant="body2" className={classes.catColor} component="div">
            		<b>Category: {props.product.category?.name}</b>
          		</Typography>
          		<Typography variant="body2" component="div">
            		Rs. {props.product.price}
          		</Typography>
          		<Typography variant="body2" component="div">
            		MOQ: {props.product.moq}
          		</Typography>
          </div>
          	<Button variant="contained" onClick={handleOpen}  className={classes.shareBtnCover} startIcon={<ShareIcon fontSize="small" />}>
              Share
            </Button>
			</div>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.CardAction}>
      	<Link to={`/products/edit/${props.product.id}`} className={classes.linkStyle}>
        	<Button size="small" color="primary">
        	  	Edit
        	</Button>
        </Link>
        <Link to={`/product/${props.product.id}`} className={classes.linkStyle}>
        	<Button size="small" color="primary">
        		View
        	</Button>
        </Link>
        	<Button size="small" className={classes.delBtn} onClick={onDeleteClick}>
        		Delete
        	</Button>
      </CardActions>
    </Card>
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.mdlAlign}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  </div>
  );
}
