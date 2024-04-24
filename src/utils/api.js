import axios from "axios";
import { toast } from "sonner";
import { device_token } from "./browser";
import { webStorageGetItem } from "./webStorage";

let privateApi = null;
let publicApi = null;

const createApi = async (headers) => {
  const instance = axios.create({
    // baseURL: "https://some-domain.com/api/",
    timeout: 8000,
    headers: { device_token: await device_token(), ...headers },
  });

  return instance;
};

const errorToast = (msg) => {
  toast.error(msg);
};

const checkDeviceToken = async () => {
  if (publicApi) return;

  publicApi = await createApi({
    s: "test",
  });
};

const createPrivateApi = async () => {
  if (!webStorageGetItem("token")) {
    return;
  }
  let access_token = "testonly";
  const header = {
    authorization: `bearer ${access_token}`,
    "accept-language": "",
  };
  privateApi = await createApi(header);
};

const apiRequest = async (api, method, url, requestData, config) => {
  try {
    const response = await api.request({
      method,
      url,
      data: requestData,
      ...config,
    });
    return response.data;
  } catch (error) {
    errorToast(error.message);
    throw error;
  }
};

const checkAuth = async () => {
  if (!privateApi) await createPrivateApi();
  if (!privateApi) {
    // here redirect to login page
    throw new Error("Not authorized");
  }
};

export const publicApiGet = async (url, requestData) => {
  await checkDeviceToken();
  return apiRequest(publicApi, "GET", url, requestData);
};

export const publicApiPost = async (url, requestData) => {
  await checkDeviceToken();
  return apiRequest(publicApi, "POST", url, requestData);
};

export const privateApiGet = async (url, requestData) => {
  await checkAuth();
  return apiRequest(privateApi, "GET", url, requestData);
};

export const privateApiPost = async (url, requestData) => {
  await checkAuth();
  return apiRequest(privateApi, "POST", url, requestData);
};
