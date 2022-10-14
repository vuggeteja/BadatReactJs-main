import React, { useEffect, useState } from "react";
//import LoadingOverlay from "react-loading-overlay";
import {
  getMyDetail,
  getCategory,
  getState,
  getDistrict,
  getPincodeData,
  updateProfile,
} from "../AppApi";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { checkLogin } from "../Util";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: 100,
    height: 100,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
}));

const URA = [
  {
    value: "None",
    label: "None",
  },
  {
    value: "Retail",
    label: "Retail",
  },
  {
    value: "Distributer",
    label: "Distributer",
  },
  {
    value: "Stockist",
    label: "Stockist",
  },
  {
    value: "Manufacturer",
    label: "Manufacturer",
  },
  {
    value: "Wholeseller",
    label: "Wholeseller",
  },
  {
    value: "Agent",
    label: "Agent",
  },
  {
    value: "Brand",
    label: "Brand",
  },
  {
    value: "Supplier",
    label: "Supplier",
  },
  {
    value: "OnlineSeller",
    label: "OnlineSeller",
  },
  {
    value: "Reseller",
    label: "Reseller",
  },
];

const yearsData = [];

for (let i = 1900; i < 2021; i++) {
  yearsData.push(i);
}

const UserDetails = () => {
  const [user, setUser] = useState({ load: true, data: {} });
  const [updateUser, setUpdate] = useState({ data: user.data });
  const [stateData, setStateData] = useState();
  const [districtData, setDistrictData] = useState();
  const [categoryData, setCategory] = useState([]);
  const [backdrop, setBackdrop] = useState(user.load);
  const [error, seterror] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setname] = useState();
  const [about_us, setabout_us] = useState();
  const [address, setaddress] = useState();
  const [business_category, setbusiness_category] = useState(0);
  const [business_name, setbusiness_name] = useState();
  const [business_type, setbusiness_type] = useState();
  const [city, setcity] = useState();
  const [created_at, setcreated_at] = useState();
  const [delivery_policy, setdelivery_policy] = useState();
  const [discount_upto, setdiscount_upto] = useState();
  const [district, setdistrict] = useState();
  const [email, setemail] = useState();
  const [gstin, setgstin] = useState();
  //const [image, setimage] = useState()
  const [payment_policy, setpayment_policy] = useState();
  const [pincode, setpincode] = useState();
  const [return_policy, setreturn_policy] = useState();
  const [started_since, setstarted_since] = useState();
  const [state, setstate] = useState();
  const [image, setImage] = useState(0);

  const [mos, setMos] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const login = await checkLogin();
      if (!login) {
        window.location.href = "/login";
      }
      const res = await getMyDetail();
      const categoryDatares = await getCategory();
      const stateres = await getState();
      if (res) var districtres = await getDistrict(res.state);
      setUser({ load: false, data: res });
      setBackdrop(false);
      setUpdate({ data: res });
      setCategory(categoryDatares.data.data);
      setStateData(stateres);
      setDistrictData(districtres);
      setname(res.name == null ? "" : res.name);
      setemail(res.email == null ? "" : res.email);
      setgstin(res.gstin == null ? "" : res.gstin);
      setMos(res.minimum_order_size == null ? 0 : res.minimum_order_size);
      setbusiness_name(res.business_name == null ? "" : res.business_name);
      setbusiness_category(res.business_category);
      setbusiness_type(res.business_type);
      setaddress(res.address == null ? "" : res.address);
      setcity(res.city == null ? "" : res.city);
      setdistrict(res.district);
      setstate(res.state);
      setpincode(res.pincode);
      setstarted_since(res.started_since);
      setdiscount_upto(res.discount_upto == null ? "" : res.discount_upto);
      setreturn_policy(res.return_policy == null ? "" : res.return_policy);
      setpayment_policy(res.payment_policy == null ? "" : res.payment_policy);
      setdelivery_policy(
        res.delivery_policy == null ? "" : res.delivery_policy
      );
      setabout_us(res.about_us == null ? "" : res.about_us);
    }
    fetchData();
  }, []);

  const handlePincode = async (pincode) => {
    const res = await getPincodeData(pincode);
  };

  const handleChange = (event) => {
    updateUser.data.ura = event.target.value;
  };

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const datasub = [];
  const ressub = [];

  const handleStateChange = async (newstate) => {
    setdistrict(null);
    seterror(true);
    setDistrictData(null);
    const districtres = await getDistrict(newstate);
    setDistrictData(districtres);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!error) {
      setBackdrop(true);
      setEdit(false);
      var dataset = {
        id: user.data.id,
        name: name,
        email: email,
        gstin: gstin,
        minimum_order_size: mos,
        business_name: business_name,
        business_category: business_category,
        business_type: business_type,
        address: address,
        city: city,
        district: district,
        state: state,
        pincode: pincode,
        started_since: started_since,
        mobile: user.data.mobile,
        discount_upto: discount_upto,
        return_policy: return_policy,
        payment_policy: payment_policy,
        delivery_policy: delivery_policy,
        about_us: about_us,
      };

      const res = await updateProfile(
        dataset,
        image,
        user.data.id,
        user.data.mobile,
        datasub,
        ressub
      );
    }
  };

  const onEditSave = (e) => {
    if (edit) {
      handleSubmit(e);
    }
    setEdit(true);
  };

  return (
    <Container component="main" maxWidth="lg">
      {user.load ? (
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <div>
          <CssBaseline />
          <div className={classes.paper}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div>
                {user.data.image ? (
                  <Avatar className={classes.avatar} src={user.data.image} />
                ) : (
                  <Avatar className={classes.avatar}>
                    {" "}
                    {user.data.name ? user.data.name : "Z"}{" "}
                  </Avatar>
                )}

                <Button
                  variant="contained"
                  color={image == 0 ? "primary" : "inherit"}
                  component="label"
                  disabled={!edit}
                  style={{ marginBottom: 20 }}
                >
                  {image == 0 ? "Select Image" : "Image Selected"}
                  <input
                    type="file"
                    accept="image/*"
                    type="file"
                    onChange={onFileChange}
                    hidden
                  />
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color={"primary"}
                  component="label"
                  onClick={(e) => {
                    onEditSave(e);
                  }}
                >
                  {edit ? "Save" : "Edit"}
                </Button>
              </div>
            </div>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    defaultValue={user.data.name}
                    onChange={(e) => {
                      datasub.push("name");
                      ressub.push(e.target.value);
                      setname(e.target.value);
                    }}
                    fullWidth
                    id="name"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    value={user.data.mobile}
                    disabled
                    fullWidth
                    id="mobileno"
                    name="mobileno"
                    autoComplete="mobile"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="email"
                    name="email"
                    variant="outlined"
                    disabled={!edit}
                    defaultValue={user.data.email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    fullWidth
                    id="email"
                    label="E-mail"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    autoComplete="gst"
                    name="gstin"
                    variant="outlined"
                    defaultValue={user.data.gstin}
                    onChange={(e) => {
                      datasub.push("gstin");
                      ressub.push(e.target.value);
                      setgstin(e.target.value);
                    }}
                    fullWidth
                    id="gstin"
                    label="GSTIN"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    variant="outlined"
                    required
                    fullWidth
                    defaultValue={user.data.business_name}
                    onChange={(e) => {
                      datasub.push("business_name");
                      ressub.push(e.target.value);
                      setbusiness_name(e.target.value);
                    }}
                    id="shopname"
                    label="Shop/Business Name"
                    name="shopname"
                    autoComplete="shop"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    name="started_since"
                    variant="outlined"
                    type="number"
                    select
                    defaultValue={user.data.started_since}
                    onChange={(e) => {
                      datasub.push("started_since");
                      ressub.push(e.target.value);
                      setstarted_since(e.target.value);
                    }}
                    fullWidth
                    id="started_since"
                    label="Business started in"
                  >
                    {yearsData.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    id="businessd"
                    select
                    required
                    fullWidth
                    label="Business Domain"
                    defaultValue={user.data.business_category}
                    onChange={(e) => {
                      datasub.push("business_category");
                      ressub.push(e.target.value);
                      setbusiness_category(e.target.value);
                    }}
                    helperText="Please select your business category"
                    variant="outlined"
                  >
                    {categoryData.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    id="ura"
                    select
                    required
                    fullWidth
                    displayEmpty
                    label="You are a"
                    defaultValue={
                      user.data.business_type ? user.data.business_type : "None"
                    }
                    onChange={(e) => {
                      datasub.push("business_type");
                      ressub.push(e.target.value);
                      setbusiness_type(e.target.value);
                    }}
                    helperText="Please select your business type"
                    variant="outlined"
                  >
                    {URA.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    variant="outlined"
                    fullWidth
                    defaultValue={user.data.address}
                    onChange={(e) => {
                      datasub.push("address");
                      ressub.push(e.target.value);
                      setaddress(e.target.value);
                    }}
                    name="shopstreet"
                    label="Shop/House No. & Street Name"
                    id="shopstreet"
                    autoComplete="Street"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    variant="outlined"
                    fullWidth
                    defaultValue={user.data.city}
                    onChange={(e) => {
                      datasub.push("city");
                      ressub.push(e.target.value);
                      setcity(e.target.value);
                    }}
                    name="cityarea"
                    label="City/Town/Village Area"
                    id="cityarea"
                    autoComplete="City"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: 999999,
                        min: 100000,
                      },
                    }}
                    defaultValue={user.data.pincode}
                    onChange={(e) => {
                      datasub.push("pincode");
                      ressub.push(e.target.value);
                      setpincode(e.target.value);
                    }}
                    name="pincode"
                    label="Pincode"
                    id="pincode"
                    autoComplete="Pincode"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    variant="outlined"
                    fullWidth
                    error={district ? false : true}
                    helperText={district ? null : "required"}
                    required
                    select
                    defaultValue={user.data.district}
                    onChange={(e) => {
                      datasub.push("district");
                      ressub.push(e.target.value);
                      setdistrict(e.target.value);
                      seterror(false);
                    }}
                    name="district"
                    label="District"
                    id="district"
                  >
                    {districtData ? (
                      districtData.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem key={"none"} value={null}>
                        None
                      </MenuItem>
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    variant="outlined"
                    fullWidth
                    select
                    required
                    defaultValue={user.data.state}
                    onChange={(e) => {
                      datasub.push("state");
                      ressub.push(e.target.value);
                      setstate(e.target.value);
                      handleStateChange(e.target.value);
                    }}
                    name="state"
                    label="State"
                    id="state"
                    autoComplete="State"
                  >
                    {stateData ? (
                      stateData.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem key="none" value={null}>
                        None
                      </MenuItem>
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    id="about_us"
                    defaultValue={user.data.about_us}
                    fullWidth
                    label="About us"
                    multiline
                    rows={3}
                    onChange={(e) => {
                      datasub.push("about_us");
                      ressub.push(e.target.value);
                      setabout_us(e.target.value);
                    }}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!edit}
                    name="minimum_order_size"
                    variant="outlined"
                    defaultValue={user.data.minimum_order_size}
                    onChange={(e) => {
                      datasub.push("minimum_order_size");
                      ressub.push(e.target.value);
                      setMos(e.target.value);
                    }}
                    fullWidth
                    type="number"
                    id="minimum_order_size"
                    label="Minimum Order Size (Rs.)"
                  />
                </Grid>
                {!["None", "Retail", "OnlineSeller", "Reseller"].includes(
                  business_type
                ) &&
                  business_type && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          disabled={!edit}
                          id="discount_upto"
                          defaultValue={user.data.discount_upto}
                          fullWidth
                          multiline
                          rows={3}
                          label="Discount policy"
                          onChange={(e) => {
                            setdiscount_upto(e.target.value);
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          disabled={!edit}
                          id="return_policy"
                          defaultValue={user.data.return_policy}
                          fullWidth
                          label="Return policy"
                          multiline
                          rows={3}
                          onChange={(e) => {
                            datasub.push("return_policy");
                            ressub.push(e.target.value);
                            setreturn_policy(e.target.value);
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          disabled={!edit}
                          id="payment_policy"
                          defaultValue={user.data.payment_policy}
                          fullWidth
                          label="Payment policy"
                          multiline
                          rows={3}
                          onChange={(e) => {
                            datasub.push("payment_policy");
                            ressub.push(e.target.value);
                            setpayment_policy(e.target.value);
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          disabled={!edit}
                          id="delivery_policy"
                          defaultValue={user.data.delivery_policy}
                          fullWidth
                          label="Delivery Time and Charges"
                          multiline
                          rows={3}
                          onChange={(e) => {
                            datasub.push("delivery_policy");
                            ressub.push(e.target.value);
                            setdelivery_policy(e.target.value);
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </>
                  )}
              </Grid>
            </form>
            <Backdrop className={classes.backdrop} open={backdrop}>
              <CircularProgress />
            </Backdrop>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserDetails;
