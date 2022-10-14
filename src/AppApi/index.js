import axios from "axios";
import {
  BASE_URL,
  //NEW_BASE_URL,
  ENDPOINT_CATEGORIES,
  ENDPOINT_GET_SUBCATEGORIES,
  ENDPOINT_GET_VERTICAL_CATEGORIES,
  ENDPOINT_GET_PRODUCTS,
  ENDPOINT_GET_PRODUCT_DETAIL,
  ENDPOINT_SEND_OTP,
  ENDPOINT_LOGIN,
  ENDPOINT_ADD_TO_CART,
  ENDPOINT_GET_CART_DATA,
  ENDPOINT_DELETE_CART_DATA,
  ENDPOINT_REGISTER_USER,
  ENDPOINT_SUB_QUANTITY_FROM_CART,
  ENDPOINT_PLACE_ORDER,
  ENDPOINT_GET_SELLER_DETAIL,
  ENDPOINT_GET_STATES,
  ENDPOINT_GET_DISTRICT,
  ENDPOINT_QUANTITY,
  //ENDPOINT_GET_TRUECALLER_RESPONSE,
} from "../Constant";
import Swal from "sweetalert2";
import { storeToken, storeId } from "../Util";
const TOKEN = JSON.parse(localStorage.getItem("badhat_token"));

export const getCategory = async () => {
  const res = await axios.get(BASE_URL + ENDPOINT_CATEGORIES);
  return res;
};

export const getQuantity = async () => {
  const res = await axios.get(BASE_URL + ENDPOINT_QUANTITY);
  return res;
};

export const getSubCategory = async (id) => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_SUBCATEGORIES + "/" + id);
  return res;
};

export const getVerticalCategory = async (id) => {
  const res = await axios.get(
    BASE_URL + ENDPOINT_GET_VERTICAL_CATEGORIES + "/" + id
  );
  console.log('ressssssssssssssssssssssssss', res);
  return res;
};

export const getProducts = async (params) => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_PRODUCTS, {
    params,
  });
  return res;
};

export const getProductDetail = async (id) => {
  const res = await axios.get(
    BASE_URL + ENDPOINT_GET_PRODUCT_DETAIL + "/" + id
  );
  return res;
};

export const sendMobileNumber = async (mobile) => {
  let body = {
    mobile: mobile,
  };
  const res = await axios.post(BASE_URL + ENDPOINT_SEND_OTP, body);
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const sendOtp = async (mobile) => {
  console.log('mobileeeeeeeeeeeeeeeeee', mobile)
  let body = {
    mobile: mobile,
  };
  const res = await axios.post(BASE_URL + ENDPOINT_LOGIN, body);
  console.log('ressssssssssssssssttttttttttttttttt  ', res)

  if (res.status === 200) {
console.log('ressssssssssssssss', res)
    storeToken(res.data.data.access_token);
    storeId(res.data.data.user.id);
    return res;
  } else {
    return false;
  }
};

export const login = async () => {
  await Swal.fire({
    text: "Enter your mobile number to continue",
    input: "number",
    inputAttributes: {
      autocapitalize: "off",
    },
    confirmButtonText: "Request OTP",
    showLoaderOnConfirm: true,
    preConfirm: (number) => {
      return sendMobileNumber(number);
    },
  });
};

export const addToCartApi = async (body) => {
  const res = await axios.post(BASE_URL + ENDPOINT_ADD_TO_CART, body, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res;
};

export const getCartData = async () => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_CART_DATA, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data.data;
};

export const deleteCartData = async (id) => {
  await axios.delete(`${BASE_URL + ENDPOINT_DELETE_CART_DATA}/${id}`, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
};

export const registerUser = async (body) => {
  const res = await axios.post(BASE_URL + ENDPOINT_REGISTER_USER, body);
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const placeOrder = async (body) => {
  const res = await axios.get(BASE_URL + ENDPOINT_PLACE_ORDER, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const getSellerDetail = async (id) => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_SELLER_DETAIL + id);
  return res.data.data;
};

export const getMyDetail = async () => {
  const TOKEN_live = JSON.parse(localStorage.getItem("badhat_token"));
  const res = await axios.get("https://badhat.club/api/userProfile", {
    headers: {
      Authorization: "Bearer " + TOKEN_live,
    },
  });
  console.log(res.data.data);
  return res.data.data;
};
getMyDetail();
export const removeFromCart = async (id) => {
  let body = {
    cart_id: id,
  };
  const res = await axios.post(
    BASE_URL + ENDPOINT_SUB_QUANTITY_FROM_CART,
    body,
    {
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    }
  );
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const getState = async () => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_STATES);
  return res.data.data;
};

export const getDistrict = async (state) => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_DISTRICT + state);
  return res.data.data;
};

export const getBanner = async (endpoint, id) => {
  let res;
  if (!id) {
    res = await axios.get(BASE_URL + endpoint);
  } else {
    res = await axios.get(BASE_URL + endpoint + id);
  }
  return res.data.data;
};

export const getTruecallerResponse = async (id) => {
  const res = await axios.get(
    "https://badhat.club/api/truecaller-response/" + id
  );
  return res.data;
};

export const getOrderRecieved = async (body) => {
  const res = await axios.get(BASE_URL + "receivedOrders", {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data.data;
};

export const getOrderPlaced = async (body) => {
  const res = await axios.get(BASE_URL + "placedOrders", {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data.data;
};

export const acceptOrder = async (id) => {
  const res = await axios.get(BASE_URL + "acceptOrder/" + id, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data;
};

export const declineOrder = async (id) => {
  const res = await axios.get(BASE_URL + "cancelOrder/" + id, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await axios.get(BASE_URL + "order/" + id, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data.data;
};

export const updateProfile = async (dataset, file) => {
  var data = new FormData();
  data.append("id", dataset.id);
  data.append("name", dataset.name);
  data.append("email", dataset.email);
  data.append("gstin", dataset.gstin);
  data.append("business_name", dataset.business_name);
  data.append("business_category", dataset.business_category);
  data.append("business_type", dataset.business_type);
  data.append("address", dataset.address);
  data.append("city", dataset.city);
  data.append("district", dataset.district);
  data.append("state", dataset.state);
  data.append("lol", "lol");
  data.append("pincode", dataset.pincode);
  data.append("started_since", dataset.started_since);
  data.append("mobile", dataset.mobile);
  data.append("discount_upto", dataset.discount_upto);
  data.append("return_policy", dataset.return_policy);
  data.append("payment_policy", dataset.payment_policy);
  data.append("delivery_policy", dataset.delivery_policy);
  data.append("about_us", dataset.about_us);
  if (file != 0) data.append("image", file);

  var config = {
    method: "post",
    url: "https://badhat.club/api/updateProfile",
    headers: {
      Authorization: "Bearer " + TOKEN,
      "content-type": "multipart/form-data",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      window.location.href = "/profile";
    })
    .catch(function (error) {
      console.log(error);
    });
};

//updateProfile(416)

export const addProduct = async (dataset, files) => {
  if (
    dataset.name === null ||
    dataset.verticalId === null ||
    dataset.subCategoryId === null ||
    dataset.categoryId === null ||
    dataset.description === null ||
    dataset.moq === null ||
    dataset.price === null
  )
    window.location.href = "/products/new";

  var data = new FormData();
  data.append("name", dataset.name);
  data.append("description", dataset.desc);
  data.append("moq", dataset.moq);
  data.append("mrp_price", 0);
  data.append("price", dataset.price);
  data.append("category_id", dataset.categoryId);
  data.append("sub_category_id", dataset.subCategoryId);
  data.append("vertical_id", dataset.verticalId);

  data.append("quantity", dataset.quantity);
  data.append("product_unit_id", dataset.product_unit_id);
  data.append("mrp_price", dataset.mrp_price);
  data.append("status", dataset.status);

  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      data.append(`images[${i}]`, files[i]);
    }

  var config = {
    method: "post",
    url: "https://badhat.club/api/addProduct",
    headers: {
      Authorization: "Bearer " + TOKEN,
      "content-type": "multipart/form-data",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.data.message === "Product added") {
        window.location.href = "/products";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

//addProduct("lol")

export const editProduct = async (dataset, files) => {
  var data = new FormData();
  data.append("id", dataset.id);
  data.append("name", dataset.name);
  data.append("description", dataset.desc);
  data.append("moq", dataset.moq);
  data.append("price", dataset.price);
  data.append("category_id", dataset.categoryId);
  data.append("sub_category_id", dataset.subCategoryId);
  data.append("vertical_id", dataset.verticalId);

  data.append("quantity", dataset.quantity);
  data.append("product_unit_id", dataset.product_unit_id);
  data.append("mrp_price", dataset.mrp_price);
  data.append("status", dataset.status);

  for (var i = 0; i < files.length; i++) {
    data.append(`images[${i}]`, files[i]);
  }

  var config = {
    method: "post",
    url: "https://badhat.club/api/editProduct",
    headers: {
      Authorization: "Bearer " + TOKEN,
      "content-type": "multipart/form-data",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.data.message === "Product Updated") {
        window.location.href = "/products";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getNotifications = async () => {
  const res = await axios.get("https://badhat.club/api/notifications", {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data;
};

export const getAppState = async () => {
  const res = await axios.get("https://badhat.club/api/appState", {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res;
};

export const markAsRead = async () => {
  const res = await axios.get("https://badhat.club/api/markAllRead", {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
};

export const getMyProducts = async () => {
  const res = await axios.get("https://badhat.club/api/products", {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res;
};

export const delProduct = async (id) => {
  const res = await axios.delete(`https://badhat.club/api/product/${id}`, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res;
};

export const delProductImg = async (prd_id, img_id) => {
  const res = await axios.delete(
    `https://badhat.club/api/products/${prd_id}/images/${img_id}`,
    {
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    }
  );
  return res;
};

export const getPincodeData = async (pincode) => {
  const res = await axios.get(
    `https://api.postalpincode.in/pincode/${pincode}`
  );
  return res;
};

export const postMessage = async (dataset) => {
  var data = new FormData();
  //data.append('image', dataset.categoryId);
  data.append("message", dataset.message);
  data.append("vendor_id", dataset.vendor_id);
  //for (var i = 0; i < files.length; i++) {
  // data.append(`images[${i}]`, files.[i]);
  // }

  var config = {
    method: "post",
    url: "https://badhat.club/api/addChat",
    headers: {
      Authorization: "Bearer " + TOKEN,
      "content-type": "multipart/form-data",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
