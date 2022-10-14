import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { delProductImg } from "../AppApi";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Grid from '@material-ui/core/Grid';
import Toolbar from "@material-ui/core/Toolbar";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";


const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: "auto",
    width: "auto",
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  appBar: {
    position: "relative",
    backgroundColor: "#313532"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  image:{
    objectFit: "contain",
    height: "100%",
    minWidth: "240px"

  },
  gridlistitem: {
    // margin: "5px",
    padding: "5px",
    height: "100%"
  },
  tilebar: {
    backgroundColor: "#00000000",
    display: "flex",
    justifyContent: "center"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const [selectedTile, setSelectedTile] = React.useState(null);
  const [value, setValue] = React.useState([]);

  const handleClickOpen = tile => {
    setSelectedTile(tile);
  };

  const handleClose = () => {
    setSelectedTile(null);
  };

  const [dummy, setDummy] = useState(0)

  useEffect(() => {

  }, [dummy])

  const findIndex = (id) => {
    for (var i = 0; i < props.data.length; i++) {
          if (props.data[i].id===id) {
            return i;
          }    
      }
  }

  const deleteImg = async (prd_id,img_id) => {
      props.data.splice(findIndex(img_id), 1)
      setDummy(img_id)
      const res = await delProductImg(prd_id,img_id);
  }

  return (
    <div className={classes.root}>
      <div className={classes.gridList}>        
        {props.data.map(tile => (
          <Grid item xs={6} md={3}>
          <GridListTile key={tile.id} className={classes.gridlistitem}>
            <img src={tile.thumbnail} alt={tile.product_id} className={classes.image}/>
            <GridListTileBar              
              className={classes.tilebar}
              actionIcon={
                <>
                  <Button variant="contained" size="small" startIcon={<DeleteIcon />} style={{margin: "0 20px 15px 0px"}} onClick={() => { deleteImg(tile.product_id,tile.id)}}>DELETE</Button>
                </>
              }
            />
          </GridListTile>
          </Grid>
        ))}
{/*          <GridListTile key={"12312"} className={classes.gridlistitem}>
            <Button variant="contained" className={classes.image} onClick={() => { uploadImg(tile.product_id,tile.id)}}>
              <AddToPhotosIcon  fontSize="large"/>
            </Button>
          </GridListTile>*/}
      </div>
{/*      <Dialog
        fullScreen
        open={selectedTile !== null}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {selectedTile && (
          <img src={selectedTile.image} alt={selectedTile.id} />
        )}
      </Dialog>*/}
    </div>
  );
}
