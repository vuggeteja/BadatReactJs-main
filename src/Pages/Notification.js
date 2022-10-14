import React,{useState, useEffect} from 'react'
import {getNotifications,markAsRead} from "../AppApi";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
  	display: "flex",
  	flexDirection: "column",
  	alignItems: "center",
  	alignContent: "center",
    justifyContent: "center",
    marginTop: "20px"
  },
  title: {
  	fontSize: "30px"
  },
  nData: {
  	marginTop: "50px"
  }
}));

const Notification = () => {
	const classes = useStyles();
	const [notify, setNotifyData] = useState()

	useEffect(() => {
		async function fetchData(){
      		const res = await getNotifications();
      		setNotifyData(res);
      			
      		await markAsRead();
    	}
    	fetchData()
	},[]);

	return (
		<div className={classes.root}>
			<div className={classes.title}>Notifications</div>
			<div className={classes.nData}>
			    <List component="div">
			    	{notify?notify.data.map((item) => {
			    		return(
						<ListItem button>
      			    		<ListItemText primary={item.message} />
      			  		</ListItem>
			    	)}):<CircularProgress />}      			  
      			</List>
			</div>
		</div>
	)
}

export default Notification