import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RecievedOrderCard from "../Component/RecievedOrderCard";
import PlacedOrderCard from "../Component/PlacedOrderCard";
import { getOrderRecieved, getOrderPlaced } from "../AppApi";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { checkLogin } from "../Util";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles2 = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles2();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [OrderRecList, setOrderRecList] = useState([]);
  const [OrderPlacedList, setOrderPlacedList] = useState([]);

  const allItems = [
    ...OrderRecList.map((item) => ({ ...item, card: "REC" })),
    ...OrderPlacedList.map((item) => ({ ...item, card: "PLACED" })),
  ];

  allItems.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  useEffect(() => {
    async function fetchData() {
      const login = await checkLogin();
      if (!login) {
        window.location.href = "/login";
      }
      const res1 = await getOrderRecieved();
      const res2 = await getOrderPlaced();
      setOrderRecList(res1);
      setOrderPlacedList(res2);
    }
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {/* {OrderRecList.map((item) => (
          <RecievedOrderCard key={item.id} value={item} />
        ))}
        {OrderPlacedList.map((item) => (
          <PlacedOrderCard key={item.id} value={item} />
        ))} */}
        {allItems.map((item) => {
          if (item.card === "REC") {
            return <RecievedOrderCard key={item.id} value={item} />;
          } else {
            return <PlacedOrderCard key={item.id} value={item} />;
          }
        })}
      </Box>

      {/* <Paper position="static" color="default" >
        <Tabs
          fullWidth
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Recieved Order" {...a11yProps(0)} />
          <Tab label="Placed Order" {...a11yProps(1)} />
        </Tabs>
      </Paper>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            {OrderRecList.map(item => <RecievedOrderCard key={item.id} value={item} />)}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
              {OrderPlacedList.map(item => <PlacedOrderCard key={item.id} value={item} />)}
          </Box>
        </TabPanel> */}
    </div>
  );
}
