import axios, { AxiosRequestHeaders } from "axios";
import snackBarUtil from "../../components/Layout/snackBarUtil";

export interface ApiResource {
  URL: string;
  METHOD?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

interface Query {
  [key: string]: string | number | boolean | string[] | number[];
}
export interface ApiServiceInterface {
  resource: ApiResource;
  params?: Query;
  pathVars?: Query;
  data?: any;
  noAuth?: boolean;
  betfair?: boolean;
  headers?: AxiosRequestHeaders;
}

interface Error {
  message: string[];
}

interface ApiResponse {
  response: any;
  error: Error | null;
}

const filterQuery = (query: Query) => {
  const newQuery: Query = {};
  Object.keys(query).forEach((item) => {
    if (Array.isArray(query[item])) {
      newQuery[item] = query[item].toString();
    } else {
      newQuery[item] = query[item];
    }
  });
  return newQuery;
};
const apiService: (arg: ApiServiceInterface) => Promise<any> = async ({
  resource,
  data = {},
  params = {},
  headers = {},
  pathVars = {},
  noAuth = false,
  betfair = false,
}) => {
  const { METHOD, URL } = resource;
  const token = localStorage.getItem("token");
  let url = URL;
  Object.keys(pathVars).forEach((key) => {
    if (url) url = url.replace(":" + key, pathVars[key].toString());
  });
  let config;
  const baseURL = url.includes("http")
    ? ""
    : betfair
    ? process.env.REACT_APP_BETFAIR_URL
    : process.env.REACT_APP_API_URL;

  try {
    config = {
      method: METHOD || "GET",
      baseURL,
      url,
      data,
      params: filterQuery(params),
      headers: {
        ...headers,
        ...(token && !noAuth ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  } catch (errors) {
    console.log(errors);
  }
  if (config) {
    return axios(config);
  }
};

const apiHandler: (arg: ApiServiceInterface) => Promise<ApiResponse> = async (
  args
) => {
  let result: any;
  await apiService(args)
    .catch((error) => {
      result = { error: error.response?.data };
      if (error?.response?.status === 401) {
        localStorage.clear();
        window.location.replace("/sign-in");
        result.error = {};
      }
    })
    .then((response) => {
      if (response) {
        if (response.data.status === false) {
          result = { error: response.data };
        } else {
          result = { response: response.data };
        }
      }
    });
  return result;
};

const apiSnackbarNotifications: (
  arg: ApiResponse
) => Promise<ApiResponse> = async (args) => {
  if (args?.error) {
    const { message } = args.error;
    if (typeof message === "object") {
      message?.forEach((message) => snackBarUtil.error(message));
    } else if (typeof message === "string") {
      snackBarUtil.error(message);
    }
  } else if (typeof args?.response?.message === "string") {
    snackBarUtil.success(args.response?.message);
  }
  return args;
};

const apiWithErrorSnackbar: (
  arg: ApiServiceInterface
) => Promise<ApiResponse> = async (args) => {
  const result = await apiHandler(args);
  if (result?.error) {
    const { message } = result.error;
    if (typeof message === "object") {
      message?.forEach((message) => snackBarUtil.error(message));
    } else {
      if(message==="No Data Found"){

      }else{

        snackBarUtil.error(message);
      }
      console.log(message,"messageerrr")
    }
  }
  return result;
};

const apiWithSnackbar: (
  arg: ApiServiceInterface
) => Promise<ApiResponse> = async (args) => {
  const result = await apiHandler(args);
  return apiSnackbarNotifications(result);
};

export { apiWithErrorSnackbar, apiService, apiHandler, apiWithSnackbar };
